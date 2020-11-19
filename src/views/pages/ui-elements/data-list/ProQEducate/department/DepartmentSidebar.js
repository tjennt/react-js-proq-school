import React, { Component } from "react";
import { X } from "react-feather";
import PerfectScrollbar from "react-perfect-scrollbar";
import classnames from "classnames";
import FormDepartment from "./FormDepartment";
class DepartmentSidebar extends Component {
  handleSubmit = (state) => {
    const { handleSidebar, data, addData, params } = this.props;
    if (!data) {
      addData(state, params);
      handleSidebar(false, true);
    } else {
      // updateData(values);
      handleSidebar(false, true);
    }
  };
  render() {
    let {
      show,
      handleSidebar,
      data,
      dataClass,
      getDataSubject,
      season,
      classDepart,
      subjectClass,
      shift,
      teacher,
      getDataBothStudy,
    } = this.props;
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
          <h4>{data !== null ? "Cập nhật lịch học" : "Phân bố lịch học"}</h4>
          <X size={20} onClick={() => handleSidebar(false, true)} />
        </div>
        <PerfectScrollbar
          className="data-list-fields px-2 mt-3"
          options={{ wheelPropagation: false }}
        >
          <FormDepartment
            addDataStatus={this.state}
            teacher={teacher}
            season={season}
            shift={shift}
            classDepart={classDepart}
            subjectClass={subjectClass}
            dataClass={dataClass}
            getDataBothStudy={getDataBothStudy}
            getDataSubject={getDataSubject}
            initialValues={this.initialValues}
            handleSubmit={this.handleSubmit}
            handleSidebar={this.handleSidebar}
          />
        </PerfectScrollbar>
      </div>
    );
  }
}
export default DepartmentSidebar;
