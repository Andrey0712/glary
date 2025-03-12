import * as Yup from "yup";

const validate = () => {
  return Yup.object({
    description: Yup.string().required("Коротка інформація"),
  });
};
export default validate;
