// import React, {useRef,useState,useEffect } from 'react'
// import { Formik,Form } from 'formik'
// import TextInput from '../../common/MyTextInput'
// import  validateLog  from './validation'
// import { useDispatch } from 'react-redux'
// import { useSelector } from 'react-redux'
// import EclipseWidget from '../../common/louding';
// import { LoginUser, isRole, GoogleLoginUser } from '../../../actions/auth';
// import jwt from 'jsonwebtoken';
// import { push } from 'connected-react-router';
// import GoogleLogin from 'react-google-login';
// import { gapi } from 'gapi-script';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'

// toast.configure();

// const LoginPage = () => {

//     const initState = {
//         email: '',
//         password: ''
//     }
//     const dispatch = useDispatch();
//     const [invalid, setInvalid] = useState([]);
//     const titleRef = useRef();

//     useEffect(() => {
//         const start = () => {
//             gapi.client.init({
//                 clientId: '523681892685-p9t6c2i45qb6p3qnpu6aom6lqdi9ln9r.apps.googleusercontent.com',
//                 //clientId: '436528464037-jt21etpk10kglcd0fllsua18g18tc9ul.apps.googleusercontent.com',

//                 scope: ''
//             });
//         }
//         gapi.load('client:auth2', start);

//     }, []);

//     const responseGoogle = (response) => {
//         console.log(response);
//         let data = {
//             provider: "Google",
//             token: response.tokenId
//         };
//         try {

//             dispatch(GoogleLoginUser(data))
//                 .then(result => {
//                     let user = jwt.decode(result);
//                     // if (isRole(user, 'admin')) {
//                     //     dispatch(push("/admin"));
//                     //     return;
//                     // }
//                     toast.warn ("Авторизація успішна",{position: toast.POSITION.BOTTOM_RIGHT,autoClose:5000});
//                     dispatch(push("/"));
//                 })
//                 .catch(ex => {
//                     console.log("exception: ", ex);
//                     // setInvalid(ex.errors.invalid);
//                     // titleRef.current.scrollIntoView({ behavior: 'smooth' })

//                 });
//         }
//         catch (error) {
//             console.log("Server is bad register from", error);
//         }
//       }

//     const onSubmitHandler=(values) => {
//         try {

//             dispatch(LoginUser(values))
//                 .then(result => {
//                     let user = jwt.decode(result);
//                     if (isRole(user, 'admin')) {
//                         dispatch(push("/admin"));
//                         return;
//                     }
//                     toast.warn ("Авторизація успішна",{position: toast.POSITION.BOTTOM_RIGHT,autoClose:5000});
//                     dispatch(push("/"));
//                 })
//                 .catch(ex => {
//                     console.log("exception: ", ex);
//                     setInvalid(ex.errors.invalid);
//                     titleRef.current.scrollIntoView({ behavior: 'smooth' })

//                 });
//         }
//         catch (error) {
//             console.log("Server is bad register from", error);
//         }
//     }

//     return (
//         <div className="row">
//             <div className="offset-md-3 col-md-5">
//             <br/>
//                 <h1 ref={titleRef} className="text-center">Вхід на сайт</h1>
//                 {invalid && invalid.length > 0 &&
//                     <div className="alert alert-danger">
//                         <ul>
//                             {
//                                 invalid.map((text, index) => {
//                                     return (
//                                         <li key={index}>{text}</li>

//                                     );
//                                 })
//                             }
//                         </ul>
//                     </div>

//                 }
//                 <Formik
//                     initialValues={initState}
//                     validationSchema={validateLog()}
//                     onSubmit={onSubmitHandler}
//                 >
//                     <Form>
//                         <TextInput
//                             label="Пошта"
//                             id="email"
//                             name="email"
//                             type="text"
//                         />

//                         <TextInput
//                             label="Пароль"
//                             id="password"
//                             name="password"
//                             type="password"
//                         />
//                         <div className="d-grid gap-2 d-md-flex justify-content-md-end">
//                             <input type="submit" className="btn btn-primary" value="Вхід"></input>
//                         </div>

//                         <hr/>
//                         <h1 ref={titleRef} className="text-center">Вхід на сайт через Google</h1>

