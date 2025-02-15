import { useController, Control, FieldValues } from "react-hook-form";
import { TextField, TextFieldProps } from "@mui/material";

type TextFieldFormProps = {
  name: string;
  control?: Control<FieldValues>;
} & TextFieldProps;

export const TextFieldForm = ({
  name,
  control,
  type,
  ...props
}: TextFieldFormProps) => {
  const {
    field: { onChange, ...field },
    fieldState: { error },
  } = useController({ name, control });

  return (
    <TextField
      {...field}
      {...props}
      type={type}
      onChange={(e) => {
        if (type === "number") {
          onChange({
            ...e,
            target: { ...e.target, value: Number(e.target.value) },
          });
        } else {
          onChange(e);
        }
      }}
      error={!!error}
      helperText={error?.message}
    />
  );
};
