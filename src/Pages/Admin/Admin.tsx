// import { useSelector } from "react-redux";
// import { adminColumnsTable } from "../../Components/Consts";
// import Table from "../../Components/Table/Table";
// import { useState } from "react";
// import styles from "./Admin.module.css";
// import Modal from "../../Components/Modal/Modal";

// const Admin = () => {
//   const { data, loading, error } = useSelector((state: any) => state.adminList);
//   const [page, setPage] = useState<number>(1);
//   const [openModal, setOpenModal] = useState<number>(1);

//   const mock = [
//     {
//       blurred_name: "Guilherme",
//       registration: "094.534.864-63",
//       id: "adsada",
//     },
//     {
//       blurred_name: "Thiago",
//       registration: "094.534.864-63",
//       id: "adsada",
//     },
//     {
//       blurred_name: "Julia",
//       registration: "094.534.864-63",
//       id: "adsada",
//     },
//     {
//       blurred_name: "Rafaela",
//       registration: "094.534.864-63",
//       id: "adsada",
//     },
//   ];

//   const handleDelete = (id: string) => {
//     console.log("delete: ", id);
//     return (
//       <Modal
//         content="deleteCandidate"
//         confirm={undefined}
//         setOpenModal={setOpenModal}
//         setShowSnackbar={undefined}
//       />
//     );
//   };

//   const handleEdit = (id: string) => {
//     console.log("edit: ", id);
//   };

//   return (
//     <div className={styles.container}>
//       <Table
//         title="Usuários do sistema:"
//         columns={adminColumnsTable}
//         data={mock}
//         setPage={setPage}
//         page={page}
//         total={data?.count}
//         isEmpty={data?.results?.length === 0}
//         loading={loading}
//         error={error}
//         handleDelete={handleDelete}
//         handleEdit={handleEdit}
//       />
//     </div>
//   );
// };

// export default Admin;

import { useSelector } from "react-redux";
import { adminColumnsTable } from "../../Components/Consts";
import Table from "../../Components/Table/Table";
import { useState } from "react";
import styles from "./Admin.module.css";
import Modal from "../../Components/Modal/Modal";

const Admin = () => {
  const { data, loading, error } = useSelector((state: any) => state.adminList);
  const [page, setPage] = useState<number>(1);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<string>("");

  const mock = [
    {
      blurred_name: "Guilherme",
      registration: "094.534.864-63",
      id: "adsada",
    },
    {
      blurred_name: "Thiago",
      registration: "094.534.864-63",
      id: "adsada",
    },
    {
      blurred_name: "Julia",
      registration: "094.534.864-63",
      id: "adsada",
    },
    {
      blurred_name: "Rafaela",
      registration: "094.534.864-63",
      id: "adsada",
    },
  ];

  const handleDelete = (id: string) => {
    console.log("delete: ", id);
    setModalContent("deleteCandidate");
    setOpenModal(true);
  };

  const handleEdit = (id: string) => {
    console.log("edit: ", id);
  };

  return (
    <div className={styles.container}>
      <Table
        title="Usuários do sistema:"
        columns={adminColumnsTable}
        data={mock}
        setPage={setPage}
        page={page}
        total={data?.count}
        isEmpty={data?.results?.length === 0}
        loading={loading}
        error={error}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
      {openModal && (
        <Modal
          content={"deleteCandidate"}
          confirm={undefined}
          setOpenModal={setOpenModal}
          setShowSnackbar={undefined}
        />
      )}
    </div>
  );
};

export default Admin;
