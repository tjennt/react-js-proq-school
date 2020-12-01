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
import { getDataSeason } from "../../../../../../redux/actions/dataListAssistance/index";
import { importExcelStudent } from "../../../../../../redux/actions/education/index";
import {
  addSeason,
  setTaskSeason,
  updateSeason,
  deleteSeason,
} from "../../../../../../redux/actions/education/index";
import Sidebar from "./SeasonEducationSidebar";
import "./../../../../../../assets/scss/plugins/extensions/react-paginate.scss";
import "./../../../../../../assets/scss/pages/data-list.scss";
import "../../../../../../assets/scss/plugins/extensions/sweet-alerts.scss";
import {
  Button,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown,
} from "reactstrap";
import { Popconfirm, message } from "antd";
import ReactPaginate from "react-paginate";
import { newDate } from "../../../../../../utility/config";

const ActionsComponent = (props) => {
  function confirm(e) {
    props.deleteRow(props.row);
  }
  function cancel(e) {
    message.error("Hủy thay đổi trạng thái  !");
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
        title="Bạn có chắc chắn xóa sinh viên?"
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
class ListSeasonEducation extends Component {
  static getDerivedStateFromProps(props, state) {
    if (
      props.dataList.dataSeason !== state.data.length ||
      state.currentPage !== props.parsedFilter.page
    ) {
      return {
        data: props.dataList.dataSeason,
        totalPages: props.dataList.total_page_season,
        // currentPage: parseInt(props.parsedFilter.page) - 1,
        // rowsPerPage: parseInt(props.parsedFilter.perPage),
        totalRecords: props.dataList.total_record_season,
        // sortIndex: props.dataList.sortIndex,
      };
    }

    // Return null if the state hasn't changed
    return null;
  }
  state = {
    data: [],
    totalPages: 0,
    currentPage: 0,
    columns: [
      {
        name: "kì",
        selector: "season",
        sortable: true,
        minWidth: "300px",
        cell: (row) => (
          <p
            title={row.studentCode}
            className="text-truncate text-bold-500 mb-0"
          >
            {row.name}
          </p>
        ),
      },
      {
        name: " Ngày bắt đầu",
        selector: "date_start",
        sortable: true,
        minWidth: "300px",
        cell: (row) => <p>{newDate(row.startAt)}</p>,
      },
      {
        name: " Ngày kết thúc",
        selector: "date_end",
        sortable: true,
        minWidth: "300px",
        cell: (row) => <p>{newDate(row.endAt)}</p>,
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
    visible: false,
    totalRecords: 0,
    sortIndex: [],
    addNew: "",
    file: "",
  };

  thumbView = this.props.thumbView;

  componentDidMount() {
    const { parsedFilter, getDataSeason } = this.props;

    const paginate = {
      page: 1,
      limit: 10,
    };
    let limit = parsedFilter || paginate;
    getDataSeason(limit);
  }

  handleSidebar = (boolean, addNew = false) => {
    this.setState({ sidebar: boolean });
    if (addNew === true) this.setState({ currentData: null, addNew: true });
  };
  handleDelete = (row) => {
    this.props.deleteSeason(row, this.props.parsedFilter);
  };
  handleCurrentData = (obj) => {
    this.props.setTaskSeason(obj);
    this.setState({ currentData: obj });
    this.handleSidebar(true);
  };
  handlePagination = (page) => {
    let { parsedFilter, getDataSeason } = this.props;
    const { limit } = parsedFilter;
    let perPage = limit || 10;
    history.push(
      `/education/season?page=${page.selected + 1}&limit=${perPage}`
    );
    getDataSeason({ page: page.selected + 1, limit: perPage });
    this.setState({ currentPage: page.selected });
  };
  handleRowsPerPage = (value) => {
    let { parsedFilter, getDataSeason } = this.props;

    let page = parsedFilter.page !== undefined ? parsedFilter.page : 1;
    history.push(`/education/season?page=${page}&limit=${value}`);
    this.setState({ rowsPerPage: value });
    getDataSeason({ page: parsedFilter.page, limit: value });
  };
  handleAddData = () => {
    this.props.setTaskSeason(null);

    this.handleSidebar(true, true);
  };
  render() {
    let { columns, value, sidebar, data } = this.state;
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
                      this.props.parsedFilter.page
                        ? this.props.parsedFilter.page
                        : 1
                    } of ${this.state.totalRecords}`}</span>
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
          noHeader={true}
          fixedHeader
          fixedHeaderScrollHeight={"55vh"}
          noDataComponent="Không có khóa học"
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
          updateData={this.props.updateSeason}
          addData={this.props.addSeason}
          seasonEdit={this.props.dataEditSeason}
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
    dataEditSeason: state.dataSchedule.setTaskSeason,
  };
};

export default connect(mapStateToProps, {
  getDataSeason,
  importExcelStudent,
  addSeason,
  setTaskSeason,
  updateSeason,
  deleteSeason,
})(ListSeasonEducation);
