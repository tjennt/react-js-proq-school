import React, { Component } from "react";
import DataTable from "react-data-table-component";
import { history } from "../../../../history";
import { Eye } from "react-feather";
import { connect } from "react-redux";
import "antd/dist/antd.css";
import queryString from "query-string";
// import { getData } from "./../../../../../redux/actions/dataListAssistance/index";
import { getData } from "../../../../redux/actions/dataListAssistance/index";
import "../../../../assets/scss/plugins/extensions/react-paginate.scss";
import "../../../../assets/scss/pages/data-list.scss";
import "../../../../assets/scss/plugins/extensions/sweet-alerts.scss";
import Chip from "../../../../components/@vuexy/chips/ChipComponent";
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
        name: "ID",
        selector: "id",
        sortable: true,
        minWidth: "200px",
        cell: (row) => (
          <p title={row.fullname} className="text-truncate text-bold-500 mb-0">
            {/* {row.fullname} */}1
          </p>
        ),
      },
      {
        name: "Tên lớp",
        selector: "class",
        sortable: true,
        minWidth: "200px",
        cell: (row) => (
          <p title={row.fullname} className="text-truncate text-bold-500 mb-0">
            {/* {row.fullname} */}
            WD14301
          </p>
        ),
      },
      {
        name: "Phòng",
        selector: "rooms",
        sortable: true,
        // minWidth: "300px",
        cell: (row) => (
          <p title={row.code} className="text-truncate text-bold-500 mb-0">
            {/* {row.code} */}
            504P
          </p>
        ),
      },
      {
        name: "Sỉ số",
        selector: "classCode",
        sortable: true,
        // minWidth: "300px",
        cell: (row) => (
          <p title={row.classCode} className="text-truncate text-bold-500 mb-0">
            {/* {row.classCode} */}
            40
          </p>
        ),
      },
      {
        name: "Hiện diện/vắng",
        selector: "date",
        sortable: true,
        // minWidth: "300px",
        cell: (row) => (
          <p
            title={row.created_at}
            className="text-truncate text-bold-500 mb-0"
          >
            {/* {row.created_at} */}
            22/30
          </p>
        ),
      },
      {
        name: "Thao tác",
        sortable: true,
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
  handleCurrentData = (obj) => {
    this.setState({ currentData: obj });
    history.push(`${this.props.match.url}/${obj._id}`);
    this.handleSidebar(true);
  };

  handlePagination = (page) => {
    let { parsedFilter, getData } = this.props;
    let perPage = parsedFilter.perPage !== undefined ? parsedFilter.perPage : 4;

    history.push(`/accountAdmin?page=${page.selected + 1}&perPage=${perPage}`);
    getData({ page: page.selected + 1, perPage: perPage });
    this.setState({ currentPage: page.selected });
  };
  updateState = (state) => {
    this.setState({ selectedRows: state.selectedRows }); // triggers MyComponent to re-render with new state
  };
  onRowClicked = (state) => {
    history.push(`${this.props.match.url}/${state._id}`);
  };
  render() {
    let { columns, value, currentData, sidebar, data } = this.state;
    return (
      <div className="data-list">
        <DataTable
          className="dataTable-custom"
          data={value.length ? "" : data}
          columns={columns}
          noHeader
          pagination
          subHeader
          pointerOnHover
          onSelectedRowsChange={this.updateState}
          selectableRows
          onRowClicked={this.onRowClicked}
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
