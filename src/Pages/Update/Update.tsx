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

  const responseUser = useSelector((state: any) => state.putUserSlice);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    if (name === "id") {
      setForm({ ...form, [name]: value.id });
    }
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    dispatch(fetchPutUser(form));
  };

  useEffect(() => {
    dispatch(fetchUsersList());
  }, []);

  return (
    <div className={styles.container}>
      {data && snackbarType && (
        <Snackbar type="successUpdate" setShowSnackbar={setSnackbarType} />
      )}
      {error && snackbarType && (
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
        />
        <Input
          className={styles.input}
          onChange={handleChange}
          name="interview_index"
          label="Nota da entrevista"
        />
      </div>
      <Button className={styles.button} onClick={handleSubmit}>
        {responseUser.loading ? <Loading size="24" type="circle" /> : "Salvar"}
      </Button>
    </div>
  );
};

export default Update;
