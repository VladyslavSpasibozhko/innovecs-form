import React, { useState } from "react";
import { generateFields, generateValuesFromFields } from "./utils";

const defaultOptions: FormOptions = {
  validateOnBlur: false,
  validateOnChange: false,
  validateOnMount: false,
};

export function useForm<T extends FormValues>({
  initial,
  validation,
  onSubmit,
  options = defaultOptions,
}: FormParams<T>) {
  const [fields, setFields] = useState(() => {
    return generateFields({ initial, validation, options });
  });

  const getIsValid = (validations?: Validation[]) => {
    if (validations) {
      return validations.every((item) => !item.error);
    }

    return Object.values(fields).every((field) => !field.error);
  };

  const validateField = (name: KeyOf<T>, value: ValueOf<T>) => {
    const runner = validation[name];
    return runner(value);
  };

  const validateFields = () => {
    const result = {} as Record<KeyOf<T>, Validation>;

    for (const field in fields) {
      const fieldValidation = validateField(field, fields[field].value);
      result[field] = fieldValidation;
    }

    return { result };
  };

  const updateField = (name: KeyOf<T>, data: Partial<FormField>) => {
    setFields((fields) => ({
      ...fields,
      [name]: Object.assign({}, fields[name], data),
    }));
  };

  const setFieldValue = (name: KeyOf<T>, value: ValueOf<T>) => {
    updateField(name, { value });
  };

  const setFieldTouched = (name: KeyOf<T>, touched: boolean) => {
    updateField(name, { touched });
  };

  const setFieldError = (name: KeyOf<T>, message: string) => {
    updateField(name, { error: true, errorMessage: message });
  };

  const reset = () => {
    setFields(generateFields({ initial, validation }));
  };

  const handleChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const field: FormField = {
      name: target.name,
      value: target.value,
    };

    if (options.validateOnChange) {
      const validationResult = validateField(
        target.name,
        target.value as ValueOf<T>
      );

      Object.assign(field, validationResult);
    }

    updateField(target.name, field);
  };

  const handleBlur = ({
    target: { name },
  }: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const field: FormField = {
      name: name,
      value: fields[name].value,
      touched: true,
    };

    if (options.validateOnBlur) {
      const validationResult = validateField(name, fields[name].value);
      Object.assign(field, validationResult);
    }

    updateField(name, field);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const { result } = validateFields();

    for (const key in result) {
      updateField(key, {
        touched: true,
        error: result[key].error,
        errorMessage: result[key].errorMessage,
      });
    }

    const isValid = getIsValid(Object.values(result));

    if (isValid) {
      const fieldsArray = Object.values(fields);
      const values = generateValuesFromFields(fieldsArray);
      onSubmit(values);
    }
  };

  return {
    isValid: getIsValid(),
    fields,
    reset,
    setFieldError,
    setFieldTouched,
    setFieldValue,
    handleBlur,
    handleChange,
    handleSubmit,
  };
}
