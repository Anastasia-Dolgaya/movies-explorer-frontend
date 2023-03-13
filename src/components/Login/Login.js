import FormPage from '../FormPage/FormPage';
import Input from '../Input/Input';

function Login() {
  const containerClass = 'form__input-container_theme_grey';
  return (
    <FormPage
      title="Рады видеть!"
      buttonContent="Войти"
      text="Ещё не зарегистрированы?"
      to="/signup"
      link="Регистрация"
    >
      <Input
        type="email"
        id="email-login-input"
        inputname="email"
        label="E-mail"
        required="true"
        containerClass={containerClass}
      />
      <Input
        type="password"
        id="password-login-input"
        inputname="password"
        label="Пароль"
        required="true"
        containerClass={containerClass}
        hasErrors={true}
        errorMessage="Что-то пошло не так"
        // Валидация будет реализована с помощью кастомных хуков. На данном этапе выполнена только верстка
      />
    </FormPage>
  );
}

export default Login;
