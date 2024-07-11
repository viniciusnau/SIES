import React from "react";
import styles from "./Button.module.css";
import { Button as MUiButton } from "@mui/material";

interface iButton {
  className?: any;
  content?: any;
  onClick?: any;
  children?: any;
  type?: any;
  htmlFor?: any;
  alt?: string;
  title?: string;
  disabled?: any;
  style?: any;
}

const Button: React.FC<iButton> = ({
  className,
  onClick,
  children,
  disabled,
  ...props
}) => {
  return (
    <MUiButton
      className={`${styles.container} ${className}`}
      variant="outlined"
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </MUiButton>
  );
};

export default Button;
