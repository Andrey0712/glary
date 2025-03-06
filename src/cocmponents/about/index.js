import React from "react";
//import "../../Components/Houme/Home.css";
//import BG from "../../images/marka.jpg";
import "./About.css";

const About = () => {
  return (
    <>
      <div className="container">
        <div className="app-component-content">
          <section
            data-bs-version="5.1"
            className="article07 cid-uAXdB7qB8g"
            mbr-data-bg-video="this | fakeFilter uname__1 _params.bg.type _params.bg.value.url | toNULL"
            mbr-classname2="this | fakeFilter uname__2 _params.fullScreen _params.bg.parallax"
            mbr-id="_anchor"
            id="about-us-7-uAXdB7qB8g"
            data-rv-view="22"
          >
            <div
              className="mbr-fallback-image disabled"
              mbr-if="this | fakeFilter uname__24 _params.bg.type"
              data-app-remove-it="true"
              //style="display: none;"
            ></div>
            <div
              className="mbr-overlay"
              mbr-if="this | fakeFilter uname__25 _params.overlay _params.bg.type"
              mbr-style2="this | fakeFilter uname__26 _params.overlayOpacity _params.overlayColor"
              data-app-remove-it="true"
              //style="display: none; opacity: 0.3; background-color: rgb(255, 255, 255);"
            ></div>
            <div
              mbr-className2="this | fakeFilter uname__27 _params.fullWidth _params.fullWidth"
              className="container"
            >
              <div className="row justify-content-center">
                <div
                  mbr-className2="this | fakeFilter uname__28 _params.contentWidth"
                  className="card col-md-12 col-lg-10"
                >
                  <div className="card-wrapper">
                    <h3
                      className="card-title mbr-fonts-style mbr-white mt-3 mb-4 display-2"
                      mbr-if="this | fakeFilter uname__31 _params.showTitle"
                      data-app-selector=".card-title, .card-box"
                      mbr-className-var="uname__29"
                      mbr-on-change-theme-style="uname__30"
                      data-app-edit="content"
                      mbr-static-html="uname__32"
                      mbr-content-edit="uname__32"
                      data-app-placeholder="Введите Текст"
                      mbr-on-change-component-node="uname__33"
                      data-className-var="display-2"
                    >
                      <b>Про наш клуб</b>
                    </h3>
                    <div className="row card-box align-left">
                      <div className="item features-without-image col-12">
                        <div className="item-wrapper">
                          <p
                            className="mbr-text mbr-fonts-style display-7"
                            mbr-if="this | fakeFilter uname__41 _params.showText"
                            data-app-selector=".mbr-text, .mbr-section-btn"
                            mbr-className-var="uname__39"
                            mbr-on-change-theme-style="uname__40"
                            data-app-edit="content"
                            mbr-static-html="uname__42"
                            mbr-content-edit="uname__42"
                            data-app-placeholder="Введите Текст"
                            mbr-on-change-component-node="uname__43"
                            data-className-var="display-7"
                          >
                            Ласкаво просимо у світ собачих чудес! Наш клуб
                            собаківників - це не просто місце, де собаки
                            гуляють, це справжня собача родина, де кожен хвостик
                            має значення!
                          </p>
                        </div>
                      </div>
                      <div className="item features-without-image col-12">
                        <div className="item-wrapper">
                          <p
                            className="mbr-text mbr-fonts-style display-7"
                            mbr-if="this | fakeFilter uname__51 _params.showText"
                            data-app-selector=".mbr-text, .mbr-section-btn"
                            mbr-className-var="uname__49"
                            mbr-on-change-theme-style="uname__50"
                            data-app-edit="content"
                            mbr-static-html="uname__52"
                            mbr-content-edit="uname__52"
                            data-app-placeholder="Введите Текст"
                            mbr-on-change-component-node="uname__53"
                            data-className-var="display-7"
                          >
                            Ми проводимо виставки, де ваші пухнасті друзі можуть
                            показати свої таланти та завоювати серця глядачів. У
                            нас є все: від кумедних конкурсів до серйозних
                            змагань, де собаки можуть продемонструвати свої
                            навички та красу.
                          </p>
                        </div>
                      </div>
                      <div className="item features-without-image col-12">
                        <div className="item-wrapper">
                          <p
                            className="mbr-text mbr-fonts-style display-7"
                            mbr-if="this | fakeFilter uname__61 _params.showText"
                            data-app-selector=".mbr-text, .mbr-section-btn"
                            mbr-className-var="uname__59"
                            mbr-on-change-theme-style="uname__60"
                            data-app-edit="content"
                            mbr-static-html="uname__62"
                            mbr-content-edit="uname__62"
                            data-app-placeholder="Введите Текст"
                            mbr-on-change-component-node="uname__63"
                            data-className-var="display-7"
                          >
                            Приєднуйтесь до нас, і ви не тільки отримаєте
                            можливість показати свого вихованця, але й
                            зустрінете однодумців, які поділяють вашу любов до
                            собакам!
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default About;
