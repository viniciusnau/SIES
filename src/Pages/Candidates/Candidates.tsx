import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Candidates.module.css";
import {
  EnToPtStatus,
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
  registration: string;
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
  const [isOpenCreateModal, setIsOpenCreateModal] = useState<boolean>(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false);
  const [isGraduation, setIsGraduation] = useState<boolean>(false);
  const [currentData, setCurrentData] = useState<number>(0); //candidateId
  const [currentId, setCurrentId] = useState<number | string>(0); //
  const [currentPublicDefense, setCurrentPublicDefense] =
    useState<iCurrentPublicDefense>({}); //candidatePublicDefenseId
  const [searchCandidates, setSearchCandidates] = useState<iSearchCandidates>({
    name: "",
  }); //searchForm
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
    registration: "",
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

    if (name === "isGraduation") {
      setIsGraduation(!isGraduation);

      if (checked) {
        setForm((prev: iForm) => ({
          ...prev,
          is_resident: false,
        }));
      }
    } else if (name === "is_resident") {
      setForm((prev: iForm) => ({
        ...prev,
        is_resident: !form.is_resident,
      }));

      if (checked) {
        setIsGraduation(false);
      }
    } else {
      setForm((prev: iForm) => ({
        ...prev,
        [name]: newValue,
      }));
    }
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
    setSnackbarType(true);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;

    const selectedDefense = data[currentData]?.public_defense.find(
      (defense: iPublic_defense) => defense.public_defense === value
    );

    if (selectedDefense) {
      setCurrentId(selectedDefense?.id);
    }
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
    if (data && data[currentData]) {
      candidate = data[currentData];
      indexPublicDefense = currentPublicDefense[
        candidate.name.replace(/ /g, "")
      ]
        ? currentPublicDefense[candidate.name.replace(/ /g, "")]
        : 0;
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
          EnToPtStatus[
            candidate?.public_defense[indexPublicDefense]
              ?.hiring_status as keyof typeof EnToPtStatus
          ] || hiring_status[0],
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
        registration:
          candidate?.public_defense[indexPublicDefense]?.registration,
      });
    }
  }, [currentData, data, currentPublicDefense]);

  useEffect(() => {
    if (form?.public_defense) {
      const selectedDefense = data[currentData]?.public_defense.find(
        (defense: iPublic_defense) =>
          defense?.registration === form?.registration
      );

      if (selectedDefense) {
        setCurrentId(selectedDefense?.id);
      }
    }
  }, [isOpenEditModal, currentData]); // is this one

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
          openModal={isOpenCreateModal}
          children={
            <>
              <Input
                label="Nome"
                name="name"
                onChange={handleChange}
                className={styles.input}
              />
              <Input
                label="CPF"
                name="social_security_number"
                onChange={handleChange}
                mask="00.00.00-00"
                className={styles.input}
              />
              <Input
                label="Data de nascimento"
                name="birth_date"
                onChange={handleChange}
                mask="00/00/0000"
                className={styles.input}
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
                mask="00,00"
                className={styles.input}
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
                name="isGraduation"
                label="Graduação"
                type="checkbox"
                checked={isGraduation}
              />
              <Input
                className={styles.checkbox}
                onChange={handleChange}
                name="is_resident"
                label="Residente"
                type="checkbox"
                checked={form.is_resident}
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
          openModal={isOpenEditModal}
          isDeleteButton={true}
          handleDelete={handleDelete}
          children={
            <>
              <Input
                label="Nome"
                name="name"
                onChange={handleChange}
                value={form.name}
                className={styles.input}
              />
              <Input
                label="CPF"
                name="social_security_number"
                onChange={handleChange}
                mask="000.000.000-00"
                value={form.social_security_number}
                className={styles.input}
              />
              <Input
                label="Birth Date"
                name="birth_date"
                value={form.birth_date}
                onChange={handleChange}
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
                label="IMAA"
                name="academic_index"
                onChange={handleChange}
                mask="00,00"
                value={String(form.academic_index)}
                className={styles.input}
              />
              <Input
                label="Nota da entrevista"
                name="interview_index"
                onChange={handleChange}
                mask="00,00"
                value={String(form.interview_index)}
                className={styles.input}
              />
              <Input
                label="Nota da prova"
                name="test_index"
                onChange={handleChange}
                mask="00,00"
                value={String(form.test_index)}
                className={styles.input}
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
                checked={form.is_resident}
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
          style={{ width: "15rem" }}
          className={styles.input}
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
          currentData={currentData}
          setCurrentPublicDefense={setCurrentPublicDefense}
          currentPublicDefense={currentPublicDefense}
          setCurrentId={setCurrentId}
        />
      </div>
    </div>
  );
};

export default Candidates;
