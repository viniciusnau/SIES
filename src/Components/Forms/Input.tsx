import React, { forwardRef } from "react";
import { TextField, TextFieldProps } from "@mui/material";
import { IMaskInput } from "react-imask";
import styles from "./Input.module.css";

interface CustomProps {
  mask?: any;
  className?: any;
  style?: any;
  name?: string;
  value?: any;
  content?: any;
  onClick?: any;
  onChange?: (event: { target: { name: string; value: any } }) => void;
  onFocus?: any;
  onBlur?: any;
  type?: any;
  placeholder?: string;
  onKeyPress?: any;
  id?: any;
  readOnly?: boolean;
  min?: string;
  max?: number;
  step?: string;
  pattern?: string;
  checked?: boolean;
  onKeyUp?: any;
  defaultValue?: any;
  label?: string;
  fieldType?: string;
}

const MaskedInput = forwardRef<HTMLElement, CustomProps>(function MaskedInput(
  props,
  ref
) {
  const { onChange, mask, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask={mask}
      inputRef={ref as React.Ref<HTMLInputElement>}
      onAccept={(value: any) =>
        onChange && onChange({ target: { name: props.name!, value } })
      }
    />
  );
});

interface iInput extends Omit<TextFieldProps, "onChange" | "value"> {
  mask?: any;
  className?: any;
  style?: any;
  name?: string;
  value?: any;
  content?: any;
  onClick?: any;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: any;
  onBlur?: any;
  type?: any;
  placeholder?: string;
  onKeyPress?: any;
  id?: any;
  readOnly?: boolean;
  min?: string;
  max?: number;
  step?: string;
  pattern?: string;
  checked?: boolean;
  onKeyUp?: any;
  defaultValue?: any;
  label?: string;
  fieldType?: string;
}

const Input: React.FC<iInput> = ({
  className,
  onClick,
  max,
  name,
  label,
  mask,
  onChange,
  value,
  type,
  ...props
}) => {
  return (
    <>
      {type === "checkbox" && (
        <label
          className={styles.label}
          htmlFor={name}
          style={{ color: "initial" }}
        >
          {label + ":"}
        </label>
      )}
      <TextField
        variant="outlined"
        onChange={!mask ? onChange : undefined}
        className={`${styles.content} ${className}`}
        onClick={onClick}
        inputProps={{ maxLength: max, name }}
        InputProps={{
          inputComponent: mask ? (MaskedInput as any) : undefined,
          inputProps: {
            mask: mask,
            name: name,
            onChange: onChange,
          },
        }}
        name={name}
        label={label}
        value={value}
        type={type}
        {...props}
      />
    </>
  );
};

export default Input;
