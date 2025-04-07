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
    mather: Yup.string().required("Вкажіть кличку, № родоводу матері"),
    classId: Yup.string()
      .notOneOf(["0"], "Виберіть категорію")
      .required("Оберіть клас"),
    date: Yup.date()
      .default(() => new Date())
      .required("Оберіть дату народженя"),
    sexId: Yup.string().required("Оберіть стать"),
    showId: Yup.string().required("Оберіть виставку"),
    startPhoto1: Yup.string().required("Додайте фото"),
    startPhoto2: Yup.string().required("Додайте фото"),
    startPhoto3: Yup.string().required("Додайте фото"),
    startPhoto4: Yup.string().required("Додайте фото"),
    startPhoto5: Yup.string().required("Додайте фото"),
    startPhoto6: Yup.string().required("Додайте фото"),
  });
};
export default validate;
