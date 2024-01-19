import React, { useEffect, useState } from "react";
import styles from "./Rank.module.css";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../Components/Table/Table";
import { fetchRank } from "../../Services/Slices/rankSlice";

const Rank: React.FC = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state: any) => state.rankSlice);
  const [page, setPage] = useState<number>(1);

  const columns = [
    { title: "Nome", property: "name" },
    { title: "CPF", property: "id" },
    { title: "Nota", property: "grade" },
  ];

  const mock = [
    {
      name: "Estagiario 1",
      id: "420",
      grade: 10,
    },
    {
      name: "Estagiario 2",
      id: "421",
      grade: 5,
    },
    {
      name: "Estagiario 3",
      id: "420",
      grade: 9.5,
    },
  ];

  useEffect(() => {
    dispatch<any>(fetchRank(page.toString()));
  }, [dispatch, page]);

  return (
    <div className={styles.container}>
      <Table
        title="Ranqueamento dos estagiários"
        columns={columns}
        data={mock}
        setPage={setPage}
        page={page}
        total={data.count}
        isEmpty={data?.results?.length === 0}
      />
    </div>
  );
};

export default Rank;
