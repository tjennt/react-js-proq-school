import React, { Component } from "react";
import DataTable from "react-data-table-component";
import classnames from "classnames";
import { history } from "../../../../history";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
} from "react-feather";
import { connect } from "react-redux";
import "antd/dist/antd.css";
import { getData } from "../../../../redux/actions/dataListAssistance/index";
import "./../../../../assets/scss/plugins/extensions/react-paginate.scss";
import "./../../../../assets/scss/pages/data-list.scss";
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
import ReactPaginate from "react-paginate";

const CustomHeader = (props) => {
  const showModal = () => {
    props.showModal();
  };
  return (
    <div className="data-list-header d-flex justify-content-between flex-wrap">
      <div className="actions-left d-flex flex-wrap">
        <Button onClick={showModal} className=" ml-2" color="danger">
          <Download size={15} /> Export excel
        </Button>
      </div>
    </div>
  );
};

class ListAttendanceStudent extends Component {
  static getDerivedStateFromProps(props, state) {
    if (
      props.dataList.data !== state.data.length ||
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
    columns: [
      {
        name: "Ngày ",
        selector: "date",
        sortable: true,
        minWidth: "200px",
        cell: (row) => (
          <p title={row.date} className="text-truncate text-bold-500 mb-0">
            20/10/2020
          </p>
        ),
      },
      {
        name: "Ca ",
        selector: "dateStudy",
        sortable: true,
        minWidth: "200px",
        cell: (row) => (
          <p title={row.dateStudy} className="text-truncate text-bold-500 mb-0">
            ca 2{" "}
          </p>
        ),
      },
      {
        name: "Người điểm danh",
        selector: "teacherAttendance",
        sortable: true,
        // minWidth: "300px",
        cell: (row) => (
          <p
            title={row.teacherAttendancej}
            className="text-truncate text-bold-500 mb-0"
          >
            Mua TC
          </p>
        ),
      },
      {
        name: "Trạng thái",
        selector: "status",
        sortable: true,
        // minWidth: "300px",
        cell: (row) => (
          <p title={row.status} className="text-truncate text-bold-500 mb-0">
            Vắng
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
    visible: false,
    totalRecords: 0,
    sortIndex: [],
    addNew: "",
  };

  thumbView = this.props.thumbView;

  componentDidMount() {
    this.props.getData();
  }
  handleFilter = (e) => {
    this.setState({ value: e.target.value });
    this.props.filterData(e.target.value);
  };
  changeStatus = (row) => {
    this.props.updateStatus(row, this.props.parsedFilter);
    this.props.getData(this.props.parsedFilter);
  };
  handleDelete = (row) => {
    this.props.deleteData(row);
    this.props.getData(this.props.parsedFilter);
    if (this.state.data.length - 1 === 0) {
      history.push(
        `/accountAdmin?page=${parseInt(
          this.props.parsedFilter.page - 1
        )}&perPage=${this.props.parsedFilter.perPage}`
      );
      this.props.getData({
        page: this.props.parsedFilter.page - 1,
        perPage: this.props.parsedFilter.perPage,
      });
    }
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
  handleCurrentData = (obj) => {
    this.setState({ currentData: obj });
    this.handleSidebar(true);
  };

  handlePagination = (page) => {
    let { parsedFilter, getData } = this.props;
    let perPage = parsedFilter.perPage !== undefined ? parsedFilter.perPage : 4;

    history.push(`/accountAdmin?page=${page.selected + 1}&perPage=${perPage}`);
    getData({ page: page.selected + 1, perPage: perPage });
    this.setState({ currentPage: page.selected });
  };

  render() {
    let { columns, value, sidebar, data } = this.state;
    return (
      <div className="data-list">
        <Modal
          destroyOnClose={true}
          title="Đặt tên cho file excel"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Input placeholder="Bạn có thể đặt tên cho file excel" />
        </Modal>
        <Col lg="12">
          <Row>
            <Col lg="4">
              <CustomHeader
                handleSidebar={this.handleSidebar}
                showModal={this.showModal}
                handleFilter={this.handleFilter}
                handleRowsPerPage={this.handleRowsPerPage}
              />
            </Col>
            <Col lg="8">
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
                    this.props.parsedFilter.page
                      ? this.props.parsedFilter.page
                      : 1
                  } of ${this.state.totalRecords}`}</span>
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
          fixedHeader
          fixedHeaderScrollHeight={"55vh"}
          noDataComponent="Không có dữ liệu"
          subHeader
        />
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
  getData,
})(ListAttendanceStudent);
