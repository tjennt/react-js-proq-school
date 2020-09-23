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
import { toastWarning } from "../../../../../utility/toast/toastHelper";
class DataListSidebar extends Component {
  state = {
    id: "",
    img: "",
    imgUpdate: "",
    title: "",
    status: 0,
    time_send: "",
    type: 0,
    url: "",
    body: "",
  };

  addNew = false;

  componentDidUpdate(prevProps, prevState) {
    const { data } = this.props;
    if (data !== null && prevProps.data === null) {
      if (data.id !== prevState.id) this.setState({ id: data.id });
      if (data.title !== prevState.title) this.setState({ title: data.title });
      if (data.time_send !== prevState.time_send)
        this.setState({ time_send: data.time_send });
      if (data.url !== prevState.url) this.setState({ url: data.url });
      if (data.type !== prevState.type) this.setState({ type: data.type });
      if (data.body !== prevState.body) this.setState({ body: data.body });
      if (data.img !== prevState.img) this.setState({ img: data.img });
      if (data.status !== prevState.status)
        this.setState({ status: data.status });
    }
    if (data === null && prevProps.data !== null) {
      this.setState({
        id: "",
        img: "",
        imgUpdate: "",
        title: "",
        status: 0,
        time_send: "",
        type: 0,
        url: "",
        body: "",
      });
    }
    if (this.addNew) {
      this.setState({
        id: "",
        img: "",
        imgUpdate: "",
        title: "",
        status: 0,
        time_send: "",
        url: "",
        type: 0,
        body: "",
      });
    }
    this.addNew = false;
  }

  handleSubmit = (obj) => {
    const {
      getData,
      addData,
      data,
      updateData,
      handleSidebar,
      dataParams,
    } = this.props;
    if (data !== null) {
      updateData(obj);
      handleSidebar(false, true);
    } else {
      const { title, time_send } = this.state;
      if (!title | !time_send) {
        toastWarning("vui lòng điền đẩy đủ thông tin *");
        return false;
      }
      this.addNew = true;
      addData(obj);
      handleSidebar(false, true);
    }
    let params = Object.keys(dataParams).length
      ? dataParams
      : { page: 1, perPage: 4 };
    getData(params);
  };
  onChange = ({ fileList: newFileList }) => {
    this.setState({
      imgUpdate: newFileList,
    });
  };
  render() {
    let { show, handleSidebar, data, thumbView } = this.props;
    let { title, time_send, url, type, img, body, imgUpdate } = this.state;
    return (
      <div
        className={classnames("data-list-sidebar", {
          show: show,
        })}
      >
        <div className="data-list-sidebar-header mt-2 px-2 d-flex justify-content-between">
          <h4>{data !== null ? "UPDATE DATA" : "ADD NEW DATA"}</h4>
          <X size={20} onClick={() => handleSidebar(false, true)} />
        </div>
        <PerfectScrollbar
          className="data-list-fields px-2 mt-3"
          options={{ wheelPropagation: false }}
        >
          <Row>
            {thumbView && img.length ? (
              <Col sm="12">
                {img ? (
                  <FormGroup className="text-center">
                    <img
                      width={"120px"}
                      className="img-fluid"
                      src={`${img}`}
                      alt={title}
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
              {thumbView && img.length <= 0 ? (
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
                <Label for="data-name">Tiêu đề *</Label>
                <Input
                  type="text"
                  value={title}
                  placeholder="Tiêu đề"
                  required
                  onChange={(e) => this.setState({ title: e.target.value })}
                  id="data-name"
                />
              </FormGroup>
            </Col>
            <Col sm="12">
              <FormGroup>
                <Label for="data-content">Url</Label>
                <Input
                  type="text"
                  id="data-content"
                  value={url}
                  onChange={(e) => this.setState({ url: e.target.value })}
                ></Input>
              </FormGroup>
            </Col>
            <Col sm="12">
              <FormGroup>
                <Label for="data-type">Loại thông báo</Label>
                <Input
                  type="select"
                  id="data-type"
                  value={type}
                  onChange={(e) => this.setState({ type: e.target.value })}
                >
                  <option value={0}>Khuyến mãi</option>
                  <option value={1}>Khác</option>
                </Input>
              </FormGroup>
            </Col>
            <Col sm="12">
              <FormGroup>
                <Label for="data-body">Nội dung bài</Label>
                <Input
                  style={{ height: "223px" }}
                  type="textarea"
                  id="data-body"
                  required
                  value={body}
                  onChange={(e) => this.setState({ body: e.target.value })}
                ></Input>
              </FormGroup>
            </Col>
            <Col sm="12">
              <FormGroup>
                <Label for="data-time_send">Thời gian gửi *</Label>
                <Flatpickr
                  className="form-control"
                  data-enable-time
                  id="data-time_send"
                  value={time_send}
                  required
                  onChange={(date) => {
                    this.setState({ time_send: date });
                  }}
                ></Flatpickr>
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
export default DataListSidebar;
