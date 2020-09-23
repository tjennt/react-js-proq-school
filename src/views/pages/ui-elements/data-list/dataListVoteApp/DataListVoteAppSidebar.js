import React, { Component } from "react";
import { Label, Input, FormGroup, Button, Row, Col } from "reactstrap";
import { X } from "react-feather";
import PerfectScrollbar from "react-perfect-scrollbar";
import classnames from "classnames";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/light.css";
import Select from "react-select";
import { toastWarning } from "../../../../../utility/toast/toastHelper";
class DataListRewardSidebar extends Component {
  state = {
    id: "",
    name: "",
    money: "",
    create_time: "",
    donater: "",
    status: 0,
    note: "",
  };

  addNew = false;
  componentDidUpdate(prevProps, prevState) {
    const { data } = this.props;
    if (data !== null && prevProps.data === null) {
      if (data._id !== prevState.id) this.setState({ id: data._id });
      if (data.name_user !== prevState.name)
        this.setState({ name: data.name_user });
      if (data.cash !== prevState.money) this.setState({ money: data.cash });
      if (data.created_at !== prevState.create_time)
        this.setState({ create_time: data.created_at });
      if (data.author !== prevState.donater)
        this.setState({ donater: data.author });
      if (data.status !== prevState.status)
        this.setState({ status: data.status });
      if (data.note !== prevState.note) this.setState({ note: data.note });
    }
    if (data === null && prevProps.data !== null) {
      this.setState({
        id: null,
        name: "",
        money: "",
        create_time: "",
        status: 0,
        note: "",
      });
    }
    if (this.addNew) {
      this.setState({
        id: "",
        name: "",
        money: "",
        create_time: "",
        status: 0,
        note: "",
      });
    }
    this.addNew = false;
  }
  componentDidMount() {
    if (this.props.userRole) {
      this.setState({
        donater: this.props.userRole,
      });
    }
  }
  handleSubmit = (obj) => {
    const { dataParams, data, updateData, handleSidebar, addData } = this.props;
    let params = Object.keys(dataParams).length
      ? dataParams
      : { page: 1, perPage: 4 };
    if (data !== null) {
      updateData(obj, params);
      handleSidebar(false, true);
    } else {
      const { id, money, create_time, donater } = this.state;
      if (!id | !money | !create_time | !donater) {
        toastWarning("Vui lòng điền đầy đủ các trường *");
      } else {
        this.addNew = true;
        addData(obj, params);
        handleSidebar(false, true);
      }
    }
  };
  handleChange = (selectedOption) => {
    this.setState({
      id: selectedOption.value,
    });
  };
  render() {
    let { show, handleSidebar, data, dataListUser } = this.props;
    if (dataListUser) {
      var dataResult = dataListUser.data;
      var arrResult = dataResult.reduce(
        (newArr, curr) => [...newArr, { value: curr["id"], label: curr["id"] }],
        []
      );
    }
    let { money, create_time, donater, status, note, id, name } = this.state;
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
          <Row>
            <Col lg="12">
              {data !== null ? (
                ""
              ) : (
                <FormGroup>
                  <Label for="data-name">ID Khách hàng *</Label>
                  <Select
                    style={{ width: "100%" }}
                    defaultValue={id}
                    placeholder="Chọn mã khách hàng"
                    onChange={this.handleChange}
                    options={arrResult}
                  />
                </FormGroup>
              )}
            </Col>
            <Col lg="12">
              <FormGroup>
                <Label for="data-name">Tên Khách hàng </Label>
                <Input
                  type="text"
                  style={{ width: "100%" }}
                  value={name}
                  placeholder="Nhập tên khách hàng"
                  onChange={(e) => this.setState({ name: e.target.value })}
                />
              </FormGroup>
            </Col>
            <Col lg="12">
              <FormGroup>
                <Label for="data-money">Số tiền * </Label>
                <Input
                  type="number"
                  id="data-money"
                  value={money}
                  placeholder="Số tiền "
                  onChange={(e) => this.setState({ money: e.target.value })}
                />
              </FormGroup>
            </Col>
            <Col lg="12">
              <FormGroup>
                <Label for="data-money">Ngày tạo * </Label>
                <Flatpickr
                  className="form-control"
                  data-enable-time
                  id="data-time_send"
                  value={create_time}
                  required
                  onChange={(date) => {
                    this.setState({ create_time: date });
                  }}
                ></Flatpickr>
              </FormGroup>
            </Col>
            <Col lg="12">
              <FormGroup>
                <Label for="data-donater">Người tặng </Label>
                <Input
                  disabled
                  type="text"
                  id="data-donater"
                  value={donater}
                  placeholder="Người tặng"
                  onChange={(e) => this.setState({ donater: e.target.value })}
                />
              </FormGroup>
            </Col>
            <Col lg="12">
              <FormGroup>
                <Label for="data-status">Trạng thái </Label>
                <Input
                  type="select"
                  id="data-status"
                  value={status}
                  placeholder="Trạng thái"
                  onChange={(e) => this.setState({ status: e.target.value })}
                >
                  <option value={0}>Chờ xử lí</option>
                  <option value={1}>Đã xử lí</option>
                </Input>
              </FormGroup>
            </Col>
            <Col lg="12">
              <FormGroup>
                <Label for="data-note">Ghi chú </Label>
                <Input
                  type="text"
                  id="data-note"
                  value={note}
                  placeholder="Ghi chú "
                  onChange={(e) => this.setState({ note: e.target.value })}
                />
              </FormGroup>
            </Col>
          </Row>
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
export default DataListRewardSidebar;
