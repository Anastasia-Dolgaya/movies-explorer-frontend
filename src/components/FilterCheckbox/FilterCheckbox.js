const FilterCheckbox = ({ label, extraClass, value, onChange, isDisabled }) => {
  return (
    <div className={`checkbox ${extraClass} ${isDisabled ? 'checkbox_disabled' : ''}`}>
      <label className="checkbox__switch" htmlFor="checkbox">
        <input
          checked={value}
          className="checkbox__input"
          type="checkbox"
          id="checkbox"
          onChange={onChange}
          disabled={isDisabled}
        />
        <div className="checkbox__slider round"></div>
      </label>
      <label className="checkbox__text" htmlFor="checkbox">
        {label}
      </label>
    </div>
  );
};
export default FilterCheckbox;
