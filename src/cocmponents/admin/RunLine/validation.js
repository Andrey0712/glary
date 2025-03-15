import * as Yup from "yup";

const validate = () => {
  return Yup.object({
    description: Yup.string().required(
      "Коротка інформація.Строка не може бути пустою"
    ),
  });
};
export default validate;
