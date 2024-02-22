import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Candidates.module.css";
import { candidatesColumns } from "../../Components/Consts";
import { AccordionTable } from "../../Components/AccordionTable/AccordionTable";
import { MdAddCircleOutline } from "react-icons/md";
import { fetchCandidates } from "../../Services/Slices/getCandidates";

const Candidates = () => {
  const dispatch = useDispatch<any>();
  const { data, loading, error } = useSelector(
    (state: any) => state.getCandidates
  );

  useEffect(() => {
    dispatch(fetchCandidates({ name: "" }));
  }, []);

  return (
    <div className={styles.container}>
      {/* <div className={styles.dashboard}>
        <MdAddCircleOutline size={24} />
      </div> */}
      <AccordionTable
        title="Lista de candidatos"
        columns={candidatesColumns}
        data={data}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default Candidates;
