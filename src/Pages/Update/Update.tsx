import styles from "./Update.module.css";
import Input from "../../Components/Forms/Input";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../Components/Forms/Button";
import { fetchPutUser } from "../../Services/Slices/putUser";
import { fetchUsersList } from "../../Services/Slices/getUsersList";

interface iForm {
  id: string;
  grade: string;
}

const Update = () => {
  const dispatch = useDispatch<any>();
  const [form, setForm] = useState<iForm>({
    id: "",
    grade: "",
  });
  const { data, error, loading } = useSelector(
    (state: any) => state.getUsersListSlice
  );

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    dispatch(fetchPutUser(form));
  };
  console.log("form: ", form);

  useEffect(() => {
    dispatch(fetchUsersList());
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h3 className={styles.title}>Atualizar candidato:</h3>
        <p style={{ fontSize: "1.25rem", margin: "0 0 .25rem 0" }}>Nome:</p>
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
          name="grade"
          label="Nota"
        />
      </div>
      <Button className={styles.button} onClick={handleSubmit}>
        Salvar
      </Button>
    </div>
  );
};

export default Update;
