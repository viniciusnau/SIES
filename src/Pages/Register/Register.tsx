import React, { useState } from "react";
import styles from "./Register.module.css";
import Input from "../../Components/Forms/Input";
import { useDispatch } from "react-redux";
import Button from "../../Components/Forms/Button";
import { fetchPostRegister } from "../../Services/Slices/postRegister";

interface iForm {
  name: string;
  public_defense: string;
  birth_date: string;
  category: string;
  is_pcd: boolean;
  is_resident: boolean;
  social_security_number: string;
  academic_index: number;
}

const Register = () => {
  const dispatch = useDispatch<any>();
  const [form, setForm] = useState<iForm>({
    name: "",
    public_defense: "",
    birth_date: "",
    category: "",
    is_pcd: false,
    is_resident: false,
    social_security_number: "",
    academic_index: 0,
  });
  let formatted: iForm;

  const handleFormat = () => {
    const { birth_date, ...otherFormValues } = form;

    if (birth_date.trim()) {
      const [day, month, year] = birth_date.split("/");
      const formattedDate = `${year}-${month?.padStart(2, "0")}-${day?.padStart(
        2,
        "0"
      )}`;

      formatted = {
        ...otherFormValues,
        birth_date: formattedDate,
      };
    }
  };

  const handleSubmit = () => {
    handleFormat();
    dispatch(fetchPostRegister(formatted));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = event.target;
    const newValue = type === "checkbox" ? checked : value;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: newValue,
    }));
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
          name="public_defense"
          label="Núcleo"
        />
        <Input
          className={styles.input}
          onChange={handleChange}
          name="birth_date"
          label="Data de nascimento"
        />
        <Input
          className={styles.input}
          onChange={handleChange}
          name="category"
          label="Curso"
        />
        <Input
          className={styles.input}
          onChange={handleChange}
          name="social_security_number"
          label="CPF"
        />
        <Input
          className={styles.input}
          onChange={handleChange}
          name="academic_index"
          label="Índice de Mérito Acadêmico Acumulado"
        />
        <Input
          className={styles.checkbox}
          onChange={handleChange}
          name="is_resident"
          label="Residente"
          type="checkbox"
          style={{ boxShadow: "none" }}
        />
        <Input
          className={styles.checkbox}
          onChange={handleChange}
          name="is_pcd"
          label="PCD"
          type="checkbox"
        />
      </form>
      <Button className={styles.button} onClick={handleSubmit}>
        Registrar
      </Button>
    </div>
  );
};

export default Register;
