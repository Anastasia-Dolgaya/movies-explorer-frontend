export const getErrorMessage = (error) => {
  if (typeof error === 'string') {
    return error;
  }

  if (typeof error === 'number') {
    return `Код ошибки ${error}`;
  }

  if (Array.isArray(error)) {
    return getErrorMessage(error[0]);
  }

  return error.message;
};
