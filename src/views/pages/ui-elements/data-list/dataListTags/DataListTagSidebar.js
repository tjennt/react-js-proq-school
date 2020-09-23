import React, { Component } from "react";
import { Label, Input, FormGroup, Button } from "reactstrap";
import { X } from "react-feather";
import PerfectScrollbar from "react-perfect-scrollbar";
import classnames from "classnames";

class DataListTagSidebar extends Component {
  state = {
    id: "",
    name: "",
    url: "",
  };

  addNew = false;

  componentDidUpdate(prevProps, prevState) {
    const { data } = this.props;
    if (data !== null && prevProps.data === null) {
      if (data.id !== prevState.id) this.setState({ id: data.id });
      if (data.name !== prevState.name) this.setState({ name: data.name });
      if (data.url !== prevState.url) this.setState({ url: data.url });
    }
    if (data === null && prevProps.data !== null) {
      this.setState({
        id: "",
        name: "",
        url: "",
      });
    }
    if (this.addNew) {
      this.setState({
        id: "",
        name: "",
        url: "",
      });
    }
    this.addNew = false;
  }

  handleSubmit = (obj) => {
    const { getData, handleSidebar, data, addData, dataParams } = this.props;
    if (data !== null) {
      // this.props.updateData(obj);
    } else {
      this.addNew = true;
      addData(obj);
    }
    let params = Object.keys(dataParams).length
      ? dataParams
      : { page: 1, perPage: 4 };
    handleSidebar(false, true);
    getData(params);
  };
  render() {
    let { show, handleSidebar, data } = this.props;
    let { name, url } = this.state;
    return (
      <div
        className={classnames("data-list-sidebar", {
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
          <FormGroup>
            <Label for="data-name">Tên</Label>
            <Input
              type="text"
              value={name}
              placeholder="Name Tag"
              onChange={(e) => this.setState({ name: e.target.value })}
              id="data-name"
            />
          </FormGroup>
          <FormGroup>
            <Label for="data-url">Url</Label>
            <Input
              type="text"
              id="data-url"
              value={url}
              placeholder="Url"
              onChange={(e) => this.setState({ url: e.target.value })}
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
export default DataListTagSidebar;
