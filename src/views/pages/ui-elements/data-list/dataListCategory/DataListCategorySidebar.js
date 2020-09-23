import React, { Component } from "react";
import { Label, Input, FormGroup, Button } from "reactstrap";
import { X } from "react-feather";
import PerfectScrollbar from "react-perfect-scrollbar";
import classnames from "classnames";
import { toastWarning } from "../../../../../utility/toast/toastHelper";
class DataListCategorySidebar extends Component {
  state = {
    id: "",
    name: "",
    status: "",
  };

  addNew = false;

  componentDidUpdate(prevProps, prevState) {
    const { data } = this.props;
    if (data !== null && prevProps.data === null) {
      if (data.id !== prevState.id) this.setState({ id: data.id });
      if (data.name !== prevState.name) this.setState({ name: data.name });
      if (data.status !== prevState.status)
        this.setState({ status: data.status });
    }
    if (data === null && prevProps.data !== null) {
      this.setState({
        id: "",
        name: "",
        status: "",
      });
    }
    if (this.addNew) {
      this.setState({
        id: "",
        name: "",
        status: "",
      });
    }
    this.addNew = false;
  }

  handleSubmit = (obj) => {
    const { addData, updateData, handleSidebar, data, dataParams } = this.props;
    let params = Object.keys(dataParams).length
      ? dataParams
      : { page: 1, perPage: 4 };
    if (data !== null) {
      updateData(obj);
      handleSidebar(false, true);
    } else {
      if (!this.state.name) {
        toastWarning("Vui lòng nhập đầy các trường *");
        return false;
      }
      this.addNew = true;
      addData(obj, params);
      handleSidebar(false, true);
    }
    // this.props.getData(params);
  };

  render() {
    let { show, handleSidebar, data } = this.props;
    let { name, status } = this.state;
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
            <Label for="data-name">Tên thể loại</Label>
            <Input
              type="text"
              value={name}
              placeholder="Tên thể loại"
              onChange={(e) => this.setState({ name: e.target.value })}
              id="data-name"
            />
          </FormGroup>
          {status === "" ? (
            ""
          ) : (
            <FormGroup>
              <Label for="data-url">Trạng thái </Label>
              <Input
                type="select"
                id="data-url"
                value={status}
                placeholder="Trạng thái"
                onChange={(e) => this.setState({ status: e.target.value })}
              >
                <option value={0}> Đang ẩn </option>
                <option value={1}> Đang hiện </option>
              </Input>
            </FormGroup>
          )}
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
export default DataListCategorySidebar;
