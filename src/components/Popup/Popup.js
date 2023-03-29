import { useEffect } from 'react';

const Popup = ({ isOpen, onClose, text }) => {
  useEffect(() => {
    document.addEventListener('keydown', handleEscClose);
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    };
  }, []);

  function handleEscClose(e) {
    if (e.key === 'Escape') {
      onClose();
    }
  }

  function handleOverlayClick(e) {
    if (e.currentTarget === e.target) {
      onClose();
    }
  }
  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`} onClick={handleOverlayClick}>
      <div className="popup__container">
        <button type="button" className="button popup__close-button" onClick={onClose}></button>
        <div className="popup__image"></div>
        <span className="popup__info">{text}</span>
      </div>
    </div>
  );
};

export default Popup;
