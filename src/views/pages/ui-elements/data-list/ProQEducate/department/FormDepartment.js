import { Formik, Form, Field } from "formik";
import React, { useState } from "react";
import { Button, FormGroup, Label } from "reactstrap";
// import * as Yup from "yup";
// import InputField from "../../../../../../utility/customFields/inputField";
import SelectField from "../../../../../../utility/customFields/selectFields";
import Select from "react-select";
import { DatePicker } from "antd";
import moment from "moment";

function FormDepartment(props) {
  const { initialValues, dataClass, getDataSubject, getDataBothStudy } = props;
  const [state, setState] = useState({
    id: "",
    nameClass: "",
    subject: 1,
    days: [],
    start_time: "",
    ca: 1,
    end_time: "",
    teacher: null,
  });
  const [check, setCheck] = useState(false);
  // const validationSchema = Yup.object().shape({
  //   title: Yup.string().required("Vui lòng nhập tiêu đề!"),
  //   content: Yup.string().required("Vui lòng nhập content !"),
  //   time_send: Yup.date().required("Vui lòng chọn ngày!"),
  // });
  let option = [];
  if (dataClass) {
    option = dataClass.reduce(
      (arr, curr) => [...arr, { label: curr.className, value: curr.className }],
      []
    );
  }

  const optionsDay = [
    { value: 0, label: "Chủ nhật" },
    { value: 1, label: "thứ 2" },
    { value: 2, label: "thứ 3" },
    { value: 3, label: "thứ 4" },
    { value: 4, label: "thứ 5" },
    { value: 5, label: "thứ 6" },
    { value: 6, label: "thứ 7" },
  ];
  const optionCa = [
    { value: 0, label: " ca 1" },
    { value: 1, label: " ca 2" },
    { value: 2, label: "ca 3" },
    { value: 3, label: "ca 4" },
    { value: 4, label: "ca 5" },
    { value: 5, label: "ca 6" },
    { value: 6, label: "ca 7" },
    { value: 7, label: "ca 8" },
    { value: 8, label: "ca 9" },
    { value: 9, label: "ca 10" },
  ];
  const optionsTeacher = [
    { value: 1, label: "Nguyễn Văn A" },
    { value: 2, label: "Nguyễn Văn B" },
    { value: 3, label: "Nguyễn Văn C" },
    { value: 4, label: "Nguyễn Văn D" },
  ];
  const handleChange = (data) => {
    getDataSubject(data);
    setState({ ...state, nameClass: data.label });
  };
  const onChangeValueDateStart = (date, dateString) => {
    console.log(dateString);
    setState({ ...state, start_time: dateString });
  };
  const onChangeValueDateEnd = (date, dateString) => {
    console.log(dateString);
    setState({ ...state, end_time: dateString });
  };
  const onSubmitForm = (values) => {
    console.log(values);
  };
  const onChangeDate = (value) => {
    console.log(value);
    setState({ ...state, days: value });
  };
  const SearchCa = () => {
    setCheck(!check);
    getDataBothStudy(state);
  };
  return (
    <Formik
      enableReinitialize="true"
      initialValues={state}
      // validationSchema={validationSchema}
      onSubmit={onSubmitForm}
    >
      {(formikProps) => {
        const { isValid, resetForm } = formikProps;
        return (
          <Form>
            <FormGroup>
              <Label>Kì học *</Label>
              <Select
                placeholder="Vui lòng chọn lớp "
                name="semster"
                // type="text"
              />
            </FormGroup>
            <FormGroup>
              <Label>Tên lớp *</Label>
              <Select
                placeholder="Vui lòng chọn lớp "
                name="nameClass"
                isClearable={true}
                onChange={handleChange}
                options={option}
              />
            </FormGroup>
            <FormGroup>
              <Label>Môn *</Label>
              <Select
                placeholder="Vui lòng chọn  môn  "
                name="subject"
                options={option}
              />
            </FormGroup>
            <FormGroup>
              <Label>Thời gian bắt đầu *</Label>
              <DatePicker
                // format={"DD/MM/YYYY"}
                style={{ height: "40px", width: "100%" }}
                ranges={{
                  Ngày: [moment().startOf("days"), moment().endOf("days")],
                  Tuần: [moment().startOf("week"), moment().endOf("week")],
                  Tháng: [moment().startOf("month"), moment().endOf("month")],
                  Quý: [moment().startOf("quarter"), moment().endOf("quarter")],
                  Năm: [moment().startOf("year"), moment().endOf("year")],
                }}
                onChange={onChangeValueDateStart}
              />
              {/* <ErrorMessage name={name} component={FormFeedback} /> */}
            </FormGroup>
            <FormGroup>
              <Label>Thời gian kết thúc *</Label>
              <DatePicker
                style={{ height: "40px", width: "100%" }}
                // format={"DD/MM/YYYY"}
                ranges={{
                  Ngày: [moment().startOf("days"), moment().endOf("days")],
                  Tuần: [moment().startOf("week"), moment().endOf("week")],
                  Tháng: [moment().startOf("month"), moment().endOf("month")],
                  Quý: [moment().startOf("quarter"), moment().endOf("quarter")],
                  Năm: [moment().startOf("year"), moment().endOf("year")],
                }}
                onChange={onChangeValueDateEnd}
              />
              {/* <ErrorMessage name={name} component={FormFeedback} /> */}
            </FormGroup>
            <FormGroup>
              <Label>Thứ *</Label>
              <Select
                placeholder="Vui lòng chọn thứ "
                options={optionsDay}
                isMulti={true}
                onChange={onChangeDate}
              />
            </FormGroup>
            <FormGroup>
              <Button color="primary" onClick={SearchCa}>
                {" "}
                Chọn{" "}
              </Button>
            </FormGroup>
            <FormGroup>
              <Label>Ca *</Label>
              <Select
                isDisabled={!check ? true : false}
                placeholder="Vui lòng chọn ca "
                options={optionCa}
              />
            </FormGroup>
            <FormGroup>
              <Label>Giáo viên *</Label>
              <Select
                isDisabled={!check ? true : false}
                placeholder="Vui lòng chọn giáo viên "
                options={optionsTeacher}
              />
            </FormGroup>
            <FormGroup>
              <Button color="primary" type="submit">
                Lưu
              </Button>
              <Button
                onClick={() => resetForm({})}
                className="ml-2"
                color="danger"
              >
                {" "}
                Huỷ{" "}
              </Button>
            </FormGroup>
          </Form>
        );
      }}
    </Formik>
  );
}

export default FormDepartment;
