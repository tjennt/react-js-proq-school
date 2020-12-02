import React, { Component } from "react";
import { Label, Input, FormGroup, Button } from "reactstrap";
import { X } from "react-feather";
import PerfectScrollbar from "react-perfect-scrollbar";
import classnames from "classnames";
import { toastWarning } from "../../../../../../utility/toast/toastHelper";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/light.css";
class DataListTeacherSidebar extends Component {
  state = {
    id: "",
    fullname: "",
    email: "",
    phone: "",
    specialization: "",
    dob: "",
    address: "",
  };
  addNew = false;

  componentDidUpdate(prevProps, prevState) {
    const { data } = this.props;
    if (data !== null && prevProps.data === null) {
      if (data.teacherId !== prevState.id)
        this.setState({ id: data.teacherId._id });
      if (data.teacherId.fullname !== prevState.fullname)
        this.setState({ fullname: data.teacherId.fullname });
      if (data.email !== prevState.email) this.setState({ email: data.email });
      if (data.teacherId.phone !== prevState.phone)
        this.setState({ phone: data.teacherId.phone });
      if (data.teacherId.specialization !== prevState.specialization)
        this.setState({ specialization: data.teacherId.specialization });
      if (data.teacherId.dob !== prevState.dob)
        this.setState({ dob: data.teacherId.dob });
      if (data.teacherId.address !== prevState.address)
        this.setState({ address: data.teacherId.address });
    }
    if (data === null && prevProps.data !== null) {
      this.setState({
        id: "",
        fullname: "",
        email: "",
        phone: "",
        specialization: "",
        dob: "",
        address: "",
      });
    }
    if (this.addNew) {
      this.setState({
        id: "",
        fullname: "",
        email: "",
        phone: "",
        specialization: "",
        dob: "",
        address: "",
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
    const { fullname, email, phone, specialization, dob, address } = this.state;
    if (!fullname || !email || !phone || !specialization || !dob || !address) {
      toastWarning("Vui lòng nhập các trường *");
      return false;
    }
    this.props.updateData(obj, params);
    this.props.handleSidebar(false, true);
  };
  onChange = ({ fileList: newFileList }) => {
    this.setState({
      imgUpdate: newFileList,
    });
  };
  render() {
    let { show, handleSidebar, data } = this.props;
    let { specialization, dob, fullname, email, phone, address } = this.state;
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
              disabled={true}
              value={email}
              placeholder="Email"
              onChange={(e) => this.setState({ email: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Label for="specialization ">Chuyên ngành *</Label>
            <Input
              type="text"
              id="specialization"
              value={specialization}
              placeholder="specialization"
              onChange={(e) =>
                this.setState({ specialization: e.target.value })
              }
            />
          </FormGroup>
          <FormGroup>
            <Label for="dateBirth">Ngày sinh *</Label>
            <Flatpickr
              style={{ backgroundColor: "#fff" }}
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
export default DataListTeacherSidebar;
