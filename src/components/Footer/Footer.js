const Footer = ({ location }) => {
  return location.pathname === '/' ||
    location.pathname === '/movies' ||
    location.pathname === '/saved-movies' ? (
    <footer className="footer">
      <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
      <div className="footer__block">
        <p className="footer__text">&copy; 2020</p>
        <div className="footer__companies">
          <p className="footer__text">Яндекс.Практикум</p>
          <p className="footer__text">Github</p>
        </div>
      </div>
    </footer>
  ) : null;
};

export default Footer;
