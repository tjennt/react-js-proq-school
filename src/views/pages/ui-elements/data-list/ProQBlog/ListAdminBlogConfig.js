import React, { Component } from "react";
import DataTable from "react-data-table-component";
import classnames from "classnames";
import { history } from "../../../../../history";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Edit,
  Plus,
  Trash,
} from "react-feather";
import { connect } from "react-redux";
import "antd/dist/antd.css";
import { getDataClass } from "../../../../../redux/actions/dataListAssistance/index";
import Sidebar from "./AdminBlogSidebar";
import "../../../../../assets/scss/plugins/extensions/react-paginate.scss";
import "../../../../../assets/scss/pages/data-list.scss";
import {
  Button,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown,
  Card,
  CardBody,
} from "reactstrap";
import { message, Popconfirm, Tooltip } from "antd";
import {
  getCategory,
  addBlog,
  getNotifyAll,
  setTaskEdit,
  updateBlog,
  deleteTask,
} from "../../../../../redux/actions/blog";
import ReactPaginate from "react-paginate";
// import io from "socket.io-client";
// let socket;
const ActionsComponent = (props) => {
  function confirm(e) {
    props.deleteRow(props.row);
  }

  function cancel(e) {
    message.error("Hủy xóa dữ liệu !");
  }
  return (
    <div className="data-list-action">
      <Edit
        className="cursor-pointer mr-1"
        size={20}
        onClick={() => {
          return props.currentData(props.row);
        }}
      />
      <Popconfirm
        title="Bạn có chắc chắn xóa dữ liệu không?"
        onConfirm={confirm}
        onCancel={cancel}
        okText="Có "
        cancelText="Không "
      >
        <Trash className="cursor-pointer" size={20} />
      </Popconfirm>
    </div>
  );
};

class ListAdminBlogConfig extends Component {
  static getDerivedStateFromProps(props, state) {
    if (
      props.dataList.dataAllBlog !== state.data.length ||
      state.currentPage !== props.parsedFilter.page
    ) {
      return {
        data: props.dataList.dataAllBlog,
        totalPages: props.dataList.total_page,
        currentPage: parseInt(props.parsedFilter.page) - 1,
        rowsPerPage: parseInt(props.parsedFilter.perPage),
        totalRecords: props.dataList.total_item,
      };
    }

    // Return null if the state hasn't changed
    return null;
  }
  state = {
    data: [],
    totalPages: 0,
    visible: false,
    currentPage: 0,
    columns: [
      {
        name: "Tiêu đề ",
        selector: "title",
        sortable: true,
        minWidth: "450px",
        cell: (row) => (
          <Tooltip placement="bottomLeft" title={row.title}>
            <p title={row.title} className="text-truncate text-capitalize text-bold-500 mb-0">
              {row.title}
            </p>
          </Tooltip>
        ),
      },
      {
        name: "Cơ sở",
        selector: "place",
        sortable: true,
        maxWidth: "180px",
        cell: (row) => (
          <p title={row.place} className="text-truncate text-bold-500 mb-0">
            {row.place}
          </p>
        ),
      },
      {
        name: "Loại bài viết ",
        selector: "category",
        sortable: true,
        // minWidth: "300px",
        cell: (row) => (
          <p title={row.type} className="text-truncate text-bold-500 mb-0">
            {row.type}
          </p>
        ),
      },
      {
        name: "Thao tác",
        sortable: true,
        cell: (row) => (
          <ActionsComponent
            row={row}
            getData={this.props.getData}
            parsedFilter={this.props.parsedFilter}
            currentData={this.handleCurrentData}
            deleteRow={this.handleDelete}
            changeStatus={(row) => this.changeStatus(row)}
          />
        ),
      },
    ],
    allData: [],
    value: "",
    rowsPerPage: 4,
    sidebar: false,
    currentData: null,
    selected: [],
    totalRecords: 0,
    sortIndex: [],
    addNew: "",
  };

  thumbView = this.props.thumbView;

  componentDidMount() {
    this.props.getNotifyAll();
    this.props.getCategory();
  }
  handleSidebar = (boolean, addNew = false) => {
    this.setState({ sidebar: boolean });
    if (addNew === true) this.setState({ currentData: null, addNew: true });
  };

