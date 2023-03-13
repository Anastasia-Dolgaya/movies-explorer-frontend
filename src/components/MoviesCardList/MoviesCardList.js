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
  return <section className="card-list">{renderCards}</section>;
}

export default MoviesCardList;
