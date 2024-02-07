import styles from "./Update.module.css";
import Input from "../../Components/Forms/Input";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../Components/Forms/Button";
import { fetchPutUser } from "../../Services/Slices/putUser";
import { fetchUsersList } from "../../Services/Slices/getUsersList";
import Loading from "../../Components/Loading/Loading";
import Snackbar from "../../Components/Snackbar/Snackbar";
import { statusList } from "../../Components/Consts";

interface iForm {
  id: string;
  test_index: string;
  interview_index: string;
  academic_index: string;
  hiring_status: string;
}

const Update = () => {
  const dispatch = useDispatch<any>();
  const [snackbarType, setSnackbarType] = useState<boolean>(false);
  const [form, setForm] = useState<iForm>({
    id: "",
    test_index: "",
    interview_index: "",
    academic_index: "",
    hiring_status: statusList[0],
  });
  const { data, error, loading } = useSelector(
    (state: any) => state.getUsersListSlice
  );

  const userResponse = useSelector((state: any) => state.putUserSlice);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    if (name === "id") {
      setForm({ ...form, [name]: value.id });
    }
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    const processedForm = {
      id: form.id,
      ...(form.test_index !== "" && {
        test_index: form.test_index.replace(/,/g, ".").replace("_", ""),
      }),
      ...(form.interview_index !== "" && {
        interview_index: form.interview_index
          .replace(/,/g, ".")
          .replace("_", ""),
      }),
    };

    dispatch(fetchPutUser(processedForm));
    setSnackbarType(true);
  };

  useEffect(() => {
    dispatch(fetchUsersList());
    setSnackbarType(false);
  }, []);

  useEffect(() => {
    setForm({ ...form, id: data[0]?.id });
  }, [data]);

  return (
    <div className={styles.container}>
      {userResponse.data.length > 0 && snackbarType && (
        <Snackbar type="successUpdate" setShowSnackbar={setSnackbarType} />
      )}
      {userResponse.error && snackbarType && (
        <Snackbar type="errorUpdate" setShowSnackbar={setSnackbarType} />
      )}
      <div className={styles.form}>
        <h3 className={styles.title}>Atualizar candidato:</h3>
        <div>
          <p className={styles.label}>Nome:</p>
          <select
            className={styles.select}
            value={form.id}
            onChange={handleChange}
            name="id"
          >
            {data.map((item: any) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <Input
          className={styles.input}
          onChange={handleChange}
          name="test_index"
          label="Nota da prova"
          mask="99,9"
        />
        <Input
          className={styles.input}
          onChange={handleChange}
          name="interview_index"
          label="Nota da entrevista"
          mask="99,9"
        />
        <Input
          className={styles.input}
          onChange={handleChange}
          name="academic_index"
          label="Índice de Mérito Acadêmico Acumulado"
          mask="99,9"
        />
        <div>
          <p className={styles.label}>Status:</p>
          <select
            className={styles.select}
            value={form.id}
            onChange={handleChange}
            name="hiring_status"
          >
            {statusList.map((item: any) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>
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
    </div>
  );
};

export default Update;
