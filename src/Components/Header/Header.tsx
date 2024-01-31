import React, { useState, useEffect } from "react";
import styles from "./Header.module.css";
import image from "../../Assets/image1.png";
import { HiBars3 } from "react-icons/hi2";
import { isLoggedIn, logout } from "../../Auth/Auth";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isResponsive, setIsResponsive] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [toggleNav, setToggleNav] = useState<boolean>(true);
  const [isResident, setIsResident] = useState<boolean>(
    location.pathname === "/sies/resident"
  );

  useEffect(() => {
    const handleResize = () => {
      setIsResponsive(window.innerWidth <= 940);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.greenContainer} />
      <div className={styles.container}>
        <img
          src={image}
          className={styles.logo}
          alt="Logo"
          onClick={() => navigate("/sies/")}
        />
        <div
          className={isResponsive ? styles.buttonContainer : styles.navigation}
        >
          {isResponsive ? (
            <div>
              <button
                className={styles.responsiveButton}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <HiBars3 size={24} />
              </button>
              {isDropdownOpen && (
                <div className={styles.modal}>
                  <ul>
                    <li
                      onClick={() => {
                        setIsDropdownOpen(!isDropdownOpen);
                        setToggleNav(!toggleNav);
                        setIsResident(!isResident);
                        navigate(isResident ? "sies/resident" : "sies/");
                      }}
                    >
                      <span className={`${styles.route} ${styles.modalItem}`}>
                        {isResident ? "Residentes" : "Estagiários"}
                      </span>
                    </li>
                    {isLoggedIn() && (
                      <>
                        <li
                          onClick={() => {
                            setIsDropdownOpen(!isDropdownOpen);
                            logout(navigate);
                          }}
                        >
                          <span
                            className={`${styles.route} ${styles.modalItem}`}
                          >
                            Sair
                          </span>
                        </li>
                        <li
                          onClick={() => {
                            setIsDropdownOpen(!isDropdownOpen);
                            setToggleNav(!toggleNav);
                            navigate("sies/register");
                          }}
                        >
                          <span
                            className={`${styles.route} ${styles.modalItem}`}
                          >
                            Registrar
                          </span>
                        </li>
                        <li
                          onClick={() => {
                            setIsDropdownOpen(!isDropdownOpen);
                            setToggleNav(!toggleNav);
                            navigate("sies/update");
                          }}
                        >
                          <span
                            className={`${styles.route} ${styles.modalItem}`}
                          >
                            Ranquear
                          </span>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className={styles.navigation}>
              <span
                onClick={() => {
                  setToggleNav(!toggleNav);
                  setIsResident(!isResident);
                  navigate(isResident ? "sies/resident" : "sies/");
                }}
                className={`${styles.route} ${styles.logout}`}
              >
                {isResident ? "Residentes" : "Estagiários"}
              </span>
              {isLoggedIn() && (
                <>
                  <span
                    className={`${styles.route} ${styles.logout}`}
                    onClick={() => logout(navigate)}
                  >
                    Sair
                  </span>
                  <span
                    className={`${styles.route} ${styles.logout}`}
                    onClick={() => {
                      setToggleNav(!toggleNav);
                      navigate("/sies/register");
                    }}
                  >
                    Registrar
                  </span>
                  <span
                    className={`${styles.route} ${styles.logout}`}
                    onClick={() => {
                      setToggleNav(!toggleNav);
                      navigate("/sies/update");
                    }}
                  >
                    Ranquear
                  </span>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
