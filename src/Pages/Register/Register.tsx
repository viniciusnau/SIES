import React, { useEffect, useState } from "react";
import styles from "./Register.module.css";
import Input from "../../Components/Forms/Input";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../Components/Forms/Button";
import { fetchPostRegister } from "../../Services/Slices/postRegister";
import { categories, public_defenses } from "../../Components/Consts";
import Snackbar from "../../Components/Snackbar/Snackbar";
import Loading from "../../Components/Loading/Loading";

interface iForm {
  name: string;
  public_defense: string;
  birth_date: string;
  category: string;
  is_pcd: boolean;
  is_resident: boolean;
  is_graduated: boolean;
  social_security_number: string;
  academic_index: string;
}

const Register = () => {
  const dispatch = useDispatch<any>();
  const [snackbarType, setSnackbarType] = useState<boolean>(false);
  const [isResidentChecked, setIsResidentChecked] = useState<boolean>(false);
  const [isGraduatedChecked, setIsGraduatedChecked] = useState<boolean>(false);
  const [form, setForm] = useState<iForm>({
    name: "",
    public_defense: public_defenses[0],
    birth_date: "",
    category: categories[0],
    is_pcd: false,
    is_resident: false,
    is_graduated: false,
    social_security_number: "",
    academic_index: "",
  });
  const { data, loading, error } = useSelector(
    (state: any) => state.postRegisterSlice
  );

  const handleFormat = () => {
    const { birth_date, ...otherFormValues } = form;

    if (birth_date.trim()) {
      const [day, month, year] = birth_date.split("/");
      const formattedDate = `${year}-${month?.padStart(2, "0")}-${day?.padStart(
        2,
        "0"
      )}`;

      return {
        ...otherFormValues,
        birth_date: formattedDate,
        academic_index: form.academic_index.replace(/,/g, ".").replace("_", ""),
      };
    }

    return null;
  };

  const handleSubmit = () => {
    const formattedForm = handleFormat();
    if (formattedForm) {
      dispatch(fetchPostRegister(formattedForm));
      setSnackbarType(true);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = event.target;
    const newValue = type === "checkbox" ? checked : value;

    if (checked && name === "is_resident") {
      setIsResidentChecked(true);
      setIsGraduatedChecked(false);
    }
    if (checked && name === "is_graduated") {
      setIsGraduatedChecked(true);
      setIsResidentChecked(false);
    }
    setForm((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    setSnackbarType(false);
  }, []);

  useEffect(() => {
    if (isResidentChecked) {
      setForm((prev) => ({
        ...prev,
        is_resident: true,
        is_graduated: false,
      }));
    }
    if (isGraduatedChecked) {
      setForm((prev) => ({
        ...prev,
        is_resident: false,
        is_graduated: true,
      }));
    }
  }, [isGraduatedChecked || isResidentChecked]);
  console.log("form: ", form);
  return (
    <div className={styles.container}>
      {data && snackbarType && (
        <Snackbar type="successRegister" setShowSnackbar={setSnackbarType} />
      )}
      {error && snackbarType && (
        <Snackbar type="errorRegister" setShowSnackbar={setSnackbarType} />
      )}
      <form
        action="https://sies.defensoria.sc.def.br/api/google-redirect/"
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
          mask="000.000.000-00"
        />
        <Input
          className={styles.input}
          onChange={handleChange}
          name="birth_date"
          label="Data de nascimento"
          mask="00/00/0000"
        />
        <div>
          <p className={styles.label}>Curso:</p>
          <select
            className={styles.select}
            value={form.category}
            onChange={handleSelectChange}
            name="category"
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <Input
          className={styles.input}
          onChange={handleChange}
          name="academic_index"
          label="Índice de Mérito Acadêmico Acumulado"
          mask="00,00"
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
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <Input
          className={styles.checkbox}
          onChange={handleChange}
          checked={isResidentChecked}
          name="is_resident"
          label="Residente"
          type="checkbox"
        />
        <Input
          className={styles.checkbox}
          onChange={handleChange}
          checked={isGraduatedChecked}
          name="is_graduated"
          label="Graduação"
          type="checkbox"
        />
        <Input
          className={styles.checkbox}
          onChange={handleChange}
          name="is_pcd"
          label="PCD"
          type="checkbox"
        />
      </form>
      <Button
        className={styles.button}
        onClick={handleSubmit}
        disabled={
          !form.name ||
          !form.social_security_number ||
          !form.birth_date ||
          !form.academic_index
        }
      >
        {loading ? (
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

export default Register;
