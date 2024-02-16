import React from "react";
import { useDispatch } from "react-redux";
import Button from "../Forms/Button";
import styles from "./Modal.module.css";
import { modalText } from "../Consts";

interface IModal {
  content: keyof typeof modalText;
  confirm: any;
  setConfirm: any;
  setOpenModal: any;
}

const Modal: React.FC<IModal> = ({
  content,
  confirm,
  setConfirm,
  setOpenModal,
}) => {
  const dispatch = useDispatch<any>();

  const handleCancel = () => {
    setOpenModal(false);
  };

  const handleConfirm = () => {
    dispatch(confirm);
    setOpenModal(false);
    setConfirm(true);
  };

  const modalContent = modalText[content];

  return (
    <div className={styles.container}>
      <h2>{modalContent.title}</h2>
      <div className={styles.buttonContainer}>
        <p>{modalContent.description}</p>
        <Button className={styles.button} onClick={handleCancel}>
          Cancelar
        </Button>
        <Button className={styles.button} onClick={handleConfirm}>
          {modalContent.button}
        </Button>
      </div>
    </div>
  );
};

export default Modal;
