// import { useDispatch, useSelector } from "react-redux";
// import { adminColumnsTable } from "../../Components/Consts";
// import Table from "../../Components/Table/Table";
// import { useState } from "react";
// import styles from "./Admin.module.css";
// import Modal from "../../Components/Modal/Modal";
// import { ChildrenModal } from "../../Components/ChildrenModal/ChildrenModal";
// import Input from "../../Components/Forms/Input";
// import { MdAddCircleOutline } from "react-icons/md";
// import { fetchpostUserAdmin } from "../../Services/Slices/postUserAdmin";

// interface iForm {
//   blurred_name: string;
//   registration: string;
//   id?: string;
// }

// const Admin = () => {
//   const dispatch = useDispatch<any>();
//   const { data, loading, error } = useSelector(
//     (state: any) => state.getAdminList
//   );
//   const [page, setPage] = useState<number>(1);
//   const [form, setForm] = useState<iForm>({
//     blurred_name: "",
//     registration: "",
//   });
//   const [openEditModal, setOpenEditModal] = useState<boolean>(false);
//   const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
//   const [isOpenCreateModal, setIsOpenCreateModal] = useState<boolean>(false);

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

//   const handleChildren = () => {
//     return (
//       <>
//         <Input
//           className={styles.input}
//           onChange={handleChange}
//           name="blurred_name"
//           label="Nome"
//         />
//         <Input
//           className={styles.input}
//           onChange={handleChange}
//           name="registration"
//           label="Matrícula"
//         />
//       </>
//     );
//   };

//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value, checked, type } = event.target;
//     const newValue = type === "checkbox" ? checked : value;

//     setForm((prev: iForm) => ({
//       ...prev,
//       [name]: newValue,
//     }));
//   };

//   const handleDelete = (id: string) => {
//     setOpenDeleteModal(true);
//   };

//   const handleEdit = (id: string) => {
//     console.log("edit: ", id);
//     setOpenEditModal(true);
//   };

//   const handleCreateSubmit = () => {
//       dispatch(fetchpostUserAdmin(form));
//       // setSnackbarType(true);
//     }
//     setIsOpenCreateModal(false);
//   };

//   return (
//     <div className={styles.container}>
//       <MdAddCircleOutline
//         size={28}
//         onClick={() => setIsOpenCreateModal(true)}
//         style={{ margin: "0 .5rem", cursor: "pointer" }}
//       />
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
//         pagination={false}
//       />
//       {openDeleteModal && (
//         <Modal
//           content="deleteCandidate"
//           confirm={undefined}
//           openModal={openDeleteModal}
//           setOpenModal={setOpenDeleteModal}
//           setShowSnackbar={undefined}
//         />
//       )}
//       {openEditModal && (
//         <ChildrenModal
//           children={handleChildren()}
//           loading={false}
//           handleSubmit={function (): void {
//             throw new Error("Function not implemented.");
//           }}
//           title="Editar usuário"
//           confirmLabel="Salvar"
//           setOpenModal={setOpenEditModal}
//           openModal={openEditModal}
//         />
//       )}
//       {isOpenCreateModal && (
//         <ChildrenModal
//           loading={false}
//           disabled={undefined}
//           handleSubmit={handleCreateSubmit}
//           title="Cadastrar candidato"
//           confirmLabel="Salvar"
//           setOpenModal={setIsOpenCreateModal}
//           openModal={isOpenCreateModal}
//           children={
//             <>
//               <Input
//                 label="Nome"
//                 name="name"
//                 onChange={handleChange}
//                 className={styles.input}
//               />
//               <Input
//                 label="CPF"
//                 name="social_security_number"
//                 onChange={handleChange}
//                 mask="00.00.00-00"
//                 className={styles.input}
//               />
//             </>
//           }
//         />
//       )}
//     </div>
//   );
// };

// export default Admin;

import { useDispatch, useSelector } from "react-redux";
import { adminColumnsTable } from "../../Components/Consts";
import Table from "../../Components/Table/Table";
import { useState } from "react";
import styles from "./Admin.module.css";
import Modal from "../../Components/Modal/Modal";
import { ChildrenModal } from "../../Components/ChildrenModal/ChildrenModal";
import Input from "../../Components/Forms/Input";
import { MdAddCircleOutline } from "react-icons/md";
import { fetchpostUserAdmin } from "../../Services/Slices/postUserAdmin";

interface iForm {
  blurred_name: string;
  registration: string;
  id?: string;
}

const Admin = () => {
  const dispatch = useDispatch<any>();
  const { data, loading, error } = useSelector(
    (state: any) => state.getAdminList
  );
  const [page, setPage] = useState<number>(1);
  const [form, setForm] = useState<iForm>({
    blurred_name: "",
    registration: "",
  });
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [isOpenCreateModal, setIsOpenCreateModal] = useState<boolean>(false);

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

  const handleChildren = () => {
    return (
      <>
        <Input
          className={styles.input}
          onChange={handleChange}
          name="blurred_name"
          label="Nome"
        />
        <Input
          className={styles.input}
          onChange={handleChange}
          name="registration"
          label="Matrícula"
        />
      </>
    );
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = event.target;
    const newValue = type === "checkbox" ? checked : value;

    setForm((prev: iForm) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleDelete = (id: string) => {
    setOpenDeleteModal(true);
  };

  const handleEdit = (id: string) => {
    console.log("edit: ", id);
    setOpenEditModal(true);
  };

  const handleCreateSubmit = () => {
    dispatch(fetchpostUserAdmin(form));
    setIsOpenCreateModal(false);
  };

  return (
    <div className={styles.container}>
      <MdAddCircleOutline
        size={28}
        onClick={() => setIsOpenCreateModal(true)}
        style={{ margin: "0 .5rem", cursor: "pointer" }}
      />
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
        pagination={false}
      />
      {openDeleteModal && (
        <Modal
          content="deleteCandidate"
          confirm={undefined}
          openModal={openDeleteModal}
          setOpenModal={setOpenDeleteModal}
          setShowSnackbar={undefined}
        />
      )}
      {openEditModal && (
        <ChildrenModal
          children={handleChildren()}
          loading={false}
          handleSubmit={function (): void {
            throw new Error("Function not implemented.");
          }}
          title="Editar usuário"
          confirmLabel="Salvar"
          setOpenModal={setOpenEditModal}
          openModal={openEditModal}
        />
      )}
      {isOpenCreateModal && (
        <ChildrenModal
          loading={false}
          disabled={undefined}
          handleSubmit={handleCreateSubmit}
          title="Cadastrar candidato"
          confirmLabel="Salvar"
          setOpenModal={setIsOpenCreateModal}
          openModal={isOpenCreateModal}
          children={
            <>
              <Input
                label="Nome"
                name="name"
                onChange={handleChange}
                className={styles.input}
              />
              <Input
                label="Matricula"
                name="registration"
                onChange={handleChange}
                mask="00.00.00-00"
                className={styles.input}
              />
            </>
          }
        />
      )}
    </div>
  );
};

export default Admin;
