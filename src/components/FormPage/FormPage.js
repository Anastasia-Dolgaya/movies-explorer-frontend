import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import Button from '../Button/Button';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const FormPage = ({
  title,
  children,
  buttonContent,
  text,
  to,
  link,
  isButtonDisabled,
  onSubmit,
  error,
}) => {
  return (
    <div className="form-page">
      <div className="form-page__container">
        <Logo />
        <h1 className="form-page__title">{title}</h1>
        <form className="form" noValidate onSubmit={onSubmit}>
          <div className="form__inputs">{children}</div>
          {error ? <ErrorMessage text={error} /> : null}
          <Button
            type="submit"
            btnClass="form-page__button"
            text={buttonContent}
            isDisabled={isButtonDisabled}
          />
        </form>
        <div className="form-page__info">
          <span className="form-page__text">{text}</span>
          <Link className="link form-page__link" to={to}>
            {link}
          </Link>
        </div>
      </div>
    </div>
  );
};
export default FormPage;
