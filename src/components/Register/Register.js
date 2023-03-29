import useField from '../../hooks/useField';
import useForm from '../../hooks/useForm';
import { validateRegister } from '../../utils/utils';
import FormPage from '../FormPage/FormPage';
import Input from '../Input/Input';

const Register = ({ onRegistration, registrationError }) => {
  const containerClass = 'form-field__container_theme_grey';
  const handleRegistration = () => {
    onRegistration(name.value, email.value, password.value);
  };
  const form = useForm({ name: '', email: '', password: '' }, handleRegistration, validateRegister);
  const name = useField('name', '', form);
  const email = useField('email', '', form);
  const password = useField('password', '', form);

  const isButtonDisabled =
    name.value === '' || email.value === '' || password.value === '' || form.noErrors === false;

  return (
    <FormPage
      title="Добро пожаловать!"
      buttonContent="Зарегистрироваться"
      text="Уже зарегистрированы?"
      to="/signin"
      link="Войти"
      isButtonDisabled={isButtonDisabled}
      onSubmit={form.handleSubmit}
      error={registrationError}
    >
      <Input
        type="text"
        id="name-input"
        inputName="name"
        label="Имя"
        minLength="2"
        maxLength="30"
        containerClass={containerClass}
        value={name.value}
        onChange={name.handleChange}
        onBlur={name.handleBlur}
        onFocus={name.handleFocus}
        hasErrors={name.error}
        errorMessage={name.error}
      />
      <Input
        type="email"
        id="email-input"
        inputName="email"
        label="E-mail"
        containerClass={containerClass}
        value={email.value}
        onChange={email.handleChange}
        onBlur={email.handleBlur}
        onFocus={email.handleFocus}
        hasErrors={email.error}
        errorMessage={email.error}
      />
      <Input
        type="password"
        id="password-input"
        inputName="password"
        label="Пароль"
        containerClass={containerClass}
        value={password.value}
        onChange={password.handleChange}
        onBlur={password.handleBlur}
        onFocus={password.handleFocus}
        hasErrors={password.error}
        errorMessage={password.error}
      />
    </FormPage>
  );
};

export default Register;
