import React, { Component } from "react";
import DataTable from "react-data-table-component";
import classnames from "classnames";
import ReactPaginate from "react-paginate";
import tick from "../../../../../assets/img/icons/tick.svg";
import { history } from "../../../../../history";
import {
  ChevronDown,
  Check,
  ChevronLeft,
  ChevronRight,
  Plus,
  Edit,
} from "react-feather";
import { connect } from "react-redux";
import {
  getDataVoteApp,
  addVoteApp,
  updateVoteApp,
} from "../../../../../redux/actions/dataListsVoteApp/index";
import { getData } from "../../../../../redux/actions/dataListUser/index";
import Sidebar from "./DataListVoteAppSidebar";
import Checkbox from "../../../../../components/@vuexy/checkbox/CheckboxesVuexy";
import "./../../../../../assets/scss/plugins/extensions/react-paginate.scss";
import "./../../../../../assets/scss/pages/data-list.scss";
import { Button } from "antd";
import Moment from "react-moment";
import Chip from "../../../../../components/@vuexy/chips/ChipComponent";
import "antd/dist/antd.css";
import { currencyFormat } from "../../../../../utility/config";
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
const chipColors = {
  0: "warning",
  1: "success",
};
const chipText = {
  0: "Chờ xử lí ",
  1: "Đã xử lí",
};
const CustomHeader = (props) => {
  return (
    <div className="data-list-header d-flex justify-content-between flex-wrap">
      <div className="actions-left d-flex flex-wrap">
        <Button
          className="add-new-btn"
          color="primary"
          onClick={() => props.handleSidebar(true, true)}
          outline="true"
        >
          <Plus size={15} />
          <span className="align-middle">Tạo mới</span>
        </Button>
      </div>
    </div>
  );
};
const ActionsComponent = (props) => {
  return (
    <div className="data-list-action">
      {!props.row.status ? (
        <Edit
          className="cursor-pointer mr-1"
          size={20}
          style={{ marginLeft: "22px" }}
          onClick={() => {
            return props.currentData(props.row);
          }}
        />
      ) : (
        <div
          style={{
            width: "20px",
            marginLeft: "20px",
          }}
        >
          {" "}
          <img src={tick} alt="tick" />
        </div>
      )}
    </div>
  );
};

