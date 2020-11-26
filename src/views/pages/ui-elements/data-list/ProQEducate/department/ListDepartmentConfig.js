import React, { Component } from "react";
import DataTable from "react-data-table-component";
import classnames from "classnames";
import { history } from "../../../../../../history";
import { ChevronLeft, ChevronRight, Edit, Plus, Trash } from "react-feather";
import { connect } from "react-redux";
import "antd/dist/antd.css";
import { getDataSchedules } from "../../../../../../redux/actions/education/index";
import {
  getDataClass,
  getDataSeason,
  getDataTeacher,
} from "../../../../../../redux/actions/dataListAssistance/index";
import {
  addSchedules,
  updateSchedules,
  deleteSchedules,
} from "../../../../../../redux/actions/schedule/index";
import {
  getDataSubject,
  getDataSubjectUpdate,
} from "../../../../../../redux/actions/schedule/getDataSubject";
import { getDataBothStudy } from "../../../../../../redux/actions/schedule/getDataBothStudy";
import Sidebar from "./DepartmentSidebar";
import "./../../../../../../assets/scss/plugins/extensions/react-paginate.scss";
import "./../../../../../../assets/scss/pages/data-list.scss";
import "../../../../../../assets/scss/plugins/extensions/sweet-alerts.scss";
import Moment from "react-moment";
import { Button, Col } from "reactstrap";
import { message, Popconfirm } from "antd";
import ReactPaginate from "react-paginate";
import { newDate } from "../../../../../../utility/config";
const chipText = {
  0: "Chủ nhật",
  1: "Thứ 2",
  2: "Thứ 3",
  3: "Thứ 4",
  4: "Thứ 5",
  5: "Thứ 6",
  6: "Thứ 7",
};
const ActionDay = (props) => {
  const { row } = props;
  let weekDays = row.weekDays;
  return (
    <div style={{ display: "inline-flex" }}>
      {weekDays.map((item) => (
        <p key={item}> {chipText[item]}, </p>
      ))}
    </div>
  );
};
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
const CustomHeader = (props) => {
  return (
    <div className="data-list-header d-flex justify-content-between flex-wrap">
      <div className="actions-left d-flex flex-wrap">
        <Button
          color="primary"
          onClick={() => props.handleSidebar(true, true)}
          outline={true}
        >
          <Plus size={15} />
          <span className="align-middle">Tạo mới</span>
        </Button>
      </div>
    </div>
  );
};
class ListDepartmentConfig extends Component {
  static getDerivedStateFromProps(props, state) {
    if (
      props.schedules.dataSchedules !== state.data.length ||
      state.currentPage !== props.parsedFilter.page
    ) {
      return {
        data: props.schedules.dataSchedules,
        totalPages: props.schedules.total_page_schedule,
      };
    }

    return null;
  }
  state = {
    data: [],
    totalPages: 0,
    visible: false,
    currentPage: 0,
    columns: [
      {
        name: "Tên lớp",
        selector: "class",
        sortable: true,
        minWidth: "120px",
        cell: (row) => (
          <p title={row.class} className="text-truncate text-bold-500 mb-0">
            {row.class}
          </p>
        ),
      },
      {
        name: "Môn",
        selector: "subjects",
        sortable: true,
        // minWidth: "300px",
        cell: (row) => (
          <p title={row.subject} className="text-truncate text-bold-500 mb-0">
            {row.subject}
          </p>
        ),
      },

      {
        name: "Ca",
        selector: "shift",
        sortable: true,
        // minWidth: "300px",
        cell: (row) => (
          <p title={row.shift} className="text-truncate text-bold-500 mb-0">
            {row.shift}
          </p>
        ),
      },
      {
        name: "Học kì",
        selector: "season",
        sortable: true,
        minWidth: "200px",
        cell: (row) => (
          <p title={row.season} className="text-truncate text-bold-500 mb-0">
            {row.season}
          </p>
        ),
      },
      // {
      //   name: "Khóa",
      //   selector: "season",
      //   sortable: true,
      //   // minWidth: "300px",
      //   cell: (row) => (
      //     <p title={row.season} className="text-truncate text-bold-500 mb-0">
      //       {row.season}
      //     </p>
      //   ),
      // },
      {
        name: "Giáo viên",
        selector: "teacher",
        sortable: true,
        minWidth: "180px",
        cell: (row) => (
          <p
            title={row.nameTeacher}
            className="text-truncate text-bold-500 mb-0"
          >
            {row.nameTeacher}
          </p>
        ),
      },
      {
        name: "Thứ",
        selector: "day",
        sortable: true,
        minWidth: "300px",
        cell: (row) => <ActionDay row={row} />,
      },
      {
        name: "Ngày bắt đầu",
        selector: "startAt",
        sortable: true,
        minWidth: "200px",
        cell: (row) => <p>{newDate(row.startAt)}</p>,
      },
      {
        name: "Ngày kết thúc",
        selector: "endAt",
        sortable: true,
        minWidth: "200px",
        cell: (row) => <p>{newDate(row.endAt)}</p>,
      },
      {
        name: "Thao tác",
        sortable: true,
        minWidth: "200px",
        cell: (row) => (
          <ActionsComponent
            row={row}
            getData={this.props.getData}
            parsedFilter={this.props.parsedFilter}
            dataId={this.state.currentData}
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
    const {
      getDataClass,
      parsedFilter,
      getDataSeason,
      getDataTeacher,
      getDataSchedules,
    } = this.props;
    let params = {
      limit: 1000,
    };
    const paginate = {
      page: 1,
      limit: 10,
    };
    let limit = parsedFilter || paginate;
    getDataClass(params);
    getDataSchedules(limit);
    getDataSeason(params);
    getDataTeacher(params);
  }

  handleFilter = (e) => {
    this.setState({ value: e.target.value });
    this.props.filterData(e.target.value);
  };

  handleSidebar = (boolean, addNew = false) => {
    this.setState({ sidebar: boolean });
    if (addNew === true) this.setState({ currentData: null, addNew: true });
  };
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  handleOk = (e) => {
    this.setState({
      ...this.state,
      visible: false,
    });
  };

  handleCancel = (e) => {
    this.setState({
      visible: false,
      excel: null,
    });
  };
  changeStatus = (row) => {
    this.props.updateStatus(row, this.props.parsedFilter);
    this.props.getData(this.props.parsedFilter);
  };
  handleDelete = (row) => {
    this.props.deleteSchedules(row.id, this.props.parsedFilter);
    this.props.getDataSchedules(this.props.parsedFilter);
    if (this.state.data.length - 1 === 0) {
      history.push(
        `/accountAdmin?page=${parseInt(
          this.props.parsedFilter.page - 1
        )}&limit=${this.props.parsedFilter.perPage}`
      );
      this.props.getDataSchedules({
        page: this.props.parsedFilter.page - 1,
        limit: this.props.parsedFilter.perPage,
      });
    }
  };

  handleCurrentData = (obj) => {
    this.setState({ currentData: obj });
    this.handleSidebar(true);
  };

  handlePagination = (page) => {
    let { parsedFilter, getDataSchedules } = this.props;
    let perPage =
      parsedFilter.perPage !== undefined ? parsedFilter.perPage : 10;

    history.push(`/department?page=${page.selected + 1}&limit=${perPage}`);
    getDataSchedules({ page: page.selected + 1, limit: perPage });
    this.setState({ currentPage: page.selected });
  };

  render() {
    let { columns, data, value, currentData, sidebar, dataClass } = this.state;
    return (
      <div className="data-list">
        <Col lg="12">
          <CustomHeader
            handleSidebar={this.handleSidebar}
            showModal={this.showModal}
            handleFilter={this.handleFilter}
            handleRowsPerPage={this.handleRowsPerPage}
          />
        </Col>
        <DataTable
          className="dataTable-custom"
          data={value.length ? "" : data}
          columns={columns}
          noHeader
          noDataComponent="Không có dữ liệu "
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
          params={this.props.parsedFilter}
          season={this.props.season}
          shift={this.props.shift}
          teacher={this.props.teacher}
          classDepart={this.props.class}
          subjectClass={this.props.subjectClass}
          getDataSubject={this.props.getDataSubject}
          getDataSubjectUpdate={this.props.getDataSubjectUpdate}
          getDataBothStudy={this.props.getDataBothStudy}
          dataClass={dataClass}
          show={sidebar}
          data={currentData}
          updateData={this.props.updateSchedules}
          addData={this.props.addSchedules}
          handleSidebar={this.handleSidebar}
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
    season: state.assistantData.dataSeason,
    class: state.assistantData.dataClass,
    subjectClass: state.dataSchedule.dataSubject,
    shift: state.dataSchedule.dataBothStudy,
    teacher: state.assistantData.dataTeacher,
    schedules: state.dataSchedule,
  };
};

export default connect(mapStateToProps, {
  getDataClass,
  getDataSubject,
  getDataSchedules,
  getDataSeason,
  getDataBothStudy,
  getDataTeacher,
  addSchedules,
  updateSchedules,
  deleteSchedules,
  getDataSubjectUpdate,
})(ListDepartmentConfig);
