function Button({ type, btnClass, text }) {
  return (
    <button type={type} className={`button ${btnClass}`}>
      {text}
    </button>
  );
}
export default Button;