class DataLisVoteApp extends Component {
  static getDerivedStateFromProps(props, state) {
    if (
      props.dataList.data.length !== state.data.length ||
      state.currentPage !== props.parsedFilter.page
    ) {
      return {
        data: props.dataList.data,
        allData: props.dataList.filteredData,
        totalPages: props.dataList.totalPages,
        currentPage: parseInt(props.parsedFilter.page) - 1,
        rowsPerPage: parseInt(props.parsedFilter.perPage),
        totalRecords: props.dataList.totalRecords,
        sortIndex: props.dataList.sortIndex,
      };
    }
    return null;
  }
  state = {
    data: [],
    totalPages: 0,
    currentPage: 0,
    columns: [
      {
        name: "Mã người dùng",
        selector: "id",
        sortable: true,
        minWidth: "230px",
        cell: (row) => (
          <p title={row.user_id} className="text-truncate text-bold-500 mb-0">
            {row.user_id}
          </p>
        ),
      },
      {
        name: "Họ Tên ",
        selector: "name",
        sortable: true,
        minWidth: "200px",
        cell: (row) => (
          <p title={row.name_user} className="text-truncate text-bold-500 mb-0">
            {row.name_user}
          </p>
        ),
      },
      {
        name: "Tiền",
        selector: "Cash		",
        sortable: true,
        minWidth: "200px",
        cell: (row) => (
          <p title={row.cash} className="text-truncate text-bold-500 mb-0">
            {row.cash ? currencyFormat(row.cash) : "0 VNĐ"}
          </p>
        ),
      },
      {
        name: "Trạng thái ",
        selector: "status",
        sortable: true,
        minWidth: "150px",
        cell: (row) => (
          <Chip
            className="m-0"
            color={chipColors[row.status]}
            text={chipText[row.status]}
          />
        ),
      },
      {
        name: "Người tặng",
        selector: "author",
        sortable: true,
        minWidth: "200px",
        cell: (row) => (
          <p title={row.author} className="text-truncate text-bold-500 mb-0">
            {row.author}
          </p>
        ),
      },
      {
        name: "Ghi chú",
        minWidth: "120px",
        selector: "email",
        sortable: true,
        cell: (row) => (
          <p title={row.note} className="text-truncate text-bold-500 mb-0">
            {row.note}
          </p>
        ),
      },
      {
        name: "Ngày tạo",
        minWidth: "120px",
        selector: "create_At",
        sortable: true,
        cell: (row) => (
          <p
            title={row.created_at}
            className="text-truncate text-bold-500 mb-0"
          >
            <Moment format="DD/MM/YYYY">{row.created_at}</Moment>
          </p>
        ),
      },
      {
        name: "Thao tác",
        minWidth: "140px",
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
    totalRecords: 0,
    sortIndex: [],
    addNew: "",
  };

  thumbView = this.props.thumbView;
  componentDidMount() {
    const { getDataVoteApp, getData } = this.props;
    const params = {
      limit: 10000,
    };
    getDataVoteApp();
    getData(params);
  }
  handleFilter = (e) => {
    const { filterData } = this.props;
    this.setState({ value: e.target.value });
    filterData(e.target.value);
  };

  handleRowsPerPage = (value) => {
    let { parsedFilter, getDataVoteApp } = this.props;
    let page = parsedFilter.page !== undefined ? parsedFilter.page : 1;
    history.push(`/voteApp?page=${page}&perPage=${value}`);
    this.setState({ rowsPerPage: value });
    getDataVoteApp({ page: parsedFilter.page, perPage: value });
  };

  handleSidebar = (boolean, addNew = false) => {
    this.setState({ sidebar: boolean });
    if (addNew === true) this.setState({ currentData: null, addNew: true });
  };

  handleDelete = (row) => {
    const { deleteData, parsedFilter, getDataVoteApp } = this.props;
    const { data } = this.state;
    deleteData(row);
    getDataVoteApp(parsedFilter);
    if (data.length - 1 === 0) {
      history.push(
        `/voteApp?page=${parseInt(parsedFilter.page - 1)}&perPage=${
          parsedFilter.perPage
        }`
      );
      getDataVoteApp({
        page: parsedFilter.page - 1,
        perPage: parsedFilter.perPage,
      });
    }
  };

  handleCurrentData = (obj) => {
    this.setState({ currentData: obj });
    this.handleSidebar(true);
  };

  handlePagination = (page) => {
    let { parsedFilter, getDataVoteApp } = this.props;
    let perPage = parsedFilter.perPage !== undefined ? parsedFilter.perPage : 4;
    history.push(`/voteApp?page=${page.selected + 1}&perPage=${perPage}`);
    getDataVoteApp({ page: page.selected + 1, perPage: perPage });
    this.setState({ currentPage: page.selected });
  };

  render() {
    let {
      columns,
      data,
      allData,
      totalPages,
      value,
      currentData,
      sidebar,
    } = this.state;
    return (
      <div
        className={`data-list ${
          this.props.thumbView ? "thumb-view" : "list-view"
        }`}
      >
        <DataTable
          columns={columns}
          data={value.length ? allData : data}
          pagination
          paginationServer
          paginationComponent={() => (
            <ReactPaginate
              previousLabel={<ChevronLeft size={15} />}
              nextLabel={<ChevronRight size={15} />}
              breakLabel="..."
              breakClassName="break-me"
              pageCount={totalPages}
              containerClassName="vx-pagination separated-pagination pagination-end pagination-sm mb-0 mt-2"
              activeClassName="active"
              forcePage={
                this.props.parsedFilter.page
                  ? parseInt(this.props.parsedFilter.page - 1)
                  : 0
              }
              onPageChange={(page) => this.handlePagination(page)}
            />
          )}
          noHeader
          subHeader
          selectableRows
          responsive
          pointerOnHover
          selectableRowsHighlight
          onSelectedRowsChange={(data) =>
            this.setState({ selected: data.selectedRows })
          }
          customStyles={selectedStyle}
          subHeaderComponent={
            <CustomHeader
              handleSidebar={this.handleSidebar}
              handleFilter={this.handleFilter}
              handleRowsPerPage={this.handleRowsPerPage}
            />
          }
          sortIcon={<ChevronDown />}
          selectableRowsComponent={Checkbox}
          selectableRowsComponentProps={{
            color: "primary",
            icon: <Check className="vx-icon" size={12} />,
            label: "",
            size: "sm",
          }}
        />
        <Sidebar
          show={sidebar}
          userRole={this.props.userRole}
          dataListUser={this.props.dataListUser}
          data={currentData}
          updateData={this.props.updateVoteApp}
          addData={this.props.addVoteApp}
          handleSidebar={this.handleSidebar}
          thumbView={this.props.thumbView}
          getData={this.props.getDataTags}
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
    dataList: state.DataVoteReducer,
    dataListUser: state.dataUser,
    userRole: state.auth.login.values.loggedInUser.email,
  };
};

export default connect(mapStateToProps, {
  getDataVoteApp,
  addVoteApp,
  getData,
  updateVoteApp,
})(DataLisVoteApp);
