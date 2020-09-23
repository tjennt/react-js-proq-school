import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import DataTable from "react-data-table-component";
import classnames from "classnames";
import ReactPaginate from "react-paginate";
import { history } from "../../../../../history";
import { ChevronDown, Check, ChevronLeft, ChevronRight } from "react-feather";
import { connect } from "react-redux";
import moment from "moment";
import {
  getDataTags,
  addDataTags,
  deleteData,
  getDataSearch,
} from "../../../../../redux/actions/dataListTags/index";
import Checkbox from "../../../../../components/@vuexy/checkbox/CheckboxesVuexy";
import "./../../../../../assets/scss/plugins/extensions/react-paginate.scss";
import "./../../../../../assets/scss/pages/data-list.scss";
import Select from "react-select";
import { DatePicker, Space, Button } from "antd";
import "antd/dist/antd.css";
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
const { RangePicker } = DatePicker;
class DataListReportMoUConfig extends Component {
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
        name: "Mã Khách hàng",
        selector: "userID",
        sortable: true,
        minWidth: "200px",
        cell: (row) => (
          <p title={row.id} className="text-truncate text-bold-500 mb-0">
            {row.id}
          </p>
        ),
      },
      {
        name: "Họ và Tên ",
        selector: "fullname",
        minWidth: "170px",
        sortable: true,
        cell: (row) => (
          <p title={row.name} className="text-truncate text-bold-500 mb-0">
            {row.name}
          </p>
        ),
      },
      {
        name: "Số điện thoại",
        selector: "phone",
        sortable: true,
        minWidth: "180px",
        cell: (row) => (
          <p title={row.url} className="text-truncate text-bold-500 mb-0">
            {row.url}
          </p>
        ),
      },
      {
        name: "Email",
        selector: "email",
        sortable: true,
        minWidth: "180px",
        cell: (row) => (
          <p title={row.url} className="text-truncate text-bold-500 mb-0">
            {row.url}
          </p>
        ),
      },
      {
        name: "Số dư tiền đầu kì User ",
        selector: "billing",
        sortable: true,
        minWidth: "200px",
        cell: (row) => (
          <p title={row.url} className="text-truncate text-bold-500 mb-0">
            {row.url}
          </p>
        ),
      },
      {
        name: "Số tiền phải trả User",
        selector: "Pub_commission",
        sortable: true,
        minWidth: "200px",
        cell: (row) => (
          <p title={row.url} className="text-truncate text-bold-500 mb-0">
            {row.url}
          </p>
        ),
      },
      {
        name: "Số tiền đã trả User",
        selector: "MoneyUser",
        sortable: true,
        minWidth: "200px",
        cell: (row) => (
          <p title={row.url} className="text-truncate text-bold-500 mb-0">
            {row.url}
          </p>
        ),
      },
      {
        name: "Số tiền còn lại trả User",
        selector: "Pub_User",
        sortable: true,
        minWidth: "220px",
        cell: (row) => (
          <p title={row.url} className="text-truncate text-bold-500 mb-0">
            {row.url}
          </p>
        ),
      },
      {
        name: "Số tiền chờ duyệt",
        selector: "Pub_Catback",
        sortable: true,
        minWidth: "200px",
        cell: (row) => (
          <p title={row.url} className="text-truncate text-bold-500 mb-0">
            {row.url}
          </p>
        ),
      },
      {
        name: "Số tiền có sẵn",
        selector: "Pub_Catback",
        sortable: true,
        minWidth: "200px",
        cell: (row) => (
          <p title={row.url} className="text-truncate text-bold-500 mb-0">
            {row.url}
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
    search: "",
    loadings: [],
  };
  thumbView = this.props.thumbView;
  componentDidMount() {
    const { getDataTags, parsedFilter } = this.props;
    getDataTags(parsedFilter);
  }

  enterLoading = (index) => {
    const { getDataSearch } = this.props;
    const { search } = this.state;
    getDataSearch(search);
  };
  handleRowsPerPage = (value) => {
    let { parsedFilter, getDataTags } = this.props;
    let page = parsedFilter.page !== undefined ? parsedFilter.page : 1;
    history.push(`/accountOrder?page=${page}&perPage=${value}`);
    this.setState({ rowsPerPage: value });
    getDataTags({ page: parsedFilter.page, perPage: value });
  };

  handleSidebar = (boolean, addNew = false) => {
    this.setState({ sidebar: boolean });
    if (addNew === true) this.setState({ currentData: null, addNew: true });
  };

  handleDelete = (row) => {
    const { deleteData, getDataTags, data, parsedFilter } = this.props;
    deleteData(row);
    getDataTags(parsedFilter);
    if (data.length - 1 === 0) {
      history.push(
        `/accountOrder?page=${parseInt(parsedFilter.page - 1)}&perPage=${
          parsedFilter.perPage
        }`
      );
      getDataTags({
        page: parsedFilter.page - 1,
        perPage: parsedFilter.perPage,
      });
    }
  };
  onChangeValue = (dates, dateStrings) => {
    this.setState({
      ...this.state,
      dateStart: dateStrings[0],
      dateEnd: dateStrings[1],
    });
  };
  handleCurrentData = (obj) => {
    this.setState({ currentData: obj });
    this.handleSidebar(true);
  };

  handlePagination = (page) => {
    let { parsedFilter, getDataTags } = this.props;
    let perPage = parsedFilter.perPage !== undefined ? parsedFilter.perPage : 4;
    history.push(`/accountOrder?page=${page.selected + 1}&perPage=${perPage}`);
    getDataTags({ page: page.selected + 1, perPage: perPage });
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
                    <Select
                      style={{ width: "100%" }}
                      // defaultValue={id}
                      placeholder="Chọn Khách hàng"
                      onChange={this.handleChange}
                      // options={arrResult}
                    />
                  </Col>
                  <Col lg="3">
                    <Select
                      style={{ width: "100%" }}
                      // defaultValue={id}
                      placeholder="Chọn nhà cung cấp"
                      onChange={this.handleChange}
                      // options={arrResult}
                    />
                  </Col>
                  <Col lg="4">
                    <Space direction="vertical" size={12}>
                      <RangePicker
                        style={{ minHeight: "38px" }}
                        ranges={{
                          Ngày: [
                            moment().startOf("days"),
                            moment().endOf("days"),
                          ],
                          Tuần: [
                            moment().startOf("week"),
                            moment().endOf("week"),
                          ],
                          Tháng: [
                            moment().startOf("month"),
                            moment().endOf("month"),
                          ],
                          Quý: [
                            moment().startOf("quarter"),
                            moment().endOf("quarter"),
                          ],
                          Năm: [
                            moment().startOf("year"),
                            moment().endOf("year"),
                          ],
                        }}
                        onChange={this.onChangeValue}
                      />
                    </Space>
                  </Col>
                  <Col lg="2" md="6" sm="12">
                    <Button
                      type="primary"
                      loading={loadings[0]}
                      onClick={() => this.enterLoading(0)}
                    >
                      Tìm kiếm
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
    dataList: state.dataTags,
  };
};

export default connect(mapStateToProps, {
  getDataTags,
  addDataTags,
  deleteData,
  getDataSearch,
})(DataListReportMoUConfig);
