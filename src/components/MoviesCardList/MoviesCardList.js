import Button from '../Button/Button';
import MovieCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { notFoundMessage } from '../../utils/constants';

const MoviesCardList = ({
  movies,
  error,
  hasMore,
  isLoading,
  onNextPage,
  onFavorite,
  onUnfavorite,
  location,
  filteredMoviesLength,
}) => {
  if (isLoading) {
    return <Preloader />;
  }

  if (error) {
    return <ErrorMessage text={error} />;
  }

  if (filteredMoviesLength === 0) {
    return <ErrorMessage text={notFoundMessage} />;
  }

  return (
    <div>
      <ul className="card-list">
        {movies.map((movie) => (
          <MovieCard
            movie={movie}
            onFavorite={onFavorite}
            onUnfavorite={onUnfavorite}
            key={movie.id || movie.movieId}
            title={movie.nameRU}
            link={
              typeof movie.image === 'string'
                ? movie.image
                : `https://api.nomoreparties.co${movie.image.url}`
            }
            movieDuration={movie.duration}
            trailerLink={movie.trailerLink}
            isLiked={movie.favorited}
            location={location}
          />
        ))}
      </ul>
      {hasMore ? (
        <div className="button-container">
          <Button type="button" btnClass="button_place_cards" text="Ещё" onClick={onNextPage} />
        </div>
      ) : null}
    </div>
  );
};

export default MoviesCardList;
