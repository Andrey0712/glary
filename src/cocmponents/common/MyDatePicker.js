import React from "react";
import { useField } from "formik";
import DatePicker from "react-datepicker";
// Styles
// import "./styles.css";
import "react-datepicker/dist/react-datepicker.css";

const MyDatePicker = ({ name = "" }) => {
  const [field, meta, helpers] = useField(name);

  const { value } = meta;
  const { setValue } = helpers;

  return (
    <DatePicker
      {...field}
      selected={value}
      onChange={(date) => setValue(date)}
    />
  );
};
export default MyDatePicker;
