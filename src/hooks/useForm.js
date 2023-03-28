import { useCallback, useState } from 'react';

const useForm = (initialValues, onSubmit, validate) => {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState(initialValues);
  const noErrors = !Object.keys(errors).length;

  const handleChange = useCallback(
    (fieldName, fieldValue, _fieldState) => {
      setValues((prev) => ({ ...prev, [fieldName]: fieldValue }));
      const valErrors = validate({ ...values, [fieldName]: fieldValue });

      setErrors(valErrors);

      return valErrors;
    },
    [validate, values],
  );

  const handleSubmit = useCallback(
    (e) => {
      e?.preventDefault();
      const valErrors = validate(values);

      setErrors(valErrors);

      if (!Object.keys(valErrors).length) {
        onSubmit(values);
        setSubmitted(true);
        setErrors({});
      }
    },
    [onSubmit, validate, values],
  );

  return {
    errors,
    values,
    submitted,
    handleSubmit,
    handleChange,
    setErrors,
    noErrors,
  };
};

export default useForm;
