import React, { Component } from "react";
import { Label, Input, FormGroup, Button } from "reactstrap";
import { X } from "react-feather";
import PerfectScrollbar from "react-perfect-scrollbar";
import classnames from "classnames";
import { toastWarning } from "../../../../../../utility/toast/toastHelper";
class DataListStudentSidebar extends Component {
  state = {
    id: "",
    fullname: "",
    email: "",
    active: null,
    role: "ADMIN",
    password: "",
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

  render() {
    let { show, handleSidebar, data } = this.props;
    let { fullname, email, active, password, role } = this.state;
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
            <Label for="password"> Mật khẩu *</Label>
            <Input
              type="password"
              id="password"
              value={password}
              placeholder="Mật khẩu"
              onChange={(e) => this.setState({ password: e.target.value })}
            />
          </FormGroup>
          {active === null ? (
            ""
          ) : (
            <FormGroup>
              <Label for="data-type"> Trạng thái </Label>
              <Input
                type="select"
                id="data-type"
                value={active}
                onChange={(e) => this.setState({ active: e.target.value })}
              >
                <option value={0}>Chưa kích hoạt</option>
                <option value={1}>Kích hoạt</option>
              </Input>
            </FormGroup>
          )}

          <FormGroup>
            <Label for="data-type">Quyền </Label>
            <Input
              type="select"
              id="data-type"
              value={role}
              onChange={(e) => this.setState({ role: e.target.value })}
            >
              <option value="ADMIN">ADMIN</option>
              <option value="ACCOUNT1">ACCOUNT1</option>
              <option value="ACCOUNT2">ACCOUNT2</option>
              <option value="MARKETING">MARKETING</option>
            </Input>
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
export default DataListStudentSidebar;