  handleDelete = (row) => {
    this.props.deleteTask(row._id, this.props.parsedFilter);
  };
  handleAddData = () => {
    this.handleSidebar(true, true);
    this.props.setTaskEdit(null);
  };
  handleCurrentData = (obj) => {
    this.props.setTaskEdit(obj);
    this.setState({ currentData: obj });
    this.handleSidebar(true);
  };
  handleRowsPerPage = (value) => {
    let { parsedFilter, getNotifyAll } = this.props;

    let page = parsedFilter.page !== undefined ? parsedFilter.page : 1;
    history.push(`/admin/blog?page=${page}&limit=${value}`);
    this.setState({ rowsPerPage: value });
    getNotifyAll({ page: parsedFilter.page, limit: value });
  };
  handlePagination = (page) => {
    let { parsedFilter, getNotifyAll } = this.props;
    let perPage = parsedFilter.perPage !== undefined ? parsedFilter.perPage : 10;

    history.push(`/admin/blog?page=${page.selected + 1}&limit=${perPage}`);
    getNotifyAll({ page: page.selected + 1, perPage: perPage });
    this.setState({ currentPage: page.selected });
  };

  render() {
    let { columns, data, value, sidebar } = this.state;
    return (
      <Card>
        <CardBody className="data-list">
          <Col lg="12">
            <Row>
              <Col lg="3">
                <Button
                  color="primary"
                  onClick={this.handleAddData}
                  outline={true}
                >
                  <Plus size={15} />
                  <span className="align-middle">Tạo mới</span>
                </Button>
              </Col>
              <Col lg="9">
                <UncontrolledDropdown
                  style={{ backgroundColor: "#fff", borderRadius: "20px" }}
                  className="data-list-rows-dropdown  d-md-block d-none"
                >
                  <DropdownToggle
                    disabled={this.state.totalRecords < 10 ? true : false}
                    className="sort-dropdown"
                    style={{
                      float: "right",
                      borderRadius: "20px",
                    }}
                  >
                    <span className="align-middle mx-50">{`Hiển thị: ${this.props.parsedFilter.limit
                      ? this.props.parsedFilter.limit
                      : 10
                      }`}</span>
                    {/* <span className="align-middle mx-50">{`${this.state.totalRecords
                          } của ${this.props.parsedFilter.page
                            ? this.props.parsedFilter.page
                            : 1
                          }`}</span> */}

                    <ChevronDown size={15} />
                  </DropdownToggle>
                  <DropdownMenu tag="div" right>
                    <DropdownItem
                      tag="a"
                      onClick={() => this.handleRowsPerPage(10)}
                    >
                      10
                    </DropdownItem>
                    <DropdownItem
                      tag="a"
                      onClick={() => this.handleRowsPerPage(20)}
                    >
                      20
                    </DropdownItem>
                    <DropdownItem
                      tag="a"
                      onClick={() => this.handleRowsPerPage(30)}
                    >
                      30
                    </DropdownItem>
                    <DropdownItem
                      tag="a"
                      onClick={() => this.handleRowsPerPage(50)}
                    >
                      50
                    </DropdownItem>
                    <DropdownItem
                      tag="a"
                      onClick={() => this.handleRowsPerPage(100)}
                    >
                      100
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <span className="btn btn-outline-primary btn-rounded float-right mr-2">
                  Tổng {this.state.totalRecords}</span>
              </Col>
            </Row>
          </Col>
          <DataTable
            className="dataTable-custom"
            data={value.length ? "" : data}
            columns={columns}
            fixedHeader
            fixedHeaderScrollHeight="49vh"
            noHeader={true}
            noDataComponent="Không có dữ liệu "
          />
          <ReactPaginate
            previousLabel={<ChevronLeft size={15} />}
            nextLabel={<ChevronRight size={15} />}
            breakLabel="..."
            breakClassName="break-me"
            pageCount={this.state.totalPages}
            containerClassName="vx-pagination separated-pagination pagination-end pagination-sm mb-0 mt-2"
            activeClassName="active"
            forcePage={
              this.props.parsedFilter.page
                ? parseInt(this.props.parsedFilter.page - 1)
                : 0
            }
            onPageChange={(page) => this.handlePagination(page)}
          />
          <Sidebar
            show={sidebar}
            dataCategory={this.props.dataCategory}
            data={this.props.taskEdit}
            updateData={this.props.updateBlog}
            addData={this.props.addBlog}
            handleSidebar={this.handleSidebar}
            thumbView={this.props.thumbView}
            getData={this.props.getData}
            dataParams={this.props.parsedFilter}
            addNew={this.state.addNew}
          />
          <div
            className={classnames("data-list-overlay", {
              show: sidebar,
            })}
            onClick={() => this.handleSidebar(false, true)}
          />
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataList: state.dataBlog,
    dataCategory: state.dataBlog.dataCategory,
    taskEdit: state.dataBlog.setTaskEdit,
  };
};

export default connect(mapStateToProps, {
  getDataClass,
  getCategory,
  addBlog,
  getNotifyAll,
  setTaskEdit,
  updateBlog,
  deleteTask,
})(ListAdminBlogConfig);
