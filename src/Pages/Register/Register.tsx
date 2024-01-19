import styles from "./Register.module.css";
import Input from "../../Components/Forms/Input";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "../../Components/Forms/Button";

interface iForm {
  name: string;
  core: string;
  birthDate: string;
  curso: string;
  pcd: boolean;
  imaa: string;
}

const Register = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState<iForm>({
    name: "",
    core: "",
    birthDate: "",
    curso: "",
    pcd: false,
    imaa: "",
  });

  const handleChange = (event: any) => {
    const { name, value } = event;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    // dispatch(fetchRegister(form));
  };

  return (
    <div className={styles.container}>
      <form
        action="https://automato.defensoria.sc.def.br/api/google-redirect/"
        method="get"
        className={styles.form}
      >
        <h3 className={styles.title}>Cadastrar estagiário:</h3>
        <Input
          className={styles.input}
          onChange={handleChange}
          name="name"
          label="Nome"
        />
        <Input
          className={styles.input}
          onChange={handleChange}
          name="core"
          label="Núcleo"
        />
        <Input
          className={styles.input}
          onChange={handleChange}
          name="birthDate"
          label="Data de nascimento"
        />
        <Input
          className={styles.input}
          onChange={handleChange}
          name="curso"
          label="Curso"
        />
        <Input
          className={styles.input}
          onChange={handleChange}
          name="imaa"
          label="Índice de Mérito Acadêmico Acumulado"
        />
        <Input
          className={styles.checkbox}
          onChange={handleChange}
          name="pcd"
          label="PCD"
          type="checkbox"
          style={{ boxShadow: "none" }}
        />
      </form>
      <Button className={styles.button}>Registrar</Button>
    </div>
  );
};

export default Register;
