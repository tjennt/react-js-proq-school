import React, { Component } from "react";
import { X } from "react-feather";
import PerfectScrollbar from "react-perfect-scrollbar";
import classnames from "classnames";
import "antd/dist/antd.css";
import FormStage from "./FormStage";

class StageEducationSidebar extends Component {
  initialState = {
    id: "",
    name: "",
    startAt: "",
    startEnd: "",
  };
  handleSubmit = (obj, { resetForm }) => {
    const { addData, parsedFilter, handleSidebar } = this.props;
    // this.props.updateData(obj, params);
    handleSidebar(false, true);
    resetForm();
    addData(obj, parsedFilter);
    // this.props.handleSidebar(false, true);
  };
  render() {
    let { show, handleSidebar, data } = this.props;
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
          <FormStage
            onSubmitForm={this.handleSubmit}
            initialValues={this.initialState}
          />
        </PerfectScrollbar>
      </div>
    );
  }
}
export default StageEducationSidebar;
