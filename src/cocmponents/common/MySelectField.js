import React from "react";

import { useField } from "formik";
import Select from "react-select";

function SelectInput({ label, ...props }) {
  const [field, meta, { setValue, setTouched }] = useField(props);
  const options = props.children.map((option) => ({
    value: option.props.value,
    label: option.props.children,
    // placeholder:option.props.children,
  }));

  const onChange = ({ value }) => {
    setValue(value);
  };

  return (
    <div className="mb-3">
      <label htmlFor={props.id || props.name} className="form-label">
        {label}
      </label>
      <Select
        // defaultValue={label}
        defaultValue={options.find((option) => option.value === field.value)}
        options={options}
        onChange={onChange}
        onBlur={setTouched}
      />
      {meta.touched && meta.error ? (
        //<div className="form-text text-danger">{meta.error}</div>
        <div className="form-text text-danger">Оберіть значення...</div>
      ) : null}
    </div>
  );
}
export default SelectInput;
