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
  statusListTable,
} from "../../Components/Consts";
import { BsQuestionSquare } from "react-icons/bs";

interface iData {
  academic_index: number;
  test_index: number;
  interview_index: number;
  average: number;
  hiring_status: keyof typeof statusListTable;
}

const Rank: React.FC = () => {
  const dispatch = useDispatch<any>();
  const { data, loading, error } = useSelector((state: any) => state.rankSlice);
  const [page, setPage] = useState<number>(1);
  const [isExtraColumns, setIsExtraColumns] = useState<boolean>(false);
  const [isToolTipVisible, setIsToolTipVisible] = useState<boolean>(false);
  const [formatted, setFormatted] = useState<any>(null);
  const [filter, setFilter] = useState<any>({
    is_resident: true,
    stage: stages[0].name,
    public_defense: public_defenses[0],
    category: categories[0],
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

  const handleData = (data: any) => {
    const updated = data?.map((item: iData) => {
      const formattedAcademicIndex = item.academic_index
        .toString()
        .replace(".", ",");
      const formattedTestIndex = item.test_index
        ? item.test_index.toString().replace(".", ",")
        : null;
      const formattedInterviewIndex = item.interview_index
        ? item.interview_index.toString().replace(".", ",")
        : null;
      const formattedAverage = item.average.toString().replace(".", ",");

      return {
        ...item,
        academic_index: formattedAcademicIndex,
        test_index: formattedTestIndex,
        interview_index: formattedInterviewIndex,
        average: formattedAverage,
        hiring_status: statusListTable[item.hiring_status],
      };
    });
    setFormatted(updated);
  };

  const handleSubmit = () => {
    dispatch(fetchRank({ ...filter, is_resident: false }, page.toString()));
    filter.stage === 2 ? setIsExtraColumns(true) : setIsExtraColumns(false);
  };

  useEffect(() => {
    dispatch(
      fetchRank(
        {
          public_defense: public_defenses[0],
          category: categories[0],
          stage: stages[0].name,
          pcd: false,
          is_resident: false,
        },
        page.toString()
      )
    );
  }, [dispatch, page]);

  useEffect(() => {
    handleData(data?.results);
  }, [data]);

  return (
    <div className={styles.container}>
      <div className={styles.filter}>
        <div className={styles.filterContainer}>
          <div className={styles.selectContainer}>
            <p>Curso:</p>
            <select
              className={styles.select}
              value={filter.category}
              onChange={handleChange}
              name="category"
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.selectContainer}>
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
          <div className={styles.selectContainer}>
            <p>Etapa:</p>
            <select
              className={styles.select}
              style={{ width: "3rem", margin: "0" }}
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
                  Etapa 2: média entre IMAA, entrevista e/ou prova
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
            <p style={{ marginTop: "0" }}>PCD</p>
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
        data={formatted}
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
