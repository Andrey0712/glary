import React, { useRef, useState } from "react";
import { Formik, Form } from "formik";
import MyTextInput from "../../common/MyTextInput";
import { useDispatch } from "react-redux";
import validate from "./validation";
import { useSelector } from "react-redux";

import EclipseWidget from "../../common/louding";
import { push } from "connected-react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRunLine } from "../../../actions/runLine";
import SelectInput from "../../common/MySelectField";

toast.configure();

const RunLine = () => {
  const initState = {
    description: "",
  };

  const dispatch = useDispatch();
  const { errors } = useSelector((state) => state.auth);
  const refFormik = useRef();
  const titleRef = useRef();
  const [invalid, setInvalid] = useState([]);
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (values) => {
    //console.log("onSubmitHandler", values);
    //console.log("errors", errors);
    try {
      const formData = new FormData();
      //console.log("onSubmitHandler111", formData);
      Object.entries(values).forEach(([key, value]) =>
        formData.append(key, value)
      );
      setLoading(true);
      console.log("register reuslt", formData);
      dispatch(registerRunLine(formData))
        .then((result) => {
          setLoading(false);
          toast.warn("Строку додано", {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 3000,
          });

          dispatch(push("/admin"));
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
    <div className="row ">
      <div className="offset-md-3 col-md-6">
        {/* <div className="flex justify-content-center">
                 <div className="card"> */}
        <h1 ref={titleRef} className="text-center">
          Нова строка
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
        <Formik
          innerRef={refFormik}
          initialValues={initState}
          //validationSchema={validate()}
          onSubmit={onSubmitHandler}
        >
          <Form>
            <MyTextInput
              label="Опис"
              name="description"
              id="description"
              type="text"
            />

            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <button type="submit" className="btn btn-primary">
                Ok!
              </button>
            </div>

            <br />
            <br />
          </Form>
        </Formik>
      </div>

      {loading && <EclipseWidget />}
    </div>
  );
};

export default RunLine;
