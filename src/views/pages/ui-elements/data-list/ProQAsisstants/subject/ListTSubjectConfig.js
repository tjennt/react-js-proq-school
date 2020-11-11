import React, { Component } from "react";
import DataTable from "react-data-table-component";
import classnames from "classnames";
import { history } from "../../../../../../history";
import { connect } from "react-redux";
import "antd/dist/antd.css";
import { getDataSubject } from "../../../../../../redux/actions/dataListAssistance/index";
import Sidebar from "./DataListSubjectSidebar";
import "./../../../../../../assets/scss/plugins/extensions/react-paginate.scss";
import "./../../../../../../assets/scss/pages/data-list.scss";
import "../../../../../../assets/scss/plugins/extensions/sweet-alerts.scss";
import Moment from "react-moment";

class ListTSubjectConfig extends Component {
  static getDerivedStateFromProps(props, state) {
    if (
      props.dataList.dataSubject !== state.data.length ||
      state.currentPage !== props.parsedFilter.page
    ) {
      return {
        data: props.dataList.dataSubject,
        totalPages: props.dataList.totalPages,
        currentPage: parseInt(props.parsedFilter.page) - 1,
        rowsPerPage: parseInt(props.parsedFilter.perPage),
        totalRecords: props.dataList.totalRecords,
        sortIndex: props.dataList.sortIndex,
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
        name: "Môn học",
        selector: "subject",
        sortable: true,
        minWidth: "200px",
        cell: (row) => (
          <p title={row.name} className="text-truncate text-bold-500 mb-0">
            {row.name}
          </p>
        ),
      },
      {
        name: "Mã môn học",
        selector: "subjectCode",
        sortable: true,
        // minWidth: "300px",
        cell: (row) => (
          <p
            title={row.subjectCode}
            className="text-truncate text-bold-500 mb-0"
          >
            {row.subjectCode}
          </p>
        ),
      },
      {
        name: "Faild điểm danh",
        selector: "attendant",
        sortable: true,
        // minWidth: "300px",
        cell: (row) => (
          <p
            title={row.subjectCode}
            className="text-truncate text-bold-500 mb-0"
          >
            5
          </p>
        ),
      },
      {
        name: " Ngày Tạo ",
        selector: "date",
        sortable: true,
        // minWidth: "300px",
        cell: (row) => <Moment format="DD/MM/YYYY">{row.created_at}</Moment>,
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
    this.props.getDataSubject();
  }
  handleFilter = (e) => {
    this.setState({ value: e.target.value });
    this.props.filterData(e.target.value);
  };

  handleSidebar = (boolean, addNew = false) => {
    this.setState({ sidebar: boolean });
    if (addNew === true) this.setState({ currentData: null, addNew: true });
  };
  changeStatus = (row) => {
    this.props.updateStatus(row, this.props.parsedFilter);
    this.props.getData(this.props.parsedFilter);
  };
  handleDelete = (row) => {
    this.props.deleteData(row);
    this.props.getData(this.props.parsedFilter);
    if (this.state.data.length - 1 === 0) {
      history.push(
        `/accountAdmin?page=${parseInt(
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
    this.handleSidebar(true);
  };

  handlePagination = (page) => {
    let { parsedFilter, getData } = this.props;
    let perPage = parsedFilter.perPage !== undefined ? parsedFilter.perPage : 4;

    history.push(`/accountAdmin?page=${page.selected + 1}&perPage=${perPage}`);
    getData({ page: page.selected + 1, perPage: perPage });
    this.setState({ currentPage: page.selected });
  };

  render() {
    let { columns, data, value, currentData, sidebar } = this.state;
    return (
      <div className="data-list">
        <DataTable
          className="dataTable-custom"
          data={value.length ? "" : data}
          columns={columns}
          noDataComponent="Không có dữ liệu môn học"
          pagination
        />

        <Sidebar
          show={sidebar}
          data={currentData}
          updateData={this.props.updateData}
          addData={this.props.addData}
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
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataList: state.assistantData,
  };
};

export default connect(mapStateToProps, {
  getDataSubject,
})(ListTSubjectConfig);
