import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import { toast } from "react-toastify";
// import { updateUser } from "../../features/user/userSlice";
import "./Profile.css";
import { EditProfile } from "../../actions/users";
import { Formik, Form } from "formik";
import MyTextInput from "../common/MyTextInput";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((redux) => redux);
  const { errors } = useSelector((state) => state.auth);
  const refFormik = useRef();
  const titleRef = useRef();
  const [invalid, setInvalid] = useState([]);
  const [loading, setLoading] = useState(false);
  //const { currentUser } = useSelector((redux) => redux);
  console.log("Auth user info ", auth);
  const current = auth.user;
  console.log("current ", current);
  // useEffect(() => {
  //   if (!auth) return;
  //   setValues(auth);
  // }, [auth]);

  const initState = {
    email: current.email,
    phone: current.phone,
    owner: current.owner,
    address: current.address,
    //photo: null,
    password: "",
  };

  const onSubmitHandler = async (values) => {
    console.log("values", values);
    console.log("errors", errors);
    try {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) =>
        formData.append(key, value)
      );
      console.log("formdata", { formData });
      setLoading(true);

      dispatch(EditProfile(formData))
        .then((result) => {
          setLoading(false);
          toast.warn("Профаил відредаговано", {
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

  // const [values, setValues] = useState({
  //   email: auth.user.email,
  //   phone: auth.user.phone,
  //   owner: auth.user.owner,
  //   address: auth.user.address,
  //   //photo: null,
  //   password: "",
  // });

  // const handleChange = ({ target: { value, name } }) => {
  //   setValues({ ...values, [name]: value });
  // };

  // const handelSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("values e :", e);
  //   const isNotEmpty = Object.values(values).every((val) => val);
  //   if (!isNotEmpty) return;
  //   console.log("values :", values);
  //   dispatch(EditProfile(values));
  //   toast.warn("Профаил відредаговано", {
  //     position: toast.POSITION.BOTTOM_RIGHT,
  //     autoClose: 3000,
  //   });
  //   dispatch(push("/"));
  //   // console.log("errors", errors);
  //   // try {
  //   //   const formData1 = new FormData();
  //   //   Object.entries(values).forEach(([key, value]) =>
  //   //     formData1.append(key, value)
  //   //   );
  //   //   setLoading(true);
  //   //   console.log("result", { formData1 });
  //   //   dispatch(EditProfile(formData1))
  //   //     .then((result) => {
  //   //       console.log("edit complete--------------");
  //   //       //console.log("update ok");
  //   //       setLoading(false);
  //   //       toast.warn("Профаил відредаговано", {
  //   //         position: toast.POSITION.BOTTOM_RIGHT,
  //   //         autoClose: 3000,
  //   //       });

  //   //       dispatch(push("/"));
  //   //     })
  //   //     .catch((ex) => {
  //   //       setLoading(false);
  //   //       Object.entries(ex.errors).forEach(([key, values]) => {
  //   //         let message = "";
  //   //         values.forEach((text) => (message += text + " "));
  //   //         refFormik.current.setFieldError(key, message);
  //   //       });

  //   //       setInvalid(ex.errors.invalid);
  //   //       titleRef.current.scrollIntoView({ behavior: "smooth" });
  //   //     });
  //   // } catch (error) {
  //   //   setLoading(false);
  //   //   console.log("Server is bad register from", errors);
  //   // }
  // };

  return (
    <section className="profileProfile">
      {/* <div className="titleLog">Профаил {auth.user.owner}</div> */}
      {/* <form action="" className="formProfile"> */}
      {/* {!auth ? (
        <span>Ви не зареєстровані</span>
      ) : (
        <form
          action=""
          className="formProfile"
          //onSubmit={handelSubmit}
        > */}
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
          <div className="groupProfile col-md-6 mb-3">
            <MyTextInput
              //placeholder="e-mail"
              label="Електронна пошта"
              name="email"
              id="email"
              type="email"
            />
          </div>
          <div className="groupProfile col-md-6 mb-3">
            <MyTextInput
              //placeholder="Телефон"
              label="Телефон"
              name="phone"
              id="phone"
              type="text"
            />
          </div>
          <div className="groupProfile col-md-6 mb-3">
            <MyTextInput
              //placeholder="П.І.Б."
              label="ПІБ"
              name="owner"
              id="owner"
              type="text"
            />
          </div>
          <div className="groupProfile col-md-6 mb-3">
            <MyTextInput
              //placeholder="Адреса"
              label="Адреса"
              name="address"
              id="address"
              type="text"
            />
          </div>
          <div className="groupProfile col-md-6 mb-3">
            <MyTextInput
              //placeholder="Пароль"
              label="Пароль"
              name="password"
              id="password"
              type="text"
            />
          </div>

          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <button type="submit" className="btn btn-primary">
              Змінити данні профайла
            </button>
          </div>
        </Form>
      </Formik>
      {/* <div className="groupProfile">
            <input
              type="text"
              placeholder="Your name"
              name="owner"
              value={values.owner}
              autoComplete="off"
              onChange={handleChange}
              required
              className="col-md-6 mb-3 "
            />
          </div>
          <div className="groupProfile">
            <input
              type="email"
              placeholder="Your email"
              name="email"
              value={values.email}
              autoComplete="off"
              onChange={handleChange}
              required
              className="col-md-6 mb-3 "
            />
          </div>

          <div className="groupProfile">
            <input
              type="phone"
              placeholder="Your phone"
              name="phone"
              value={values.phone}
              autoComplete
              onChange={handleChange}
              required
              className="col-md-6 mb-3 "
            />
          </div>
          <div className="groupProfile">
            <input
              type="address"
              placeholder="Your address"
              name="address"
              value={values.address}
              autoComplete
              onChange={handleChange}
              required
              className="col-md-6 mb-3 "
            />
          </div>
          <div className="groupProfile">
            <input
              type="password"
              placeholder="Your password"
              name="password"
              value={values.password}
              autoComplete="off"
              onChange={handleChange}
              required
              toggleMask
              className="col-md-6 mb-3 "
            />
          </div>
          <button type="Submit" className="submit">
            Змінити данні профайла
          </button> */}
      {/* </form> */}
      {/* )} */}
    </section>
  );
};
export default ProfilePage;
