import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Candidates.module.css";
import {
  candidatesColumns,
  categories,
  hiring_status,
  ptToEnStatus,
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
import { exhibitionDateFormat } from "../../Components/Helper";
import Snackbar from "../../Components/Snackbar/Snackbar";

interface iForm {
  name: string;
  public_defense: iPublic_defense[] | string | any;
  birth_date: string;
  category: string;
  is_pcd: boolean;
  is_resident: boolean;
  social_security_number: string;
  academic_index: string;
  interview_index: string;
  test_index: string;
  hiring_status: string;
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
    social_security_number: "",
    academic_index: "",
    interview_index: "",
    test_index: "",
    hiring_status: "",
  });
  let candidate, indexPublicDefense;
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
    const {
      birth_date,
      test_index,
      academic_index,
      interview_index,
      ...otherFormValues
    } = form;

    if (birth_date.trim()) {
      const [day, month, year] = birth_date.split("/");
      const formattedDate = `${year ? year + "-" : ""}${
        month ? month?.padStart(2, "0") + "-" : ""
      }${day ? day?.padStart(2, "0") : ""}`;
      return {
        ...otherFormValues,
        birth_date: formattedDate,
        academic_index: academic_index
          ? String(academic_index).replace(/,/g, ".").replace("_", "")
          : "",
        test_index:
          test_index !== "undefined" && test_index !== "null" && test_index
            ? String(test_index).replace(/,/g, ".").replace("_", "")
            : null,
        interview_index:
          interview_index !== "undefined" &&
          interview_index !== "null" &&
          interview_index
            ? String(interview_index).replace(/,/g, ".").replace("_", "")
            : "",
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
    const formatted = {
      ...formattedForm,
      interview_index: null,
      hiring_status: "pending",
    };
    console.log("formatted: ", formatted);
    if (formatted) {
      dispatch(fetchPostRegister(formatted));
      setSnackbarType(true);
    }
    setIsOpenCreateModal(false);
  };

  const handleEditSubmit = () => {
    const formattedForm = handleFormat();

    if (formattedForm) {
      const formatted = {
        ...formattedForm,
        hiring_status:
          ptToEnStatus[
            formattedForm.hiring_status as keyof typeof ptToEnStatus
          ],
      };
      dispatch(fetchUpdateRegister(currentId, formatted));
      setSnackbarType(true);
      setIsOpenEditModal(false);
    } else {
      console.error("formattedForm is null");
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = event.target;
    const newValue = type === "checkbox" ? checked : value;

    if (checked && name === "is_resident") {
      setIsResidentChecked(true);
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
    const selectedDefense = data[currentData]?.public_defense.find(
      (defense: iPublic_defense) =>
        defense?.public_defense === form?.public_defense
    );
    dispatch(fetchDeleteUser(selectedDefense.id));
    setIsOpenEditModal(false);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;

    const selectedDefense = data[currentData]?.public_defense.find(
      (defense: iPublic_defense) => defense.public_defense === value
    );

    if (selectedDefense) {
      setCurrentId(selectedDefense?.id);
    }
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
      candidate = data[currentData];
      indexPublicDefense =
        currentPublicDefense[candidate.name.replace(" ", "")] || 0;
      setForm({
        name: candidate.name || "",
        public_defense:
          candidate?.public_defense[indexPublicDefense]?.public_defense ||
          public_defenses[0],
        birth_date: exhibitionDateFormat(candidate.birth_date) || "",
        category: candidate.category || categories[0],
        is_pcd: candidate.is_pcd || false,
        is_resident: candidate.is_resident || false,
        social_security_number: candidate.social_security_number || "",
        hiring_status:
          candidate?.public_defense[indexPublicDefense]?.hiring_status ||
          hiring_status[0],
        academic_index:
          candidate.academic_index &&
          String(candidate.academic_index).length >= 3
            ? "0" + String(candidate.academic_index)
            : String(candidate.academic_index) || "",
        interview_index:
          candidate?.public_defense[indexPublicDefense]?.interview_index &&
          String(candidate?.public_defense[indexPublicDefense]?.interview_index)
            .length >= 3
            ? "0" +
              String(
                candidate?.public_defense[indexPublicDefense]?.interview_index
              )
            : String(
                candidate?.public_defense[indexPublicDefense]?.interview_index
              ) || "",
        test_index:
          candidate?.public_defense[indexPublicDefense]?.test_index &&
          String(candidate?.public_defense[indexPublicDefense]?.test_index)
            .length >= 3
            ? "0" +
              String(candidate?.public_defense[indexPublicDefense]?.test_index)
            : String(
                candidate?.public_defense[indexPublicDefense]?.test_index
              ) || "",
      });
      setIsResidentChecked(candidate.is_resident || false);
    }
  }, [currentData, data]);

  useEffect(() => {
    let id = "";
    const matchingDefense = data[currentData]?.public_defense.filter(
      (defense: iPublic_defense) => {
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

  useEffect(() => {
    if (form?.public_defense) {
      const selectedDefense = data[currentData]?.public_defense.find(
        (defense: iPublic_defense) =>
          defense?.public_defense === form?.public_defense
      );

      if (selectedDefense) {
        setCurrentId(selectedDefense?.id);
      }
    }
  }, [isOpenEditModal]);

  return (
    <div className={styles.container}>
      {error && snackbarType && (
        <Snackbar type="errorGetCandidates" setShowSnackbar={setSnackbarType} />
      )}
      {responseEditCandidate.error && snackbarType && (
        <Snackbar type="errorEditCandidate" setShowSnackbar={setSnackbarType} />
      )}
      {responsePostCandidate.error && snackbarType && (
        <Snackbar type="errorPostCandidate" setShowSnackbar={setSnackbarType} />
      )}
      {responseDeleteCandidate.error && snackbarType && (
        <Snackbar
          type="errorDeleteCandidate"
          setShowSnackbar={setSnackbarType}
        />
      )}
      {responseDeleteCandidate.data === "sucesso" && snackbarType && (
        <Snackbar
          type="successDeleteCandidate"
          setShowSnackbar={setSnackbarType}
        />
      )}
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
                label="Nota da prova"
                name="test_index"
                onChange={handleChange}
                mask="99,99"
                value={String(form.test_index)}
              />
              <div>
                <p className={styles.label}>Status:</p>
                <select
                  className={styles.select}
                  value={form.hiring_status}
                  onChange={handleSelectChange}
                  name="hiring_status"
                >
                  {hiring_status.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
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
