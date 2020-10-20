import { FormGroup, Label, FormFeedback } from "reactstrap";
import { ErrorMessage } from "formik";
import React from "react";
import PropTypes from "prop-types";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import { DatePicker } from "antd";
import moment from "moment";
datePickerField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
};
datePickerField.defaultProps = {
  type: "",
  label: "",
  placeholder: "",
  disable: false,
};

function datePickerField(props) {
  const { field, form, label } = props;
  const { name } = field;
  // const { errors, touched } = form;
  // const showError = errors[name] && touched[name];

  const onChangeValue = (date) => {
    form.setFieldValue(name, date);
  };
  return (
    <FormGroup>
      {label && <Label for="name">{label}</Label>}
      <DatePicker
        style={{ height: "40px", width: "100%" }}
        ranges={{
          Ngày: [moment().startOf("days"), moment().endOf("days")],
          Tuần: [moment().startOf("week"), moment().endOf("week")],
          Tháng: [moment().startOf("month"), moment().endOf("month")],
          Quý: [moment().startOf("quarter"), moment().endOf("quarter")],
          Năm: [moment().startOf("year"), moment().endOf("year")],
        }}
        onChange={onChangeValue}
      />
      <ErrorMessage name={name} component={FormFeedback} />
    </FormGroup>
  );
}
export default datePickerField;
