import { nameRE } from './constants';
import { emailRE } from './constants';

const validateSearch = (values) => {
  const { queryString } = values;
  const errors = {};

  if (!queryString) {
    errors.queryString = 'Нужно ввести ключевое слово';
  }
  return errors;
};

const validateRegister = (values) => {
  const { name, email, password } = values;
  const errors = {};

  if (!name) {
    errors.name = 'Поле не может быть пустым';
  }

  if (name.length > 0 && name.length < 2) {
    errors.name = 'Минимальное количество символов: 2';
  }

  if (name.length > 0 && !nameRE.test(name)) {
    errors.name = 'Поле должно содержать только латиницу, кириллицу, пробел или дефис';
  }

  if (!email) {
    errors.email = 'Поле не может быть пустым';
  }
  if (email.length > 0 && !emailRE.test(email)) {
    errors.email = 'Укажите правильный email';
  }

  if (!password) {
    errors.password = 'Поле не может быть пустым';
  }

  if (password.length > 0 && password.length < 2) {
    errors.password = 'Минимальное количество символов: 2';
  }

  return errors;
};

const validateLogin = (values) => {
  const { email, password } = values;
  const errors = {};

  if (!email) {
    errors.email = 'Поле не может быть пустым';
  }
  if (email.length > 0 && !emailRE.test(email)) {
    errors.email = 'Укажите правильный email';
  }

  if (!password) {
    errors.password = 'Поле не может быть пустым';
  }

  if (password.length > 0 && password.length < 2) {
    errors.password = 'Минимальное количество символов: 2';
  }

  return errors;
};

const validateProfileUpdate = (values) => {
  const { name, email } = values;
  const errors = {};

  if (!name) {
    errors.name = 'Поле не может быть пустым';
  }

  if (name.length > 0 && name.length < 2) {
    errors.name = 'Минимальное количество символов: 2';
  }

  if (name.length > 0 && !nameRE.test(name)) {
    errors.name = 'Поле должно содержать только латиницу, кириллицу, пробел или дефис';
  }

  if (!email) {
    errors.email = 'Поле не может быть пустым';
  }
  if (email.length > 0 && !emailRE.test(email)) {
    errors.email = 'Укажите правильный email';
  }

  return errors;
};

const getPageParams = (windowWidth) => {
  let pageSize;
  let pageRow;
  if (windowWidth > 1020) {
    pageSize = 16;
    pageRow = 4;
  }
  if (windowWidth <= 1020 && windowWidth > 768) {
    pageSize = 12;
    pageRow = 3;
  }
  if (windowWidth <= 768 && windowWidth > 570) {
    pageSize = 8;
    pageRow = 2;
  }
  if (windowWidth <= 570) {
    pageSize = 5;
    pageRow = 1;
  }
  return { pageSize, pageRow };
};

export { validateSearch, validateRegister, validateLogin, validateProfileUpdate, getPageParams };
