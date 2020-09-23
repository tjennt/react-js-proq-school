import React, { Component } from "react";
import { Button, Input } from "antd";
import DataTable from "react-data-table-component";
import ReactPaginate from "react-paginate";
import { history } from "../../../../../history";
import { ChevronDown, Check, ChevronLeft, ChevronRight } from "react-feather";
import { connect } from "react-redux";
import {
  getData,
  getDataSearch,
  updateStatusAcceptApproved,
  updateStatusAcceptDone,
} from "../../../../../redux/actions/dataListTransaction/index";
import Checkbox from "../../../../../components/@vuexy/checkbox/CheckboxesVuexy";
import "antd/dist/antd.css";
import "./../../../../../assets/scss/plugins/extensions/react-paginate.scss";
import "./../../../../../assets/scss/pages/data-list.scss";
import Chip from "../../../../../components/@vuexy/chips/ChipComponent";
import { Row, Col } from "reactstrap";
import { SearchOutlined } from "@ant-design/icons";
import { currencyFormat } from "./../../../../../utility/config";
import ActionsComponet from "../dataListTransaction/ActionsComponet";
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
  "-1": "danger",
  0: "primary",
  1: "warning",
  2: "success",
};
const chipText = {
  "-1": "Từ chối",
  0: "Chờ xử lí ",
  1: "Chấp nhận",
  2: "Hoàn tất",
};
class DataListTransactionConfig extends Component {
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

    // Return null if the state hasn't changed
    return null;
  }

  state = {
    data: [],
    totalPages: 0,
    currentPage: 0,
    columns: [
      {
        name: "Ngân hàng	",
        selector: "bank	",
        sortable: true,
        minWidth: "380px",
        cell: (row) => (
          <p title={row.bank_name} className="text-truncate text-bold-500 mb-0">
            {row.bank_name}
          </p>
        ),
      },
      {
        name: "Tài khoản",
        selector: "BankName",
        sortable: true,
        minWidth: "200px",
        cell: (row) => (
          <p
            title={row.bank_account_name}
            className="text-truncate text-bold-500 mb-0"
          >
            {row.bank_account_name}
          </p>
        ),
      },
      {
        name: "Số tài khoản",
        selector: "bankNumber	",
        sortable: true,
        minWidth: "170px",
        cell: (row) => (
          <p
            title={row.bank_account_number}
            className="text-truncate text-bold-500 mb-0"
          >
            {row.bank_account_number}
          </p>
        ),
      },
      {
        name: "Tên ",
        selector: "name	",
        sortable: true,
        minWidth: "170px",
        cell: (row) => (
          <p
            title={row.bank_account_name}
            className="text-truncate text-bold-500 mb-0"
          >
            {row.bank_account_name}
          </p>
        ),
      },
      {
        name: "Chi nhánh",
        selector: "bankNranch",
        sortable: true,
        minWidth: "160px",
        cell: (row) => (
          <p
            title={row.bank_branch}
            className="text-truncate text-bold-500 mb-0"
          >
            {row.bank_branch}
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
        name: "Thời gian",
        selector: "time",
        sortable: true,
        minWidth: "200px",

        cell: (row) => (
          <p
            title={row.created_at}
            className="text-truncate text-bold-500 mb-0"
          >
            {row.created_at}
          </p>
        ),
      },
      {
        name: "Nội dung",
        selector: " Description ",
        sortable: true,
        minWidth: "180px",
        cell: (row) => (
          <p
            title={row.description}
            className="text-truncate text-bold-500 mb-0"
          >
            {row.description}
          </p>
        ),
      },
      {
        name: "Trạng thái",
        selector: "status",
        sortable: true,
        minWidth: "140px",

        cell: (row) => (
          <Chip
            className="m-0"
            color={chipColors[row.status]}
            text={chipText[row.status]}
          />
        ),
      },
      {
        name: "Thao tác",
        minWidth: "380px",
        padding: "20px",
        sortable: true,
        cell: (row) => (
          <ActionsComponet
            updateStatus={this.handleStatus}
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
    search: "",
    loadings: [],
  };

  thumbView = this.props.thumbView;

  componentDidMount() {
    this.props.getData(this.props.parsedFilter);
  }
  handleFilter = (e) => {
    this.setState({ value: e.target.value });
    this.props.filterData(e.target.value);
  };

  handleRowsPerPage = (value) => {
    let { parsedFilter, getData } = this.props;
    let page = parsedFilter.page !== undefined ? parsedFilter.page : 1;
    history.push(`/transaction?page=${page}&perPage=${value}`);
    this.setState({ rowsPerPage: value });
    getData({ page: parsedFilter.page, perPage: value });
  };

  handleSidebar = (boolean, addNew = false) => {
    this.setState({ sidebar: boolean });
    if (addNew === true) this.setState({ currentData: null, addNew: true });
  };
  handleCurrentData = (obj) => {
    this.setState({ currentData: obj });
    this.handleSidebar(true);
  };
  enterLoading = (index) => {
    this.props.getDataSearch(this.state.search);
  };
  handlePagination = (page) => {
    let { parsedFilter, getData } = this.props;
    let perPage = parsedFilter.perPage !== undefined ? parsedFilter.perPage : 4;
    history.push(`/transaction?page=${page.selected + 1}&perPage=${perPage}`);
    getData({ page: page.selected + 1, perPage: perPage });
    this.setState({ currentPage: page.selected });
  };

  render() {
    let {
      columns,
      data,
      allData,
      totalPages,
      value,
      search,
      loadings,
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
            <Row>
              <Col lg="12">
                <Row>
                  <Col lg="3">
                    <Input
                      placeholder="Vui lòng nhập thông tin tìm kiếm "
                      value={search}
                      onChange={(e) =>
                        this.setState({ search: e.target.value })
                      }
                      type="text"
                    />
                  </Col>
                  <Col lg="3">
                    <Button
                      loading={loadings[0]}
                      onClick={() => this.enterLoading(0)}
                      type="primary"
                      icon={<SearchOutlined />}
                    >
                      {" "}
                      Tìm kiếm{" "}
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
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
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataList: state.dataTransaction,
  };
};

export default connect(mapStateToProps, {
  getData,
  getDataSearch,
  updateStatusAcceptDone,
  updateStatusAcceptApproved, // filterData,
})(DataListTransactionConfig);
