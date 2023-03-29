import useField from '../../hooks/useField';
import useForm from '../../hooks/useForm';
import { validateLogin } from '../../utils/utils';
import FormPage from '../FormPage/FormPage';
import Input from '../Input/Input';

const Login = ({ onLogin, loginError }) => {
  const containerClass = 'form-field__container_theme_grey';

  const handleSubmit = () => {
    if (!email.value || !password.value) {
      return;
    }
    onLogin(email.value, password.value);
    email.setValue('');
    password.setValue('');
  };

  const form = useForm({ name: '', email: '', password: '' }, handleSubmit, validateLogin);
  const email = useField('email', '', form);
  const password = useField('password', '', form);

  const isButtonDisabled = email.value === '' || password.value === '' || form.noErrors === false;

  return (
    <FormPage
      title="Рады видеть!"
      buttonContent="Войти"
      text="Ещё не зарегистрированы?"
      to="/signup"
      link="Регистрация"
      isButtonDisabled={isButtonDisabled}
      onSubmit={form.handleSubmit}
      error={loginError}
    >
      <Input
        type="email"
        id="email-login-input"
        inputName="email"
        label="E-mail"
        required="true"
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
        id="password-login-input"
        inputName="password"
        label="Пароль"
        required="true"
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

export default Login;
