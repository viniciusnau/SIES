import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Candidates.module.css";
import {
  candidatesColumns,
  categories,
  public_defenses,
} from "../../Components/Consts";
import { AccordionTable } from "../../Components/AccordionTable/AccordionTable";
import { MdAddCircleOutline } from "react-icons/md";
import { fetchCandidates } from "../../Services/Slices/getCandidates";
import Input from "../../Components/Forms/Input";
import { fetchPostRegister } from "../../Services/Slices/postRegister";
import { ChildrenModal } from "../../Components/ChildrenModal/ChildrenModal";
import { fetchDeleteUser } from "../../Services/Slices/deleteUser";
import { fetchUpdateRegister } from "../../Services/Slices/updateCandidate";
import Button from "../../Components/Forms/Button";

interface iForm {
  name: string;
  public_defense: iPublic_defense[] | string | any;
  birth_date: string;
  category: string;
  is_pcd: boolean;
  is_resident: boolean;
  is_graduated: boolean;
  social_security_number: string;
  academic_index: string;
  interview_index: string;
  test_index: string;
}

interface iPublic_defense {
  average: number;
  category: string;
  created_at: string;
  hiring_status: string;
  id: number;
  interview_index: number | null;
  public_defense: string;
  registration: string;
  test_index: number | null;
  updated_at: string;
}

interface iSearchCandidates {
  name: string;
}

interface iCurrentPublicDefense {
  [name: string]: number;
}

