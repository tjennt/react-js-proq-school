import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import DataTable from "react-data-table-component";
import classnames from "classnames";
import ReactPaginate from "react-paginate";
import { history } from "../../../../../history";
import {
  Trash,
  ChevronDown,
  Check,
  ChevronLeft,
  ChevronRight,
  Plus,
  Edit,
} from "react-feather";
import { connect } from "react-redux";
import {
  getDataCategory,
  addData,
  updateData,
  deleteData,
} from "../../../../../redux/actions/dataListCategory/index";
import Sidebar from "./DataListCategorySidebar";
import Checkbox from "../../../../../components/@vuexy/checkbox/CheckboxesVuexy";
import "./../../../../../assets/scss/plugins/extensions/react-paginate.scss";
import "./../../../../../assets/scss/pages/data-list.scss";
import { Popconfirm, message, Button, Input } from "antd";
import "antd/dist/antd.css";
import Chip from "../../../../../components/@vuexy/chips/ChipComponent";
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
const chipColors = {
  0: "warning",
  1: "success",
};
const chipText = {
  0: "Đang ẩn",
  1: "Đang hiện",
};
const ActionsComponent = (props) => {
  function confirm(e) {
    let params = Object.keys(props.parsedFilter).length
      ? props.parsedFilter
      : { page: 1, perPage: 4 };
    props.deleteRow(props.row, params);
  }
  function confirmUpdate(e) {
    let params = Object.keys(props.parsedFilter).length
      ? props.parsedFilter
      : { page: 1, perPage: 4 };
    props.updateData(props.row, params);
  }

  function cancel(e) {
    message.error("Hủy !");
  }
  return (
    <div className="data-list-action">
      <Popconfirm
        title="Bạn có muốn thay đổi trạng thái không ?"
        onConfirm={confirmUpdate}
        onCancel={cancel}
        okText="Có "
        cancelText="Không"
      >
        <Edit className="cursor-pointer mr-1" size={20} />
      </Popconfirm>

      <Popconfirm
        title="Bạn có muốn xóa dữ liệu không?"
        onConfirm={confirm}
        onCancel={cancel}
        okText="Có "
        cancelText="Không"
      >
        <Trash className="cursor-pointer" size={20} />
      </Popconfirm>
    </div>
  );
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

class DataListCategoryConfig extends Component {
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
        name: "Mã thể loại",
        selector: "categoryID",
        sortable: true,
        minWidth: "200px",
        cell: (row) => (
          <p title={row.id} className="text-truncate text-bold-500 mb-0">
            {row.id}
          </p>
        ),
      },
      {
        name: "Tên thể loại",
        selector: "categoryName",
        sortable: true,
        cell: (row) => (
          <p title={row.name} className="text-truncate text-bold-500 mb-0">
            {row.name}
          </p>
        ),
      },
      {
        name: "Trạng thái",
        selector: "status",
        sortable: true,
        minWidth: "100px",
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
        sortable: true,
        cell: (row) => (
          <ActionsComponent
            row={row}
            getData={this.props.getData}
            parsedFilter={this.props.parsedFilter}
            currentData={this.handleCurrentData}
            deleteRow={this.props.deleteData}
            updateData={this.props.updateData}
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
    this.props.getDataCategory(this.props.parsedFilter);
  }
  handleFilter = (e) => {
    this.setState({ value: e.target.value });
    this.props.filterData(e.target.value);
  };
  enterLoading = (index) => {
    const { getDataSearch } = this.props;
    getDataSearch(this.state.search);
  };
  handleRowsPerPage = (value) => {
    let { parsedFilter, getDataCategory } = this.props;
    let page = parsedFilter.page !== undefined ? parsedFilter.page : 1;
    history.push(`/category?page=${page}&perPage=${value}`);
    this.setState({ rowsPerPage: value });
    getDataCategory({ page: parsedFilter.page, perPage: value });
  };

  handleSidebar = (boolean, addNew = false) => {
    this.setState({ sidebar: boolean });
    if (addNew === true) this.setState({ currentData: null, addNew: true });
  };
  handleCurrentData = (obj) => {
    this.setState({ currentData: obj });
    this.handleSidebar(true);
  };

  handlePagination = (page) => {
    let { parsedFilter, getDataCategory } = this.props;
    let perPage = parsedFilter.perPage !== undefined ? parsedFilter.perPage : 4;
    history.push(`/category?page=${page.selected + 1}&perPage=${perPage}`);
    getDataCategory({ page: page.selected + 1, perPage: perPage });
    this.setState({ currentPage: page.selected });
  };

  render() {
    let {
      columns,
      data,
      allData,
      totalPages,
      value,
      rowsPerPage,
      currentData,
      sidebar,
      totalRecords,
      sortIndex,
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
                  <Col lg="6">
                    <CustomHeader
                      handleSidebar={this.handleSidebar}
                      handleFilter={this.handleFilter}
                      handleRowsPerPage={this.handleRowsPerPage}
                      rowsPerPage={rowsPerPage}
                      total={totalRecords}
                      index={sortIndex}
                    />
                  </Col>
                  <Col lg="4" style={{ marginLeft: "79px" }}>
                    <Input
                      placeholder="Vui lòng nhập thông tin tìm kiếm "
                      value={search}
                      onChange={(e) =>
                        this.setState({ search: e.target.value })
                      }
                      type="text"
                    />
                  </Col>
                  <Button
                    loading={loadings[0]}
                    onClick={() => this.enterLoading(0)}
                    type="primary"
                    icon={<SearchOutlined />}
                  >
                    {" "}
                    Tìm kiếm{" "}
                  </Button>
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
          getDataBLog={this.props.getDataTagToBlog}
          data={currentData}
          updateData={this.props.updateData}
          addData={this.props.addData}
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
    dataList: state.dataListCategory,
  };
};

export default connect(mapStateToProps, {
  getDataCategory,
  addData, // deleteData,
  updateData,
  deleteData,
})(DataListCategoryConfig);
