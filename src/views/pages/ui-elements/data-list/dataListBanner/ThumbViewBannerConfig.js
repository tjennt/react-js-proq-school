import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import DataTable from "react-data-table-component";
import classnames from "classnames";
import ReactPaginate from "react-paginate";
import { history } from "../../../../../history";
import { Edit, Trash, Plus, ChevronLeft, ChevronRight } from "react-feather";
import { connect } from "react-redux";
import { baseUrl } from "../../../../../utility/config/index";
import {
  getDataBlog,
  getDataSearch,
  deleteData,
  updateData,
  addData,
  filterData,
  getDataTagToBlog,
} from "../../../../../redux/actions/dataListBlog/index";
import { getDataTags } from "../../../../../redux/actions/dataListTags/index";
import Sidebar from "./DataListBannerSidebar";
import "./../../../../../assets/scss/plugins/extensions/react-paginate.scss";
import "./../../../../../assets/scss/pages/data-list.scss";
import "../../../../../assets/scss/plugins/extensions/sweet-alerts.scss";
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

class ThumbViewBannerConfig extends Component {
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

    // Return null if the state hasn't changed
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
    this.props.getDataBlog(this.props.parsedFilter);
    const getdatall = { getall: 1 };
    this.props.getDataTags(getdatall);
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.thumbView) {
      this.thumbView = false;
      let columns = [
        {
          name: "Hình ảnh",
          selector: "img",
          maxWidth: "200px",
          cell: (row) => (
            <img
              src={`${baseUrl}${row.thump_image}`}
              height="100"
              alt={row.thump_image}
            />
          ),
        },
        {
          name: "Tiêu đề",
          selector: "title",
          sortable: true,
          maxWidth: "380px",
          cell: (row) => (
            <p
              title={row.title}
              className="text-truncate text-bold-500 w-70 mb-0"
            >
              {row.title}
            </p>
          ),
        },
        {
          name: "Mô tả ngắn",
          selector: "description",
          sortable: true,
          maxWidth: "400px",
          cell: (row) => (
            <p
              title={row.description}
              className="  text-truncate text-bold-500 mb-0"
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
  enterLoading = (index) => {
    this.props.getDataSearch(this.state.search);

    this.setState(({ loadings }) => {
      const newLoadings = [...loadings];
      newLoadings[index] = true;

      return {
        loadings: newLoadings,
      };
    });
    setTimeout(() => {
      this.setState(({ loadings }) => {
        const newLoadings = [...loadings];
        newLoadings[index] = false;

        return {
          loadings: newLoadings,
        };
      });
    }, 1000);
  };
  handleSidebar = (boolean, addNew = false) => {
    this.setState({ sidebar: boolean });
    if (addNew === true) this.setState({ currentData: null, addNew: true });
  };

  handleDelete = (row) => {
    this.props.deleteData(row);
    this.props.getDataBlog(this.props.parsedFilter);
    if (this.state.data.length - 1 === 0) {
      history.push(
        `/blog?page=${parseInt(this.props.parsedFilter.page - 1)}&perPage=${
          this.props.parsedFilter.perPage
        }`
      );
      this.props.getDataBlog({
        page: this.props.parsedFilter.page - 1,
        perPage: this.props.parsedFilter.perPage,
      });
    }
  };

  handleCurrentData = (obj) => {
    this.setState({ currentData: obj });
    this.handleSidebar(true);
  };

  handlePagination = (page) => {
    let { parsedFilter, getDataBlog } = this.props;
    let perPage = parsedFilter.perPage !== undefined ? parsedFilter.perPage : 4;

    history.push(`/blog?page=${page.selected + 1}&perPage=${perPage}`);
    getDataBlog({ page: page.selected + 1, perPage: perPage });
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
    let { dataTagsBLog, dataList } = this.props;
    let TagBlogId = dataList.TagToBlog;
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
        />
        {/* <BasicSweetCallback /> */}
        <Sidebar
          TagBlogId={TagBlogId}
          show={sidebar}
          data={currentData}
          dataTagsBLog={dataTagsBLog}
          updateData={this.props.updateData}
          addData={this.props.addData}
          handleSidebar={this.handleSidebar}
          thumbView={this.props.thumbView}
          getData={this.props.getDataBlog}
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
    dataList: state.dataBlog,
    dataTagsBLog: state.dataTags,
  };
};

export default connect(mapStateToProps, {
  getDataBlog,
  getDataSearch,
  deleteData,
  updateData,
  addData,
  filterData,
  getDataTags,
  getDataTagToBlog,
})(ThumbViewBannerConfig);
