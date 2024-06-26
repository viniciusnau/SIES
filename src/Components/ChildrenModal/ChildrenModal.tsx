import { ReactNode } from "react";
import Button from "../Forms/Button";
import Loading from "../Loading/Loading";
import styles from "./ChildrenModal.module.css";

interface iChildrenModal {
  children: ReactNode | any;
  loading: boolean;
  disabled?: any;
  handleSubmit: () => void;
  handleDelete?: () => void;
  title: string;
  confirmLabel: string;
  setOpenModal: (value: boolean) => void;
  openModal: boolean;
  isDeleteButton?: boolean;
}

export const ChildrenModal: React.FC<iChildrenModal> = ({
  children,
  loading,
  disabled,
  handleSubmit,
  handleDelete,
  title,
  confirmLabel,
  setOpenModal,
  openModal,
  isDeleteButton,
}) => {
  if (openModal) {
    document.body.classList.add("activeModal");
  } else {
    document.body.classList.remove("activeModal");
  }

  return (
    <>
      <div className={styles.overlay} onClick={() => setOpenModal(false)}></div>
      <div className={styles.container}>
        <h2>{title}</h2>
        {children}
        <div className={styles.buttonContainer}>
          {isDeleteButton && (
            <Button className={styles.button} onClick={handleDelete}>
              Excluir
            </Button>
          )}
          <Button
            className={styles.button}
            onClick={() => {
              setOpenModal(false);
            }}
          >
            Cancelar
          </Button>
          <Button
            className={styles.button}
            onClick={handleSubmit}
            disabled={disabled}
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
              confirmLabel
            )}
          </Button>
        </div>
      </div>
    </>
  );
};
