import React, { Component } from "react";
import DataTable from "react-data-table-component";
import classnames from "classnames";
import { history } from "../../../../../../history";
// import { Plus } from "react-feather";
import { connect } from "react-redux";
import { API_ENDPOINT_IMG_TEACHER } from "../../../../../../redux/constants/index";
import "antd/dist/antd.css";
import {
  getDataTeacher,
  exportExcelTeacher,
} from "../../../../../../redux/actions/dataListAssistance/index";
import Sidebar from "./DataListTeachertSidebar";
import "./../../../../../../assets/scss/plugins/extensions/react-paginate.scss";
import "./../../../../../../assets/scss/pages/data-list.scss";
import "../../../../../../assets/scss/plugins/extensions/sweet-alerts.scss";
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
  Card,
  CardBody,
} from "reactstrap";
import Moment from "react-moment";
import Modal from "antd/lib/modal/Modal";

class ListTeacherConfig extends Component {
  static getDerivedStateFromProps(props, state) {
    if (
      props.dataList.dataTeacher !== state.data.length ||
      state.currentPage !== props.parsedFilter.page
    ) {
      return {
        data: props.dataList.dataTeacher,
        totalPages: props.dataList.total_page_teacher,
        // currentPage: parseInt(props.parsedFilter.page) - 1,
        // rowsPerPage: parseInt(props.parsedFilter.perPage),
        totalRecords: props.dataList.total_record_teacher,
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
        name: "",
        selector: "name",
        sortable: true,
        minWidth: "50px",
        maxWidth: "70px",
        cell: (row) => (
          <img
            style={{ borderRadius: '50%', marginLeft: 'auto' }}
            height="50px"
            src={`${API_ENDPOINT_IMG_TEACHER}/${row.teacherId.avatar}`}
            alt={row.avatar}
          />
        ),
      },
      {
        name: "Tên Giáo viên",
        selector: "name",
        sortable: true,
        minWidth: "200px",
        cell: (row) => (
          <p
            title={row.teacherId.fullname}
            className="text-truncate text-bold-500 mb-0"
          >
            {row.teacherId.fullname}
          </p>
        ),
      },
      {
        name: "Mã giáo viên",
        selector: "teacherCode",
        sortable: true,
        // minWidth: "300px",
        cell: (row) => (
          <p
            title={row.teacherId.teacherCode}
            className="text-truncate text-bold-500 mb-0"
          >
            {row.teacherId.teacherCode}
          </p>
        ),
      },
      {
        name: "Chuyên ngành",
        selector: "cn",
        sortable: true,
        // minWidth: "300px",
        cell: (row) => (
          <p
            title={row.teacherId.specialization}
            className="text-truncate text-bold-500 mb-0"
          >
            {row.teacherId.specialization}
          </p>
        ),
      },
      {
        name: "Số điện thoại",
        selector: "phone",
        sortable: true,
        // minWidth: "300px",
        cell: (row) => (
          <p
            title={row.teacherId.phone}
            className="text-truncate text-bold-500 mb-0"
          >
            {row.teacherId.phone}
          </p>
        ),
      },
      {
        name: " Ngày Tạo ",
        selector: "date",
        sortable: true,
        // minWidth: "300px",
        cell: (row) => <Moment format="DD/MM/YYYY">{row.createAt}</Moment>,
      },
    ],
    allData: [],
    value: "",
    rowsPerPage: 4,
    sidebar: false,
    nameFile: "",
    currentData: null,
    file: null,
    selected: [],
    totalRecords: 0,
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
    this.props.getDataTeacher(limit);
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  handleOk = (e) => {
    this.props.exportExcelTeacher(this.state.nameFile);
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
  handleSidebar = (boolean, addNew = false) => {
    this.setState({ sidebar: boolean });
    if (addNew === true) this.setState({ currentData: null, addNew: true });
  };
  // changeStatus = (row) => {
  //   this.props.updateStatus(row, this.props.parsedFilter);
  //   this.props.getData(this.props.parsedFilter);
  // };
  // handleDelete = (row) => {
  //   this.props.deleteData(row);
  //   this.props.getData(this.props.parsedFilter);
  //   if (this.state.data.length - 1 === 0) {
  //     history.push(
  //       `/accountAdmin?page=${parseInt(
  //         this.props.parsedFilter.page - 1
  //       )}&perPage=${this.props.parsedFilter.perPage}`
  //     );
  //     this.props.getData({
  //       page: this.props.parsedFilter.page - 1,
  //       perPage: this.props.parsedFilter.perPage,
  //     });
  //   }
  // };

  handleCurrentData = (obj) => {
    this.setState({ currentData: obj });
    this.handleSidebar(true);
  };

  handlePagination = (page) => {
    let { parsedFilter, getDataTeacher } = this.props;
    const { limit } = parsedFilter;
    let perPage = limit || 10;
    history.push(
      `/assistant/list/teacher?page=${page.selected + 1}&limit=${perPage}`
    );
    getDataTeacher({ page: page.selected + 1, limit: perPage });
    this.setState({ currentPage: page.selected });
  };
  handleRowsPerPage = (value) => {
    let { parsedFilter, getDataTeacher } = this.props;

    let page = parsedFilter.page !== undefined ? parsedFilter.page : 10;
    history.push(`/assistant/list/teacher?page=${page}&limit=${value}`);
    this.setState({ rowsPerPage: value });
    getDataTeacher({ page: parsedFilter.page, limit: value });
  };
  render() {
    let { columns, data, value, currentData, sidebar } = this.state;
    return (
      <Card>
        <CardBody className="data-list">
          <Modal
            destroyOnClose={true}
            title="Thêm dữ liệu từ file excel"
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
                    <span className="align-middle mx-50">{`Hiển thị: ${this.props.parsedFilter.limit
                        ? this.props.parsedFilter.limit
                        : 10
                      }`}</span>
                    {/* <span className="align-middle mx-50">{`${this.props.parsedFilter.limit
                        ? this.props.parsedFilter.limit
                        : 10
                      } trong tổng ${this.state.totalRecords}`}</span> */}
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
                <span className="btn btn-outline-primary btn-rounded float-right mr-2">
                  Tổng {this.state.totalRecords}</span> 
              </Col>
            </Row>
          </Col>
          
          <DataTable
            className="dataTable-custom"
            data={value.length ? "" : data}
            columns={columns}
            noHeader
            // subHeader
            fixedHeader
            fixedHeaderScrollHeight={"50vh"}
            noDataComponent="Không có dữ liệu"
          // expandOnRowClicked
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
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataList: state.assistantData,
  };
};

export default connect(mapStateToProps, {
  getDataTeacher,
  exportExcelTeacher,
})(ListTeacherConfig);