//                         <GoogleLogin className="col-3 mx-auto justify-md-end d-md-flex"
//                     clientId="523681892685-p9t6c2i45qb6p3qnpu6aom6lqdi9ln9r.apps.googleusercontent.com"
//                     //clientId="436528464037-jt21etpk10kglcd0fllsua18g18tc9ul.apps.googleusercontent.com"
//                     buttonText="Login"
//                     onSuccess={responseGoogle}
//                     onFailure={responseGoogle}
//                     // cookiePolicy={'http://localhost:3000'}
//                 />
//                     </Form>
//                 </Formik>

//             </div>

//         </div>
//     )
// }

// export default LoginPage

import React, { useRef, useEffect, useState } from "react";
import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { Dialog } from "primereact/dialog";
import { Divider } from "primereact/divider";
import { classNames } from "primereact/utils";
import { useDispatch } from "react-redux";
import { LoginUser, isRole } from "../../../actions/auth";
import jwt from "jsonwebtoken";
import { push } from "connected-react-router";
// import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./FormDemo.css";
import { Link } from "react-router-dom";
import { Calendar } from "primereact/calendar";
import { RegisterShowDog } from "../../../actions/show";
// import Footer from "../../../cocmponents/footer/footer";

toast.configure();

const LoginPage = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const [invalid, setInvalid] = useState([]);
  const titleRef = useRef();
  // const [date, setDate] = useState(null);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      // radio: "",
      //date: "",
    },

    validate: (data) => {
      let errors = {};

      if (!data.email) {
        errors.email = "Заповніть поле";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)
      ) {
        errors.email = "Некоректний email. example@email.com";
      }

      if (!data.password) {
        errors.password = "Заповніть поле.";
      } else if (!/[A-Z0-9]$/i.test(data.password)) {
        errors.password = "Некоректний пароль. qwert9";
      }

      return errors;
    },

    onSubmit: (data) => {
      try {
        setFormData(data);
        console.log("data: ", data);
        dispatch(LoginUser(data))
          //dispatch(RegisterShowDog(data))
          .then((result) => {
            let user = jwt.decode(result);
            if (isRole(user, "admin")) {
              dispatch(push("/admin"));
              return;
            }

            formik.resetForm();
            toast.warn("Авторизація успішна", {
              position: toast.POSITION.BOTTOM_RIGHT,
              autoClose: 5000,
            });
            dispatch(push("/"));
          })
          .catch((ex) => {
            console.log("exception: ", ex);
            setShowMessage(true);

            dispatch(push("/login"));
          });
      } catch (error) {
        console.log("Server is bad register from", error);
      }
    },
  });

  useEffect(() => {
    const start = () => {
      gapi.client.init({
        clientId:
          "523681892685-p9t6c2i45qb6p3qnpu6aom6lqdi9ln9r.apps.googleusercontent.com",

        scope: "",
      });
    };
    gapi.load("client:auth2", start);
  }, []);

  // const responseGoogle = (response) => {
  //   console.log(response);
  //   let data = {
  //     provider: "Google",
  //     token: response.tokenId,
  //   };
  //   try {
  //     dispatch(GoogleLoginUser(data))
  //       .then((result) => {
  //         toast.warn("Авторизація успішна", {
  //           position: toast.POSITION.BOTTOM_RIGHT,
  //           autoClose: 5000,
  //         });
  //         dispatch(push("/"));
  //       })
  //       .catch((ex) => {
  //         console.log("exception: ", ex);
  //       });
  //   } catch (error) {
  //     console.log("Server is bad register from", error);
  //   }
  // };

  const isFormFieldValid = (name) =>
    !!(formik.touched[name] && formik.errors[name]);
  const getFormErrorMessage = (name) => {
    return (
      isFormFieldValid(name) && (
        <small className="p-error">{formik.errors[name]}</small>
      )
    );
  };

  const dialogFooter = (
    <div className="flex justify-content-center">
      <Button
        label="OK"
        className="p-button-text"
        autoFocus
        onClick={() => setShowMessage(false)}
      />
    </div>
  );
  const passwordHeader = <h6>Pick a password</h6>;
  const passwordFooter = (
    <React.Fragment>
      <Divider />
      {/* <p className="mt-0">Поради</p> */}
      <ul className="pl-2 ml-1 mt-0" style={{ lineHeight: "1.5" }}>
        <li>Мінімум 5 латинських символів</li>
        <li>Мінімум одна цифра</li>
      </ul>
    </React.Fragment>
  );

  return (
    <div class="login">
      <Dialog
        visible={showMessage}
        onHide={() => setShowMessage(false)}
        position="center"
        footer={dialogFooter}
        showHeader={false}
        breakpoints={{ "960px": "80vw" }}
        style={{ width: "30vw" }}
      >
        <div className="flex align-items-center flex-column pt-6 px-3">
          <i
            className="pi pi-undo"
            style={{ fontSize: "5rem", color: "var(--blue-500)" }}
          ></i>
          <div className="flex justify-content-center">
            <br />
            <h4>Помилка авторизациї!</h4>
            <br />
            <h5>
              Якщо Ви не зареєстрованний користувач - перейдіть на вкладку
              реєстрація!
            </h5>
          </div>
        </div>
      </Dialog>
      {/* <div className="flex justify-content-center">
            <div className="card"> */}
      <form onSubmit={formik.handleSubmit} className="form-cont">
        <h1 ref={titleRef}>
          Log<span>!</span>n
        </h1>
        {invalid && invalid.length > 0 && (
          <div className="alert alert-danger">
            <ul>
              {invalid.map((text, index) => {
                return <li key={index}>{text}</li>;
              })}
            </ul>
          </div>
        )}
        {/* <h2 className="text-center">Авторизація</h2>
               <form onSubmit={formik.handleSubmit} className="p-fluid">  */}
        <div className="field">
          <span className="p-float-label p-input-icon-right">
            <i className="pi pi-envelope" />
            <InputText
              id="email"
              placeholder="e-mail"
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              className={classNames({
                "p-invalid": isFormFieldValid("email"),
              })}
            />
            {/* <label
              htmlFor="email"
              className={classNames({
                "p-error": isFormFieldValid("email"),
              })}
            >
              Email*
            </label> */}
          </span>
          {getFormErrorMessage("email")}
        </div>
        <div className="field">
          <span className="p-float-label">
            <Password
              id="password"
              placeholder="Пароль"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              feedback={false}
              tabIndex={1}
              toggleMask
              // className={classNames({
              //   "p-invalid": isFormFieldValid("password"),
              // })}
              //header={passwordHeader}
              //footer={passwordFooter}
            />
            {/* <label
              htmlFor="password"
              className={classNames({
                "p-error": isFormFieldValid("password"),
              })}
            >
              Пароль*
            </label> */}
          </span>
          {getFormErrorMessage("password")}
        </div>
        {/* <div className="field">
          <span className="p-float-label">
            <Calendar
              name="date"
              id="date"
              type=" "
              value={formik.values.date}
              onChange={formik.handleChange}
              placeholder="Дата народженя"
              //locale={uk}
              //onChange={(e) => setDate(e.value)}
              dateFormat="dd/mm/yy"
            />
          </span>
        </div> */}
        {/* <div className="field">
          <span className="p-float-label"> */}
        {/* <div className="flex align-items-center">
          <input
            type="radio"
            className="radio"
            name="radio"
            value="shom1111"
            id="radio"
            onChange={formik.handleChange}
            checked={formik.values.radio === "shom1111"}
          />
          <label htmlFor="ingredient1" className="ml-2">
            Cheese
          </label>
          <input
            type="radio"
            className="radio"
            name="radio"
            value="shom222"
            id="radio"
            onChange={formik.handleChange}
            checked={formik.values.radio === "shom222"}
          />
          <label htmlFor="ingredient1" className="ml-2">
            Cheese222
          </label>
        </div> */}

        {/* <Button type="submit" label="Вхід на сайт" className="mt-2" /> */}
        <button type="submit" className="submit">
          Авторизація
        </button>
        <h6
          ref={titleRef}
          //className="text-center"
        >
          Якщо відсутній обліковий запис,
          <Link
            //className="col-3 mx-auto justify-md-end d-md-flex"
            //className="nav-link"

            to="/register"
          >
            перейдіть за посиланям
          </Link>
        </h6>
      </form>
    </div>
  );
};
export default LoginPage;
