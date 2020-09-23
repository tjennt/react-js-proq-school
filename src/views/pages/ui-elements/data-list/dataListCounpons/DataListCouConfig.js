import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import DataTable from "react-data-table-component";
import classnames from "classnames";
import ReactPaginate from "react-paginate";
import { Button, Input, Popconfirm, message } from "antd";
import { history } from "../../../../../history";
import {
  // Edit,
  Trash,
  ChevronDown,
  Check,
  ChevronLeft,
  ChevronRight,
} from "react-feather";
import { connect } from "react-redux";
import {
  getData,
  deleteData,
  getDataSearch,
} from "../../../../../redux/actions/dataListCount/index";
import Sidebar from "./DataListCouSidebar";
import Checkbox from "../../../../../components/@vuexy/checkbox/CheckboxesVuexy";
import "antd/dist/antd.css";
import "./../../../../../assets/scss/plugins/extensions/react-paginate.scss";
import "./../../../../../assets/scss/pages/data-list.scss";
import { SearchOutlined } from "@ant-design/icons";

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
  function confirm(e) {
    props.deleteRow(props.row);
  }

  function cancel(e) {
    message.error("Hủy xóa dữ liệu!");
  }
  return (
    <div className="data-list-action">
      <Popconfirm
        title="Bạn có muốn xóa dữ liệu không?"
        onConfirm={confirm}
        onCancel={cancel}
        okText="Có "
        cancelText="Không"
      >
        <Trash
          className="cursor-pointer"
          size={20}
          // onClick={() => {

          // }}
        />
      </Popconfirm>
    </div>
  );
};
class DataListCounConfig extends Component {
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
        name: "Người bán",
        selector: "merchant",
        sortable: true,
        cell: (row) => (
          <p title={row.merchant} className="text-truncate text-bold-500 mb-0">
            {row.merchant}
          </p>
        ),
      },
      {
        name: "Chuyên mục",
        selector: "category",
        sortable: true,
        cell: (row) => (
          <p title={row.category} className="text-truncate text-bold-500 mb-0">
            {row.category}
          </p>
        ),
      },
      {
        name: "Mã giảm giá",
        selector: "code",
        sortable: true,
        cell: (row) => (
          <p title={row.code} className="text-truncate text-bold-500 mb-0">
            {row.code}
          </p>
        ),
      },
      {
        name: "Chiết khấu",
        selector: "discount",
        sortable: true,
        cell: (row) => (
          <p title={row.percent} className="text-truncate text-bold-500 mb-0">
            {row.percent}
          </p>
        ),
      },
      {
        name: "Mô tả",
        selector: "description",
        sortable: true,
        minWidth: "300px",
        cell: (row) => (
          <p title={row.content} className="text-truncate text-bold-500 mb-0">
            {row.content}
          </p>
        ),
      },
      {
        name: "Thời gian tạo",
        selector: "create_time",
        sortable: true,
        minWidth: "50px",
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
        name: "Thời gian kết thúc",
        selector: "time_end",
        sortable: true,
        minWidth: "180px",
        cell: (row) => (
          <p title={row.end_time} className="text-truncate text-bold-500 mb-0">
            {row.end_time}
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
    const { getData, parsedFilter } = this.props;
    getData(parsedFilter);
  }

  handleFilter = (e) => {
    const { filterData } = this.props;
    this.setState({ value: e.target.value });
    filterData(e.target.value);
  };
  enterLoading = (index) => {
    const { getDataSearch } = this.props;
    getDataSearch(this.state.search);
  };
  handleRowsPerPage = (value) => {
    let { parsedFilter, getData } = this.props;
    let page = parsedFilter.page !== undefined ? parsedFilter.page : 1;
    history.push(`/listcounpons?page=${page}&perPage=${value}`);
    this.setState({ rowsPerPage: value });
    getData({ page: parsedFilter.page, perPage: value });
  };
  handleDelete = (row) => {
    const { deleteData, getData, parsedFilter } = this.props;
    deleteData(row);
    getData(parsedFilter);
    if (this.state.data.length - 1 === 0) {
      history.push(
        `/listcounpons?page=${parseInt(parsedFilter.page - 1)}&perPage=${
          parsedFilter.perPage
        }`
      );
      getData({
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
    let { parsedFilter, getData } = this.props;
    let perPage = parsedFilter.perPage !== undefined ? parsedFilter.perPage : 4;
    history.push(`/listcounpons?page=${page.selected + 1}&perPage=${perPage}`);
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
      currentData,
      sidebar,
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
    dataList: state.dataCount,
  };
};

export default connect(mapStateToProps, {
  getData,
  deleteData,
  getDataSearch,
})(DataListCounConfig);
