import { useHistory } from 'react-router-dom';

const NotFound = () => {
  let history = useHistory();
  const goBack = () => {
    history.goBack();
  };
  return (
    <div className="not-found">
      <div>
        <h2 className="not-found__title">404</h2>
        <p className="not-found__text">Страница не найдена</p>
      </div>
      <button type="button" className="button not-found__button" onClick={goBack}>
        Назад
      </button>
    </div>
  );
};

export default NotFound;
