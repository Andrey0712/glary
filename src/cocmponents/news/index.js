import React, { useState, useEffect, useRef } from "react";
//import "../../Components/Houme/Home.css";
//import BG from "../../images/marka.jpg";
import "./News.css";
import Footer from "../../cocmponents/footer/footer";
import { useDispatch, useSelector } from "react-redux";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Rating } from "primereact/rating";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { getProduct } from "../../actions/products";
import { urlBackend } from "../../http_common";
import productService from "../../services/product.service";
import { push } from "connected-react-router";

const News = () => {
  let emptyProduct = {
    name: "",
    image: null,
    description: "",
    dateCreate: "",
  };

  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [product, setProduct] = useState(emptyProduct);
  const [selectedProducts, setSelectedProducts] = useState(null);

  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const { list } = useSelector((state) => state.prod);

  useEffect(() => {
    try {
      dispatch(getProduct())
        .then(() => {
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
            {/* <div
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
            ></div> */}
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
                    <h1
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
                      <b>Новини нашого клуб</b>
                    </h1>

                    {/* <div className="row justify-content-center align-items-center item features-image">
                      <div className="col-12 ">
                        <div className="item-wrapper">
                          <div className="row">
                            <img
                              className="w-100"
                              src="https://a.mobirise.com/app/themes/startm5/components/_images/hightlights/6.jpg"
                              alt="Mobirise Website Builder"
                              mbr-media="uname__44"
                              mbr-media-simple="true"
                              mbr-on-click="uname__45"
                              media-simple="true"
                            />
                          </div>
                          <div className="col-12 col-lg col-md-12">
                            <div className="text-wrapper align-left">
                              <h5
                                className="mbr-section-title mbr-fonts-style mb-3 display-5"
                                data-app-selector=".mbr-section-title"
                                mbr-if="this | fakeFilter uname__48 _params.showTitle"
                                mbr-class-var="uname__46"
                                mbr-on-change-theme-style="uname__47"
                                data-app-edit="content"
                                mbr-static-html="uname__49"
                                mbr-content-edit="uname__49"
                                data-app-placeholder="Введите Текст"
                                mbr-on-change-component-node="uname__50"
                                data-class-var="display-5"
                              >
                                <b>Portrait Perfection Workshop</b>
                              </h5>
                              <p
                                className="price mbr-fonts-style mb-3 display-7"
                                mbr-if="this | fakeFilter uname__53 _params.showPrice"
                                data-app-selector=".price"
                                mbr-class-var="uname__51"
                                mbr-on-change-theme-style="uname__52"
                                data-app-edit="content"
                                mbr-static-html="uname__54"
                                mbr-content-edit="uname__54"
                                data-app-placeholder="Введите Текст"
                                mbr-on-change-component-node="uname__55"
                                data-class-var="display-7"
                              >
                                July 12-13, 2025
                              </p>
                              <p
                                className="mbr-text mbr-fonts-style mb-3 display-7"
                                mbr-if="this | fakeFilter uname__58 _params.showText"
                                data-app-selector=".mbr-text, .mbr-section-btn"
                                mbr-class-var="uname__56"
                                mbr-on-change-theme-style="uname__57"
                                data-app-edit="content"
                                mbr-static-html="uname__59"
                                mbr-content-edit="uname__59"
                                data-app-placeholder="Введите Текст"
                                mbr-on-change-component-node="uname__60"
                                data-class-var="display-7"
                              >
                                Elevate your portrait photography to new
                                heights. From candid street shots to controlled
                                studio setups, you'll master the art of
                                capturing compelling portraits.
                              </p>
                            </div>
                           
                          </div>
                        </div>
                      </div>
                    </div> */}

                    {list &&
                      list.map((item, index) => (
                        <tr id={item.id} key={index}>
                          <div className="row justify-content-center">
                            <div className="card-wrapper">
                              <h3 className="itemName">
                                <b>{item.name}</b>
                              </h3>
                              <div className="container">
                                <div className="how-to-buy">
                                  <td>
                                    {
                                      <img
                                        width="200"
                                        height="160"
                                        src={`${urlBackend}` + item.image}
                                        alt="no image"
                                      />
                                    }
                                  </td>{" "}
                                  <div className="app-component-content">
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html: item.description,
                                      }}
                                    />
                                    {/* <p>{item.description}</p> */}
                                    <span className="dataCreate">
                                      {item.dateCreate}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </tr>
                      ))}
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </section>
        </div>
      </div>
    </>
  );
};

export default News;
