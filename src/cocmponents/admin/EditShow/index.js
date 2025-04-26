import React, { useRef, useState } from "react";
import { Formik, Form } from "formik";
import MyTextInput from "../../common/MyTextInput";
import MyTextarea from "../../common/MyTextarea";
import { useDispatch } from "react-redux";
import validate from "../RegisterProduct/validation";
import { useSelector } from "react-redux";
import MyPhotoInput from "../../common/MyPhotoInput";
import EclipseWidget from "../../common/louding";
import { push } from "connected-react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EditShowItem } from "../../../actions/show";
import { urlBackend } from "../../../http_common";
import "../../show/FormRegisterShow.css";

toast.configure();

const EditShow = () => {
  var url = new URL(window.location.href);
  const showId = url.searchParams.get("id");

  console.log("Id current prod:", showId);
  const { list } = useSelector((res) => res.show);

  //find user for delete from id.
  const current = list.find((show) => show.id == showId);
  console.log("current:", current);

  const initState = {
    id: showId,
    nameDog: current.nameDog,
    color: current.color,
    breed: current.breed,
    //classIdEntity: current.classIdEntity,
    date: current.date,
    pedigree: current.pedigree,
    chip: current.chip,
    father: current.father,
    mather: current.mather,
    adress: current.adress,
    owner: current.owner,
    breeder: current.breeder,
    phone: current.phone,
    email: current.email,
    startPhoto1: urlBackend + current.startPhoto1,
    startPhoto2: urlBackend + current.startPhoto2,
    startPhoto3: urlBackend + current.startPhoto3,
    startPhoto4: urlBackend + current.startPhoto4,
    startPhoto5: urlBackend + current.startPhoto5,
    startPhoto6: urlBackend + current.startPhoto6,
  };

  const dispatch = useDispatch();
  const { errors } = useSelector((state) => state.auth);
  const refFormik = useRef();
  const titleRef = useRef();
  const [invalid, setInvalid] = useState([]);
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (values) => {
    console.log("errors", errors);
    try {
      const formData1 = new FormData();
      Object.entries(values).forEach(([key, value]) =>
        formData1.append(key, value)
      );
      setLoading(true);
      console.log("result", { formData1 });
      dispatch(EditShowItem(formData1))
        .then((result) => {
          console.log("edit complete--------------");
          //console.log("update ok");
          setLoading(false);
          toast.warn("Заявку відредаговано", {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 3000,
          });

          dispatch(push("/admin/oderlist"));
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
    <div className="register">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12">
            <div className="card card-registration card-registration-2">
              {/* <div className="row">
      <div className="offset-md-3 col-md-6"> */}
              <h4 ref={titleRef} className="text-center">
                Редагуваня заявки №{showId} на виставку {current.showIdEntity}
              </h4>
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
                  {/* <div className="card-body p-0"> */}
                  {/* <div className="row g-0"> */}
                  {/* <div className="col-lg-6"> */}
                  <div className="p-5">
                    <div className="row">
                      <div className="col-md-3 mb-2 ">
                        <div className="form-white">
                          <MyTextInput
                            label="Кличка собаки"
                            name="nameDog"
                            id="nameDog"
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="col-md-3 mb-2 ">
                        <div className="form-white">
                          <MyTextInput
                            label="Порода"
                            name="breed"
                            id="breed"
                            type="text"
                          />{" "}
                        </div>
                      </div>

                      <div className="col-md-3 mb-2 ">
                        <div className="form-white">
                          <MyTextInput
                            label="Окрас"
                            name="color"
                            id="color"
                            type="text"
                          />{" "}
                        </div>
                      </div>
                      <div className="col-md-3 mb-2 ">
                        <div className="form-white">
                          <MyTextInput
                            label="Дата народженя"
                            name="date"
                            id="date"
                            type="text"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-3 mb-2 ">
                        <div className="form-white">
                          <MyTextInput
                            label="Номер родоводу"
                            name="pedigree"
                            id="pedigree"
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="col-md-3 mb-2 ">
                        <div className="form-white">
                          <MyTextInput
                            label="Чіп або тату"
                            name="chip"
                            id="chip"
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="col-md-3 mb-2 ">
                        <div className="form-white">
                          <MyTextInput
                            label="Батько"
                            name="father"
                            id="father"
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="col-md-3 mb-2 ">
                        <div className="form-white">
                          <MyTextInput
                            label="Мати"
                            name="mather"
                            id="mather"
                            type="text"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-10 mb-2 ">
                        <div className="form-white">
                          <MyTextInput
                            label="Адреса"
                            name="adress"
                            id="adress"
                            type="text"
                          />{" "}
                        </div>
                      </div>
                      <div className="col-md-2 mb-2 ">
                        <div className="form-white">
                          <MyTextInput
                            label="Телефон"
                            name="phone"
                            id="phone"
                            type="text"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4 mb-2 ">
                        <div className="form-white">
                          <MyTextInput
                            label="Власник"
                            name="owner"
                            id="owner"
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="col-md-4 mb-2 ">
                        <div className="form-white">
                          <MyTextInput
                            label="Заводчик"
                            name="breeder"
                            id="breeder"
                            type="text"
                          />
                        </div>
                      </div>

                      <div className="col-md-4 mb-2 ">
                        <div className="form-white">
                          <MyTextInput
                            label="E-mail"
                            name="email"
                            id="email"
                            type="text"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-2 mb-2 ">
                        <div className="form-white">
                          <MyPhotoInput
                            refFormik={refFormik}
                            field="startPhoto1"
                            image={initState.startPhoto1}
                          />{" "}
                        </div>
                      </div>
                      <div className="col-md-2 mb-2 ">
                        <div className="form-white">
                          <MyPhotoInput
                            refFormik={refFormik}
                            field="startPhoto2"
                            image={initState.startPhoto2}
                          />{" "}
                        </div>
                      </div>
                      <div className="col-md-2 mb-2 ">
                        <div className="form-white">
                          <MyPhotoInput
                            refFormik={refFormik}
                            field="startPhoto3"
                            image={initState.startPhoto3}
                          />{" "}
                        </div>
                      </div>
                      <div className="col-md-2 mb-2 ">
                        <div className="form-white">
                          <MyPhotoInput
                            refFormik={refFormik}
                            field="startPhoto4"
                            image={initState.startPhoto4}
                          />{" "}
                        </div>
                      </div>
                      <div className="col-md-2 mb-2 ">
                        <div className="form-white">
                          <MyPhotoInput
                            refFormik={refFormik}
                            field="startPhoto5"
                            image={initState.startPhoto5}
                          />{" "}
                        </div>
                      </div>
                      <div className="col-md-2 mb-2 ">
                        <div className="form-white">
                          <MyPhotoInput
                            refFormik={refFormik}
                            field="startPhoto6"
                            image={initState.startPhoto6}
                          />{" "}
                        </div>
                      </div>
                    </div>
                    {/* <MyTextInput
                        label="Ціна"
                        name="price"
                        id="price"
                        type="text" /> */}

                    {/* <MyTextarea
              label="Опис"
              name="description"
              id="description"
              type="textarea"
              rows="4"
            /> */}

                    {/* <MyTextInput
                        label="Категорія"
                        name="categoryId"
                        id="categoryId"
                        type="text" /> */}

                    {/* <MyTextInput
                        label="Рейтинг"
                        name="rating"
                        id="rating"
                        type="text"/>

                    <MyTextInput
                        label="Кількість"
                        name="quantity"
                        id="quantity"
                        type="text"/> */}

                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                      <button type="submit" className="btn btn-primary">
                        Редагуваня
                      </button>
                    </div>
                  </div>
                  {/* </div> */}
                  {/* </div> */}
                  {/* </div> */}
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
      {loading && <EclipseWidget />}
    </div>
  );
};

export default EditShow;
