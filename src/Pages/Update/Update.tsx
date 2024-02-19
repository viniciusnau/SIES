import styles from "./Update.module.css";
import Input from "../../Components/Forms/Input";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../Components/Forms/Button";
import { fetchPutUser } from "../../Services/Slices/putUser";
import { fetchUsersList } from "../../Services/Slices/getUsersList";
import Loading from "../../Components/Loading/Loading";
import Snackbar from "../../Components/Snackbar/Snackbar";
import { public_defenses, statusList } from "../../Components/Consts";
import { fetchDeleteUser } from "../../Services/Slices/deleteUser";
import Modal from "../../Components/Modal/Modal";

interface iForm {
  id: string;
  public_defense: string;
  test_index: string;
  interview_index: string;
  academic_index: string;
  hiring_status: string;
}

const Update = () => {
  const dispatch = useDispatch<any>();
  const [snackbarType, setSnackbarType] = useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [confirm, setConfirm] = useState<boolean>(false);
  const [form, setForm] = useState<iForm>({
    id: "",
    public_defense: "",
    test_index: "",
    interview_index: "",
    academic_index: "",
    hiring_status: statusList[0].property,
  });
  const { data, error, loading } = useSelector(
    (state: any) => state.getUsersListSlice
  );
  const response = useSelector((state: any) => state.deleteUserSlice);

  const userResponse = useSelector((state: any) => state.putUserSlice);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    if (name === "id") {
      setForm({ ...form, [name]: value.id });
    } else if (name === "hiring_status") {
      setForm({ ...form, [name]: value.property });
    }
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    const processedForm = {
      ...form,
      id: form.id,
      ...(form.test_index && {
        test_index: form.test_index.replace(/,/g, ".").replace("_", ""),
      }),
      ...(form.interview_index && {
        interview_index: form.interview_index
          .replace(/,/g, ".")
          .replace("_", ""),
      }),
      ...(form.academic_index && {
        academic_index: form.academic_index.replace(/,/g, ".").replace("_", ""),
      }),
    };

    const filteredProcessedForm = Object.fromEntries(
      Object.entries(processedForm).filter(([key, value]) => value !== "")
    );

    dispatch(fetchPutUser(filteredProcessedForm));
    setSnackbarType(true);
  };

  useEffect(() => {
    dispatch(fetchUsersList());
    setSnackbarType(false);
  }, [response]);

  useEffect(() => {
    setForm({ ...form, id: data[0]?.id });
  }, [data]);

  console.log("response: ", response);

  return (
    <div className={styles.container}>
      {isOpenModal && (
        <Modal
          content="deleteCandidate"
          confirm={fetchDeleteUser(form.id)}
          setConfirm={setConfirm}
          setOpenModal={setIsOpenModal}
        />
      )}
      {userResponse.data.length > 0 && snackbarType && (
        <Snackbar type="successUpdate" setShowSnackbar={setSnackbarType} />
      )}
      {userResponse.error && snackbarType && (
        <Snackbar type="errorUpdate" setShowSnackbar={setSnackbarType} />
      )}
      {response.data && snackbarType && (
        <Snackbar type="successDeleteUser" setShowSnackbar={setSnackbarType} />
      )}
      {response.error && snackbarType && (
        <Snackbar type="errorDeleteUser" setShowSnackbar={setSnackbarType} />
      )}
      <div className={styles.form}>
        <h3 className={styles.title}>Atualizar candidato:</h3>
        <div>
          <p className={styles.label}>Nome:</p>
          <select
            className={styles.select}
            style={{ width: "27.5rem" }}
            value={form.id}
            onChange={handleChange}
            name="id"
          >
            {data.map((item: any) => (
              <option key={item.id} value={item.id}>
                {item.name} - {item.public_defense}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p className={styles.label}>Defensoria pública:</p>
          <select
            className={styles.select}
            value={form.public_defense}
            onChange={handleChange}
            name="public_defense"
          >
            {public_defenses.map((item: string) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <Input
          className={styles.input}
          onChange={handleChange}
          name="test_index"
          label="Nota da prova"
          mask="99,99"
        />
        <Input
          className={styles.input}
          onChange={handleChange}
          name="interview_index"
          label="Nota da entrevista"
          mask="99,99"
        />
        <Input
          className={styles.input}
          onChange={handleChange}
          name="academic_index"
          label="Índice de Mérito Acadêmico Acumulado"
          mask="99,99"
        />
        <div>
          <p className={styles.label}>Status:</p>
          <select
            className={styles.select}
            value={form.hiring_status}
            onChange={handleChange}
            name="hiring_status"
          >
            {statusList.map((item: any) => (
              <option key={item.property} value={item.property}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.buttonContainer}>
        <Button
          className={styles.button}
          onClick={handleSubmit}
          disabled={
            !form.test_index && !form.interview_index && !form.hiring_status
          }
        >
          {loading || userResponse.loading ? (
            <div
              style={{
                position: "relative",
                top: "-3rem",
              }}
            >
              <Loading size="1.5rem" type="spin" />
            </div>
          ) : (
            "Salvar"
          )}
        </Button>
        <Button
          className={`${styles.button} ${styles.delete}`}
          onClick={() => setIsOpenModal(true)}
        >
          Excluir
        </Button>
      </div>
    </div>
  );
};

export default Update;
