import styles from "./Login.module.css";
import Button from "../../Components/Forms/Button";
import icon from "../../Assets/google-icon.png";

const Login = () => {
  return (
    <div className={styles.container}>
      <form
        action="http://15.228.239.212:8000/api/user/google-redirect/"
        method="get"
        className={styles.form}
      >
        <h3 className={styles.login}>Login com Google</h3>
        <Button className={styles.google}>
          <img
            width="30rem"
            style={{ marginRight: ".5rem", padding: ".125rem" }}
            alt="Ícone do Google"
            src={icon}
            className={styles.icon}
          />
          <p style={{ fontSize: "1rem" }}>Google</p>
        </Button>
      </form>
    </div>
  );
};

export default Login;
