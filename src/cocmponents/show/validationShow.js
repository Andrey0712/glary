import * as Yup from "yup";

const validate = () => {
  return Yup.object({
    email: Yup.string()
      .email("Не коректно вказана пошта")
      .required("Вкажіть пошту"),
    phone: Yup.string().required("Вкажіть телефон"),
    owner: Yup.string().required("Вкажіть П.І.Б. власника"),
    adress: Yup.string().required("Вкажіть адресу"),
    nameDog: Yup.string().required("Вкажіть кличку собаки"),
    color: Yup.string().required("Вкажіть окрас "),
    breed: Yup.string().required("Вкажіть породу"),
    pedigree: Yup.string().required("Вкажіть номер родоводу"),
    chip: Yup.string().required("Вкажіть чіпу або тату"),
    breeder: Yup.string().required("Вкажіть П.І.Б. заводчика"),
    father: Yup.string().required("Вкажіть кличку, № родоводу батька "),
    mather: Yup.string().required("Вкажіть кличку, № родоводу батька"),
  });
};
export default validate;
// showId: null,
// sexId: null,

// startPhoto1: null,
// startPhoto2: null,
// startPhoto3: null,
// startPhoto4: null,
// startPhoto5: null,
// startPhoto6: null,
// classId: null,
// date: new Date(),
