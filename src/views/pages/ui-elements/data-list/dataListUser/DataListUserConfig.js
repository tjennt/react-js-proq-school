import React, { Component } from "react";
import { Col, Row } from "reactstrap";
import DataTable from "react-data-table-component";
import classnames from "classnames";
import ReactPaginate from "react-paginate";
import { history } from "../../../../../history";
import { ChevronDown, Check, ChevronLeft, ChevronRight } from "react-feather";
import { Button, Input } from "antd";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import {
  getData,
  getDataSearch,
} from "../../../../../redux/actions/dataListUser/index";
import Checkbox from "../../../../../components/@vuexy/checkbox/CheckboxesVuexy";
import { SearchOutlined } from "@ant-design/icons";
import "./../../../../../assets/scss/plugins/extensions/react-paginate.scss";
import "./../../../../../assets/scss/pages/data-list.scss";
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

class DataListUserConfig extends Component {
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
        name: "Mã Người dùng",
        selector: "id",
        sortable: true,
        minWidth: "200px",
        cell: (row) => (
          <p title={row.id} className="text-truncate text-bold-500 mb-0">
            {row.id}
          </p>
        ),
      },
      {
        name: "Tên",
        selector: "name",
        sortable: true,
        minWidth: "200px",
        cell: (row) => (
          <p title={row.fullname} className="text-truncate text-bold-500 mb-0">
            {row.fullname}
          </p>
        ),
      },
      {
        name: "Email",
        selector: "email",
        sortable: true,
        minWidth: "300px",
        cell: (row) => (
          <p title={row.email} className="text-truncate text-bold-500 mb-0">
            {row.email}
          </p>
        ),
      },
      {
        name: "Điện thoại",
        selector: "phone",
        sortable: true,
        minWidth: "160px",
        cell: (row) => (
          <p
            title={row.phonenumber}
            className="text-truncate text-bold-500 mb-0"
          >
            {row.phonenumber}
          </p>
        ),
      },
      {
        name: "Ngày sinh",
        selector: "birthday",
        minWidth: "150px",
        sortable: true,
        cell: (row) => (
          <p title={row.birthday} className="text-truncate text-bold-500 mb-0">
            {row.birthday}
          </p>
        ),
      },
      {
        name: "Thành phố",
        selector: "city	",
        minWidth: "200px",
        sortable: true,
        cell: (row) => (
          <p title={row.city} className="text-truncate text-bold-500 mb-0">
            {row.city}
          </p>
        ),
      },
      {
        name: "Thời gian tạo",
        selector: "createTime",
        sortable: true,
        minWidth: "220px",

        cell: (row) => (
          <p
            title={row.created_at}
            className="text-truncate text-bold-500 mb-0"
          >
            {row.created_at}
          </p>
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
    loadings: [],
    search: "",
  };

  thumbView = this.props.thumbView;

  componentDidMount() {
    const { getData, parsedFilter } = this.props;
    getData(parsedFilter);
  }
  enterLoading = (index) => {
    const { getDataSearch } = this.props;
    const { search } = this.state;
    getDataSearch(search);
  };
  handleFilter = (e) => {
    const { filterData } = this.props;
    this.setState({ value: e.target.value });
    filterData(e.target.value);
  };

  handleRowsPerPage = (value) => {
    let { parsedFilter, getData } = this.props;
    let page = parsedFilter.page !== undefined ? parsedFilter.page : 1;
    history.push(`/user?page=${page}&perPage=${value}`);
    this.setState({ rowsPerPage: value });
    getData({ page: parsedFilter.page, perPage: value });
  };
  handleCurrentData = (obj) => {
    this.setState({ currentData: obj });
    this.handleSidebar(true);
  };

  handlePagination = (page) => {
    let { parsedFilter, getData } = this.props;
    let perPage = parsedFilter.perPage !== undefined ? parsedFilter.perPage : 4;
    history.push(`/user?page=${page.selected + 1}&perPage=${perPage}`);
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
      sidebar,
      loadings,
      search,
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
    dataList: state.dataUser,
  };
};

export default connect(mapStateToProps, {
  getData,
  getDataSearch,
})(DataListUserConfig);
