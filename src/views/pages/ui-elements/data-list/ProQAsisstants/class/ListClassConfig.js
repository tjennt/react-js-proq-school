import React, { Component } from "react";
import DataTable from "react-data-table-component";
import classnames from "classnames";
import { history } from "../../../../../../history";
import { connect } from "react-redux";
import "antd/dist/antd.css";
import { getDataClass } from "../../../../../../redux/actions/dataListAssistance/index";
import Sidebar from "./DataListClassSidebar";
import "./../../../../../../assets/scss/plugins/extensions/react-paginate.scss";
import "./../../../../../../assets/scss/pages/data-list.scss";
import "../../../../../../assets/scss/plugins/extensions/sweet-alerts.scss";
import Moment from "react-moment";
import ReactPaginate from "react-paginate";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
} from "react-feather";
import {
  Button,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Row,
  UncontrolledDropdown,
} from "reactstrap";
import { Modal } from "antd";
class ListClassConfig extends Component {
  static getDerivedStateFromProps(props, state) {
    if (
      props.dataList.dataClass !== state.data.length ||
      state.currentPage !== props.parsedFilter.page
    ) {
      return {
        data: props.dataList.dataClass,
        totalPages: props.dataList.total_page_class,
        totalRecords: props.dataList.total_record_class,
      };
    }

    // Return null if the state hasn't changed
    return null;
  }
  state = {
    data: [],
    totalPages: 0,
    visible: false,
    currentPage: 0,
    columns: [
      {
        name: "Lớp",
        selector: "class",
        sortable: true,
        minWidth: "200px",
        cell: (row) => (
          <p title={row.name} className="text-truncate text-bold-500 mb-0">
            {row.name}
          </p>
        ),
      },
      {
        name: "Mã Lớp",
        selector: "class",
        sortable: true,
        minWidth: "200px",
        cell: (row) => (
          <p
            title={row.searchString}
            className="text-truncate text-bold-500 mb-0"
          >
            {row.searchString}
          </p>
        ),
      },
      {
        name: "Khóa ",
        selector: "stage",
        sortable: true,
        minWidth: "200px",
        cell: (row) => (
          <p
            title={row.stage.name}
            className="text-truncate text-bold-500 mb-0"
          >
            {row.stage.name}
          </p>
        ),
      },
      {
        name: "Chuyên ngành",
        selector: "specialization",
        sortable: true,
        minWidth: "200px",
        cell: (row) => (
          <p
            title={row.specialization.name}
            className="text-truncate text-bold-500 mb-0"
          >
            {row.specialization.name}
          </p>
        ),
      },
      {
        name: "Thời gian bắt đầu",
        selector: "dateCreate",
        sortable: true,
        // minWidth: "300px",
        cell: (row) => <Moment format="DD/MM/YYYY">{row.createdAt}</Moment>,
      },
    ],
    allData: [],
    value: "",
    rowsPerPage: 4,
    sidebar: false,
    currentData: null,
    selected: [],
    totalRecords: 0,
    nameFile: "",
    sortIndex: [],
    addNew: "",
  };

  thumbView = this.props.thumbView;

  componentDidMount() {
    const { parsedFilter } = this.props;

    const paginate = {
      page: 1,
      limit: 10,
    };
    let limit = parsedFilter || paginate;
    this.props.getDataClass(limit);
  }
  handleFilter = (e) => {
    this.setState({ value: e.target.value });
    this.props.filterData(e.target.value);
  };

  handleSidebar = (boolean, addNew = false) => {
    this.setState({ sidebar: boolean });
    if (addNew === true) this.setState({ currentData: null, addNew: true });
  };
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  handleOk = (e) => {
    this.setState({
      ...this.state,
      visible: false,
    });
  };

  handleCancel = (e) => {
    this.setState({
      visible: false,
      excel: null,
    });
  };

  handlePagination = (page) => {
    let { parsedFilter, getDataClass } = this.props;
    const { limit } = parsedFilter;
    let perPage = limit || 10;
    history.push(`/education/class?page=${page.selected + 1}&limit=${perPage}`);
    getDataClass({ page: page.selected + 1, limit: perPage });
    this.setState({ currentPage: page.selected });
  };
  handleRowsPerPage = (value) => {
    let { parsedFilter, getDataClass } = this.props;

    let page = parsedFilter.page !== undefined ? parsedFilter.page : 10;
    history.push(`/education/class?page=${page}&limit=${value}`);
    this.setState({ rowsPerPage: value });
    getDataClass({ page: parsedFilter.page, limit: value });
  };
  render() {
    let { columns, data, value, currentData, sidebar } = this.state;
    return (
      <div className="data-list">
        <Modal
          title="Nhập tên file excel"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Input
            onChange={(e) => this.setState({ nameFile: e.target.value })}
            placeholder="nhập tên file "
          />
        </Modal>
        <Col lg="12">
          <Row>
            <Col lg="3">
              <Button onClick={this.showModal} className=" ml-2" color="danger">
                <Download size={15} /> Xuất excel
              </Button>
            </Col>
            <Col lg="9">
              <UncontrolledDropdown
                style={{ backgroundColor: "#fff", borderRadius: "20px" }}
                className="data-list-rows-dropdown  d-md-block d-none"
              >
                <DropdownToggle
                  className="sort-dropdown"
                  style={{
                    float: "right",
                    borderRadius: "20px",
                  }}
                >
                  <span className="align-middle mx-50">{`${
                    this.props.parsedFilter.limit
                      ? this.props.parsedFilter.limit
                      : 10
                  } trong tổng ${this.state.totalRecords}`}</span>
                  <ChevronDown size={15} />
                </DropdownToggle>
                <DropdownMenu tag="div" right>
                  <DropdownItem
                    tag="a"
                    onClick={() => this.handleRowsPerPage(10)}
                  >
                    10
                  </DropdownItem>
                  <DropdownItem
                    tag="a"
                    onClick={() => this.handleRowsPerPage(20)}
                  >
                    20
                  </DropdownItem>
                  <DropdownItem
                    tag="a"
                    onClick={() => this.handleRowsPerPage(30)}
                  >
                    30
                  </DropdownItem>
                  <DropdownItem
                    tag="a"
                    onClick={() => this.handleRowsPerPage(50)}
                  >
                    50
                  </DropdownItem>
                  <DropdownItem
                    tag="a"
                    onClick={() => this.handleRowsPerPage(100)}
                  >
                    100
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Col>
          </Row>
        </Col>
        <DataTable
          className="dataTable-custom"
          data={value.length ? "" : data}
          columns={columns}
          noHeader
          pagination
          fixedHeader
          fixedHeaderScrollHeight={"55vh"}
          noDataComponent="Không có dữ liệu"
          paginationServer
          paginationComponent={() => (
            <ReactPaginate
              previousLabel={<ChevronLeft size={15} />}
              nextLabel={<ChevronRight size={15} />}
              breakLabel="..."
              breakClassName="break-me"
              pageCount={this.state.totalPages}
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
          subHeader
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
    dataList: state.assistantData,
  };
};

export default connect(mapStateToProps, {
  getDataClass,
})(ListClassConfig);
