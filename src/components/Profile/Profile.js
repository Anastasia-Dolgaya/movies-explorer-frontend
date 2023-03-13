import { Link } from 'react-router-dom';
function Profile({ profileName, profileEmail }) {
  return (
    <div className="profile">
      <div>
        <h2 className="profile__title">{`Привет, ${profileName}!`}</h2>
        <form className="profile__form">
          <div className="profile__container">
            <label className="profile__input-label">Имя</label>
            <input
              className="profile__input"
              type="text"
              inputname="name"
              id="profile-name-input"
              required={true}
              minLength="2"
              maxLength="30"
              value={profileName}
            ></input>
          </div>
          <div className="profile__container">
            <label className="profile__input-label">E-mail</label>
            <input
              className="profile__input"
              type="email"
              inputname="email"
              id="profile-email-input"
              required={true}
              value={profileEmail}
            ></input>
          </div>
        </form>
      </div>
      <div className="profile__wrapper">
        <button type="submit" className="button profile__button">
          Редактировать
        </button>
        <Link className="link profile__link" to="/">
          Выйти из аккаунта
        </Link>
      </div>
    </div>
  );
}

export default Profile;
