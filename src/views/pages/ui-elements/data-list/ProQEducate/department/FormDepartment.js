import React, { useState } from "react";
import { Button, Form, FormGroup, Label } from "reactstrap";
// import * as Yup from "yup";
// import InputField from "../../../../../../utility/customFields/inputField";
import Select from "react-select";
import { DatePicker } from "antd";
import moment from "moment";

function FormDepartment(props) {
  const {
    getDataSubject,
    season,
    classDepart,
    subjectClass,
    getDataBothStudy,
    shift,
    teacher,
    handleSubmit,
  } = props;
  const [state, setState] = useState({
    id: "",
    season: "",
    nameClass: "",
    subject: null,
    days: [],
    start_time: "",
    ca: null,
    end_time: "",
    teacher: null,
  });
  const [check, setCheck] = useState(false);
  // const validationSchema = Yup.object().shape({
  //   title: Yup.string().required("Vui lòng nhập tiêu đề!"),
  //   content: Yup.string().required("Vui lòng nhập content !"),
  //   time_send: Yup.date().required("Vui lòng chọn ngày!"),
  // });

  const optionSeason = season
    ? season.reduce(
        (arr, curr) => [...arr, { label: curr.name, value: curr._id }],
        []
      )
    : [];
  const optionClassDepart = classDepart
    ? classDepart.reduce(
        (arr, curr) => [...arr, { label: curr.name, value: curr._id }],
        []
      )
    : [];
  const optionSubjectClass = subjectClass
    ? subjectClass.reduce(
        (arr, curr) => [...arr, { label: curr.name, value: curr._id }],
        []
      )
    : [];
  const optionTeacher = teacher
    ? teacher.reduce(
        (arr, curr) => [
          ...arr,
          { label: curr.teacherId.fullname, value: curr.teacherId._id },
        ],
        []
      )
    : [];
  const optionMonday = [
    { label: "Chủ nhật", value: 0 },
    { label: "Thứ 2", value: 1 },
    { label: "Thứ 3", value: 2 },
    { label: "Thứ 4", value: 3 },
    { label: "Thứ 5", value: 4 },
    { label: "Thứ 6", value: 5 },
    { label: "Thứ 7", value: 6 },
  ];
  const handleChange = (data) => {
    getDataSubject(state.season, data);
    setState({ ...state, nameClass: data });
  };
  const handleChangeStage = (data) => {
    setState({ ...state, season: data });
  };
  const handleChangeClass = (data) => {
    setState({ ...state, subject: data });
  };
  const onChangeValueDateStart = (date, dateString) => {
    setState({ ...state, start_time: dateString });
  };
  const onChangeValueDateEnd = (date, dateString) => {
    setState({ ...state, end_time: dateString });
  };
  const handleChangeCa = (value) => {
    setState({ ...state, ca: value });
  };
  const handleChangeTeacger = (value) => {
    setState({ ...state, teacher: value });
  };
  const onChangeDate = (value) => {
    setState({ ...state, days: value });
  };
  const SearchCa = () => {
    getDataBothStudy(state);
    setCheck(!check);
  };
  const onSubmitForm = (e) => {
    e.preventDefault();
    handleSubmit(state);
  };
  return (
    <Form>
      <FormGroup>
        <Label>Kì học *</Label>
        <Select
          placeholder="Vui lòng chọn lớp "
          name="season"
          isClearable={true}
          options={optionSeason}
          onChange={handleChangeStage}
        />
      </FormGroup>
      <FormGroup>
        <Label>Tên lớp *</Label>
        <Select
          placeholder="Vui lòng chọn lớp "
          name="nameClass"
          isClearable={true}
          onChange={handleChange}
          options={optionClassDepart}
        />
      </FormGroup>
      <FormGroup>
        <Label>Môn *</Label>
        <Select
          placeholder="Vui lòng chọn  môn  "
          name="subject"
          isClearable={true}
          options={optionSubjectClass}
          onChange={handleChangeClass}
        />
      </FormGroup>
      <FormGroup>
        <Label>Thời gian bắt đầu *</Label>
        <DatePicker
          format={"MM-DD-YYYY"}
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
          format={"MM-DD-YYYY"}
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
          isMulti={true}
          onChange={onChangeDate}
          options={optionMonday}
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
          onChange={handleChangeCa}
          isDisabled={!check ? true : false}
          placeholder="Vui lòng chọn ca "
          options={shift}
        />
      </FormGroup>
      <FormGroup>
        <Label>Giáo viên *</Label>
        <Select
          isDisabled={!check ? true : false}
          placeholder="Vui lòng chọn giáo viên "
          onChange={handleChangeTeacger}
          options={optionTeacher}
        />
      </FormGroup>
      <FormGroup>
        <Button color="primary" onClick={onSubmitForm} type="submit">
          Lưu
        </Button>
        {/* <Button
                onClick={() => resetForm({})}
                className="ml-2"
                color="danger"
              >
                {" "}
                Huỷ{" "}
              </Button> */}
      </FormGroup>
    </Form>
  );
}

export default FormDepartment;
