import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import Button from '../Button/Button';
function FormPage({ title, children, buttonContent, text, to, link }) {
  return (
    <div className="form-page">
      <div className="form-page__container">
        <Logo />
        <h1 className="form-page__title">{title}</h1>
        <form className="form">{children}</form>
      </div>
      <div className="form-page__wrapper">
        <Button type="submit" btnClass="form-page__button" text={buttonContent} />
        <div className="form-page__info">
          <span className="form-page__text">{text}</span>
          <Link className="link form-page__link" to={to}>
            {link}
          </Link>
        </div>
      </div>
    </div>
  );
}
export default FormPage;
