const Button = ({ type, btnClass, text, onClick, isDisabled }) => {
  return (
    <button
      type={type}
      className={`button ${btnClass} ${isDisabled ? 'button_disabled' : ''}`}
      onClick={onClick}
      disabled={isDisabled}
    >
      {text}
    </button>
  );
};
export default Button;
