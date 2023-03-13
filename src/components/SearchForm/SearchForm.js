import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import Input from '../Input/Input';

function SearchForm() {
  return (
    <div className="search">
      <form className="form__form">
        <Input placeholder="Фильм" searchForm={true} inputClass="search__input" />
      </form>
      <FilterCheckbox label="Короткометражки" extraClass="search-checkbox" />
    </div>
  );
}

export default SearchForm;
