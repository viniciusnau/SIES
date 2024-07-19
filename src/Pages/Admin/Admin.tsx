import { useSelector } from "react-redux";
import { adminColumnsTable } from "../../Components/Consts";
import Table from "../../Components/Table/Table";
import { useState } from "react";
import styles from "./Admin.module.css";
import Modal from "../../Components/Modal/Modal";
import { ChildrenModal } from "../../Components/ChildrenModal/ChildrenModal";
import Input from "../../Components/Forms/Input";

interface iForm {
  blurred_name: string;
  registration: string;
  id?: string;
}

const Admin = () => {
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
    console.log("delete: ", id);
    setOpenDeleteModal(true);
  };

  const handleEdit = (id: string) => {
    console.log("edit: ", id);
    setOpenEditModal(true);
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
    </div>
  );
};

export default Admin;
