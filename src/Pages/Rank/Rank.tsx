import React, { useEffect, useState } from "react";
import styles from "./Rank.module.css";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../Components/Table/Table";
import { fetchRank } from "../../Services/Slices/rankSlice";
import Button from "../../Components/Forms/Button";
import { public_defenses } from "../../Components/Consts";

const Rank: React.FC = () => {
  const dispatch = useDispatch<any>();
  const columns = [
    { title: "Nome", property: "blurred_name" },
    { title: "CPF", property: "blurred_social_security_number" },
    { title: "Nota", property: "average" },
  ];

  const categories = [{ name: "Direito", property: "direito" }];

  const stages = [
    { name: "1", property: "1" },
    { name: "2", property: "2" },
  ];

  const { data, loading, error } = useSelector((state: any) => state.rankSlice);
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

  const handleSubmit = () => {
    dispatch(fetchRank({ ...filter, is_resident: false }, page.toString()));
  };

  useEffect(() => {
    dispatch(
      fetchRank(
        {
          public_defense: public_defenses[0].name,
          category: categories[0].name,
          stage: stages[0].name,
          pcd: false,
          is_resident: false,
        },
        page.toString()
      )
    );
  }, [dispatch, page]);
  console.log("rank: ", data);
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
        title="Ranqueamento dos estagiários:"
        columns={columns}
        data={data}
        setPage={setPage}
        page={page}
        total={data?.count}
        isEmpty={data?.length === 0}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default Rank;
