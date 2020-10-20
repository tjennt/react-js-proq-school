import React, { Component } from "react";
import DataTable from "react-data-table-component";
import { history } from "../../../../../history";
import { Switch } from "antd";
import { connect } from "react-redux";
import "antd/dist/antd.css";
import queryString from "query-string";
import { getData } from "../../../../../redux/actions/dataListAssistance/index";
import "../../../../../assets/scss/plugins/extensions/react-paginate.scss";
import "../../../../../assets/scss/pages/data-list.scss";
import "../../../../../assets/scss/plugins/extensions/sweet-alerts.scss";
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
  function onChange(checked) {
    props.switchAtten(checked);
  }
  return (
    <div className="data-list-action">
      <Switch
        defaultChecked={props.switch ? true : false}
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
  parsedFilter = queryString.parse(this.props.location.search);
  static getDerivedStateFromProps(props, state) {
    if (props.dataList.data !== state.data.length) {
      return {
        data: props.dataList.data,
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
        // cell: (row) => <img src={row.img} height="100" alt={row.name} />,
      },
      {
        name: "Mã số sinh viên",
        selector: "id",
        sortable: true,
        minWidth: "200px",
        cell: (row) => (
          <p title={row.fullname} className="text-truncate text-bold-500 mb-0">
            {/* {row.fullname} */}Ps09912
          </p>
        ),
      },
      {
        name: "Họ và Tên",
        selector: "student",
        sortable: true,
        minWidth: "200px",
        cell: (row) => (
          <p title={row.fullname} className="text-truncate text-bold-500 mb-0">
            {/* {row.fullname} */}
            Châu Thế Linh
          </p>
        ),
      },
      {
        name: "Ghi chú",
        selector: "note",
        sortable: true,
        // minWidth: "300px",
        cell: (row) => (
          <p title={row.code} className="text-truncate text-bold-500 mb-0">
            {/* {row.code} */}
            Abcxyz
          </p>
        ),
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
    this.props.getData();
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
  switchAtten = (value) => {
    console.log(value);
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
    console.log(obj);
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
          noHeader
          subHeader
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
    dataList: state.assistantData,
  };
};

export default connect(mapStateToProps, {
  getData,
})(ListStudentEducation);
