import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import { Button, Input, message, Popconfirm } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DataTable from "react-data-table-component";
import classnames from "classnames";
import ReactPaginate from "react-paginate";
import { history } from "../../../../../history";
import { ChevronDown, Check, ChevronLeft, ChevronRight } from "react-feather";
import { connect } from "react-redux";
import { Tooltip } from "antd";
import {
  getData,
  getDataSearch,
  upDateDone,
} from "../../../../../redux/actions/dataListSale/index";
import Checkbox from "../../../../../components/@vuexy/checkbox/CheckboxesVuexy";
import "antd/dist/antd.css";
import "./../../../../../assets/scss/plugins/extensions/react-paginate.scss";
import "./../../../../../assets/scss/pages/data-list.scss";
import { currencyFormat } from "../../../../../utility/config/index";
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
    const { parsedFilter, upDateDone, row } = props;
    let params = Object.keys(parsedFilter).length
      ? parsedFilter
      : { page: 1, perPage: 4 };
    upDateDone(row, params);
  }

  function cancel(e) {
    message.error("Hủy thay đổi quá trình !");
  }
  return (
    <div className="data-list-action">
      {props.row.is_confirmed !== 0 ? (
        <Popconfirm
          title="Bạn có muốn hoàn tất không ?"
          onConfirm={confirm}
          onCancel={cancel}
          okText="Có "
          cancelText="Không "
        >
          <Button className="btn btn-primary text-white">
            {" "}
            <FontAwesomeIcon icon="exchange-alt" /> Thay đổi
          </Button>
        </Popconfirm>
      ) : (
        <Popconfirm
          disabled
          title="Bạn có muốn hoàn tất không ?"
          onConfirm={confirm}
          onCancel={cancel}
          okText="Có "
          cancelText="Không "
        >
          <Button className="btn btn-primary text-white">
            {" "}
            <FontAwesomeIcon icon="exchange-alt" /> Thay đổi
          </Button>
        </Popconfirm>
      )}
    </div>
  );
};
class DataListSaleConfig extends Component {
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
        name: "Mã đơn hàng",
        selector: "OrderID",
        sortable: true,
        minWidth: "200px",
        cell: (row) => (
          <p title={row.order_id} className="text-truncate text-bold-500 mb-0">
            {row.order_id}
          </p>
        ),
      },
      {
        name: "Người bán",
        selector: "merchant",
        sortable: true,
        minWidth: "130px",
        cell: (row) => (
          <p title={row.merchant} className="text-truncate text-bold-500 mb-0">
            {row.merchant}
          </p>
        ),
      },
      {
        name: "Tổng đơn",
        selector: "billing",
        sortable: true,
        minWidth: "130px",
        cell: (row) => (
          <p title={row.billing} className="text-truncate text-bold-500 mb-0">
            {row.billing ? currencyFormat(row.billing) : "0 VNĐ"}
          </p>
        ),
      },
      {
        name: "Hoàn tiền",
        selector: "pubcommission",
        minWidth: "130px",
        sortable: true,
        cell: (row) => (
          <p
            title={row.pub_commission}
            className="text-truncate text-bold-500 mb-0"
          >
            {row.pub_commission ? currencyFormat(row.pub_commission) : "0 VNĐ"}
          </p>
        ),
      },
      {
        name: "Thời gian tạo",
        selector: "create_time",
        sorttable: true,
        minWidth: "200px",
        cell: (row) => (
          <p
            title={row.sales_time}
            className="text-truncate text-bold-500 mb-0"
          >
            {row.sales_time}
          </p>
        ),
      },
      {
        name: "Chờ xử lí ",
        selector: "pending",
        sortable: true,
        minWidth: "130px",
        cell: (row) => (
          <Tooltip placement="bottom" title="Chờ xử lí">
            <p
              className="badge badge-warning"
              style={{
                fontSize: "11pt",
                marginLeft: "20px",
                borderRadius: "50px 50px",
              }}
            >
              {row.order_pending}{" "}
            </p>
          </Tooltip>
        ),
      },
      {
        name: "Hủy bỏ ",
        selector: "reject",
        sortable: true,
        minWidth: "100px",
        cell: (row) => (
          <Tooltip placement="bottom" title="Hủy bỏ ">
            <p
              className="badge badge-danger"
              style={{
                fontSize: "11pt",
                marginLeft: "14px",
                borderRadius: "50px 50px",
              }}
            >
              {" "}
              {row.order_reject}{" "}
            </p>
          </Tooltip>
        ),
      },
      {
        name: "Tạm duyệt ",
        selector: "order_success",
        sortable: true,
        minWidth: "130px",
        cell: (row) => (
          <Tooltip placement="bottom" title="Tạm duyệt">
            <p
              style={{
                fontSize: "11pt",
                marginLeft: "14px",
                borderRadius: "50px 50px",
              }}
              className="text-truncate badge badge-info"
            >
              {row.order_success}
            </p>
          </Tooltip>
        ),
      },
      {
        name: "Xác nhận ",
        selector: "is_confirm",
        sortable: true,
        minWidth: "130px",
        cell: (row) => (
          <Tooltip placement="bottom" title="Xác nhận">
            <p
              style={{
                fontSize: "11pt",
                marginLeft: "14px",
                borderRadius: "50px 50px",
              }}
              className="text-truncate badge badge-primary"
            >
              {row.is_confirmed}
            </p>
          </Tooltip>
        ),
      },
      {
        name: "Hoàn tất  ",
        selector: "done",
        sortable: true,
        minWidth: "130px",
        cell: (row) => (
          <Tooltip placement="bottom" title="Hoàn tất">
            <p
              style={{
                fontSize: "11pt",
                marginLeft: "14px",
                borderRadius: "50px 50px",
              }}
              className="text-truncate badge badge-success"
            >
              {row.is_done}
            </p>
          </Tooltip>
        ),
      },
      {
        name: "Thao tác",
        sortable: true,
        minWidth: "190px",
        cell: (row) => (
          <ActionsComponent
            row={row}
            upDateDone={this.props.upDateDone}
            getData={this.props.getDataBlog}
            parsedFilter={this.props.parsedFilter}
            currentData={this.handleCurrentData}
            deleteRow={(row) => this.handleDelete(row)}
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

  handleRowsPerPage = (value) => {
    let { parsedFilter, getData } = this.props;
    let page = parsedFilter.page !== undefined ? parsedFilter.page : 1;
    history.push(`/sale?page=${page}&perPage=${value}`);
    this.setState({ rowsPerPage: value });
    getData({ page: parsedFilter.page, perPage: value });
  };
  handleDelete = (row) => {
    const { deleteData, getData, parsedFilter } = this.props;
    const { data } = this.state;
    deleteData(row);
    getData(parsedFilter);
    if (data.length - 1 === 0) {
      history.push(
        `/sale?page=${parseInt(parsedFilter.page - 1)}&perPage=${
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
  enterLoading = (index) => {
    const { getDataSearch } = this.props;
    const { search } = this.state;
    getDataSearch(search);
  };
  handlePagination = (page) => {
    let { parsedFilter, getData } = this.props;
    let perPage = parsedFilter.perPage !== undefined ? parsedFilter.perPage : 4;
    history.push(`/sale?page=${page.selected + 1}&perPage=${perPage}`);
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
    dataList: state.dataSale,
  };
};

export default connect(mapStateToProps, {
  getData,
  getDataSearch,
  upDateDone,
})(DataListSaleConfig);
