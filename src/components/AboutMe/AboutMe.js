import Photo from '../../images/photo.jpg';

function AboutMe() {
  return (
    <article className="about-me" id="about-me">
      <h2 className="title">Студент</h2>
      <div className="about-me__profile">
        <div className="about-me__info">
          <div>
            <h3 className="section-header section-header_content_about-me">Анастасия</h3>
            <p className="about-me__subtitle">Фронтенд-разработчик</p>
            <p className="text text_content_about-me">
              По образованию переводчик. Долгое время занималась письменными переводами с
              английского языка на русский по различным тематикам, в том числе IT. Со временем
              появилось желание узнать об этой сфере больше и попробовать себя в программировании.
              Так я оказалась на курсе веб-разработки Яндекс Практикума.
            </p>
          </div>
          <a
            className="link link_content_about-me"
            href="https://github.com/Anastasia-Dolgaya"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </div>
        <img className="about-me__photo" src={Photo} alt="Фотография студента" />
      </div>
    </article>
  );
}

export default AboutMe;
