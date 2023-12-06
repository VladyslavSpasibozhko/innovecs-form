type KeyOf<T> = keyof T;
type ValueOf<T> = T[keyof T];

type FormValues = {
  [key: string]: unknown;
};

type Validation = { error: boolean; errorMessage?: string };

type FormValidation<T extends FormValues> = {
  [K in keyof T]: (value: T[K]) => Validation;
};

type FormField<V = unknown> = {
  name: string;
  value: V;
  touched?: boolean;
  error?: boolean;
  errorMessage?: string;
};

type FormOptions = {
  validateOnMount?: boolean;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
};

type FormParams<V extends FormValues> = {
  initial: V;
  validation: FormValidation<V>;
  onSubmit: (values: FormValues) => void | Promise<void>;
  options?: FormOptions;
};
