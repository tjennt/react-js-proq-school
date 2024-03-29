import React, { Component } from "react";
import DataTable from "react-data-table-component";
import { history } from "../../../../history";
import { ChevronLeft, ChevronRight, Eye } from "react-feather";
import { connect } from "react-redux";
import "antd/dist/antd.css";
import { getDataSchedulesTeacher } from "../../../../redux/actions/teacher/index";
import "../../../../assets/scss/plugins/extensions/react-paginate.scss";
import "../../../../assets/scss/pages/data-list.scss";
import "../../../../assets/scss/plugins/extensions/sweet-alerts.scss";
import ReactPaginate from "react-paginate";
import Moment from "react-moment";
import { Card, CardBody } from 'reactstrap';
// import { Popconfirm, message } from "antd";
const selectedStyle = {
  rows: {
    selectedHighlighStyle: {
      backgroundColor: "rgba(115,103,240,.05)",
      color: "#7367F0 !important",
      boxShadow: "0 0 1px 0 #7367F0 !important",
      "&:hover": {
        transform: "translateY(0px) !important",
      },
    },
  },
};
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
    <>
      {weekDays.map((item) => (
        <span key={item} 
        style={{ marginLeft: 5 }}
        className="badge badge-primary"> {chipText[item]} </span>
      ))}
    </>
  );
};
const ActionsComponent = (props) => {
  return (
    <div className="data-list-action">
      <Eye
        className="cursor-pointer mr-1"
        size={20}
        onClick={() => {
          return props.currentData(props.row);
        }}
      />
    </div>
  );
};

class AttendanceClassListText extends Component {
  static getDerivedStateFromProps(props, state) {
    if (props.dataList.data !== state.data.length) {
      return {
        data: props.dataList.data,
        totalPages: props.dataList.total_page,
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
        name: "Tên lớp",
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
        name: "Môn",
        selector: "subjects",
        sortable: true,
        minWidth: "150px",
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
        cell: (row) => <Moment format="DD/MM/YYYY">{row.startAt}</Moment>,
      },
      {
        name: "Thao tác",
        sortable: true,
        minWidth: "150px",
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
    visible: false,
    totalRecords: 0,
    sortIndex: [],
    selectedRows: null,
    addNew: "",
  };

  thumbView = this.props.thumbView;
  componentDidMount() {
    this.props.getDataSchedulesTeacher();
  }
  handleDelete = (row) => {
    this.props.deleteData(row);
    this.props.getData(this.props.parsedFilter);
    if (this.state.data.length - 1 === 0) {
      history.push(
        `/teacher/attendance?page=${parseInt(
          this.props.parsedFilter.page - 1
        )}&perPage=${this.props.parsedFilter.perPage}`
      );
      this.props.getData({
        page: this.props.parsedFilter.page - 1,
        perPage: this.props.parsedFilter.perPage,
      });
    }
  };
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
  updateState = (state) => {
    this.setState({ selectedRows: state.selectedRows }); // triggers MyComponent to re-render with new state
  };
  onRowClicked = (state) => {
    history.push(`/teacher/attendance/${state.id}`);
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
            pointerOnHover
            onRowClicked={this.onRowClicked}
            highlightOnHover
            customStyles={selectedStyle}
          />
          <ReactPaginate
            previousLabel={<ChevronLeft size={15} />}
            nextLabel={<ChevronRight size={15} />}
            breakLabel="..."
            breakClassName="break-me"
            pageCount={this.state.totalPages}
            containerClassName="vx-pagination separated-pagination pagination-end pagination-sm mb-0 mt-2"
            activeClassName="active"
            onPageChange={(page) => this.handlePagination(page)}
          />
        </CardBody>
      </Card>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    dataList: state.dataTeacher,
  };
};

export default connect(mapStateToProps, {
  getDataSchedulesTeacher,
})(AttendanceClassListText);
