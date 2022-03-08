import { ChangeEvent, useState } from "react";

export default function useForm<T>(initialState: T) {
  const [values, setValues] = useState(initialState);

  const handleInputsChange = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues({
      ...values,
      [target.name]: target.value,
    });
  };
  const resetState = (newFormState = initialState) => {
    setValues(newFormState);
  };

  return { values, handleInputsChange, resetState };
}
