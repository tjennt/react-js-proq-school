import React, { Component } from "react";
import { X } from "react-feather";
import PerfectScrollbar from "react-perfect-scrollbar";
import classnames from "classnames";
import "antd/dist/antd.css";
import FormSeason from "./FormSeason";

class SeasonEducationSidebar extends Component {
  initialState = {
    id: "",
    name: "",
    startAt: "",
    startEnd: "",
  };
  handleSubmit = (obj, { resetForm }) => {
    const {
      addData,
      parsedFilter,
      handleSidebar,
      seasonEdit,
      updateData,
    } = this.props;
    if (seasonEdit === null) {
      handleSidebar(false, true);
      addData(obj, parsedFilter);
      resetForm({});
    } else {
      updateData(obj, parsedFilter);
      handleSidebar(false, true);
      resetForm({});
    }
  };
  render() {
    let { show, handleSidebar, seasonEdit } = this.props;
    let taskEditSeason = [];
    let id = "";
    if (seasonEdit) {
      id = seasonEdit._id;
      taskEditSeason = {
        id: seasonEdit._id,
        name: seasonEdit.name,
        startAt: seasonEdit.startAt,
        startEnd: seasonEdit.endAt,
      };
    }
    return (
      <div
        className={classnames("data-list-sidebar", {
          show: show,
        })}
      >
        <div className="data-list-sidebar-header mt-2 px-2 d-flex justify-content-between">
          <h4>{id !== null ? "Cập nhật" : "Thêm dữ liệu"}</h4>
          <X size={20} onClick={() => handleSidebar(false, true)} />
        </div>
        <PerfectScrollbar
          className="data-list-fields px-2 mt-3"
          options={{ wheelPropagation: false }}
        >
          <FormSeason
            onSubmitForm={this.handleSubmit}
            initialValues={id ? taskEditSeason : this.initialState}
            handleSidebar={handleSidebar}
          />
        </PerfectScrollbar>
      </div>
    );
  }
}
export default SeasonEducationSidebar;
