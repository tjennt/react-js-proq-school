import React from "react";
import PropTypes from "prop-types";
import { FormGroup, Label, FormFeedback } from "reactstrap";
import { ErrorMessage } from "formik";
// import { Select } from "antd";
import Select from "react-select";
SelectField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  option: PropTypes.array,
};
SelectField.defaultProps = {
  label: "",
  placeholder: "",
  disabled: false,
  options: [],
};
function SelectField(props) {
  const { field, form, options, label, placeholder, isDisabled } = props;
  const { name, value } = field;
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];

  const selectedOption = options.find((option) => option.value === value);

  const handleSelectedOptionChange = (selectedOption) => {
    const selectedValue = selectedOption ? selectedOption.value : [];

    const changeEvent = {
      target: {
        name: name,
        value: selectedValue,
      },
    };
    field.onChange(changeEvent);
  };
  return (
    <FormGroup>
      {label && <Label for={name}>{label}</Label>}
      <Select
        style={{ width: "100%" }}
        id={name}
        {...field}
        value={selectedOption}
        isClearable={true}
        isDisabled={isDisabled}
        onChange={handleSelectedOptionChange}
        placeholder={placeholder}
        options={options}
      ></Select>
      <div className={showError ? "is-invalid" : ""}></div>
      <ErrorMessage name={name} component={FormFeedback} />
    </FormGroup>
  );
}

export default SelectField;
