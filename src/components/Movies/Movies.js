import Button from '../Button/Button';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

function Movies({ cards, location }) {
  return (
    <div className="movies">
      <SearchForm />
      <MoviesCardList cards={cards} location={location} />
      <div className="button-container">
        <Button type="button" btnClass="button_place_cards" text="Ещё" />
      </div>
    </div>
  );
}

export default Movies;
