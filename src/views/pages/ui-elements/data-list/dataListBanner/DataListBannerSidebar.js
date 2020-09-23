import React, { Component } from "react";
import { Label, FormGroup, Button, Input, Col, Row, Form } from "reactstrap";
import { X } from "react-feather";
import PerfectScrollbar from "react-perfect-scrollbar";
import classnames from "classnames";
import "flatpickr/dist/themes/light.css";
import "../../../../../assets/scss/plugins/forms/flatpickr/flatpickr.scss";
import { Editor } from "@tinymce/tinymce-react";
import { baseUrl } from "../../../../../utility/config/index";
import { Upload, Select } from "antd";
import { AvField, AvForm } from "availity-reactstrap-validation";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import { toastWarning } from "../../../../../utility/toast/toastHelper";
class DataListBannerSidebar extends Component {
  state = {
    id: "",
    thump_image: "",
    imgUpdate: "",
    alt: "",
    link: "",
  };

  addNew = false;
  componentDidUpdate(prevProps, prevState) {
    const { data } = this.props;
    if (data !== null && prevProps.data === null) {
      if (data.id !== prevState.id) this.setState({ id: data.id });
      if (data.url !== prevState.url) this.setState({ link: data.url });
      if (data.alt !== prevState.alt) this.setState({ link: data.url });
      if (data.thump_image !== prevState.thump_image)
        this.setState({ thump_image: data.thump_image });
    }

    if (data === null && prevProps.data !== null) {
      this.setState({
        id: "",
        thump_image: "",
        imgUpdate: "",
        alt: "",
        link: "",
      });
    }
    if (this.addNew) {
      this.setState({
        id: "",
        thump_image: "",
        imgUpdate: "",
        alt: "",
        link: "",
      });
    }
    this.addNew = false;
  }

  handleSubmit = (obj) => {
    let params = Object.keys(this.props.dataParams).length
      ? this.props.dataParams
      : { page: 1, perPage: 4 };
    if (this.props.data !== null) {
      this.props.updateData(obj, params);
      this.props.handleSidebar(false, true);
    } else {
      const { alt, link } = this.state;
      if (!link | !alt) {
        toastWarning("vui lòng điền đẩy đủ thông tin *");
        return false;
      }
      this.props.addData(obj);
      this.addNew = true;
      this.props.handleSidebar(false, true);
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
    let { thump_image, imgUpdate, alt, link } = this.state;
    return (
      <div
        className={classnames("data-list-sidebarBlog", {
          show: show,
        })}
      >
        <div className="data-list-sidebar-header mt-2 px-2 d-flex justify-content-between">
          <h4>{data !== null ? "Cập nhật dữ liệu" : "Thêm dữ liệu"}</h4>
          <X size={20} onClick={() => handleSidebar(false, true)} />
        </div>
        <PerfectScrollbar
          className="data-list-fields px-2 mt-3"
          options={{ wheelPropagation: false }}
        >
          <Form>
            <AvForm>
              <Row>
                {this.props.thumbView && thump_image.length ? (
                  <Col sm="12">
                    {thump_image ? (
                      <FormGroup className="text-center">
                        <img
                          width={"120px"}
                          className="img-fluid"
                          src={`${baseUrl}${thump_image}`}
                          alt={alt}
                        />
                        <div className="d-flex flex-wrap justify-content-between mt-2">
                          <Button
                            color="flat-danger"
                            onClick={() => this.setState({ thump_image: "" })}
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
                  {this.props.thumbView && thump_image.length <= 0 ? (
                    <Upload
                      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      fileList={imgUpdate}
                      onChange={this.onChange}
                      listType="picture-card"
                    >
                      {imgUpdate.length < 1 && "+ Tải hình"}
                    </Upload>
                  ) : null}
                </Col>
                <Col sm="6">
                  <FormGroup>
                    <Label for="data-url">Link hình ảnh *</Label>
                    <Input
                      name="url"
                      type="text"
                      value={link}
                      placeholder="Link hình ảnh"
                      onChange={(e) => this.setState({ link: e.target.value })}
                      id="data-url"
                    />
                  </FormGroup>
                </Col>
              </Row>
            </AvForm>
          </Form>
        </PerfectScrollbar>
        <div className="data-list-sidebar-footer px-2 d-flex justify-content-start align-items-center mt-1">
          <Button onClick={() => this.handleSubmit(this.state)} color="primary">
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
const mapStateToProp = (state) => {
  return {
    addDataSuccess: state.dataBlog.addDataSuccess,
  };
};
export default connect(mapStateToProp)(DataListBannerSidebar);
