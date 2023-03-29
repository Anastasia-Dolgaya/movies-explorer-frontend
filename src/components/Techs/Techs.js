const Techs = () => {
  return (
    <div className="techs" id="techs">
      <h2 className="title">Технологии</h2>
      <h3 className="section-header section-header_content_techs">7 технологий</h3>
      <p className="text text_content_techs">
        На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
      </p>
      <ul className="techs__list">
        <li className="techs__item text">HTML</li>
        <li className="techs__item text">CSS</li>
        <li className="techs__item text">JS</li>
        <li className="techs__item text">React</li>
        <li className="techs__item text">Git</li>
        <li className="techs__item text">Express.js</li>
        <li className="techs__item text">mongoDB</li>
      </ul>
    </div>
  );
};

export default Techs;
