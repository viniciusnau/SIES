import React, { useState } from "react";
import styles from "./Register.module.css";
import Input from "../../Components/Forms/Input";
import { useDispatch } from "react-redux";
import Button from "../../Components/Forms/Button";
import { fetchPostRegister } from "../../Services/Slices/postRegister";
import { public_defenses } from "../../Components/Consts";

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

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  return (
    <div className={styles.container}>
      <form
        action="https://automato.defensoria.sc.def.br/api/google-redirect/"
        method="get"
        className={styles.form}
      >
        <h3 className={styles.title}>Cadastrar candidato:</h3>
        <Input
          className={styles.input}
          onChange={handleChange}
          name="name"
          label="Nome"
        />
        <Input
          className={styles.input}
          onChange={handleChange}
          name="social_security_number"
          label="CPF"
          mask="999.999.999-99"
        />
        <Input
          className={styles.input}
          onChange={handleChange}
          name="birth_date"
          label="Data de nascimento"
          mask="99/99/9999"
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
          name="academic_index"
          label="Índice de Mérito Acadêmico Acumulado"
          max={3}
        />
        <div>
          <p className={styles.label}>Núcleo:</p>
          <select
            className={styles.select}
            value={form.public_defense}
            onChange={handleSelectChange}
            name="public_defense"
          >
            {public_defenses.map((item) => (
              <option key={item.property} value={item.property}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <Input
          className={styles.checkbox}
          onChange={handleChange}
          name="is_resident"
          label="Residente"
          type="checkbox"
        />
        <Input
          className={styles.checkbox}
          onChange={handleChange}
          name="is_pcd"
          label="PCD"
          type="checkbox"
        />
        {/* test below */}
      </form>
      <Button className={styles.button} onClick={handleSubmit}>
        Registrar
      </Button>
    </div>
  );
};

export default Register;
