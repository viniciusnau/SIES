import styles from "./Update.module.css";
import Input from "../../Components/Forms/Input";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../Components/Forms/Button";
import { fetchPutUser } from "../../Services/Slices/putUser";
import { fetchUsersList } from "../../Services/Slices/getUsersList";
import Loading from "../../Components/Loading/Loading";
import Snackbar from "../../Components/Snackbar/Snackbar";

interface iForm {
  id: string;
  test_index: string;
  interview_index: string;
}

const Update = () => {
  const dispatch = useDispatch<any>();
  const [snackbarType, setSnackbarType] = useState<boolean>(false);
  const [form, setForm] = useState<iForm>({
    id: "",
    test_index: "",
    interview_index: "",
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
      ...form,
      test_index: form.test_index.replace(/,/g, ".").replace("_", ""),
      interview_index: form.interview_index.replace(/,/g, ".").replace("_", ""),
    };

    dispatch(fetchPutUser(processedForm));
    setSnackbarType(true);
  };

  useEffect(() => {
    dispatch(fetchUsersList());
    setSnackbarType(false);
  }, []);

  return (
    <div className={styles.container}>
      {userResponse.data && snackbarType && (
        <Snackbar type="successUpdate" setShowSnackbar={setSnackbarType} />
      )}
      {userResponse.error && snackbarType && (
        <Snackbar type="errorUpdate" setShowSnackbar={setSnackbarType} />
      )}
      <div className={styles.form}>
        <h3 className={styles.title}>Atualizar candidato:</h3>
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
        <Input
          className={styles.input}
          onChange={handleChange}
          name="test_index"
          label="Nota da prova"
          mask="9,99"
        />
        <Input
          className={styles.input}
          onChange={handleChange}
          name="interview_index"
          label="Nota da entrevista"
          mask="9,99"
        />
      </div>
      <Button className={styles.button} onClick={handleSubmit}>
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
          "Entrar"
        )}
      </Button>
    </div>
  );
};

export default Update;
