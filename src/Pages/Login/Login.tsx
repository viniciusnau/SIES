import React, { useState } from "react";
import styles from "./Login.module.css";
import Input from "../../Components/Forms/Input";
import Button from "../../Components/Forms/Button";
import { handleKeyPress } from "../../Components/Helper";
import { HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";
import icon from "../../Assets/google-icon.png";

const Login = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [form, setForm] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
        const { name, value } = e.target;
        setForm((prev: any) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    const handleSubmit = () => {};

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className={styles.container}>
            <div
                className={styles.loginForm}
                onKeyUp={(e) => handleKeyPress(e, handleSubmit, "Enter")}
            >
                <h2
                    className={styles.title}
                    style={{ color: "initial" }}
                >
                    Bem vindo(a)
                </h2>
                <div className={styles.formGroup}>
                    <div className={styles.password}>
                        <Input
                            className={styles.input}
                            label="Usuário"
                            name="username"
                            onChange={handleChange}
                            value={form.username}
                        />
                    </div>
                </div>
                <div className={styles.formGroup}>
                    <div className={styles.password}>
                        <Input
                            className={styles.input}
                            type={showPassword ? "" : "password"}
                            label="Senha"
                            name="password"
                            onChange={handleChange}
                            value={form.password}
                        />
                        <div className={styles.passwordIcon}>
                            {showPassword ? (
                                <HiOutlineEye size={24} onClick={handleShowPassword} />
                            ) : (
                                <HiOutlineEyeSlash size={24} onClick={handleShowPassword} />
                            )}
                        </div>
                    </div>
                    <a href="/automato/alterar-senha/" className={styles.forgotPassword}>
                        Esqueceu a senha?
                    </a>
                </div>
                <div className={styles.lineContainer}>
                    <hr className={styles.line} />
                    <div className={styles.text}>ou</div>
                    <hr className={styles.line} />
                </div>

                <form
                    action="https://sies.defensoria.sc.def.br/api/user/google-redirect/"
                    method="get"
                    className={styles.form}
                >
                    <Button className={styles.google}>
                        <img
                            width="30rem"
                            style={{ marginRight: ".5rem", padding: ".25rem" }}
                            alt="Ícone do Google"
                            src={icon}
                            className={styles.icon}
                        />
                        <p className={styles.login}>Continuar com google</p>
                    </Button>
                </form>
                <div className={styles.formButton}>
                    <Button className={styles.button} onClick={handleSubmit}>
                        { (
                            "Entrar"
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Login;
