import React from "react";
import { FormGroup, Label } from "reactstrap";
import Select from "react-select";
export const SelectFieldMulti = ({
  className,
  placeholder,
  label,
  field,
  form,
  options,
  isMulti = false,
}) => {
  const onChange = (options) => {
    form.setFieldValue(
      field.name,
      options && isMulti ? options.map((item) => item.value) : ""
    );
  };

  const getValue = () => {
    if (options) {
      return isMulti
        ? /**
           * khi tìm thấy điều kiện tiếp tục lặp cho hết mảng
           */
          options.filter((option) => field.value.indexOf(option.value) >= 0)
        : /**
           * tìm cho đến khi đúng với điều kiện
           */
          options.find((option) => option.value === field.value);
    } else {
      return isMulti ? [] : "";
    }
  };

  return (
    <FormGroup>
      {label && <Label for={field.name}> {label} </Label>}
      <Select
        className={className}
        name={field.name}
        value={getValue()}
        onChange={onChange}
        placeholder={placeholder}
        options={options}
        isMulti={isMulti}
      />
    </FormGroup>
  );
};

export default SelectFieldMulti;
