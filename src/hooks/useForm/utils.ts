export function generateValuesFromFields(fields: FormField[]): FormValues {
  const values: FormValues = {};

  for (const field of fields) {
    values[field.name as string] = field.value;
  }

  return values;
}

export function generateFields<T extends FormValues>(
  params: Pick<FormParams<T>, "initial" | "validation" | "options">
): Record<KeyOf<T>, FormField<ValueOf<T>>> {
  const fields = Object.keys(params.initial).reduce((result, key) => {
    const name = key as KeyOf<T>;
    const value = params.initial[name];

    const field: FormField<ValueOf<T>> = {
      name: key,
      value: value,
    };

    if (params.options && params.options.validateOnMount) {
      const validation = params.validation[name];
      const validationResult = validation(value);

      Object.assign(field, validationResult);
    }

    result[name] = field;
    return result;
  }, {} as Record<KeyOf<T>, FormField<ValueOf<T>>>);

  return fields;
}
