import React, { Component } from "react";
import DataTable from "react-data-table-component";
import { history } from "../../../../history";
import { connect } from "react-redux";
import "antd/dist/antd.css";
import { getSchedulesAll } from "../../../../redux/actions/teacher";
import "../../../../assets/scss/plugins/extensions/react-paginate.scss";
import "../../../../assets/scss/pages/data-list.scss";
import "../../../../assets/scss/plugins/extensions/sweet-alerts.scss";
import { newDate } from "../../../../utility/config";
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
  console.log(row);
  // let weekDays = row.weekDay;
  return (
    <div style={{ display: "inline-flex" }}>
      {row.weeksDay.map((item) => (
        <p key={item}> {chipText[item]}, </p>
      ))}
    </div>
  );
};
class ListSchedulesTeacher extends Component {
  static getDerivedStateFromProps(props, state) {
    if (props.dataList.dataSchedules !== state.data.length) {
      return {
        data: props.dataList.dataSchedules,
        totalPages: props.dataList.total_page_schedule,
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
        name: "Lớp",
        selector: "class",
        sortable: true,
        minWidth: "200px",
        cell: (row) => (
          <p title={row.class} className="text-truncate text-bold-500 mb-0">
            {row.class}
          </p>
        ),
      },
      {
        name: "Kì",
        selector: "season",
        sortable: true,
        // minWidth: "300px",
        cell: (row) => (
          <p title={row.season} className="text-truncate text-bold-500 mb-0">
            {row.season}
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
        name: "môn ",
        selector: "subject",
        sortable: true,
        // minWidth: "300px",
        cell: (row) => (
          <p title={row.subject} className="text-truncate text-bold-500 mb-0">
            {row.subject}
          </p>
        ),
      },
      {
        name: "Thứ",
        selector: "subjects",
        sortable: true,
        minWidth: "350px",
        cell: (row) => <ActionDay row={row} />,
      },
      {
        name: "Ngày bắt đầu",
        selector: "startAt",
        sortable: true,
        // maxWidth: "300px",
        cell: (row) => <p>{newDate(row.startAt)}</p>,
      },
      {
        name: "Ngày kết thúc",
        selector: "endAt",
        sortable: true,
        // maxWidth: "300px",
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
    const { parsedFilter } = this.props;
    const paginate = {
      page: 1,
      limit: 10,
    };
    const params = parsedFilter || paginate;
    this.props.getSchedulesAll(params);
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
      <div className="data-list">
        <DataTable
          className="dataTable-custom"
          data={value.length ? "" : data}
          columns={columns}
          noHeader={true}
          subHeader
          noDataComponent="không có lịch dạy"
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
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataList: state.dataTeacher,
  };
};

export default connect(mapStateToProps, {
  getSchedulesAll,
})(ListSchedulesTeacher);
