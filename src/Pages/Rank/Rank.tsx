import React, { useEffect, useState } from "react";
import styles from "./Rank.module.css";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../Components/Table/Table";
import { fetchRank } from "../../Services/Slices/rankSlice";
import Button from "../../Components/Forms/Button";

const Rank: React.FC = () => {
  const dispatch = useDispatch<any>();
  const columns = [
    { title: "Nome", property: "blurred_name" },
    { title: "CPF", property: "blurred_social_security_number" },
    { title: "Nota", property: "average" },
  ];

  const categories = [
    { name: "Direito", property: "direito" }
  ];

  const public_defenses = [
    { name: "Florianópolis", property: "florianopolis" },
    { name: "Araranguá", property: "ararangua" },
    { name: "Balneário Camboriú", property: "balneario camboriu" },
    { name: "Biguaçu", property: "biguacu" },
    { name: "Blumenau", property: "blumenau" },
    { name: "Brusque", property: "brusque" },
    { name: "Caçador", property: "cacador" },
    { name: "Campos Novos", property: "campos novos" },
    { name: "Chapecó", property: "chapeco" },
    { name: "Criciúma", property: "criciuma" },
    { name: "Concordia", property: "concordia" },
    { name: "Itajaí", property: "itajai" },
    { name: "Jaraguá do Sul", property: "jaragua do sul" },
    { name: "Joaçaba", property: "joacaba" },
    { name: "Joinville", property: "joinville" },
    { name: "Lages", property: "lages" },
    { name: "Mafra", property: "mafra" },
    { name: "Maravilha", property: "maravilha" },
    { name: "Palhoça", property: "palhoca" },
    { name: "Rio do Sul", property: "rio do sul" },
    { name: "Sao José", property: "sao jose" },
    { name: "São Lourenço do Oeste", property: "sao lourenco do oeste" },
    { name: "São Miguel do Oeste", property: "sao miguel do oeste" },
    { name: "Tubarão", property: "tubarao" },
    { name: "Xanxerê", property: "xanxere" },
  ];

  const stages = [
    { name: "1", property: "1" },
    { name: "2", property: "2" },
  ];

  const { data: apiResponseData, loading, error } = useSelector(
      (state: any) => state.rankSlice
  );

  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState<any>({
    is_resident: true,
    stage: stages[0].name,
    public_defense: public_defenses[0].name,
    category: categories[0].name,
    pcd: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    const { name, value, type, checked } = e.target;

    setFilter((prev: any) => {
      if (type === "checkbox") {
        return {
          ...prev,
          [name]: checked,
        };
      } else if (Array.isArray(prev[name])) {
        return {
          ...prev,
          [name]: [...prev[name], value],
        };
      } else {
        return {
          ...prev,
          [name]: value,
        };
      }
    });
  };

  const handleSubmit = async () => {
    await dispatch(fetchRank(filter, page.toString()));
    console.log(apiResponseData);
  };

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(
          fetchRank(
              {
                is_resident: true,
                public_defense: public_defenses[0].name,
                category: categories[0].name,
                stage: stages[0].name,
                pcd: false,
              },
              page.toString()
          )
      );
      console.log(apiResponseData);
    };

    fetchData();
  }, [dispatch, page]);

  const tableData = apiResponseData?.results || [];

  return (
      <div className={styles.container}>
        <div className={styles.filter}>
          <div style={{ display: "flex", alignItems: "center", margin: "0 0 1rem" }}>
            <p>Curso:</p>
            <select
                className={styles.select}
                value={filter.category}
                onChange={handleChange}
                name="category"
            >
              {categories.map((item) => (
                  <option key={item.property} value={item.property}>
                    {item.name}
                  </option>
              ))}
            </select>
            <p>Defensoria:</p>
            <select
                className={styles.select}
                value={filter.public_defense}
                onChange={handleChange}
                name="public_defense"
            >
              {public_defenses.map((item) => (
                  <option key={item.property} value={item.property}>
                    {item.name}
                  </option>
              ))}
            </select>
            <p>Etapa:</p>
            <select
                className={styles.select}
                value={filter.stage}
                onChange={handleChange}
                name="stage"
            >
              {stages.map((item) => (
                  <option key={item.property} value={item.property}>
                    {item.name}
                  </option>
              ))}
            </select>
            <input
                type="checkbox"
                name="pcd"
                onChange={handleChange}
                className={styles.checkbox}
            />
            <p style={{ margin: "0 0 0 .25rem" }}>PCD</p>
          </div>
          <Button onClick={handleSubmit} className={styles.button}>
            Pesquisar
          </Button>
        </div>
        <Table
            title=""
            columns={columns}
            data={tableData}
            setPage={setPage}
            page={page}
            total={0}
            isEmpty={tableData.length === 0}
            loading={loading}
            error={error}
        />
      </div>
  );
};

export default Rank;
