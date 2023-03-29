import { Link } from 'react-router-dom';
import { useCallback, useContext, useState } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import useField from '../../hooks/useField';
import useForm from '../../hooks/useForm';
import { validateProfileUpdate } from '../../utils/utils';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { getErrorMessage } from '../../utils/errorHelpers';

const Profile = ({ onProfileUpdate, onSignout }) => {
  const currentUser = useContext(CurrentUserContext);
  const [isEditFormOpen, setEditFormOpen] = useState(false);
  const [updateError, setUpdateError] = useState('');
  const [userUpdated, setUserUpdated] = useState(false);

  const handleSubmit = useCallback(
    (values) => {
      return onProfileUpdate(values)
        .then(() => {
          setUserUpdated(true);
          setEditFormOpen(false);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
          setUpdateError(getErrorMessage(err));
        });
    },
    [onProfileUpdate],
  );

  const handleEditBtnClick = () => {
    setEditFormOpen(true);
  };

  const handleBackClick = () => {
    setEditFormOpen(false);
  };

  const { name, email } = currentUser;
  const form = useForm(currentUser, handleSubmit, validateProfileUpdate);
  const nameField = useField('name', name, form);
  const emailField = useField('email', email, form);

  const isButtonDisabled =
    nameField.value === '' ||
    emailField.value === '' ||
    (nameField.value === name && emailField.value === email) ||
    form.noErrors === false;

  return (
    <main className="profile">
      <h2 className="profile__title">{`Привет, ${currentUser.name}!`}</h2>
      {!isEditFormOpen && (
        <div className="profile__form">
          <div className="profile__container">
            <span className="profile__input-label">Имя</span>
            <span className="profile__input">{currentUser.name}</span>
          </div>
          <div className="profile__container">
            <span className="profile__input-label">Email</span>
            <span className="profile__input">{currentUser.email}</span>
          </div>
          {userUpdated ? <p className="profile__message">Данные успешно обновлены.</p> : null}
          <div className="profile__wrapper">
            <button type="button" className="button profile__edit-btn" onClick={handleEditBtnClick}>
              Редактировать
            </button>
          </div>
        </div>
      )}

      {isEditFormOpen && (
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
          {updateError ? <ErrorMessage text={updateError} /> : null}

          <div className="profile__wrapper">
            <button type="button" className="button profile__back-btn" onClick={handleBackClick}>
              Назад
            </button>
            <button
              type="submit"
              className={`button profile__button ${
                isButtonDisabled ? 'profile__button_disabled' : ''
              }`}
              disabled={isButtonDisabled}
            >
              Сохранить
            </button>
          </div>
        </form>
      )}

      <Link className="link profile__link" to="/" onClick={onSignout}>
        Выйти из аккаунта
      </Link>
    </main>
  );
};

export default Profile;
