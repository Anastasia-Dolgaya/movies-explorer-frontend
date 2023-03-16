function Input({
  type,
  id,
  inputname,
  value,
  placeholder,
  onChange,
  inputRef,
  onBlur,
  onFocus,
  hasErrors,
  errorMessage,
  minLength,
  maxLength,
  label,
  searchForm,
  containerClass,
  inputClass,
}) {
  return (
    <label className="form-field">
      {label}
      <div className={`form-field__container ${containerClass}`}>
        <input
          type={type}
          id={id}
          className={`form-field__input ${inputClass} ${
            hasErrors ? 'form-field__input_invalid' : ''
          }`}
          name={inputname}
          value={value}
          placeholder={placeholder}
          required
          onChange={onChange}
          ref={inputRef}
          onBlur={onBlur}
          onFocus={onFocus}
          minLength={minLength}
          maxLength={maxLength}
        />
        <button
          className={`button ${
            searchForm ? 'button_place_search-form' : 'button_place_search-form_invisible'
          }`}
        ></button>
      </div>
      <span
        className={`form-field__input-error  ${hasErrors ? 'form-field__input-error_active' : ''}`}
      >
        {errorMessage}
      </span>
    </label>
  );
}

export default Input;
