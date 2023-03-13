function AboutProject() {
  return (
    <article className="about" id="about">
      <h2 className="title">О проекте</h2>
      <div className="about__info">
        <div className="about__column">
          <h3 className="about__title">Дипломный проект включал 5 этапов</h3>
          <p className="text">
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные
            доработки.
          </p>
        </div>
        <div className="about__column">
          <h3 className="about__title">На выполнение диплома ушло 5 недель</h3>
          <p className="text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы
            успешно защититься.
          </p>
        </div>
      </div>
      <div className="chart">
        <p className="chart__text chart__text_type_back">1 неделя</p>
        <p className="chart__subtitle chart__subtitle_type_back">Back-end</p>
        <p className="chart__text chart__text_type_front">4 недели</p>
        <p className="chart__subtitle chart__subtitle_type_front">Front-end</p>
      </div>
    </article>
  );
}
export default AboutProject;
