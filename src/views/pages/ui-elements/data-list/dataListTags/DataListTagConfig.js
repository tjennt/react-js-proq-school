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
} from "react-feather";
import { connect } from "react-redux";
import {
  getDataTags,
  addDataTags,
  deleteData,
  getDataSearch,
} from "../../../../../redux/actions/dataListTags/index";
import Sidebar from "./DataListTagSidebar";
import Checkbox from "../../../../../components/@vuexy/checkbox/CheckboxesVuexy";
import "./../../../../../assets/scss/plugins/extensions/react-paginate.scss";
import "./../../../../../assets/scss/pages/data-list.scss";
import { Popconfirm, message, Button, Input } from "antd";
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

class DataListTagConfig extends Component {
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
        name: "Mã số",
        selector: "tagsID",
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
        selector: "tagName",
        sortable: true,
        cell: (row) => (
          <p title={row.name} className="text-truncate text-bold-500 mb-0">
            {row.name}
          </p>
        ),
      },
      {
        name: "Url",
        selector: "url",
        sortable: true,
        minWidth: "100px",
        cell: (row) => (
          <p title={row.url} className="text-truncate text-bold-500 mb-0">
            {row.url}
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
    const { getDataTags, parsedFilter } = this.props;
    getDataTags(parsedFilter);
  }
  handleFilter = (e) => {
    const { filterData } = this.props;
    this.setState({ value: e.target.value });
    filterData(e.target.value);
  };
  enterLoading = (index) => {
    const { getDataSearch } = this.props;
    const { search } = this.state;
    getDataSearch(search);
  };
  handleRowsPerPage = (value) => {
    let { parsedFilter, getDataTags } = this.props;
    let page = parsedFilter.page !== undefined ? parsedFilter.page : 1;
    history.push(`/tags?page=${page}&perPage=${value}`);
    this.setState({ rowsPerPage: value });
    getDataTags({ page: parsedFilter.page, perPage: value });
  };

  handleSidebar = (boolean, addNew = false) => {
    this.setState({ sidebar: boolean });
    if (addNew === true) this.setState({ currentData: null, addNew: true });
  };

  handleDelete = (row) => {
    const { deleteData, getDataTags, parsedFilter } = this.props;
    const { data } = this.state;
    deleteData(row);
    getDataTags(parsedFilter);
    if (data.length - 1 === 0) {
      history.push(
        `/tags?page=${parseInt(parsedFilter.page - 1)}&perPage=${
          parsedFilter.perPage
        }`
      );
      this.props.getDataTags({
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
    let { parsedFilter, getDataTags } = this.props;
    let perPage = parsedFilter.perPage !== undefined ? parsedFilter.perPage : 4;
    history.push(`/tags?page=${page.selected + 1}&perPage=${perPage}`);
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
          addData={this.props.addDataTags}
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
    dataList: state.dataTags,
  };
};

export default connect(mapStateToProps, {
  getDataTags,
  addDataTags,
  deleteData,
  getDataSearch,
})(DataListTagConfig);
