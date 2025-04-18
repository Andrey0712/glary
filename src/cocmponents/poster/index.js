//import React from "react";
import React, { useState, useEffect } from "react";
//import "../../Components/Houme/Home.css";
//import BG from "../../images/marka.jpg";
import "./Poster.css";
import "../../styles/variables.css";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRunLine } from "../../actions/runLine";

const Poster = () => {
  const navigate = useHistory();
  const dispatch = useDispatch();
  //const list = useSelector((state) => state.runLine);
  const { list } = useSelector((state) => state.runLine);

  //const [list] = useSelector((state) => state.runLine.list);
  const [runline] = list.map((x) => x.description);
  console.log("runline333", runline);
  // const run = (list) => {
  //   const runline = 0;
  //   if (list == null) {
  //     runline = [
  //       "Відкрита реєстрація на виставку * Відкрита реєстрація на виставку * Відкрита реєстрація на виставку *",
  //     ];
  //   } else {
  //     runline = [list.map((x) => x.description)];
  //   }
  //   console.log("runline333", runline);
  // };

  // if (runline == null) {
  //   runline =
  //     "Відкрита реєстрація на виставку * Відкрита реєстрація на виставку * Відкрита реєстрація на виставку *";
  // }

  const [loading, setLoading] = useState(true);
  // const goHome = () => {
  //   navigate.push("/noMatch");
  // };

  // let run = {
  //   id: "1",
  //   description:
  //     "Відкрита реєстрація на виставку * Відкрита реєстрація на виставку * Відкрита реєстрація на виставку *",
  // };
  //console.log("runline333", run);

  useEffect(() => {
    try {
      dispatch(getRunLine())
        .then(() => {
          // if (list == null) {
          //   list = run;
          // }
          setLoading(false);
        })
        .catch((ex) => {
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
      console.log("Server is bad register from", error);
    }
  }, []);

  return (
    <>
      <div className="container">
        {/* <div className="app-component-content"> */}
        <section className="ciduAXdB7o34U">
          <div
            className="mbr-background-video-preview1"
            //</section>style="overflow: hidden; position: absolute; width: 100%; height: 100%; top: 0px; left: 0px;"
          >
            <iframe
              className="mbr-background-video"
              //id="player"
              id="ytplayer-63b8e9"
              //style="margin-top: 0px; max-width: initial; transition-property: opacity; transition-duration: 1000ms; pointer-events: none; position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; transform: scale(1.2);"
              frameborder="0"
              allowfullscreen=""
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              //title="[NO ADS] Видео Для Собак 🐕 Виртуальная прогулка с собакой 🌲 Расслабляющая Музыка Для Собак"
              // width="1400"
              // height="900"
              //src="http://www.youtube.com/embed/kv3ML8ckmj8?autoplay=1&amp;loop=1&amp;&amp;playlist=kv3ML8ckmj8;"
              //src="https://www.youtube.com/embed/kv3ML8ckmj8?autoplay=1&amp;mute=1&amp;loop=1&amp;controls=0&amp;enablejsapi=1&amp;allowfullscreen=true&amp;showinfo=0&amp;html5=1&amp;version=3&amp;playerapiid=iframe_YTP_1624972482514&amp;widget_referrer=https%3A%2F%2Fa.mobirise.com%2F&amp;widgetid=1"
              src="https://www.youtube.com/embed/uYJQIKAVBw8?autoplay=1&amp;loop=1&amp;playlist=uYJQIKAVBw8&amp;t=20&amp;mute=1&amp;playsinline=1&amp;controls=0&amp;showinfo=0&amp;autohide=1&amp;allowfullscreen=true&amp;mode=transparent"
              // id="hero-16-ur0jvB7rF5"
            >
              {/* style="display: block; background-size: cover;
              background-position: center center; background-image:
              url(&quot;https://img.youtube.com/vi/uYJQIKAVBw8/maxresdefault.jpg&quot;);" */}
            </iframe>
          </div>
          {/* </div> */}
          {/* </div> */}

          <div
            mbr-class2="this | fakeFilter uname__32 _params.fullWidth _params.fullWidth"
            className="container-fluid"
          >
            <div class="row">
              <div
                mbr-class2="this | fakeFilter uname__33 _params.contentWidth"
                className="content-wrap col-12 col-md-12"
              >
                <h1 className="mbr-section-title mbr-fonts-style mbr-white mb-4 display-1">
                  <b>РМО КСУ "Альянс"</b>
                </h1>

                <p className="mbr-fonts-style mbr-text mbr-white mb-4 display-7">
                  Приєднуйтесь до нас на виставці, де собаки – зірки шоу!
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="container">
          <div class="running-line-wrapper">
            <div class="running-line">
              {/* <span>Увага прийшли нові документи.</span>
              <span>Хто чекає, зайдіть на вкладку НОВИНИ *</span> */}

              {<span>{runline}</span>}
              {/* {<span>{run()}</span>} */}
              {/* {<span>{list.map((x) => x.id)}</span>} */}
              {/* users.map((user) => console.log(user.id + ' ' + user.name + ' ' + user.age)) */}
              {/* {
                <span>
                  Відкрита реєстрація на виставку * Відкрита реєстрація на
                  виставку *
                </span>
              } */}
            </div>
          </div>
        </div>

        {/* <div className="container">
          <div class="app-component-content">
            <section
              data-bs-version="5.1"
              className="features10 cid-uAXdB7pzqQ"
              mbr-data-bg-video="this | fakeFilter uname__1 _params.bg.type _params.bg.value.url | toNULL"
              mbr-class2="this | fakeFilter uname__2 _params.bg.parallax"
              mbr-id="_anchor"
              id="metrics-2-uAXdB7pzqQ"
              data-rv-view="16"
            >
              <div
                className="mbr-fallback-image disabled"
                mbr-if="this | fakeFilter uname__26 _params.bg.type"
                data-app-remove-it="true"
                //style="display: none;"
              ></div>
              <div
                className="mbr-overlay"
                mbr-if="this | fakeFilter uname__27 _params.overlay _params.bg.type"
                mbr-style2="this | fakeFilter uname__28 _params.overlayOpacity _params.overlayColor"
                data-app-remove-it="true"
                //style="display: none; opacity: 0.5; background-color: rgb(255, 255, 255);"
              ></div>
              <div
                mbr-class2="this | fakeFilter uname__29 _params.fullWidth _params.fullWidth"
                className="container"
              >
                <div
                  className="row justify-content-center mb-5"
                  // mbr-if="this | fakeFilter uname__30 _params.showMainTitle _params.showMainSubtitle"
                  // data-app-remove-it="true"
                  //style="display: none;"
                ></div>
                <div className="row justify-content-center">
                  <div
                    mbr-class2="this | fakeFilter uname__41 _params.columns"
                    className="item features-without-image col-12 col-md-6 col-lg-4"
                  >
                    <div className="item-wrapper">
                     
                      <p
                        className="card-title mbr-fonts-style mb-3 display-1"
                        mbr-if="this | fakeFilter uname__47 _params.showTitle"
                        data-app-selector=".card-title, .iconfont-wrapper"
                        mbr-class-var="uname__45"
                        mbr-on-change-theme-style="uname__46"
                        data-app-edit="content"
                        mbr-static-html="uname__48"
                        mbr-content-edit="uname__48"
                        data-app-placeholder="Введите Текст"
                        mbr-on-change-component-node="uname__49"
                        data-class-var="display-1"
                      >
                        <b>500+</b>
                      </p>
                      <p
                        className="card-text mbr-fonts-style mb-3 display-7"
                        mbr-if="this | fakeFilter uname__52 _params.showText"
                        data-app-selector=".card-text, .mbr-section-btn"
                        mbr-class-var="uname__50"
                        mbr-on-change-theme-style="uname__51"
                        data-app-edit="content"
                        mbr-static-html="uname__53"
                        mbr-content-edit="uname__53"
                        data-app-placeholder="Введите Текст"
                        mbr-on-change-component-node="uname__54"
                        data-class-var="display-7"
                      >
                        Щасливі собаки
                      </p>
                      <div
                        className="mbr-section-btn mt-2 item-footer mt-2"
                        mbr-if="this | fakeFilter uname__55 _params.showButtons"
                        data-toolbar="-mbrBtnMove,-mbrBtnAdd"
                        mbr-buttons="uname__58"
                        data-app-edit="buttons"
                        mbr-static-html="uname__56"
                        mbr-content-edit="uname__56"
                        mbr-on-change-component-node="uname__57"
                        mbr-class-var="uname__59"
                        mbr-on-change-theme-style="uname__60"
                        data-app-remove-it="true"
                        data-class-var="display-7"
                        
                      ></div>
                      
                    </div>
                  </div>
                  <div
                    mbr-class2="this | fakeFilter uname__61 _params.columns"
                    className="item features-without-image col-12 col-md-6 col-lg-4"
                  >
                    <div className="item-wrapper">
                      <div className="card-box align-left">
                        <p
                          className="card-title mbr-fonts-style mb-3 display-1"
                          mbr-if="this | fakeFilter uname__67 _params.showTitle"
                          data-app-selector=".card-title, .iconfont-wrapper"
                          mbr-class-var="uname__65"
                          mbr-on-change-theme-style="uname__66"
                          data-app-edit="content"
                          mbr-static-html="uname__68"
                          mbr-content-edit="uname__68"
                          data-app-placeholder="Введите Текст"
                          mbr-on-change-component-node="uname__69"
                          data-class-var="display-1"
                        >
                          <b>100+</b>
                        </p>
                        <p
                          className="card-text mbr-fonts-style mb-3 display-7"
                          mbr-if="this | fakeFilter uname__72 _params.showText"
                          data-app-selector=".card-text, .mbr-section-btn"
                          mbr-class-var="uname__70"
                          mbr-on-change-theme-style="uname__71"
                          data-app-edit="content"
                          mbr-static-html="uname__73"
                          mbr-content-edit="uname__73"
                          data-app-placeholder="Введите Текст"
                          mbr-on-change-component-node="uname__74"
                          data-class-var="display-7"
                        >
                          Щасливі власники
                        </p>
                        <div
                          className="mbr-section-btn mt-2 item-footer mt-2"
                          mbr-if="this | fakeFilter uname__75 _params.showButtons"
                          data-toolbar="-mbrBtnMove,-mbrBtnAdd"
                          mbr-buttons="uname__78"
                          data-app-edit="buttons"
                          mbr-static-html="uname__76"
                          mbr-content-edit="uname__76"
                          mbr-on-change-component-node="uname__77"
                          mbr-class-var="uname__79"
                          mbr-on-change-theme-style="uname__80"
                          data-app-remove-it="true"
                          data-class-var="display-7"
                         
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div
                    mbr-class2="this | fakeFilter uname__81 _params.columns"
                    className="item features-without-image col-12 col-md-6 col-lg-4"
                  >
                    <div className="item-wrapper">
                      <div className="card-box align-left">
                        <p
                          className="card-title mbr-fonts-style mb-3 display-1"
                          mbr-if="this | fakeFilter uname__87 _params.showTitle"
                          data-app-selector=".card-title, .iconfont-wrapper"
                          mbr-class-var="uname__85"
                          mbr-on-change-theme-style="uname__86"
                          data-app-edit="content"
                          mbr-static-html="uname__88"
                          mbr-content-edit="uname__88"
                          data-app-placeholder="Введите Текст"
                          mbr-on-change-component-node="uname__89"
                          data-class-var="display-1"
                        >
                          <b>10+</b>
                        </p>
                        <p
                          className="card-text mbr-fonts-style mb-3 display-7"
                          mbr-if="this | fakeFilter uname__92 _params.showText"
                          data-app-selector=".card-text, .mbr-section-btn"
                          mbr-class-var="uname__90"
                          mbr-on-change-theme-style="uname__91"
                          data-app-edit="content"
                          mbr-static-html="uname__93"
                          mbr-content-edit="uname__93"
                          data-app-placeholder="Введите Текст"
                          mbr-on-change-component-node="uname__94"
                          data-class-var="display-7"
                        >
                          Річних вистовок
                        </p>
                        <div
                          className="mbr-section-btn mt-2 item-footer mt-2"
                          mbr-if="this | fakeFilter uname__95 _params.showButtons"
                          data-toolbar="-mbrBtnMove,-mbrBtnAdd"
                          mbr-buttons="uname__98"
                          data-app-edit="buttons"
                          mbr-static-html="uname__96"
                          mbr-content-edit="uname__96"
                          mbr-on-change-component-node="uname__97"
                          mbr-class-var="uname__99"
                          mbr-on-change-theme-style="uname__100"
                          data-app-remove-it="true"
                          data-class-var="display-7"
                          
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div> */}
        {/* </div> */}
      </div>
    </>
  );
};

export default Poster;
