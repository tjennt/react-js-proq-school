import React, { Component } from "react";
import DataTable from "react-data-table-component";
import { history } from "../../../../history";
import { connect } from "react-redux";
import "antd/dist/antd.css";
import { getDataScheduleAll } from "../../../../redux/actions/student/index";
import "../../../../assets/scss/plugins/extensions/react-paginate.scss";
import "../../../../assets/scss/pages/data-list.scss";
import "../../../../assets/scss/plugins/extensions/sweet-alerts.scss";
import { newDate } from "../../../../utility/config";
import { Card, CardBody } from 'reactstrap';
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
  let weekDays = row.days;
  return (
    <>
      {weekDays.map((item) => (
        <span key={item} 
        style={{ marginLeft: 5 }}
        className="badge badge-primary"> {chipText[item]} </span>
      ))}
    </>
  );
};
class ListSchedulesDate extends Component {
  static getDerivedStateFromProps(props, state) {
    if (props.dataList.dataAllSchedule !== state.data.length) {
      return {
        data: props.dataList.dataAllSchedule,
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
        name: "Giảng viên",
        selector: "teacher",
        sortable: true,
        minWidth: "200px",
        cell: (row) => (
          <p title={row.teacher} className="text-truncate text-bold-500 mb-0">
            {row.teacher}
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
      {
        name: "Thứ",
        selector: "subjects",
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
    selectedRows: null,
    addNew: "",
  };

  thumbView = this.props.thumbView;
  componentDidMount() {
    this.props.getDataScheduleAll();
  }
  handleCurrentData = (obj) => {
    this.setState({ currentData: obj });
    history.push(`/teacher/attendance/${obj.id}`);
  };

  handlePagination = (page) => {
    let { parsedFilter, getData } = this.props;
    let perPage = parsedFilter.perPage !== undefined ? parsedFilter.perPage : 4;

    history.push(
      `/teacher/attendance?page=${page.selected + 1}&limit=${perPage}`
    );
    getData({ page: page.selected + 1, limit: perPage });
    this.setState({ currentPage: page.selected });
  };

  render() {
    let { columns, value, data } = this.state;
    return (
      <Card>
        <CardBody className="data-list">
          <DataTable
            className="dataTable-custom"
            data={value.length ? "" : data}
            columns={columns}
            noHeader={true}
            fixedHeader
            fixedHeaderScrollHeight={"50vh"}
          />
          {/*         
          <ReactPaginate
            previousLabel={<ChevronLeft size={15} />}
            nextLabel={<ChevronRight size={15} />}
            breakLabel="..."
            breakClassName="break-me"
            pageCount={this.state.totalPages}
            containerClassName="vx-pagination separated-pagination pagination-end pagination-sm mb-0 mt-2"
            activeClassName="active"
            onPageChange={(page) => this.handlePagination(page)}
          /> */}
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataList: state.scheduleStudent,
  };
};

export default connect(mapStateToProps, {
  getDataScheduleAll,
})(ListSchedulesDate);
