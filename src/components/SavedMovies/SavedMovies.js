import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies({ cards, location }) {
  return (
    <div className="movies">
      <SearchForm />
      <MoviesCardList cards={cards} location={location} />
    </div>
  );
}
export default SavedMovies;
