import React, { useEffect, useState } from "react";
import styles from "./Resident.module.css";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../Components/Table/Table";
import Button from "../../Components/Forms/Button";
import {
  categories,
  columnsTable,
  extraColumnsTable,
  public_defenses,
  stages,
} from "../../Components/Consts";
import { fetchResident } from "../../Services/Slices/residentSlice";
import { BsQuestionSquare } from "react-icons/bs";

const Resident: React.FC = () => {
  const dispatch = useDispatch<any>();
  const { data, loading, error } = useSelector(
    (state: any) => state.residentSlice
  );
  const [page, setPage] = useState<number>(1);
  const [isExtraColumns, setIsExtraColumns] = useState<boolean>(false);
  const [isToolTipVisible, setIsToolTipVisible] = useState<boolean>(false);
  const [filter, setFilter] = useState<any>({
    public_defense: public_defenses[0],
    category: categories[0].name,
    stage: stages[0].name,
    pcd: false,
  });

  const handleTooltipToggle = () => {
    setIsToolTipVisible(!isToolTipVisible);
  };

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
    dispatch(fetchResident(filter, page.toString()));
    filter.stage == 2 ? setIsExtraColumns(true) : setIsExtraColumns(false);
  };

  useEffect(() => {
    dispatch(
      fetchResident(
        {
          public_defense: public_defenses[0],
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
        <div className={styles.filterContainer}>
          <div>
            <p>Curso:</p>
            <select
              className={styles.select}
              style={{ margin: "0 3rem 0 .5rem" }}
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
          </div>
          <div>
            <p>Defensoria:</p>
            <select
              className={styles.select}
              value={filter.public_defense}
              onChange={handleChange}
              name="public_defense"
            >
              {public_defenses.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div>
            <p>Etapa:</p>
            <select
              className={styles.select}
              style={{ margin: "0 .25rem 0 2.5rem" }}
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
            <label className={styles.question}>
              {isToolTipVisible && (
                <p
                  className={`${styles.tooltip} ${
                    isToolTipVisible ? styles.fadeIn : styles.fadeOut
                  }`}
                >
                  Etapa 1: somente Índice de Mérito Acadêmico Acumulado (IMAA),
                  Etapa 2: média entre IMAA, entrevista e prova
                </p>
              )}
              <BsQuestionSquare
                size={18}
                color="#ff6464"
                style={{ margin: "0 0 0 .25rem" }}
                onMouseEnter={handleTooltipToggle}
                onMouseLeave={handleTooltipToggle}
              />
            </label>
          </div>
          <div>
            <p style={{ margin: "0 0 1rem .25rem" }}>PCD</p>
            <input
              type="checkbox"
              name="pcd"
              onChange={handleChange}
              className={styles.checkbox}
            />
          </div>
        </div>
        <Button onClick={handleSubmit} className={styles.button}>
          Pesquisar
        </Button>
      </div>
      <Table
        title="Ranqueamento dos residentes:"
        columns={isExtraColumns ? extraColumnsTable : columnsTable}
        data={data?.results}
        setPage={setPage}
        page={page}
        total={data?.count}
        isEmpty={data?.results?.length === 0}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default Resident;
