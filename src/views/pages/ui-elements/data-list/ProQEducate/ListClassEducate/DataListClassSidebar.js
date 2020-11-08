import React, { Component } from "react";
import { X } from "react-feather";
import PerfectScrollbar from "react-perfect-scrollbar";
import classnames from "classnames";
import FormClass from "./FormClass";
class ClassEducateSidebar extends Component {
  initialValues = {
    id: "",
    nameClass: "",
    stage: "",
    specializate: "",
  };

  handleSubmit = (obj, { resetForm }) => {
    const { handleSidebar, data, addData, parsedFilter } = this.props;
    const panigate = {
      page: 1,
      limit: 10,
    };
    let params = parsedFilter || panigate;
    if (!data) {
      addData(obj, params);
      handleSidebar(false, true);
      resetForm({});
    } else {
      // updateData(values);
      handleSidebar(false, true);
    }
    console.log(obj);
  };
  render() {
    let { show, handleSidebar, data } = this.props;
    // let dataId = "";
    // if (data) {
    //   dataId = data.id;
    // }
    // let dataInititalEdit = [];
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
          <FormClass
            stage={this.props.stage}
            specialization={this.props.specialization}
            initialValues={this.initialValues}
            onSubmitForm={this.handleSubmit}
            handleSidebar={this.handleSidebar}
          />
        </PerfectScrollbar>
      </div>
    );
  }
}
export default ClassEducateSidebar;
