import React, { Component } from "react";

import { Button, Form, FormGroup, Label } from "reactstrap";
// import * as Yup from "yup";
// import InputField from "../../../../../../utility/customFields/inputField";
import { Select } from "antd";
import DatePicker from "reactstrap-date-picker";
class FormDepartment extends Component {
  state = {
    id: "",
    season: null,
    nameClass: null,
    subject: null,
    days: [],
    start_time: "",
    start_timeReq: "",
    end_time: "",
    end_timeReq: "",
    ca: null,
    teacher: null,
    check: false,
    checkClass: false,
    checkSubject: false,
    checkStartTime: false,
    checkEndTime: false,
    checkDay: false,
    checkShift: false,
    checkButton: false,
    checkSubmit: false,
  };
  addNew = false;
  componentDidUpdate(prevProps, prevState) {
    if (this.addNew) {
      this.setState({
        id: "",
        season: "",
        nameClass: "",
        subject: "",
        days: [],
        start_time: "",
        end_time: "",
        ca: null,
        teacher: null,
      });
    }
    this.addNew = false;
  }
  handleChange = (data) => {
    this.props.getDataSubject(this.state.season, data);
    this.setState({
      ...this.state,
      nameClass: data,
      checkSubject: true,
    });
  };
  handleChangeStage = (data) => {
    this.setState({ ...this.state, season: data, checkClass: true });
  };
  handleChangeClass = (data) => {
    this.setState({ ...this.state, subject: data, checkStartTime: true });
  };

