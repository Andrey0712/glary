import React, { useRef, useState } from "react";
import { Formik, Form } from "formik";
import MyTextInput from "../../common/MyTextInput";
import { useDispatch } from "react-redux";
// import validate from "../RegisterProduct/validation";
import { useSelector } from "react-redux";
// import MyPhotoInput from "../../common/MyPhotoInput";
import EclipseWidget from "../../common/louding";
import { push } from "connected-react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { editRunLine } from "../../../actions/runLine";
// import { urlBackend } from "../../../http_common";

toast.configure();

const EditRun = () => {
  var url = new URL(window.location.href);
  const runLineId = url.searchParams.get("id");

  console.log("Id current prod:", runLineId);
  const { list } = useSelector((res) => res.runLine);

  //find user for delete from id.
  const current = list.find((prod) => prod.id == runLineId);
  console.log("current:", current);

  const initState = {
    id: runLineId,
    description: current.description,
  };

  const dispatch = useDispatch();
  const { errors } = useSelector((state) => state.auth);
  const refFormik = useRef();
  const titleRef = useRef();
  const [invalid, setInvalid] = useState([]);
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (values) => {
    console.log("values", values);
    try {
      const formData1 = new FormData();
      Object.entries(values).forEach(([key, value]) =>
        formData1.append(key, value)
      );

      setLoading(true);
      console.log("result", { formData1 });
      dispatch(editRunLine(formData1))
        .then((result) => {
          console.log("edit complete--------------");

          setLoading(false);
          toast.warn("RunLine відредаговано", {
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
    <div className="row">
      <div className="offset-md-1 col-md-11">
        <h1 ref={titleRef} className="text-center">
          Редагуваня RunLine
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
                Редагуваня
              </button>
            </div>
          </Form>
        </Formik>
      </div>

      {loading && <EclipseWidget />}
    </div>
  );
};

export default EditRun;
