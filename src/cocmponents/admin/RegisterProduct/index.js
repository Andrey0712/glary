import React, { useRef, useState } from "react";
import { Formik, Form } from "formik";
import MyTextInput from "../../common/MyTextInput";
import { useDispatch } from "react-redux";
import validate from "./validation";
import { useSelector } from "react-redux";
import MyPhotoInput from "../../common/MyPhotoInput";
import EclipseWidget from "../../common/louding";
import { push } from "connected-react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RegisterProd } from "../../../actions/RegisterProduct";
import SelectInput from "../../common/MySelectField";
import MyTextarea from "../../common/MyTextarea";
import MyEditor from "../../common/MyEditor";
// import { Editor } from "@tinymce/tinymce-react";
// import { config } from "../../common/config";

toast.configure();

const RegisterProduct = () => {
  const initState = {
    name: "",
    startPhoto: null,
    description: "",
    // categoryId: null,
    // price: null,
    // quantity: null,
    // rating: null,
  };

  //const editorRef = useRef(null);
  // const log = (e) => {
  //   e.preventDefault();
  //   if (editorRef.current) {
  //     console.log(editorRef.current.getContent());
  //   }
  // };

  const dispatch = useDispatch();
  const { errors } = useSelector((state) => state.auth);
  const refFormik = useRef();
  const titleRef = useRef();
  const [invalid, setInvalid] = useState([]);
  const [loading, setLoading] = useState(false);
  //   const [text, setText] = useState("");
  //   const initialValue = `
  // <h2>Full-featured rich text editing experience</h2>
  // <p>No matter what you're building, TinyMCE has got you covered.</p>
  // `.trim();
  //   const [data, setData] = React.useState(initialValue);
  //   console.log("data", data);

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
      dispatch(RegisterProd(formData))
        .then((result) => {
          setLoading(false);
          toast.warn("Новину додано", {
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

  //   const options = [
  //     { value: 1, label: "Корм" },
  //     { value: 2, label: "Вітаміни" },
  //     { value: 3, label: "Іграшки" },
  //     { value: 4, label: "Ветеринарні препарати" },
  //   ];

  return (
    <div className="row ">
      <div className="offset-md-3 col-md-6">
        {/* <div className="flex justify-content-center">
                 <div className="card"> */}
        <h1 ref={titleRef} className="text-center">
          Додати новину
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
          validationSchema={validate()}
          onSubmit={onSubmitHandler}
        >
          <Form>
            <MyTextInput
              label="Назва новини"
              name="name"
              id="name"
              type="text"
            />

            <MyPhotoInput refFormik={refFormik} field="startPhoto" />

            {/* <MyTextarea
              label="Опис"
              name="description"
              id="description"
              type="textarea"
              rows="5"
            /> */}

            <MyEditor
              refFormik={refFormik}
              type="text"
              label="Редактор новин"
              field="description"
              name="description"
              id="description"
              initialValue="<p>Введіть текст</p>"
            />
            {/* <textarea
                style={{ width: "100%", height: "200px" }}
                value={data}
                onChange={(e) => setData(e.target.value)}
              /> */}

            {/* <div>
              <Editor
                apiKey="lw5n4j0uyyr4ous3m69j1xz33a774ktmml656g1wtmnr2fau"
                onInit={(_evt, editor) => (editorRef.current = editor)}
                initialValue="<p>Введіть текст</p>"
                init={{ config }}
              />
              <button onClick={log}>Log editor content</button>
            </div> */}
            {/* <MyTextInput
                        label="Категорія"
                        name="categoryId" 
                        id="categoryId"
                        type="text" /> */}

            {/* <SelectInput name="categoryId" label="Категорія" >
                      {options.map((option) => (
                      <option key={option.value} value={option.value} >
                      {option.label}
                      
                         </option>
                       ))}
                       
                          </SelectInput>` */}

            {/* <MyTextInput
                        label="Кількість"
                        name="quantity"
                        id="quantity"
                        type="text"/>
                    
                    
                    <MyTextInput
                        label="Рейтинг"
                        name="rating"
                        id="rating"
                        type="text"/> */}

            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <button type="submit" className="btn btn-primary">
                Реєстрація новини
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

export default RegisterProduct;
