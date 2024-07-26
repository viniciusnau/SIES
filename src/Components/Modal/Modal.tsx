import React from "react";
import { useDispatch } from "react-redux";
import Button from "../Forms/Button";
import styles from "./Modal.module.css";
import { modalText } from "../Consts";

interface IModal {
  content: keyof typeof modalText;
  confirm: any;
  openModal: any;
  setOpenModal: any;
  setShowSnackbar: any;
}

const Modal: React.FC<IModal> = ({
  content,
  confirm,
  openModal,
  setOpenModal,
  setShowSnackbar,
}) => {
  if (openModal) {
    document.body.classList.add("activeModal");
  } else {
    document.body.classList.remove("activeModal");
  }

  const dispatch = useDispatch<any>();

  const handleCancel = () => {
    setOpenModal(false);
  };

  const handleConfirm = () => {
    dispatch(confirm);
    setOpenModal(false);
    setShowSnackbar(true);
  };

  const modalContent = modalText[content];

  return (
    <>
      <div className={styles.overlay} onClick={() => setOpenModal(false)}></div>
      <div className={styles.container}>
        <h2>{modalContent.title}</h2>
        <p>{modalContent.description}</p>
        <div className={styles.buttonContainer}>
          <Button className={styles.button} onClick={handleCancel}>
            Cancelar
          </Button>
          <Button className={styles.button} onClick={handleConfirm}>
            {modalContent.button}
          </Button>
        </div>
      </div>
    </>
  );
};

export default Modal;
