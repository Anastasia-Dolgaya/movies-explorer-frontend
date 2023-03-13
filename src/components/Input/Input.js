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
    <label className="form__field">
      {label}
      <div className={`form__input-container ${containerClass}`}>
        <input
          type={type}
          id={id}
          className={`form__input ${inputClass} ${hasErrors ? 'form__input_invalid' : ''}`}
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
          className={`button ${searchForm ? 'search-form__btn' : 'search-form__btn-invisible'}`}
        ></button>
      </div>
      <span className={`form__input-error  ${hasErrors ? 'form__input-error_active' : ''}`}>
        {errorMessage}
      </span>
    </label>
  );
}

export default Input;
