import React, { useRef, useState, useEffect } from "react";
import { Formik, Form } from "formik";
import TextInput from "../common/MyTextInput";
import { useDispatch } from "react-redux";
import validate from "./validationShow";
import { useSelector } from "react-redux";
import MyPhotoInput from "../common/MyPhotoInput";
import { RegisterUser } from "../../actions/auth";
import EclipseWidget from "../common/louding";
import jwt from "jsonwebtoken";
import { push } from "connected-react-router";
import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./FormRegisterShow.css";
import Footer from "../footer/footer";

toast.configure();

const RegisterShow = () => {
  const initState = {
    email: "",
    phone: "",
    owner: "",
    address: "",
    //photo: null,
    password: "",
    confirmPassword: "",
  };
  //const history = useHistory();
  const dispatch = useDispatch();
  const { errors } = useSelector((state) => state.auth);
  const refFormik = useRef();
  const titleRef = useRef();
  const [invalid, setInvalid] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const start = () => {
      gapi.client.init({
        clientId:
          "523681892685-p9t6c2i45qb6p3qnpu6aom6lqdi9ln9r.apps.googleusercontent.com",
        //clientId: '436528464037-jt21etpk10kglcd0fllsua18g18tc9ul.apps.googleusercontent.com',

        scope: "",
      });
    };
    gapi.load("client:auth2", start);
  }, []);

  const onSubmitHandler = async (values) => {
    console.log("erіувапролд");
    console.log("errors", errors);
    try {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) =>
        formData.append(key, value)
      );
      setLoading(true);
      dispatch(RegisterUser(formData))
        .then((result) => {
          setLoading(false);
          toast.warn("Реєстрація успішна", {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 5000,
          });
          dispatch(push("/"));
        })
        .catch((ex) => {
          setLoading(false);
          Object.entries(ex.errors).forEach(([key, values]) => {
            let message = "";
            values.forEach((text) => (message += text + " "));
            refFormik.current.setFieldError(key, message);
          });

          setInvalid(ex.errors.invalid);
          titleRef.current.scrollIntoView({ behavior: "smooth" });
        });
    } catch (error) {
      setLoading(false);
      console.log("Server is bad register from", errors);
    }
  };

  return (
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
          {/* <div className="row">
       <div className="offset-md-3 col-md-5"> */}
          <div className="register">
            <form action="" className="form-cont">
              <br></br>
              <h1 ref={titleRef}>
                Reg<span>!</span>ster
              </h1>
              {/* <h1 ref={titleRef} className="text-center">
          Реєстрація
        </h1> */}
              {invalid && invalid.length > 0 && (
                <div className="alert alert-danger">
                  <ul>
                    {invalid.map((text, index) => {
                      return <li key={index}>{text}</li>;
                    })}
                  </ul>
                </div>
              )}
              <Formik
                innerRef={refFormik}
                initialValues={initState}
                validationSchema={validate()}
                onSubmit={onSubmitHandler}
              >
                <Form>
                  <TextInput
                    placeholder="e-mail"
                    //label="Електронна пошта"
                    name="email"
                    id="email"
                    type="email"
                  />

                  <TextInput
                    placeholder="Телефон"
                    //label="Телефон"
                    name="phone"
                    id="phone"
                    type="text"
                  />

                  <TextInput
                    placeholder="П.І.Б."
                    ///label="ПІБ"
                    name="owner"
                    id="owner"
                    type="text"
                  />

                  <TextInput
                    placeholder="Адреса"
                    //label="Адреса"
                    name="address"
                    id="address"
                    type="text"
                  />

                  <TextInput
                    placeholder="Пароль"
                    //label="Пароль"
                    name="password"
                    id="password"
                    type="password"
                  />

                  <TextInput
                    placeholder="Підтвердження пароля"
                    //label="Підтвердження пароль"
                    name="confirmPassword"
                    id="confirmPassword"
                    type="password"
                  />

                  <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button type="submit" className="submit">
                      Реєстрація
                    </button>
                  </div>
                </Form>
              </Formik>
            </form>

            {loading && <EclipseWidget />}
          </div>
          <Footer />
        </section>
      </div>
    </div>
  );
};

export default RegisterShow;
