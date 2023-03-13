function MovieCard({ link, title, handleLikeClick, movieDuration, isLiked, location }) {
  const cardLikeButtonClassName = `${
    isLiked ? 'card__btn_type_like_active' : 'card__btn_type_like_inactive'
  }`;
  const cardButtonClassName = `button card__btn ${
    location.pathname === '/saved-movies' ? 'card__btn_type_delete' : cardLikeButtonClassName
  }`;
  return (
    <div className="card">
      <div className="card__image-container">
        <img className="card__image" src={link} alt={title} />
      </div>
      <div className="card__title-container">
        <h2 className="card__title">{title}</h2>
        <button type="button" className={cardButtonClassName} onClick={handleLikeClick}></button>
      </div>
      <span className="card__movie-duration">{movieDuration}</span>
    </div>
  );
}
export default MovieCard;
