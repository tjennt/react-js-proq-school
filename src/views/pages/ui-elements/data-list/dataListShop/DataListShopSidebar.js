import React, { Component } from "react";
import { Label, Input, FormGroup, Button, Col, Row } from "reactstrap";
import { X } from "react-feather";
import PerfectScrollbar from "react-perfect-scrollbar";
import classnames from "classnames";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/light.css";
import "../../../../../assets/scss/plugins/forms/flatpickr/flatpickr.scss";
import { Upload } from "antd";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import { baseUrl } from "./../../../../../utility/config/index";
import { toastWarning } from "../../../../../utility/toast/toastHelper";
class DataListShopSidebar extends Component {
  state = {
    id: "",
    img: "",
    imgUpdate: "",
    name: "",
    status: 1,
    time_create: "",
  };

  addNew = false;

  componentDidUpdate(prevProps, prevState) {
    const { data } = this.props;
    if (data !== null && prevProps.data === null) {
      if (data.id !== prevState.id) this.setState({ id: data.id });
      if (data.name !== prevState.name) this.setState({ name: data.name });
      if (data.created_at !== prevState.time_create)
        this.setState({ time_create: data.created_at });
      if (data.image !== prevState.img) this.setState({ img: data.image });
      if (data.status !== prevState.status)
        this.setState({ status: data.status });
    }
    if (data === null && prevProps.data !== null) {
      this.setState({
        id: "",
        img: "",
        imgUpdate: "",
        name: "",
        status: 1,
        time_create: "",
      });
    }
    if (this.addNew) {
      this.setState({
        id: "",
        img: "",
        imgUpdate: "",
        name: "",
        status: 1,
        time_create: "",
      });
    }
    this.addNew = false;
  }

  handleSubmit = (obj) => {
    const { data, dataParams, updateData, addData, handleSidebar } = this.props;
    const { imgUpdate, name, time_create } = this.state;
    let params = Object.keys(dataParams).length
      ? dataParams
      : { page: 1, perPage: 4 };
    if (data !== null) {
      updateData(obj, params);
      handleSidebar(false, true);
    } else {
      if (!imgUpdate || !name || !time_create) {
        toastWarning("Vui lòng nhập đầy đủ thông tin *");
      } else {
        this.addNew = true;
        addData(obj, params);
        handleSidebar(false, true);
      }
    }
  };
  onChange = ({ fileList: newFileList }) => {
    this.setState({
      imgUpdate: newFileList,
    });
  };
  render() {
    let { show, handleSidebar, data } = this.props;
    let { name, time_create, status, img, imgUpdate } = this.state;
    return (
      <div
        className={classnames("data-list-sidebar", {
          show: show,
        })}
      >
        <div className="data-list-sidebar-header mt-2 px-2 d-flex justify-content-between">
          <h4>{data !== null ? " Cập nhật dữ liệu " : "Thêm dữ liệu"}</h4>
          <X size={20} onClick={() => handleSidebar(false, true)} />
        </div>
        <PerfectScrollbar
          className="data-list-fields px-2 mt-3"
          options={{ wheelPropagation: false }}
        >
          <Row>
            {this.props.thumbView && img.length ? (
              <Col sm="12">
                {img ? (
                  <FormGroup className="text-center">
                    <img
                      width={"120px"}
                      className="img-fluid"
                      src={`${baseUrl}/images/brand-connect/${img}`}
                      alt={name}
                    />
                    <div className="d-flex flex-wrap justify-content-between mt-2">
                      <Button
                        color="flat-danger"
                        onClick={() => this.setState({ img: "" })}
                      >
                        Remove Image
                      </Button>
                    </div>
                  </FormGroup>
                ) : (
                  <Upload
                    fileList={imgUpdate}
                    onChange={this.onChange}
                    //  onPreview={onPreview}
                  >
                    {imgUpdate.length < 1 && "+ Tải hình "}
                  </Upload>
                )}
              </Col>
            ) : null}
            <Col sm="12">
              {this.props.thumbView && img.length <= 0 ? (
                <Upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  fileList={imgUpdate}
                  onChange={this.onChange}
                  listType="picture-card"

                  //  onPreview={onPreview}
                >
                  {imgUpdate.length < 1 && "+ Tải hình"}
                </Upload>
              ) : null}
            </Col>
            <Col sm="12">
              <FormGroup>
                <Label for="data-name">Tên *</Label>
                <Input
                  type="text"
                  value={name}
                  placeholder="Tên"
                  required
                  onChange={(e) => this.setState({ name: e.target.value })}
                  id="data-name"
                />
              </FormGroup>
            </Col>
            <Col sm="12">
              <FormGroup>
                <Label for="data-time_send">Thời gian Tạo *</Label>
                <Flatpickr
                  className="form-control"
                  data-enable-time
                  id="data-time_send"
                  // options={{ minDate: "today", maxDate: new Date().fp_incr(14) }}
                  value={time_create}
                  required
                  onChange={(date) => {
                    this.setState({ time_create: date });
                  }}
                ></Flatpickr>
              </FormGroup>
            </Col>
            <Col sm="12">
              <FormGroup>
                <Label for="data-type">Loại thông báo</Label>
                <Input
                  type="select"
                  id="data-type"
                  value={status}
                  onChange={(e) => this.setState({ status: e.target.value })}
                >
                  <option value={0}>Không hoạt động</option>
                  <option value={1}>Hoạt động</option>
                </Input>
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
            Hủy bỏ
          </Button>
        </div>
      </div>
    );
  }
}
export default DataListShopSidebar;
