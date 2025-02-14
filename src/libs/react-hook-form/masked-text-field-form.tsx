import {
  Control,
  FieldValues,
  Controller,
  useController,
} from "react-hook-form";
import { TextField, TextFieldProps } from "@mui/material";

type MaskedTextFieldFormProps = {
  name: string;
  control?: Control<FieldValues>;
  transformOutput: (input: string) => string;
  transformInput: (input: string) => string;
} & TextFieldProps;

export const MaskedTextFieldForm = ({
  name,
  control,
  transformInput,
  transformOutput,
  ...props
}: MaskedTextFieldFormProps) => {
  const {
    fieldState: { error },
  } = useController({ name, control });

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <TextField
            {...props}
            onChange={(e) => field.onChange(transformInput(e.target.value))}
            value={transformOutput(field.value)}
            error={!!error}
            helperText={error?.message}
          />
        );
      }}
    />
  );
};
