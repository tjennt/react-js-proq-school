import React, { Component } from "react";
import DataTable from "react-data-table-component";
import classnames from "classnames";
import { history } from "../../../../../../history";
import { connect } from "react-redux";
import "antd/dist/antd.css";
import {
  getData,
  getDataClass,
  exportExcelStudent,
} from "../../../../../../redux/actions/dataListAssistance/index";
import Sidebar from "./DataListStudentSidebar";
import "./../../../../../../assets/scss/plugins/extensions/react-paginate.scss";
import "./../../../../../../assets/scss/pages/data-list.scss";
import "../../../../../../assets/scss/plugins/extensions/sweet-alerts.scss";
import {
  Button,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Row,
  Table,
  UncontrolledDropdown,
  Card,
  CardBody,
} from "reactstrap";
import ReactPaginate from "react-paginate";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
} from "react-feather";
import { Modal } from "antd";
import Select from "react-select";
import Moment from "react-moment";
import img from "../../../../../../assets/img/default.jpg";

class ListStudentConfig extends Component {
  static getDerivedStateFromProps(props, state) {
    if (
      props.dataList.data !== state.data.length ||
      state.currentPage !== props.parsedFilter.page
    ) {
      return {
        data: props.dataList.data,
        totalPages: props.dataList.total_page_student,
        // currentPage: parseInt(props.parsedFilter.page) - 1,
        // rowsPerPage: parseInt(props.parsedFilter.perPage),
        totalRecords: props.dataList.total_record_student,
        // sortIndex: props.dataList.sortIndex,
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
        cell: (row, i) => {
          let img = i + 1;
          img = i >= 10 ? (img % 10) : img;
          img = img === 0 ? img + 1 : img;
          return (
            <img
              style={{ borderRadius: "50%", marginLeft: "auto" }}
              height="50px"
              src={`/assets/img/profile/user-uploads/user-${img < 10 ? `0${img}` : `${img}`}.jpg`}
              alt={row.avatar}
            />
          )
        },
      },
      {
        name: "Tên Sinh viên",
        selector: "name",
        sortable: true,
        minWidth: "200px",
        cell: (row) => (
          <p
            title={row.studentId.fullName}
            className="text-truncate text-bold-500 mb-0"
          >
            {row.studentId.fullName}
          </p>
        ),
      },
      {
        name: "Mã sinh viên",
        selector: "idST",
        sortable: true,
        // minWidth: "300px",
        cell: (row) => (
          <p
            title={row.studentId.studentCode}
            className="text-truncate text-bold-500 mb-0"
          >
            {row.studentId.studentCode}
          </p>
        ),
      },
      {
        name: "Lớp",
        selector: "classCode",
        sortable: true,
        // minWidth: "300px",
        cell: (row) => (
          <p
            title={row.studentId.class.name}
            className="text-truncate text-bold-500 mb-0"
          >
            {row.studentId.class.name}
          </p>
        ),
      },
      {
        name: " Ngày Tạo ",
        selector: "date",
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
    visible: false,
    nameFile: "",
    totalRecords: 0,
    sortIndex: [],
    addNew: "",
    file: "",
    classArr: null,
  };

  thumbView = this.props.thumbView;

  componentDidMount() {
    const { parsedFilter, getDataClass } = this.props;

    const paginate = {
      page: 1,
      limit: 10,
    };
    let limit = parsedFilter || paginate;
    let params = {
      limit: 10000,
    };
    getDataClass(params);

    this.props.getData(limit);
  }
  handleFilter = (e) => {
    this.setState({ value: e.target.value });
    this.props.filterData(e.target.value);
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
  //       `/education/student?page=${parseInt(
  //         this.props.parsedFilter.page - 1
  //       )}&limit=${this.props.parsedFilter.perPage}`
  //     );
  //     this.props.getData({
  //       page: this.props.parsedFilter.page - 1,
  //       perPage: this.props.parsedFilter.perPage,
  //     });
  //   }
  // };
  handleChangeClass = (value) => {
    this.setState({
      ...this.state,
      classArr: value,
    });
  };
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  handleOk = (e) => {
    const { classArr, nameFile } = this.state;
    this.props.exportExcelStudent(classArr, nameFile);
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
  onChangeExcel = (file) => {
    this.setState({
      ...this.state,
      file: file,
    });
  };
  handlePagination = (page) => {
    let { parsedFilter, getData } = this.props;
    const { limit } = parsedFilter;
    let perPage = limit || 10;
    history.push(
      `/assistant/list/student?page=${page.selected + 1}&limit=${perPage}`
    );
    getData({ page: page.selected + 1, limit: perPage });
    this.setState({ currentPage: page.selected });
  };
  handleRowsPerPage = (value) => {
    let { parsedFilter, getData } = this.props;

    let page = parsedFilter.page !== undefined ? parsedFilter.page : 10;
    history.push(`/assistant/list/student?page=${page}&limit=${value}`);
    this.setState({ rowsPerPage: value });
    getData({ page: parsedFilter.page, limit: value });
  };

  render() {
    let { columns, value, currentData, sidebar, data } = this.state;
    let { classOption } = this.props;
    const arrDataClass = classOption
      ? classOption.reduce(
        (arr, curr) => [...arr, { label: curr.name, value: curr._id }],
        []
      )
      : [];
    return (
      <Card>
        <CardBody className="data-list">
          <Modal
            destroyOnClose={true}
            title="Xuất file excel"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <Select
              placeholder="Vui lòng chọn lớp"
              value={this.state.classArr}
              onChange={this.handleChangeClass}
              options={arrDataClass}
            />
            <Input
              className="mt-2"
              onChange={(e) => this.setState({ nameFile: e.target.value })}
              placeholder="nhập tên file "
            />
          </Modal>
          <Col lg="12">
            <Row>
              <Col lg="3">
                <Button
                  onClick={this.showModal}
                  className=" ml-2"
                  color="danger"
                >
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
                    {/* <span className="align-middle mx-50">{`${
                    this.props.parsedFilter.limit
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
                  Tổng {this.state.totalRecords}
                </span>
              </Col>
            </Row>
          </Col>
          <DataTable
            className="dataTable-custom"
            data={value.length ? "" : data}
            columns={columns}
            noHeader
            fixedHeader
            fixedHeaderScrollHeight={"50vh"}
            pagination
            noDataComponent="Không có dữ liệu học sinh"
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
            expandableRows
            expandOnRowClicked
            expandableRowsComponent={<ExpandableTable />}
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
const ExpandableTable = ({ data }) => {
  return (
    <Table responsive striped className="mb-4 ">
      <thead>
        <tr>
          <th>Số điện thoại </th>
          <th>Địa chỉ</th>
          <th>Ngày sinh</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{data.phone}</td>
          <td> {data.address}</td>
          <td>{data.dob}</td>
        </tr>
      </tbody>
    </Table>
  );
};
const mapStateToProps = (state) => {
  return {
    dataList: state.assistantData,
    classOption: state.assistantData.dataClass,
  };
};

export default connect(mapStateToProps, {
  getData,
  getDataClass,
  exportExcelStudent,
})(ListStudentConfig);
