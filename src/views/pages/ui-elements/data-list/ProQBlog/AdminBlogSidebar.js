import React, { Component } from "react";
import { X } from "react-feather";
import PerfectScrollbar from "react-perfect-scrollbar";
import classnames from "classnames";
import FormBlog from "./FormAdminBlog";
class AdminBlogSidebar extends Component {
  initialValues = {
    id: "",
    title: "",
    author: "",
    content: "",
    location: null,
    timeUpdate: "",
    description: "",
    category: null,
  };

  handleSubmit = (values, { resetForm }) => {
    const { handleSidebar, data } = this.props;
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
            initialValues={this.initialValues}
            onSubmitForm={this.handleSubmit}
            handleSidebar={this.handleSidebar}
          />
        </PerfectScrollbar>
      </div>
    );
  }
}
export default AdminBlogSidebar;