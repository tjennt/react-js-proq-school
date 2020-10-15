import React, { Component } from "react";
import DataTable from "react-data-table-component";
import classnames from "classnames";
import { history } from "../../../../../../history";
import { Edit, Eye, Plus, Trash } from "react-feather";
import { connect } from "react-redux";
import "antd/dist/antd.css";
import { getDataClass } from "../../../../../../redux/actions/dataListAssistance/index";
import "./../../../../../../assets/scss/plugins/extensions/react-paginate.scss";
import "./../../../../../../assets/scss/pages/data-list.scss";
import "../../../../../../assets/scss/plugins/extensions/sweet-alerts.scss";
// import history from "../../../../../../history"
import Moment from "react-moment";
// import { Button, Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import { message } from "antd";

const ActionsComponent = (props) => {
  function redirect() {
    history.push("/education/totalDepartment/schedules");
  }
  return (
    <div className="data-list-action">
      <Eye className="cursor-pointer mr-1" size={20} onClick={redirect} />
    </div>
  );
};
const CustomHeader = (props) => {
  return (
    <div className="data-list-header d-flex justify-content-between flex-wrap">
      <div className="actions-left d-flex flex-wrap"></div>
    </div>
  );
};
class ListTotalDepartment extends Component {
  static getDerivedStateFromProps(props, state) {
    if (
      props.dataList.dataschedules !== state.data.length ||
      state.currentPage !== props.parsedFilter.page
    ) {
      return {
        data: props.dataList.dataschedules,
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
    visible: false,
    currentPage: 0,
    columns: [
      // {
      //   name: "Sinh viên",
      //   selector: "student",
      //   sortable: true,
      //   minWidth: "200px",
      //   cell: (row) => (
      //     <p
      //       title={row.nameStudent}
      //       className="text-truncate text-bold-500 mb-0"
      //     >
      //       {row.nameStudent}
      //     </p>
      //   ),
      // },
      {
        name: "Lớp",
        selector: "class",
        sortable: true,
        minWidth: "100px",
        cell: (row) => (
          <p title={row.classCode} className="text-truncate text-bold-500 mb-0">
            {row.classCode}
          </p>
        ),
      },
      {
        name: "Môn học",
        selector: "class",
        sortable: true,
        minWidth: "100px",
        cell: (row) => (
          <p title={row.classCode} className="text-truncate text-bold-500 mb-0">
            Javascript
          </p>
        ),
      },
      {
        name: "Giáo viên",
        selector: "subject",
        sortable: true,
        minWidth: "140px",
        cell: (row) => (
          <p
            title={row.nameSubject}
            className="text-truncate text-bold-500 mb-0"
          >
            Long Nv
          </p>
        ),
      },
      {
        name: "Thứ học",
        selector: "subject",
        sortable: true,
        minWidth: "200px",
        cell: (row) => (
          <p
            title={row.nameSubject}
            className="text-truncate text-bold-500 mb-0"
          >
            Thứ 2 thứ 3 thứ 4
          </p>
        ),
      },
      {
        name: "Ca học",
        selector: "subject",
        sortable: true,
        maxWidth: "40px",
        cell: (row) => (
          <p
            title={row.nameSubject}
            className="text-truncate text-bold-500 mb-0"
          >
            Ca 1{" "}
          </p>
        ),
      },
      {
        name: "Thời gian bắt đầu",
        selector: "dateCreate",
        sortable: true,
        minWidth: "100px",
        cell: (row) => (
          <Moment format="DD/MM/YYYY">{row.dateCreateClass}</Moment>
        ),
      },
      {
        name: "Thời gian kết thúc",
        selector: "dateCreate",
        sortable: true,
        minWidth: "180px",
        cell: (row) => (
          <Moment format="DD/MM/YYYY">{row.dateCreateClass}</Moment>
        ),
      },
      {
        name: "Xem chi tiết",
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
    this.props.getDataClass();
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
    let { columns, data, value, sidebar } = this.state;
    return (
      <div className="data-list">
        <DataTable
          className="dataTable-custom"
          data={value.length ? "" : data}
          columns={columns}
          noHeader
          pagination
          subHeader
          subHeaderComponent={
            <CustomHeader
              handleSidebar={this.handleSidebar}
              showModal={this.showModal}
              handleFilter={this.handleFilter}
              handleRowsPerPage={this.handleRowsPerPage}
            />
          }
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
  getDataClass,
})(ListTotalDepartment);
