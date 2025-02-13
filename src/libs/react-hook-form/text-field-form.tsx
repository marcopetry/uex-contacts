import { useController, Control, FieldValues } from "react-hook-form";
import { TextField, TextFieldProps } from "@mui/material";

type TextFieldFormProps = {
  name: string;
  control?: Control<FieldValues>;
} & TextFieldProps;

export const TextFieldForm = ({
  name,
  control,
  ...props
}: TextFieldFormProps) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  return (
    <TextField
      {...field}
      {...props}
      error={!!error}
      helperText={error?.message}
    />
  );
};
