import { FormGroup,  Label, FormFeedback } from "reactstrap";
import { ErrorMessage } from "formik";
import React from "react";
import PropTypes from "prop-types";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import { Editor } from "@tinymce/tinymce-react";
InputTextTinyField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
};
InputTextTinyField.defaultProps = {
  type: "textarea",
  label: "",
  placeholder: "",
  disable: false,
};

function InputTextTinyField(props) {
  const { field, form, label } = props;
  const { name, value } = field;
  const { setFieldValue } = form;
  // const showError = errors[name] && touched[name];
  const handleEditorChange = (content) => {
    setFieldValue(name, content);
  };
  return (
    <FormGroup>
      {label && <Label for="name">{label}</Label>}
      <Editor
        value={value}
        apiKey="uw0hs0g8n91y3rz2nzswbknc1uv3kkvll0v4eb4o7wztgibm"
        init={{
          height: 500,
          plugins:
            "print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons",
          imagetools_cors_hosts: ["picsum.photos"],
          menubar: "file edit view insert format tools table help",
          toolbar:
            "undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl",
        }}
        onEditorChange={handleEditorChange}
        id="data-body"
      ></Editor>
      <ErrorMessage name={name} component={FormFeedback} />
    </FormGroup>
  );
}
export default InputTextTinyField;
