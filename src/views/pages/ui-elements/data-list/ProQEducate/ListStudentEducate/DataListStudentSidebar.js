import React, { Component } from "react";
import { Label, Input, FormGroup, Button } from "reactstrap";
import { X } from "react-feather";
import PerfectScrollbar from "react-perfect-scrollbar";
import classnames from "classnames";
import { toastWarning } from "../../../../../../utility/toast/toastHelper";
import "antd/dist/antd.css";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/light.css";

class StudentEducationSidebar extends Component {
  state = {
    id: "",
    fullname: "",
    email: "",
    phone: "",
    identityNumber: "",
    dob: "",
    address: "",
  };
  addNew = false;

  componentDidUpdate(prevProps, prevState) {
    const { data } = this.props;
    if (data !== null && prevProps.data === null) {
      if (data.studentId_id !== prevState.id)
        this.setState({ id: data.studentId._id });
      if (data.studentId.fullName !== prevState.fullname)
        this.setState({ fullname: data.studentId.fullName });
      if (data.email !== prevState.email) this.setState({ email: data.email });
      if (data.studentId.phone !== prevState.phone)
        this.setState({ phone: data.studentId.phone });
      if (data.studentId.identityNumber !== prevState.identityNumber)
        this.setState({ identityNumber: data.studentId.identityNumber });
      if (data.studentId.dob !== prevState.dob)
        this.setState({ dob: data.studentId.dob });
      if (data.studentId.address !== prevState.address)
        this.setState({ address: data.studentId.address });
    }
    if (data === null && prevProps.data !== null) {
      this.setState({
        fullname: "",
        phone: "",
        identityNumber: "",
        dob: "",
        address: "",
        email: "",
      });
    }
    if (this.addNew) {
      this.setState({
        id: "",
        fullname: "",
        phone: "",
        identityNumber: "",
        dob: "",
        address: "",
        email: "",
      });
    }
    this.addNew = false;
  }

  handleSubmit = (obj) => {
    const { dataParams } = this.props;
    const paginate = {
      page: 1,
      limit: 4,
    };
    const params = dataParams || paginate;
    this.props.updateData(params, obj);
    console.log(obj);
    this.props.handleSidebar(false, true);
  };

  changeDate = (date, dateString) => {
    this.setState({
      ...this.state,
      dob: dateString,
    });
  };
  render() {
    let { show, handleSidebar, data } = this.props;
    let { identityNumber, fullname, dob, email, phone, address } = this.state;
    return (
      <div
        className={classnames("data-list-sidebar", {
          show: show,
        })}
      >
        <div className="data-list-sidebar-header mt-2 px-2 d-flex justify-content-between">
          <h4>{data !== null ? "Cập nhật" : "Thêm dữ liệu"}</h4>
          <X size={20} onClick={() => handleSidebar(false, true)} />
        </div>
        <PerfectScrollbar
          className="data-list-fields px-2 mt-3"
          options={{ wheelPropagation: false }}
        >
          <FormGroup>
            <Label for="data-name">Tên *</Label>
            <Input
              type="text"
              value={fullname}
              placeholder="Họ và Tên"
              onChange={(e) => this.setState({ fullname: e.target.value })}
              id="data-name"
            />
          </FormGroup>
          <FormGroup>
            <Label for="data-phone">Số điện thoại *</Label>
            <Input
              type="number"
              id="data-phone"
              value={phone}
              placeholder="Nhập Số điện thoại"
              onChange={(e) => this.setState({ phone: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email *</Label>
            <Input
              type="text"
              id="email"
              value={email}
              placeholder="Email"
              onChange={(e) => this.setState({ email: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Label for="Number ">Number *</Label>
            <Input
              type="number"
              id="number"
              value={identityNumber}
              placeholder="Number"
              onChange={(e) =>
                this.setState({ identityNumber: e.target.value })
              }
            />
          </FormGroup>
          <FormGroup>
            <Label for="dateBirth">Ngày sinh *</Label>
            <Flatpickr
              className="form-control"
              // data-enable-time
              value={dob}
              onChange={this.changeDate}
            ></Flatpickr>
          </FormGroup>
          <FormGroup>
            <Label for="address">Địa chỉ *</Label>
            <Input
              type="address"
              id="address"
              value={address}
              placeholder="Vui lòng nhập địa chỉ"
              onChange={(e) => this.setState({ address: e.target.value })}
            />
          </FormGroup>
        </PerfectScrollbar>
        <div className="data-list-sidebar-footer px-2 d-flex justify-content-start align-items-center mt-1">
          <Button color="primary" onClick={() => this.handleSubmit(this.state)}>
            {data !== null ? "Cập nhật" : "Lưu"}
          </Button>
          <Button
            className="ml-1"
            color="danger"
            outline
            onClick={() => handleSidebar(false, true)}
          >
            Hủy
          </Button>
        </div>
      </div>
    );
  }
}
export default StudentEducationSidebar;
