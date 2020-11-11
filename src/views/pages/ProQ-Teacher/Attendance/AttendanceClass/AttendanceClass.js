import React, { Component } from "react";
import DataTable from "react-data-table-component";
import { history } from "../../../../../history";
import { Switch } from "antd";
import { connect } from "react-redux";
import "antd/dist/antd.css";
import queryString from "query-string";
import {
  getDataSchedulesTeacherId,
  schedule,
} from "../../../../../redux/actions/teacher/index";
import "../../../../../assets/scss/plugins/extensions/react-paginate.scss";
import "../../../../../assets/scss/pages/data-list.scss";
import "../../../../../assets/scss/plugins/extensions/sweet-alerts.scss";
import Moment from "react-moment";
import { API_ENDPOINT_IMG } from "../../../../../redux/constants";
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
const ActionsComponent = (props) => {
  const { row } = props;
  function onChange(checked) {
    props.switchAtten(checked, row);
  }
  return (
    <div className="data-list-action">
      <Switch
        defaultChecked={row.status ? true : false}
        // checked={props.switch}
        onChange={onChange}
        className="cursor-pointer mr-1"
        size={20}
        onClick={() => {
          return props.currentData(props.row);
        }}
      />
    </div>
  );
};

class ListStudentEducation extends Component {
  static getDerivedStateFromProps(props, state) {
    if (props.dataList.dataDetail !== state.data.length) {
      return {
        data: props.dataList.dataDetail,
        totalPages: props.dataList.totalPages,
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
        name: "Ảnh",
        selector: "img",
        minWidth: "220px",
        cell: (row) => (
          <img
            src={`${API_ENDPOINT_IMG}/${row.avatar}`}
            height="100"
            alt={row.avatar}
          />
        ),
      },
      {
        name: "Họ và Tên",
        selector: "student",
        sortable: true,
        minWidth: "200px",
        cell: (row) => (
          <p title={row.fullName} className="text-truncate text-bold-500 mb-0">
            {row.fullName}
          </p>
        ),
      },
      {
        name: "Ngày",
        selector: "date",
        sortable: true,
        // minWidth: "300px",
        cell: (row) => <Moment format="DD/MM/YYYY">{row.date}</Moment>,
      },
      {
        name: "Thao tác",
        sortable: true,
        cell: (row) => (
          <ActionsComponent
            row={row}
            switch={this.state.switch}
            switchAtten={this.switchAtten}
            onRowClicked={this.onRowClicked}
            currentData={this.handleCurrentData}
          />
        ),
      },
    ],
    allData: [],
    value: "",
    rowsPerPage: 4,
    currentData: null,
    switch: false,
    totalRecords: 0,
    selectedRows: null,
    addNew: "",
  };

  thumbView = this.props.thumbView;
  componentDidMount() {
    let parsedFilter = queryString.parse(this.props.location.search);
    let id = this.props.match.params.id;
    this.props.getDataSchedulesTeacherId(parsedFilter, id);
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
  switchAtten = (value, data) => {
    let id = this.props.match.params.id;
    let parsedFilter = queryString.parse(this.props.location.search);
    this.props.schedule(data, id, parsedFilter);
    console.log(data);
    this.setState({
      ...this.state,
      switch: value,
    });
  };
  onRowClicked = (value) => {
    console.log(value);
    this.setState({
      ...this.state,
      switch: true,
    });
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

  onSelectedRowsChange = (data) => {
    console.log(data);
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
          pointerOnHover
          selectableRowsHighlight
          onSelectedRowsChange={this.onSelectedRowsChange}
          highlightOnHover
          customStyles={selectedStyle}
        />
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
  getDataSchedulesTeacherId,
  schedule,
})(ListStudentEducation);