  onChangeValueDateStart = (value, formattedValue) => {
    this.setState({
      ...this.state,
      start_time: value,
      start_timeReq: formattedValue,
      checkEndTime: true,
    });
  };
  onChangeValueDateEnd = (value, formattedValue) => {
    this.setState({
      ...this.state,
      end_time: value,
      end_timeReq: formattedValue,
      checkDay: true,
    });
  };
  handleChangeCa = (value) => {
    this.setState({ ...this.state, ca: value, check: true });
  };
  handleChangeTeacger = (value) => {
    this.setState({ ...this.state, teacher: value, checkSubmit: true });
  };
  onChangeDate = (value) => {
    this.setState({ ...this.state, days: value, checkButton: true });
  };
  SearchCa = () => {
    this.props.getDataBothStudy(this.state);
    this.setState({
      ...this.state,
      checkShift: true,
    });
  };
  onSubmitForm = (e) => {
    e.preventDefault();
    this.setState({
      id: "",
      season: "",
      nameClass: "",
      subject: "",
      start_timeReq: "",
      end_timeReq: "",
      days: [],
      start_time: null,
      ca: null,
      end_time: null,
      teacher: null,
      check: false,
      checkClass: false,
      checkSubject: false,
      checkStartTime: false,
      checkEndTime: false,
      checkDay: false,
      checkShift: false,
      checkButton: false,
      checkSubmit: false,
    });
    this.props.handleSubmit(this.state);
    this.addNew = true;
  };
  render() {
    const { Option } = Select;
    const { season, classDepart, subjectClass, teacher, shift } = this.props;
    const {
      checkSubject,
      checkStartTime,
      check,
      checkShift,
      checkButton,
      checkDay,
      checkEndTime,
    } = this.state;
    const optionMonday = [
      { label: "Chủ nhật", value: 0 },
      { label: "Thứ 2", value: 1 },
      { label: "Thứ 3", value: 2 },
      { label: "Thứ 4", value: 3 },
      { label: "Thứ 5", value: 4 },
      { label: "Thứ 6", value: 5 },
      { label: "Thứ 7", value: 6 },
    ];
    let Mondays = optionMonday.map((item) => {
      return (
        <Option key={item.value} value={item.value}>
          {item.label}
        </Option>
      );
    });
    let optionShift = shift.map((item) => {
      return (
        <Option key={item.value} value={item.value}>
          {item.label}
        </Option>
      );
    });
    let children = season.map((item) => {
      return (
        <Option key={item._id} value={item._id}>
          {item.name}
        </Option>
      );
    });
    let optionClassDepart = classDepart.map((item) => {
      return (
        <Option key={item._id} value={item._id}>
          {item.name}
        </Option>
      );
    });
    const optionSubjectClass = subjectClass.map((item) => {
      return (
        <Option key={item._id} value={item._id}>
          {item.name}
        </Option>
      );
    });
    const chilOptionTeacher = teacher
      ? teacher.reduce(
          (arr, curr) => [
            ...arr,
            { label: curr.teacherId.fullname, value: curr.teacherId._id },
          ],
          []
        )
      : [];
    let optionTeacher = chilOptionTeacher.map((item) => {
      return (
        <Option key={item.value} value={item.value}>
          {item.label}
        </Option>
      );
    });
    return (
      <Form>
        <FormGroup>
          <Label>Kì học *</Label>
          <Select
            style={{ width: "100%" }}
            placeholder="Vui lòng chọn giáo viên "
            value={this.state.season}
            onChange={this.handleChangeStage}
          >
            {children}
          </Select>
        </FormGroup>
        <FormGroup>
          <Label>Tên lớp *</Label>
          <Select
            style={{ width: "100%" }}
            value={this.state.nameClass}
            disabled={this.state.checkClass ? false : true}
            placeholder="Vui lòng chọn lớp "
            name="nameClass"
            onChange={this.handleChange}
          >
            {optionClassDepart}
          </Select>
        </FormGroup>
        <FormGroup>
          <Label>Môn *</Label>
          <Select
            style={{ width: "100%" }}
            placeholder="Vui lòng chọn môn"
            value={this.state.subject}
            disabled={checkSubject ? false : true}
            onChange={this.handleChangeClass}
          >
            {optionSubjectClass}
          </Select>
        </FormGroup>
        <FormGroup>
          <Label>Thời gian bắt đầu *</Label>
          <DatePicker
            value={this.state.start_time}
            disabled={checkStartTime ? false : true}
            dateFormat="MM-DD-YYYY"
            style={{ width: "80%" }}
            onChange={this.onChangeValueDateStart}
          />
          {/* <ErrorMessage name={name} component={FormFeedback} /> */}
        </FormGroup>
        <FormGroup>
          <Label>Thời gian kết thúc *</Label>
          <DatePicker
            value={this.state.end_time}
            disabled={checkEndTime ? false : true}
            style={{ width: "80%" }}
            dateFormat="MM-DD-YYYY"
            onChange={this.onChangeValueDateEnd}
          />
          {/* <ErrorMessage name={name} component={FormFeedback} /> */}
        </FormGroup>
        <FormGroup>
          <Label>Thứ *</Label>
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="Vui lòng chọn thứ"
            value={this.state.days}
            disabled={checkDay ? false : true}
            onChange={this.onChangeDate}
          >
            {Mondays}
          </Select>
        </FormGroup>
        <FormGroup>
          <Button
            disabled={checkButton ? false : true}
            color="primary"
            onClick={this.SearchCa}
          >
            {" "}
            Chọn{" "}
          </Button>
        </FormGroup>
        <FormGroup>
          <Label>Ca *</Label>
          <Select
            disabled={checkShift ? false : true}
            style={{ width: "100%" }}
            placeholder="Vui lòng chọn ca "
            value={this.state.ca}
            onChange={this.handleChangeCa}
          >
            {optionShift}
          </Select>
        </FormGroup>
        <FormGroup>
          <Label>Giáo viên *</Label>
          <Select
            disabled={check ? false : true}
            style={{ width: "100%" }}
            placeholder="Vui lòng chọn giáo viên "
            value={this.state.teacher}
            onChange={this.handleChangeTeacger}
          >
            {optionTeacher}
          </Select>
        </FormGroup>
        <FormGroup>
          <Button
            disabled={this.state.checkSubmit ? false : true}
            color="primary"
            onClick={this.onSubmitForm}
            type="submit"
          >
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
}

export default FormDepartment;
