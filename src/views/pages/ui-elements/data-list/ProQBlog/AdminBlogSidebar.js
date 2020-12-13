import React, { Component } from "react";
import { X } from "react-feather";
import PerfectScrollbar from "react-perfect-scrollbar";
import classnames from "classnames";
import FormBlog from "./FormAdminBlog";
class AdminBlogSidebar extends Component {
  initialValues = {
    id: "",
    title: "",
    content: "",
    location: "",
    category: null,
  };

  handleSubmit = (values, { resetForm }) => {
    const { handleSidebar, data, addData, dataParams, updateData } = this.props;
    if (data !== null) {
      updateData(dataParams, values);
      handleSidebar(false, true);
      resetForm({});
    } else {
      addData(dataParams, values);
      handleSidebar(false, true);
      resetForm({});
    }
  };
  render() {
    let { show, handleSidebar, data } = this.props;
    let dataId = "";
    let dataInititalEdit = [];
    if (data) {
      dataId = data._id;
      dataInititalEdit = {
        id: data._id,
        title: data.title,
        content: data.description,
        location: data.place,
        category: data.type,
      };
    }
    return (
      <div
        className={classnames("data-list-sidebarBlog", {
          show: show,
        })}
      >
        <div className="data-list-sidebarBlog-header mt-2 px-2 d-flex justify-content-between">
          <h4>{data !== null ? "Cập nhật dữ liệu" : "Thêm dữ liệu"}</h4>
          <X size={20} onClick={() => handleSidebar(false, true)} />
        </div>
        <PerfectScrollbar
          className="data-list-fields px-2 mt-3"
          options={{ wheelPropagation: false }}
        >
          <FormBlog
            dataCategory={this.props.dataCategory}
            initialValues={dataId ? dataInititalEdit : this.initialValues}
            onSubmitForm={this.handleSubmit}
            handleSidebar={this.props.handleSidebar}
          />
        </PerfectScrollbar>
      </div>
    );
  }
}
export default AdminBlogSidebar;
