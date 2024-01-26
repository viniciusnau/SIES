import React, { useEffect, useState } from "react";
import styles from "./Rank.module.css";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../Components/Table/Table";
import { fetchRank } from "../../Services/Slices/rankSlice";
import Button from "../../Components/Forms/Button";

const Rank: React.FC = () => {
  const dispatch = useDispatch<any>();
  const columns = [
    { title: "Nome", property: "name" },
    { title: "CPF", property: "id" },
    { title: "Nota", property: "grade" },
  ];

  const categories = [
    { name: "Direito", property: "direito" },
    { name: "Sistemas de Informações", property: "sistemas de informacoes" },
    { name: "RH", property: "RH" },
    { name: "Segurança", property: "seguranca" },
  ];

  const public_defenses = [
    { name: "Florianópolis", property: "florianopolis" },
    { name: "Palhoça", property: "palhoca" },
    { name: "Sao José", property: "sao jose" },
  ];
  const stages = [
    { name: "1", property: "1" },
    { name: "2", property: "2" },
  ];

  const mock = [
    {
      name: "Estagiario 1",
      id: "420",
      grade: 10,
      pcd: false,
    },
    {
      name: "Estagiario 2",
      id: "421",
      grade: 5,
      pcd: false,
    },
    {
      name: "Estagiario 3",
      id: "420",
      grade: 9.5,
      pcd: false,
    },
  ];
  const { data, loading, error } = useSelector((state: any) => state.rankSlice);
  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState<any>({
    public_defense: public_defenses[0].name,
    category: categories[0].name,
    stage: stages[0].name,
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

  const handleSubmit = () => {
    dispatch(fetchRank(filter, page.toString()));
  };

  useEffect(() => {
    dispatch(
      fetchRank(
        {
          public_defense: public_defenses[0].name,
          category: categories[0].name,
          stage: stages[0].name,
          pcd: false,
        },
        page.toString()
      )
    );
  }, [dispatch, page]);

  return (
    <div className={styles.container}>
      <div className={styles.filter}>
        <div
          style={{ display: "flex", alignItems: "center", margin: "0 0 1rem" }}
        >
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
        title="Ranqueamento dos estagiários"
        columns={columns}
        data={mock}
        setPage={setPage}
        page={page}
        total={data.count}
        isEmpty={data?.results?.length === 0}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default Rank;
