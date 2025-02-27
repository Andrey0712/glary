import * as Yup from "yup";

const validate = () => {
  return Yup.object({
    email: Yup.string()
      .email("Не коректно вказана пошта")
      .required("Вкажіть пошту"),
    phone: Yup.string().required("Вкажіть телефон"),
    owner: Yup.string().required("Вкажіть прізвище"),
    address: Yup.string().required("Вкажіть адресу"),
    password: Yup.string()
      .required("Вкажіть пароль.")
      .min(5, "Пароль має містить мінімум 5 символів.")
      .matches(/[a-zA-Z]/, "Пароль має містить латинські символи."),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });
};
export default validate;
