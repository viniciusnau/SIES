import styles from "./Update.module.css";
import Input from "../../Components/Forms/Input";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "../../Components/Forms/Button";
import { fetchPutUpdate } from "../../Services/Slices/putUpdate";

interface iForm {
  name: string;
  core: string;
  birthDate: string;
  curso: string;
  pcd: boolean;
  imaa: string;
}

const Update = () => {
  const dispatch = useDispatch<any>();
  const [form, setForm] = useState<iForm>({
    name: "",
    core: "",
    birthDate: "",
    curso: "",
    pcd: false,
    imaa: "",
  });
  const id = "aaaaaaa";
  // falta finalizar integração, precisa do dropdown that show the users and bring the id to the service

  const handleChange = (event: any) => {
    const { name, value } = event;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    dispatch(fetchPutUpdate(form, id));
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h3 className={styles.title}>Cadastrar estagiário:</h3>
        <Input
          className={styles.input}
          onChange={handleChange}
          name="cpf"
          label="CPF"
        />
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
