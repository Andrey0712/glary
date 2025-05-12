import { FC, useRef } from "react";
import {
  Editor,
  //IAllProps,
} from "@tinymce/tinymce-react/lib/cjs/main/ts/components/Editor";
//import { Editor } from "@tinymce/tinymce-react";
import { config } from "./config";
import classNames from "classnames";
import { useState } from "react";

// interface EditorProps extends IAllProps {
//   label: string;
//   field: string;
//   touched?: boolean | null;
//   error?: string | null;
// }
//
//consol.log("editor", editorRef.current.getContent());
const MyEditor = ({
  refFormik,
  label,
  touched = null,
  error = null,
  field,
  ...props
}) => {
  const editorRef = useRef(null);
  const [startText, setText] = useState();
  const onChangeHandler = () => {
    const file = editorRef.current.getContent();
    setText(file);
    console.log("file", file);
    refFormik.current.setFieldValue(field, file);
  };
  // const log = () => {
  //   if (editorRef.current) {
  //     const file = editorRef.current.getContent();
  //     setText(file);
  //     console.log("file", file);
  //     refFormik.current.setFieldValue(field, file);
  //     console.log(editorRef.current.getContent());
  //   }
  // };
  return (
    <div className="mb-3">
      <label htmlFor={field} className="form-label">
        {label}
      </label>
      <div
        className={classNames(
          "form-control",
          { "is-invalid border border-4 border-danger": touched && error },
          { "is-valid border border-4 border-success": touched && !error }
        )}
      >
        <Editor
          onInit={(evt, editor) => (editorRef.current = editor)}
          apiKey="0cfezdolqdov3xo5xialtzlr1smirffuedrc29adhinqiy3l"
          init={config}
          {...props}
          type="file"
          id={field}
          name={field}
          className="d-none"
          onChange={onChangeHandler}
        />
      </div>
      {/* <button onClick={log}>Log editor content</button> */}
      {touched && error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};
export default MyEditor;
