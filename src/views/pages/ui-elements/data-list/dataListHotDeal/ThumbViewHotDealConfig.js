import React, { Component } from "react";
import DataTable from "react-data-table-component";
import classnames from "classnames";
import ReactPaginate from "react-paginate";
import { history } from "../../../../../history";
import { Row, Col } from "reactstrap";
import { Trash, ChevronLeft, ChevronRight, Edit } from "react-feather";
import { connect } from "react-redux";
import { Button, Input, Popconfirm, message } from "antd";
import { currencyFormat } from "../../../../../utility/config/index";

import {
  getDataHotDeal,
  deleteData,
  updateData,
  getDataSearch,
} from "../../../../../redux/actions/dataListHotDeal/index";
import Sidebar from "./DataListHotDealSidebar";
import "./../../../../../assets/scss/plugins/extensions/react-paginate.scss";
import "./../../../../../assets/scss/pages/data-list.scss";
import "../../../../../assets/scss/plugins/extensions/sweet-alerts.scss";
import "antd/dist/antd.css";
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
    message.error("Hủy xóa dữ liệu !");
  }
  return (
    <div className="data-list-action">
      <Edit
        className="cursor-pointer mr-1"
        size={20}
        onClick={() => {
          return props.currentData(props.row);
        }}
      />
      <Popconfirm
        title="Bạn có chắc chắn xóa dữ liệu không?"
        onConfirm={confirm}
        onCancel={cancel}
        okText="Có "
        cancelText="Không "
      >
        <Trash className="cursor-pointer" size={20} />
      </Popconfirm>
    </div>
  );
};
class ThumbViewHotDealConfig extends Component {
  static getDerivedStateFromProps(props, state) {
    if (
      props.dataList.data.length !== state.data.length ||
      state.currentPage !== props.parsedFilter.page
    ) {
      return {
        data: props.dataList.data,
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
    const { getDataHotDeal, parsedFilter } = this.props;
    getDataHotDeal(parsedFilter);
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.thumbView) {
      this.thumbView = false;
      let columns = [
        {
          name: "Hình ảnh",
          selector: "img",
          maxWidth: "30px",
          cell: (row) => (
            <img src={`${row.image}`} height="100" alt={row.image} />
          ),
        },
        {
          name: "Tên sản phẩm",
          selector: "name",
          sortable: true,
          minWidth: "250px",
          cell: (row) => (
            <p
              title={row.name}
              className="text-truncate text-bold-500 w-100 mb-0"
            >
              {row.name}
            </p>
          ),
        },
        {
          name: "Người bán",
          selector: "merchant",
          sortable: true,
          maxWidth: "120px",
          cell: (row) => (
            <p
              title={row.merchant}
              className="text-truncate text-bold-500 mb-0"
            >
              {row.merchant}
            </p>
          ),
        },
        {
          name: "Giá gốc",
          selector: "original_price",
          maxWidth: "150px",
          sortable: true,
          cell: (row) => (
            <p title={row.original_price} className=" text-bold-500 mb-0">
              {row.original_price
                ? currencyFormat(row.original_price)
                : "0 VNĐ"}
            </p>
          ),
        },
        {
          name: "Giá khuyến mãi",
          selector: "current_price",
          maxWidth: "150px",
          sortable: true,
          cell: (row) => (
            <p title={row.current_price} className="   text-bold-500 mb-0">
              {row.current_price ? currencyFormat(row.current_price) : "0 VNĐ"}{" "}
            </p>
          ),
        },
        {
          name: "Nội dung",
          selector: "description",
          sortable: true,
          maxWidth: "200px",
          cell: (row) => (
            <p
              title={row.description}
              className="  text-truncate text-bold-500 w-100 mb-0"
            >
              {row.description}
            </p>
          ),
        },

        {
          name: "Thao tác",
          sortable: true,
          maxWidth: "120px",
          cell: (row) => (
            <ActionsComponent
              row={row}
              getData={this.props.getDataBlog}
              parsedFilter={this.props.parsedFilter}
              currentData={this.handleCurrentData}
              deleteRow={(row) => this.handleDelete(row)}
            />
          ),
        },
      ];
      this.setState({ columns });
    }
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
    const {
      data,
      deleteData,
      getDataHotDeal,
      parsedFilter,
      getDataBlog,
    } = this.props;
    deleteData(row);
    getDataHotDeal(parsedFilter);
    if (data.length - 1 === 0) {
      history.push(
        `/hotdeal?page=${parseInt(parsedFilter.page - 1)}&perPage=${
          parsedFilter.perPage
        }`
      );
      getDataBlog({
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
    const { search } = this.state;
    const { getDataSearch } = this.props;
    getDataSearch(search);
  };
  handlePagination = (page) => {
    let { parsedFilter, getDataHotDeal } = this.props;
    let perPage = parsedFilter.perPage !== undefined ? parsedFilter.perPage : 4;
    history.push(`/hotdeal?page=${page.selected + 1}&perPage=${perPage}`);
    getDataHotDeal({ page: page.selected + 1, perPage: perPage });
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
                  <Col lg="4">
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
        />
        <Sidebar
          show={sidebar}
          data={currentData}
          updateData={this.props.updateData}
          addData={this.props.addData}
          handleSidebar={this.handleSidebar}
          thumbView={this.props.thumbView}
          getData={this.props.getDataHotDeal}
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
    dataList: state.dataHotDeal,
  };
};
export default connect(mapStateToProps, {
  getDataHotDeal,
  deleteData,
  updateData,
  getDataSearch,
})(ThumbViewHotDealConfig);
