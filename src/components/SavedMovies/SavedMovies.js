import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies({ cards, location }) {
  return (
    <main className="movies">
      <SearchForm />
      <MoviesCardList cards={cards} location={location} />
    </main>
  );
}
export default SavedMovies;
