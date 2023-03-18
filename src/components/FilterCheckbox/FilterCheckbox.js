function FilterCheckbox({ label, extraClass }) {
  return (
    <div className={`checkbox ${extraClass}`}>
      <label className="checkbox__switch" for="checkbox">
        <input className="checkbox__input" type="checkbox" id="checkbox" />
        <div className="checkbox__slider round"></div>
      </label>
      <label className="checkbox__text" for="checkbox">
        {label}
      </label>
    </div>
  );
}
export default FilterCheckbox;
