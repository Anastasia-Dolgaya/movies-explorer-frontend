import FormPage from '../FormPage/FormPage';
import Input from '../Input/Input';

function Register() {
  const containerClass = 'form-field__container_theme_grey';
  return (
    <FormPage
      title="Добро пожаловать!"
      buttonContent="Зарегистрироваться"
      text="Уже зарегистрированы?"
      to="/signin"
      link="Войти"
    >
      <Input
        type="text"
        id="name-input"
        inputname="name"
        label="Имя"
        required="true"
        minLength="2"
        maxLength="30"
        containerClass={containerClass}
      />
      <Input
        type="email"
        id="email-input"
        inputname="email"
        label="E-mail"
        required="true"
        containerClass={containerClass}
      />
      <Input
        type="password"
        id="password-input"
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

export default Register;
