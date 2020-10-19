import React, { Component } from "react";
import { X } from "react-feather";
import PerfectScrollbar from "react-perfect-scrollbar";
import classnames from "classnames";
import FormAdminTeacher from "./FormAdminTeacher";
class AdminTeacherSidebar extends Component {
  initialValues = {
    id: "",
    nameClass: "",
    subject: 1,
    days: [],
    start_time: "",
    ca: 1,
    end_time: "",
    teacher: null,
  };

  handleSubmit = (values, { resetForm }) => {
    const { addData, handleSidebar, data, updateData } = this.props;
    if (!data) {
      // addData(values);
      // handleSidebar(false, true);
      resetForm({});
    } else {
      // updateData(values);
      handleSidebar(false, true);
    }
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
          <FormAdminTeacher
            initialValues={this.initialValues}
            onSubmitForm={this.handleSubmit}
            handleSidebar={this.handleSidebar}
          />
        </PerfectScrollbar>
      </div>
    );
  }
}
export default AdminTeacherSidebar;
