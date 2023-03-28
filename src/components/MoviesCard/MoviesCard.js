const MovieCard = ({
  movie,
  link,
  title,
  movieDuration,
  isLiked,
  location,
  trailerLink,
  onFavorite,
  onUnfavorite,
}) => {
  const cardLikeButtonClassName = `${
    isLiked ? 'card__btn_type_like_active' : 'card__btn_type_like_inactive'
  }`;
  const cardButtonClassName = `button card__btn ${
    location.pathname === '/saved-movies' ? 'card__btn_type_delete' : cardLikeButtonClassName
  }`;
  const hour = movieDuration <= 60 ? 0 : (movieDuration / 60).toFixed(0);
  const minute = movieDuration % 60;

  return (
    <li className="card">
      <a
        className=" link card__image-container"
        href={trailerLink}
        target="_blank"
        rel="noreferrer"
      >
        <img className="card__image" src={link} alt={title} />
      </a>
      <div className="card__title-container">
        <h2 className="card__title">{title}</h2>
        <button
          type="button"
          className={cardButtonClassName}
          onClick={isLiked ? () => onUnfavorite(movie) : () => onFavorite(movie)}
        ></button>
      </div>
      <span className="card__movie-duration">{`${hour}ч ${
        minute < 10 ? '0' + minute : minute
      }м`}</span>
    </li>
  );
};

export default MovieCard;
