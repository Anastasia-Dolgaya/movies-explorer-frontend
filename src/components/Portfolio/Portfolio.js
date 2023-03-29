const Portfolio = () => {
  return (
    <div className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <a
            className="link portfolio__link"
            href="https://github.com/Anastasia-Dolgaya"
            target="_blank"
            rel="noreferrer"
          >
            <p className="portfolio__text">Статичный сайт</p>
            <div className="portfolio__arrow"></div>
          </a>
        </li>
        <li className="portfolio__item">
          <a
            className="link portfolio__link"
            href="https://anastasia-dolgaya.github.io/russian-travel-site/"
            target="_blank"
            rel="noreferrer"
          >
            <p className="portfolio__text">Адаптивный сайт</p>
            <div className="portfolio__arrow"></div>
          </a>
        </li>
        <li className="portfolio__item">
          <a
            className="link portfolio__link"
            href="https://leela.mesto.nomoredomains.club"
            target="_blank"
            rel="noreferrer"
          >
            <p className="portfolio__text">Одностраничное приложение</p>
            <div className="portfolio__arrow"></div>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Portfolio;
