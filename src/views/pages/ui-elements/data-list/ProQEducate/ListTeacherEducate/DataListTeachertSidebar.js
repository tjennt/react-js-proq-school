import React, { Component } from "react";
import { Label, Input, FormGroup, Button } from "reactstrap";
import { X } from "react-feather";
import PerfectScrollbar from "react-perfect-scrollbar";
import classnames from "classnames";
import { toastWarning } from "../../../../../../utility/toast/toastHelper";
import { Upload } from "antd";
class DataListTeacherSidebar extends Component {
  state = {
    id: "",
    fullname: "",
    email: "",
    imgUpdate: "",
    phone: "",
    address: "",
  };
  addNew = false;

  componentDidUpdate(prevProps, prevState) {
    const { data } = this.props;
    if (data !== null && prevProps.data === null) {
      if (data.id !== prevState.id) this.setState({ id: data.id });
      if (data.fullname !== prevState.fullname)
        this.setState({ fullname: data.fullname });
      if (data.email !== prevState.email) this.setState({ email: data.email });
      if (data.active !== prevState.active)
        this.setState({ active: data.active });
      if (data.role !== prevState.role) this.setState({ role: data.role });
    }
    if (data === null && prevProps.data !== null) {
      this.setState({
        fullname: "",
        email: "",
        active: null,
        role: "ADMIN",
        password: "",
      });
    }
    if (this.addNew) {
      this.setState({
        id: "",
        fullname: "",
        email: "",
        active: null,
        role: "ADMIN",
        password: "",
      });
    }
    this.addNew = false;
  }

  handleSubmit = (obj) => {
    const { fullname, email, password } = this.state;
    let params = Object.keys(this.props.dataParams).length
      ? this.props.dataParams
      : { page: 1, limit: 10 };
    if (this.props.data !== null) {
      this.props.updateData(obj, params);
      this.props.handleSidebar(false, true);
    } else {
      if (!fullname | !email | !password) {
        toastWarning("Vui lòng nhập đầy đủ các trường *");
      } else {
        this.addNew = true;
        this.props.addData(obj, params);
        this.props.handleSidebar(false, true);
      }
    }
    this.props.getData(params);
  };
  onChange = ({ fileList: newFileList }) => {
    this.setState({
      imgUpdate: newFileList,
    });
  };
  render() {
    let { show, handleSidebar, data } = this.props;
    let { imgUpdate, fullname, email, phone, address } = this.state;
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
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              fileList={imgUpdate}
              onChange={this.onChange}
              listType="picture-card"
            >
              {imgUpdate.length < 1 && "+ Tải hình"}
            </Upload>
          </FormGroup>

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
            <Label for="data-email">Email *</Label>
            <Input
              type="text"
              id="data-email"
              value={email}
              placeholder="Email"
              onChange={(e) => this.setState({ email: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Số điện thoại *</Label>
            <Input
              type="phone"
              id="phone"
              value={phone}
              placeholder="Mật khẩu"
              onChange={(e) => this.setState({ phone: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Label for="address">Địa chỉ *</Label>
            <Input
              type="address"
              id="address"
              value={address}
              placeholder="Mật khẩu"
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
