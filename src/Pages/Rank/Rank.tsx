import React, { useEffect, useState } from "react";
import styles from "./Rank.module.css";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../Components/Table/Table";
import { fetchRank } from "../../Services/Slices/rankSlice";
import Button from "../../Components/Forms/Button";
import {
  categories,
  columnsTable,
  extraColumnsTable,
  public_defenses,
  stages,
} from "../../Components/Consts";
import { BsQuestionSquare } from "react-icons/bs";

const Rank: React.FC = () => {
  const dispatch = useDispatch<any>();
  const { data, loading, error } = useSelector((state: any) => state.rankSlice);
  const [page, setPage] = useState<number>(1);
  const [isExtraColumns, setIsExtraColumns] = useState<boolean>(false);
  const [isToolTipVisible, setIsToolTipVisible] = useState<boolean>(false);
  const [filter, setFilter] = useState<any>({
    is_resident: true,
    stage: stages[0].name,
    public_defense: public_defenses[0],
    category: categories[0].name,
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
    dispatch(fetchRank({ ...filter, is_resident: false }, page.toString()));
    filter.stage == 2 ? setIsExtraColumns(true) : setIsExtraColumns(false);
  };

  useEffect(() => {
    dispatch(
      fetchRank(
        {
          public_defense: public_defenses[0],
          category: categories[0].name,
          stage: stages[0].name,
          pcd: false,
          is_resident: false,
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
          <div>
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
        title="Ranqueamento dos estagiários:"
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

export default Rank;
