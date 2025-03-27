import React, { useRef, useState, useEffect } from "react";
import { Field, Formik, Form, Checkbox } from "formik";
import MyTextInput from "../common/MyTextInput";
import { useDispatch } from "react-redux";
import validate from "./validationShow";
import { useSelector } from "react-redux";
import MyPhotoInput from "../common/MyPhotoInput";
import { RegisterShowDog } from "../../actions/show";
import EclipseWidget from "../common/louding";
import jwt from "jsonwebtoken";
import { push } from "connected-react-router";
import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./FormRegisterShow.css";
import Footer from "../footer/footer";
import { Input, Ripple, initMDB } from "mdb-ui-kit";
import SelectInput from "../common/MySelectField";
import { DEFAULT_BREAKPOINTS } from "react-bootstrap/esm/ThemeProvider";
import { MultiSelect } from "primereact/multiselect";
import { RadioButton } from "primereact/radiobutton";
// import { Checkbox } from "primereact/checkbox";

//initMDB({ Input, Ripple });

toast.configure();

const RegisterShow = () => {
  const initState = {
    radio: "",
    name: "",
    startPhoto: null,
    description: "",
    classId: null,
    price: null,
    quantity: null,
    rating: null,
    // setFieldValue,
  };

  const dispatch = useDispatch();
  const { errors } = useSelector((state) => state.auth);
  const refFormik = useRef();
  const titleRef = useRef();
  const [invalid, setInvalid] = useState([]);
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (values) => {
    console.log("onSubmitHandler", values);
    console.log("errors", errors);
    try {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) =>
        formData.append(key, value)
      );
      setLoading(true);
      console.log("register reuslt", formData);
      dispatch(RegisterShowDog(formData))
        .then((result) => {
          setLoading(false);
          toast.warn("Собаку зареєстровано", {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 3000,
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

  const options = [
    { value: 1, label: "Клас бебі 3-6 місяців" },
    { value: 2, label: "Клас цуценят 6-9 місяців" },
    { value: 3, label: "Клас юніорів 9-18 місяців" },
    { value: 4, label: "Клас інтермедія 15 міс-2 роки" },
    { value: 5, label: "Клас відкритий 15 місяців" },
    { value: 6, label: "Робочий клас з 15 місяців" },
    { value: 7, label: "Клас чемпіонів 15 місяців" },
    { value: 8, label: "Клас ветеранів з 8 років" },
  ];
  const [date, setDate] = useState(null);

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
          <div className="register">
            {/* <section className="h-100 h-custom gradient-custom-2"> */}
            <div className="container py-5 h-100">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12">
                  <div
                    className="card card-registration card-registration-2"
                    // style="border-radius: 15px;"
                  >
                    <div className="card-body p-0">
                      <div className="row g-0">
                        <div className="col-lg-6">
                          <div className="p-5">
                            <h3
                              className="fw-normal mb-5"
                              // style="color: #4835d4;"
                            >
                              Дані Собаки
                            </h3>

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
                              //validationSchema={validate()}
                              onSubmit={onSubmitHandler}
                            >
                              <Form>
                                <div id="my-radio-group">Picked</div>
                                <div
                                  role="group"
                                  aria-labelledby="my-radio-group"
                                >
                                  <label>
                                    <Field
                                      type="radio"
                                      name="radio"
                                      value="One"
                                    />
                                    One
                                  </label>
                                  <label>
                                    <Field
                                      type="radio"
                                      name="radio"
                                      value="Two"
                                    />
                                    Two
                                  </label>
                                </div>
                                {/* <div className="flex align-items-center">
                                  <Field
                                    type="calendar"
                                    name="calendar"
                                    value={date}
                                    onChange={(e) => setDate(e.value)}
                                  />
                                </div> */}

                                {/* <MyBoxField
                        label="Назва товару"
                        name="name"
                        id="name"
                        type="text" /> */}

                                {/*<MyPhotoInput 
                            refFormik={refFormik}
                            field="startPhoto" />

                    <MyTextInput
                        label="Ціна"
                        name="price"
                        id="price"
                        type="text" />

                    <MyTextInput
                        label="Опис"
                        name="description"
                        id="description"
                        type="text" />

                    */}
                                {/* <div className="mb-4 pb-2">
                                  <select data-mdb-select-init>
                                    {options.map((option) => (
                                      <option
                                        key={option.value}
                                        value={option.value}
                                      >
                                        {option.label}
                                      </option>
                                    ))}
                                  </select>
                                </div> */}
                                <SelectInput name="classId" label="Класс">
                                  {options.map((option) => (
                                    <option
                                      key={option.value}
                                      value={option.value}
                                    >
                                      {option.label}
                                    </option>
                                  ))}
                                </SelectInput>
                                <MyTextInput
                                  label="Кількість"
                                  name="quantity"
                                  id="quantity"
                                  type="text"
                                />
                                <MyTextInput
                                  label="Рейтинг"
                                  name="rating"
                                  id="rating"
                                  type="text"
                                />
                                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                  <button type="submit" className="submit">
                                    Реєстрація
                                  </button>
                                </div>
                              </Form>
                            </Formik>

                            <div className="mb-4 pb-2">
                              <select data-mdb-select-init>
                                {options.map((option) => (
                                  <option
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div className="row">
                              <div className="col-md-6 mb-4 pb-2">
                                <div data-mdb-input-init class="form-outline">
                                  <input
                                    type="text"
                                    id="form3Examplev2"
                                    className="form-control form-control-lg"
                                  />
                                  <label
                                    className="form-label"
                                    for="form3Examplev2"
                                  >
                                    First name
                                  </label>
                                </div>
                              </div>
                              <div className="col-md-6 mb-4 pb-2">
                                <div data-mdb-input-init class="form-outline">
                                  <input
                                    type="text"
                                    id="form3Examplev3"
                                    className="form-control form-control-lg"
                                  />
                                  <label
                                    className="form-label"
                                    for="form3Examplev3"
                                  >
                                    Last name
                                  </label>
                                </div>
                              </div>
                            </div>

                            <div className="mb-4 pb-2">
                              <select data-mdb-select-init>
                                <option value="1">Position</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                                <option value="4">Four</option>
                              </select>
                            </div>

                            <div className="mb-4 pb-2">
                              <div data-mdb-input-init class="form-outline">
                                <input
                                  type="text"
                                  id="form3Examplev4"
                                  className="form-control form-control-lg"
                                />
                                <label
                                  className="form-label"
                                  for="form3Examplev4"
                                >
                                  Position
                                </label>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-md-6 mb-4 pb-2 mb-md-0 pb-md-0">
                                <div data-mdb-input-init class="form-outline">
                                  <input
                                    type="text"
                                    id="form3Examplev5"
                                    className="form-control form-control-lg"
                                  />
                                  <label
                                    className="form-label"
                                    for="form3Examplev5"
                                  >
                                    Bussines Arena
                                  </label>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <select data-mdb-select-init>
                                  <option value="1">Employees</option>
                                  <option value="2">Two</option>
                                  <option value="3">Three</option>
                                  <option value="4">Four</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 bg-indigo text-white">
                          <div className="p-5">
                            <h3 className="fw-normal mb-5">Contact Details</h3>

                            <div className="mb-4 pb-2">
                              <div
                                data-mdb-input-init
                                className="form-outline form-white"
                              >
                                <input
                                  type="text"
                                  id="form3Examplea2"
                                  className="form-control form-control-lg"
                                />
                                <label
                                  className="form-label"
                                  for="form3Examplea2"
                                >
                                  Street + Nr
                                </label>
                              </div>
                            </div>

                            <div className="mb-4 pb-2">
                              <div
                                data-mdb-input-init
                                className="form-outline form-white"
                              >
                                <input
                                  type="text"
                                  id="form3Examplea3"
                                  className="form-control form-control-lg"
                                />
                                <label
                                  className="form-label"
                                  for="form3Examplea3"
                                >
                                  Additional Information
                                </label>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-md-5 mb-4 pb-2">
                                <div
                                  data-mdb-input-init
                                  className="form-outline form-white"
                                >
                                  <input
                                    type="text"
                                    id="form3Examplea4"
                                    className="form-control form-control-lg"
                                  />
                                  <label
                                    className="form-label"
                                    for="form3Examplea4"
                                  >
                                    Zip Code
                                  </label>
                                </div>
                              </div>
                              <div className="col-md-7 mb-4 pb-2">
                                <div
                                  data-mdb-input-init
                                  className="form-outline form-white"
                                >
                                  <input
                                    type="text"
                                    id="form3Examplea5"
                                    className="form-control form-control-lg"
                                  />
                                  <label
                                    claclassNamess="form-label"
                                    for="form3Examplea5"
                                  >
                                    Place
                                  </label>
                                </div>
                              </div>
                            </div>

                            <div className="mb-4 pb-2">
                              <div
                                data-mdb-input-init
                                className="form-outline form-white"
                              >
                                <input
                                  type="text"
                                  id="form3Examplea6"
                                  className="form-control form-control-lg"
                                />
                                <label
                                  className="form-label"
                                  for="form3Examplea6"
                                >
                                  Country
                                </label>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-md-5 mb-4 pb-2">
                                <div
                                  data-mdb-input-init
                                  className="form-outline form-white"
                                >
                                  <input
                                    type="text"
                                    id="form3Examplea7"
                                    className="form-control form-control-lg"
                                  />
                                  <label
                                    className="form-label"
                                    for="form3Examplea7"
                                  >
                                    Code +
                                  </label>
                                </div>
                              </div>
                              <div className="col-md-7 mb-4 pb-2">
                                <div
                                  data-mdb-input-init
                                  className="form-outline form-white"
                                >
                                  <input
                                    type="text"
                                    id="form3Examplea8"
                                    className="form-control form-control-lg"
                                  />
                                  <label
                                    className="form-label"
                                    for="form3Examplea8"
                                  >
                                    Phone Number
                                  </label>
                                </div>
                              </div>
                            </div>

                            <div className="mb-4">
                              <div
                                data-mdb-input-init
                                className="form-outline form-white"
                              >
                                <input
                                  type="text"
                                  id="form3Examplea9"
                                  className="form-control form-control-lg"
                                />
                                <label
                                  className="form-label"
                                  for="form3Examplea9"
                                >
                                  Your Email
                                </label>
                              </div>
                            </div>

                            <div className="form-check d-flex justify-content-start mb-4 pb-3">
                              <input
                                className="form-check-input me-3"
                                type="checkbox"
                                value=""
                                id="form2Example3c"
                              />
                              <label
                                className="form-check-label text-white"
                                for="form2Example3"
                              >
                                I do accept the{" "}
                                <a href="#!" class="text-white">
                                  <u>Terms and Conditions</u>
                                </a>{" "}
                                of your site.
                              </label>
                            </div>

                            <button
                              type="button"
                              data-mdb-button-init
                              data-mdb-ripple-init
                              className="btn btn-light btn-lg"
                              data-mdb-ripple-color="dark"
                            >
                              Register
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* </section> */}
            {/*  <form action="" className="form-cont">
              <br></br>
              <h1 ref={titleRef}>
                Reg<span>!</span>ster
              </h1> */}

            {/* {invalid && invalid.length > 0 && (
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
          </Formik> */}
            {/* </form> */}

            {loading && <EclipseWidget />}
          </div>
          <Footer />
        </section>
      </div>
    </div>
  );
};

export default RegisterShow;
