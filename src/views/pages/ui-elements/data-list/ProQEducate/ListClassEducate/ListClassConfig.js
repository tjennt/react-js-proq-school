import React, { Component } from "react";
import DataTable from "react-data-table-component";
import classnames from "classnames";
import { history } from "../../../../../../history";
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
import {
  getDataClass,
  getDataStage,
  setTaskEditClass,
  updateDataClass,
  deleteDataClass,
} from "../../../../../../redux/actions/dataListAssistance/index";
import { getDataSpecialization } from "../../../../../../redux/actions/schedule/getDataSpecialization";
import { addClass } from "../../../../../../redux/actions/education/index";
import Sidebar from "./DataListClassSidebar";
import "./../../../../../../assets/scss/plugins/extensions/react-paginate.scss";
import "./../../../../../../assets/scss/pages/data-list.scss";
import "../../../../../../assets/scss/plugins/extensions/sweet-alerts.scss";

import Moment from "react-moment";
import {
  Button,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown,
} from "reactstrap";
import { message, Popconfirm, Tooltip } from "antd";
import ReactPaginate from "react-paginate";
const ActionsComponent = (props) => {
  function confirm(e) {
    props.deleteRow(props.row);
  }

  function cancel(e) {
    message.error("Hủy xóa dữ liệu !");
  }
  return (
    <div className="data-list-action">
      <Tooltip placement="topLeft" title="Chỉnh sửa">
        <Edit
          className="cursor-pointer mr-1"
          size={20}
          onClick={() => {
            return props.currentData(props.row);
          }}
        />
      </Tooltip>
      <Tooltip placement="topLeft" title="Xóa">
        <Popconfirm
          title="Bạn có chắc chắn xóa dữ liệu không?"
          onConfirm={confirm}
          onCancel={cancel}
          okText="Có "
          cancelText="Không "
        >
          <Trash className="cursor-pointer" size={20} />
        </Popconfirm>
      </Tooltip>
    </div>
  );
};

class ListClassEducateConfig extends Component {
  static getDerivedStateFromProps(props, state) {
    if (
      props.dataList.dataClass !== state.data.length ||
      state.currentPage !== props.parsedFilter.page
    ) {
      return {
        data: props.dataList.dataClass,
        totalPages: props.dataList.total_page_class,
        totalRecords: props.dataList.total_record_class,
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
        name: "Lớp",
        selector: "class",
        sortable: true,
        minWidth: "200px",
        cell: (row) => (
          <p title={row.name} className="text-truncate text-bold-500 mb-0">
            {row.name}
          </p>
        ),
      },
      {
        name: "Khóa",
        selector: "stage",
        sortable: true,
        minWidth: "200px",
        cell: (row) => (
          <p
            title={row.stage.name}
            className="text-truncate text-bold-500 mb-0"
          >
            {row.stage.name}
          </p>
        ),
      },
      {
        name: "Chuyên ngành",
        selector: "specialization",
        sortable: true,
        minWidth: "200px",
        cell: (row) => (
          <p
            title={row.specialization.name}
            className="text-truncate text-bold-500 mb-0"
          >
            {row.specialization.name}
          </p>
        ),
      },

      {
        name: "Ngày tạo lớp",
        selector: "dateCreate",
        sortable: true,
        // minWidth: "300px",
        cell: (row) => <Moment format="DD/MM/YYYY">{row.createdAt}</Moment>,
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
    const { parsedFilter } = this.props;

    const paginate = {
      page: 1,
      limit: 10,
    };
    const getAll = {
      page: "",
      limit: 1000,
    };
    let limit = parsedFilter || paginate;
    this.props.getDataClass(limit);
    this.props.getDataStage(getAll);
    this.props.getDataSpecialization(getAll);
  }
  handleFilter = (e) => {
    this.setState({ value: e.target.value });
    this.props.filterData(e.target.value);
  };

  handleSidebar = (boolean, addNew = false) => {
    this.setState({ sidebar: boolean });
    if (addNew === true) this.setState({ currentData: null, addNew: true });
  };
  handleDelete = (row) => {
    // this.props.getData(this.props.parsedFilter);
    this.props.deleteDataClass(row._id, this.props.parsedFilter);
    // if (this.state.data.length - 1 === 0) {
    //   history.push(
    //     `/accountAdmin?page=${parseInt(
    //       this.props.parsedFilter.page - 1
    //     )}&perPage=${this.props.parsedFilter.perPage}`
    //   );
    //   this.props.getData({
    //     page: this.props.parsedFilter.page - 1,
    //     perPage: this.props.parsedFilter.perPage,
    //   });
    // }
  };

  handleCurrentData = (obj) => {
    this.setState({ currentData: obj });
    this.props.setTaskEditClass(obj);
    this.handleSidebar(true);
  };
  handleAddData = () => {
    this.handleSidebar(true, true);
    this.props.setTaskEditClass(null);
  };
  handlePagination = (page) => {
    let { parsedFilter, getDataClass } = this.props;
    const { limit } = parsedFilter;
    let perPage = limit || 10;
    history.push(`/education/class?page=${page.selected + 1}&limit=${perPage}`);
    getDataClass({ page: page.selected + 1, limit: perPage });
    this.setState({ currentPage: page.selected });
  };
  handleRowsPerPage = (value) => {
    let { parsedFilter, getDataClass } = this.props;

    let page = parsedFilter.page !== undefined ? parsedFilter.page : 1;
    history.push(`/education/class?page=${page}&limit=${value}`);
    this.setState({ rowsPerPage: value });
    getDataClass({ page: parsedFilter.page, limit: value });
  };
  render() {
    let { columns, data, value, sidebar } = this.state;
    return (
      <div className="data-list">
        <Col lg="12">
          <Row>
            <Col lg="3">
              <Button
                color="primary"
                // onClick={() => this.handleSidebar(true, true)}
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
                  {this.state.totalRecords < 10 ? (
                    <span className="align-middle mx-50">
                      {this.state.totalRecords}
                    </span>
                  ) : (
                    <span className="align-middle mx-50">{`${
                      this.props.parsedFilter.limit
                        ? this.props.parsedFilter.limit
                        : 10
                    } trong tổng ${this.state.totalRecords}`}</span>
                  )}
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
            </Col>
          </Row>
        </Col>
        <DataTable
          className="dataTable-custom"
          data={value.length ? "" : data}
          columns={columns}
          noHeader
          fixedHeader
          fixedHeaderScrollHeight="55vh"
          noDataComponent="Không có lớp"
          subHeader
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
          stage={this.props.stage}
          specialization={this.props.specialization}
          show={sidebar}
          data={this.props.dataEdit}
          updateData={this.props.updateDataClass}
          addData={this.props.addClass}
          handleSidebar={this.handleSidebar}
          parsedFilter={this.props.parsedFilter}
        />
        <div
          className={classnames("data-list-overlay", {
            show: sidebar,
          })}
          onClick={() => this.handleSidebar(false, true)}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataList: state.assistantData,
    stage: state.assistantData.dataStage,
    specialization: state.dataSchedule.dataSpecial,
    dataEdit: state.assistantData.setTaskEditClass,
  };
};

export default connect(mapStateToProps, {
  getDataClass,
  addClass,
  getDataStage,
  getDataSpecialization,
  setTaskEditClass,
  updateDataClass,
  deleteDataClass,
})(ListClassEducateConfig);