const Candidates = () => {
  const dispatch = useDispatch<any>();
  const [snackbarType, setSnackbarType] = useState<boolean>(false);
  const [isResidentChecked, setIsResidentChecked] = useState<boolean>(false);
  const [isGraduatedChecked, setIsGraduatedChecked] = useState<boolean>(false);
  const [isOpenCreateModal, setIsOpenCreateModal] = useState<boolean>(false);
  const [currentData, setCurrentData] = useState<number>(0);
  const [currentId, setCurrentId] = useState<number | string>(0);
  const [currentPublicDefense, setCurrentPublicDefense] =
    useState<iCurrentPublicDefense>({});
  const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false);
  const [searchCandidates, setSearchCandidates] = useState<iSearchCandidates>({
    name: "",
  });
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
    interview_index: "",
    test_index: "",
  });
  const { data, loading, error } = useSelector(
    (state: any) => state.getCandidates
  );
  const responseEditCandidate = useSelector(
    (state: any) => state.updateCandidate
  );
  const responsePostCandidate = useSelector(
    (state: any) => state.postRegisterSlice
  );
  const responseDeleteCandidate = useSelector(
    (state: any) => state.deleteUserSlice
  );

  const handleFormat = () => {
    const { birth_date, ...otherFormValues } = form;

    if (birth_date.trim()) {
      const [day, month, year] = birth_date.split("/");
      const formattedDate = `${year ? year + "-" : ""}${
        month ? month?.padStart(2, "0") + "-" : ""
      }${day ? day?.padStart(2, "0") : ""}`;
      console.log("form: ", form);
      return {
        ...otherFormValues,
        birth_date: formattedDate,
        academic_index: String(form.academic_index)
          .replace(/,/g, ".")
          .replace("_", ""),
        test_index: String(form.test_index).replace(/,/g, ".").replace("_", ""),
        interview_index: String(form.interview_index)
          .replace(/,/g, ".")
          .replace("_", ""),
      };
    }

    return null;
  };

  const handleSearchCandidates = () => {
    dispatch(fetchCandidates(searchCandidates));
    setSnackbarType(true);
  };

  const handleCreateSubmit = () => {
    const formattedForm = handleFormat();
    if (formattedForm) {
      dispatch(fetchPostRegister(formattedForm));
      setSnackbarType(true);
    }
    setIsOpenCreateModal(false);
  };

  const handleEditSubmit = () => {
    const formattedForm = handleFormat();
    dispatch(
      fetchUpdateRegister(
        data[currentData].public_defense[currentId].id,
        formattedForm
      )
    );
    setSnackbarType(true);
    setIsOpenEditModal(false);
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

  const handleChangeCandidates = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setSearchCandidates((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDelete = () => {
    dispatch(fetchDeleteUser(data[currentData].public_defense[currentId].id));
    setIsOpenEditModal(false);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setCurrentPublicDefense((prev: any) => ({
      ...prev,
      [form.name?.replace(/ /g, "")]: value,
    }));
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    dispatch(fetchCandidates(searchCandidates));
  }, [
    responseEditCandidate?.data,
    responsePostCandidate?.data,
    responseDeleteCandidate?.data,
  ]);

  useEffect(() => {
    dispatch(fetchCandidates(searchCandidates));
  }, []);

  useEffect(() => {
    if (data && data[currentData]) {
      const candidate = data[currentData];
      setForm({
        name: candidate.name || "",
        public_defense: candidate.public_defense.name || public_defenses[0],
        birth_date: candidate.birth_date || "",
        category: candidate.category || categories[0],
        is_pcd: candidate.is_pcd || false,
        is_resident: candidate.is_resident || false,
        is_graduated: candidate.is_graduated || false,
        social_security_number: candidate.social_security_number || "",
        academic_index: candidate.academic_index || "",
        interview_index:
          candidate.public_defense[currentId].interview_index || "",
        test_index: candidate.public_defense[currentId].test_index || "",
      });
      setIsResidentChecked(candidate.is_resident || false);
      setIsGraduatedChecked(candidate.is_graduated || false);
    }
  }, [currentData, data]);
  useEffect(() => {
    let id = "";
    const matchingDefense = data[currentData]?.public_defense.filter(
      (defense: iPublic_defense, index: any) => {
        id =
          defense.public_defense === form?.public_defense
            ? defense.public_defense
            : id;
      }
    );
    if (matchingDefense?.length > 0) {
      setCurrentId(id);
    }
  }, [form.public_defense, data, currentData, setCurrentId]);

  return (
    <div className={styles.container}>
      {isOpenCreateModal && (
        <ChildrenModal
          loading={false}
          disabled={undefined}
          handleSubmit={handleCreateSubmit}
          title="Cadastrar candidato"
          confirmLabel="Salvar"
          setOpenModal={setIsOpenCreateModal}
          children={
            <>
              <Input label="Nome" name="name" onChange={handleChange} />
              <Input
                label="CPF"
                name="social_security_number"
                onChange={handleChange}
                mask="999.999.999-99"
              />
              <Input
                label="Data de nascimento"
                name="birth_date"
                onChange={handleChange}
                mask="99/99/9999"
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
                label="IMAA"
                name="academic_index"
                onChange={handleChange}
                mask="99,99"
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
            </>
          }
        />
      )}
      {isOpenEditModal && (
        <ChildrenModal
          loading={false}
          disabled={undefined}
          handleSubmit={handleEditSubmit}
          title="Editar candidato"
          confirmLabel="Salvar"
          setOpenModal={setIsOpenEditModal}
          isDeleteButton={true}
          handleDelete={handleDelete}
          children={
            <>
              <Input
                label="Nome"
                name="name"
                onChange={handleChange}
                value={form.name}
              />
              <Input
                label="CPF"
                name="social_security_number"
                onChange={handleChange}
                mask="999.999.999-99"
                value={form.social_security_number}
              />
              <Input
                label="Data de nascimento"
                name="birth_date"
                onChange={handleChange}
                mask="99/99/9999"
                value={form.birth_date}
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
                label="IMAA"
                name="academic_index"
                onChange={handleChange}
                mask="99,99"
                value={String(form.academic_index)}
              />
              <Input
                label="Nota da entrevista"
                name="interview_index"
                onChange={handleChange}
                mask="99,99"
                value={String(form.interview_index)}
              />
              <Input
                label="Nota da data"
                name="test_index"
                onChange={handleChange}
                mask="99,99"
                value={String(form.test_index)}
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
                value={form.is_resident}
              />
              <Input
                className={styles.checkbox}
                onChange={handleChange}
                checked={isGraduatedChecked}
                name="is_graduated"
                label="Graduação"
                type="checkbox"
                value={form.is_graduated}
              />
              <Input
                className={styles.checkbox}
                onChange={handleChange}
                name="is_pcd"
                label="PCD"
                type="checkbox"
                value={form.is_pcd}
              />
            </>
          }
        />
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <Input
          label="Nome"
          name="name"
          onChange={handleChangeCandidates}
          style={{ margin: "0 .5rem" }}
        />
        <Button
          style={{ height: "2rem", margin: "0 .5rem" }}
          onClick={handleSearchCandidates}
        >
          Pesquisar
        </Button>
        <MdAddCircleOutline
          size={28}
          onClick={() => setIsOpenCreateModal(true)}
          style={{ margin: "0 .5rem", cursor: "pointer" }}
        />
      </div>
      <div className={styles.tableWrapper}>
        <AccordionTable
          title="Lista de candidatos"
          columns={candidatesColumns}
          data={data}
          loading={loading}
          error={error}
          setOpenEditModal={setIsOpenEditModal}
          setCurrentData={setCurrentData}
          setCurrentPublicDefense={setCurrentPublicDefense}
          currentPublicDefense={currentPublicDefense}
        />
      </div>
    </div>
  );
};

export default Candidates;
