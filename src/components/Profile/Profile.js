import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import useField from '../../hooks/useField';
import useForm from '../../hooks/useForm';
import { validateProfileUpdate } from '../../utils/utils';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const Profile = ({ onProfileUpdate, onSignout, error, userUpdated }) => {
  const currentUser = useContext(CurrentUserContext);

  const { name, email } = currentUser;
  const form = useForm(currentUser, onProfileUpdate, validateProfileUpdate);
  const nameField = useField('name', name, form);
  const emailField = useField('email', email, form);

  const isButtonDisabled =
    nameField.value === '' ||
    emailField.value === '' ||
    (nameField.value === name && emailField.value === email) ||
    form.noErrors === false;

  const buttonContent = isButtonDisabled ? 'Редактировать' : 'Сохранить';

  return (
    <main className="profile">
      <h2 className="profile__title">{`Привет, ${currentUser.name}!`}</h2>
      <form className="profile__form" onSubmit={form.handleSubmit}>
        <span
          className={`profile__input-error  ${
            nameField.error ? 'profile__input-error_active' : ''
          }`}
        >
          {nameField.error}
        </span>
        <div className="profile__container">
          <label className="profile__input-label">Имя</label>
          <input
            className="profile__input"
            type="text"
            id="profile-name-input"
            minLength="2"
            maxLength="30"
            value={nameField.value}
            onChange={nameField.handleChange}
            onBlur={nameField.handleBlur}
            onFocus={nameField.handleFocus}
          ></input>
        </div>
        <div className="profile__container">
          <label className="profile__input-label">E-mail</label>
          <input
            className="profile__input"
            type="email"
            id="profile-email-input"
            value={emailField.value}
            onChange={emailField.handleChange}
            onBlur={emailField.handleBlur}
            onFocus={emailField.handleFocus}
          ></input>
        </div>
        <span
          className={`profile__input-error  ${
            emailField.error ? 'profile__input-error_active' : ''
          }`}
        >
          {emailField.error}
        </span>
        {error ? <ErrorMessage text={error} /> : null}
        {userUpdated ? <p className="profile__message">Данные успешно обновлены.</p> : null}
        <div className="profile__wrapper">
          <button
            type="submit"
            className={`button profile__button ${
              isButtonDisabled ? 'profile__button_disabled' : ''
            }`}
            disabled={isButtonDisabled}
          >
            {buttonContent}
          </button>
        </div>
      </form>
      <Link className="link profile__link" to="/" onClick={onSignout}>
        Выйти из аккаунта
      </Link>
    </main>
  );
};

export default Profile;
