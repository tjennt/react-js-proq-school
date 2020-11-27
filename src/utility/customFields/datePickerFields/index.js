import { FormGroup, Label, FormFeedback } from "reactstrap";
import { ErrorMessage } from "formik";
import React from "react";
import PropTypes from "prop-types";
import DatePicker from "reactstrap-date-picker";
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
  const { name, value } = field;
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];

  const onChangeValue = (value, formattedValue) => {
    form.setFieldValue(name, value);
  };
  return (
    <FormGroup>
      {label && <Label for="name">{label}</Label>}
      <DatePicker
        dateFormat="DD-MM-YYYY"
        value={value}
        style={{ height: "40px", width: "80%" }}
        // ranges={{
        //   Ngày: [moment().startOf("days"), moment().endOf("days")],
        //   Tuần: [moment().startOf("week"), moment().endOf("week")],
        //   Tháng: [moment().startOf("month"), moment().endOf("month")],
        //   Quý: [moment().startOf("quarter"), moment().endOf("quarter")],
        //   Năm: [moment().startOf("year"), moment().endOf("year")],
        // }}
        onChange={onChangeValue}
      />
      <div className={showError ? "is-invalid" : ""}></div>
      <ErrorMessage name={name} component={FormFeedback} />
    </FormGroup>
  );
}
export default datePickerField;
