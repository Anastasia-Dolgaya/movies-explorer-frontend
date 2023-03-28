import { useCallback, useEffect, useState } from 'react';

const useField = (fieldName, initialValue, form) => {
  const [value, setValue] = useState(initialValue);
  const [dirty, setDirty] = useState(false);
  const [error, setError] = useState('');
  const [active, setActive] = useState(false);
  const [touched, setTouched] = useState(false);

  const handleChange = useCallback(
    (e) => {
      setDirty(true);

      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

      setValue(value);

      const errors = form.handleChange(fieldName, value, {
        dirty,
        touched,
      });
      setError(errors[fieldName]);
    },
    [fieldName, form, dirty, touched],
  );

  const handleFocus = useCallback(() => {
    setActive(true);
  }, []);

  const handleBlur = useCallback(() => {
    setTouched(true);
  }, []);

  useEffect(() => {
    setError(form?.errors?.[fieldName]);
  }, [fieldName, form?.errors]);

  return {
    value,
    error,
    dirty,
    active,
    touched,
    handleBlur,
    handleFocus,
    handleChange,
    setValue,
    setError,
  };
};

export default useField;
