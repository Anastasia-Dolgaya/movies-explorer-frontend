import MovieCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ cards, location }) {
  const renderCards = cards.map((card) => (
    <MovieCard
      key={card._id}
      title={card.title}
      link={card.link}
      movieDuration={card.duration}
      isLiked={card.liked}
      card={card}
      location={location}
    />
  ));
  return <ul className="card-list">{renderCards}</ul>;
}

export default MoviesCardList;
