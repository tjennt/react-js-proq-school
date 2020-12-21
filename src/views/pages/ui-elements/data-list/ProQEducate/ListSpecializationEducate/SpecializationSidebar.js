import React, { Component } from "react";
import { X } from "react-feather";
import PerfectScrollbar from "react-perfect-scrollbar";
import classnames from "classnames";
import "antd/dist/antd.css";
import FormSpecialization from "./FormSpecialization";

class SpecializationSidebar extends Component {
  initialState = {
    id: "",
    nameSpecialization: "",
    subject: [],
  };
  handleSubmit = (obj, { resetForm }) => {
    const { parsedFilter } = this.props;
    let paginate = {
      page: 1,
      limit: 10,
    };
    let params = parsedFilter || paginate;
    if (this.props.data !== null) {
      this.props.updateData(obj, params);
      this.props.handleSidebar(false, true);
      resetForm({});
    } else {
      this.props.addData(obj, params);
      resetForm({});

      this.props.handleSidebar(false, true);
    }
  };
  render() {
    let { show, handleSidebar, data } = this.props;
    let dataEdit = [];
    if (data) {
      dataEdit = {
        id: data._id,
        nameSpecialization: data.name,
        subject: data.subject.map((item) => item._id),
      };
    }
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
          <FormSpecialization
            subject={this.props.subject}
            initialState={data ? dataEdit : this.initialState}
            onSubmitForm={this.handleSubmit}
            handleSidebar={handleSidebar}
          />
        </PerfectScrollbar>
      </div>
    );
  }
}
export default SpecializationSidebar;
