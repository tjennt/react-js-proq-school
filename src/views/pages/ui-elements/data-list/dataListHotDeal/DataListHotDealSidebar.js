import React, { Component } from "react";
import { Label, Input, FormGroup, Button, Col, Row } from "reactstrap";
import { X } from "react-feather";
import PerfectScrollbar from "react-perfect-scrollbar";
import classnames from "classnames";
import "flatpickr/dist/themes/light.css";
import "../../../../../assets/scss/plugins/forms/flatpickr/flatpickr.scss";
class DataListHotDealSidebar extends Component {
  state = {
    key_check: "",
    name: "",
    image: "",
    link: "",
    original_price: "",
    current_price: "",
  };

  addNew = false;

  componentDidUpdate(prevProps, prevState) {
    const { data } = this.props;
    if (data !== null && prevProps.data === null) {
      if (data.key_check !== prevState.key_check)
        this.setState({ key_check: data.key_check });
      if (data.name !== prevState.name) this.setState({ name: data.name });
      if (data.link !== prevState.link) this.setState({ link: data.link });
      if (data.image !== prevState.image) this.setState({ image: data.image });
      if (data.original_price !== prevState.original_price)
        this.setState({ original_price: data.original_price });
      if (data.current_price !== prevState.current_price)
        this.setState({ current_price: data.current_price });
    }
    if (data === null && prevProps.data !== null) {
      this.setState({
        key_check: "",
        name: "",
        image: "",
        link: "",
        original_price: "",
        current_price: "",
      });
    }
    if (this.addNew) {
      this.setState({
        key_check: "",
        name: "",
        image: "",
        link: "",
        original_price: "",
        current_price: "",
      });
    }
    this.addNew = false;
  }

  handleSubmit = (obj) => {
    const {
      dataParams,
      data,
      addData,
      updateData,
      handleSidebar,
      getData,
    } = this.props;
    let params = Object.keys(dataParams).length
      ? dataParams
      : { page: 1, perPage: 4 };
    if (data !== null) {
      updateData(obj, params);
    } else {
      this.addNew = true;
      addData(obj);
    }
    handleSidebar(false, true);
    getData(params);
  };
  handleEditorChange = (content) => {
    this.setState({
      ...this.state,
      content_detail: content,
    });
  };
  onChange = ({ fileList: newFileList }) => {
    this.setState({
      imgUpdate: newFileList,
    });
  };
  render() {
    let { show, handleSidebar, data } = this.props;
    let { name, link, original_price, current_price, image } = this.state;
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
            <Col sm="12">
              <FormGroup>
                <Label for="data-name">Tên sản phẩm</Label>
                <Input
                  type="text"
                  value={name}
                  placeholder="Title"
                  onChange={(e) => this.setState({ name: e.target.value })}
                  id="data-name"
                />
              </FormGroup>
            </Col>
            <Col sm="12">
              <FormGroup>
                <Label for="data-link">Đường dẫn </Label>
                <Input
                  type="text"
                  value={link}
                  placeholder="Đường dẫn hình ảnh"
                  onChange={(e) => this.setState({ link: e.target.value })}
                  id="data-link"
                />
              </FormGroup>
            </Col>
            <Col sm="12">
              <FormGroup>
                <Label for="data-linkimage">Đường dẫn hình ảnh </Label>
                <Input
                  type="text"
                  value={image}
                  placeholder="Đường dẫn hình ảnh "
                  onChange={(e) => this.setState({ image: e.target.value })}
                  id="data-linkimage"
                />
              </FormGroup>
            </Col>
            <Col sm="12">
              <FormGroup>
                <Label for="data-original_price">Giá gốc</Label>
                <Input
                  type="text"
                  value={original_price}
                  placeholder="Giá gốc"
                  onChange={(e) =>
                    this.setState({ original_price: e.target.value })
                  }
                  id="data-original_price"
                />
              </FormGroup>
            </Col>
            <Col sm="12">
              <FormGroup>
                <Label for="data-original_price">Giá Khuyến mãi </Label>
                <Input
                  type="text"
                  value={current_price}
                  placeholder="Giá khuyến mãi "
                  onChange={(e) =>
                    this.setState({ current_price: e.target.value })
                  }
                  id="data-original_price"
                />
              </FormGroup>
            </Col>
          </Row>
        </PerfectScrollbar>
        <div className="data-list-sidebar-footer px-2 d-flex justify-content-start align-items-center mt-1">
          <Button color="primary" onClick={() => this.handleSubmit(this.state)}>
            {data !== null ? "Update" : "Submit"}
          </Button>
          <Button
            className="ml-1"
            color="danger"
            outline
            onClick={() => handleSidebar(false, true)}
          >
            Cancel
          </Button>
        </div>
      </div>
    );
  }
}
export default DataListHotDealSidebar;
