import { useSelector } from "react-redux";
// import { adminColumnsTable } from "../../Components/Consts";
import Table from "../../Components/Table/Table";
import { useState } from "react";

const Admin = () => {
  const { loading, error } = useSelector((state: any) => state.adminList);
  const [page, setPage] = useState<number>(0);
  const data = {
    count: 0,
    results: [
      { title: "Nome", property: "blurred_name" },
      { title: "Matrícula", property: "registration" },
      { title: "Editar", property: "edit" },
    ],
  };

  return (
    <></>
    // <Table
    //   title="Lista de contas"
    //   columns={adminColumnsTable}
    //   data={data.results}
    //   setPage={setPage}
    //   page={page}
    //   total={data?.count}
    //   isEmpty={data?.results?.length === 0}
    //   loading={loading}
    //   error={error}
    // />
  );
};

export default Admin;
