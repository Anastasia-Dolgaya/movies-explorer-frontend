import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import Input from '../Input/Input';
import useField from '../../hooks/useField';
import useForm from '../../hooks/useForm';
import { validateSearch } from '../../utils/utils';

const SearchForm = ({ initialValues, onSubmit }) => {
  const form = useForm(initialValues, onSubmit, validateSearch);

  const searchField = useField('queryString', initialValues.queryString || '', form);
  const shortField = useField('isShort', initialValues.isShort || false, form);

  const isShortDisabled = !searchField.value;

  return (
    <div className="search">
      <form className="search__form" onSubmit={form.handleSubmit} noValidate>
        <Input
          placeholder="Фильм"
          searchForm={true}
          inputClass="search__input"
          inputName="queryString"
          type="text"
          id="search-input"
          value={searchField.value}
          onChange={searchField.handleChange}
          onBlur={searchField.handleBlur}
          onFocus={searchField.handleFocus}
          hasErrors={!!searchField.error}
          errorMessage={searchField.error}
        />
      </form>

      <FilterCheckbox
        id="short-input"
        type="checkbox"
        inputName="isShort"
        label="Короткометражки"
        extraClass="search-checkbox"
        inputClass="short_input"
        value={shortField.value}
        onChange={(e) => {
          shortField.handleChange(e);
          onSubmit({
            queryString: searchField.value,
            isShort: e.target.checked,
          });
        }}
        isDisabled={isShortDisabled}
      />
    </div>
  );
};

export default SearchForm;
