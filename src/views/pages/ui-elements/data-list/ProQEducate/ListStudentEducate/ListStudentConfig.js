import React, { Component } from "react";
import DataTable from "react-data-table-component";
import classnames from "classnames";
import { history } from "../../../../../../history";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  Edit,
  Plus,
  Trash,
} from "react-feather";
import { connect } from "react-redux";
import "antd/dist/antd.css";
import { getData } from "../../../../../../redux/actions/dataListAssistance/index";
import { importExcelStudent } from "../../../../../../redux/actions/education/index";
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
  Row,
  Table,
  UncontrolledDropdown,
} from "reactstrap";
import { Popconfirm, message, Modal, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import Moment from "react-moment";
import ReactPaginate from "react-paginate";
import { API_ENDPOINT_IMG } from "../../../../../../redux/constants";
const { Dragger } = Upload;

const ActionsComponent = (props) => {
  function confirm(e) {
    props.changeStatus(props.row);
  }
  function cancel(e) {
    message.error("Hủy thay đổi trạng thái  !");
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
        title="Bạn có chắc chắn xóa sinh viên?"
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
class ListStudentEducation extends Component {
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
        name: "Avatar",
        selector: "name",
        sortable: true,
        minWidth: "200px",
        cell: (row) => (
          <img
            height="100"
            src={`${API_ENDPOINT_IMG}/${row.avatar}`}
            alt={row.avatar}
          />
        ),
      },
      {
        name: "Tên",
        selector: "name",
        sortable: true,
        minWidth: "200px",
        cell: (row) => (
          <p title={row.fullName} className="text-truncate text-bold-500 mb-0">
            {row.fullName}
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
            title={row.studentCode}
            className="text-truncate text-bold-500 mb-0"
          >
            {row.studentCode}
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
            title={row.classId.className}
            className="text-truncate text-bold-500 mb-0"
          >
            {row.classId.className}
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
            changeStatus={(row) => this.changeStatus(row)}
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
    visible: false,
    totalRecords: 0,
    sortIndex: [],
    addNew: "",
    file: "",
  };

  thumbView = this.props.thumbView;

  componentDidMount() {
    const { parsedFilter } = this.props;

    const paginate = {
      page: 1,
      limit: 10,
    };
    let limit = parsedFilter || paginate;
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
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  handleOk = (e) => {
    let { parsedFilter, importExcelStudent } = this.props;

    const { file } = this.state;
    let fileReq = file.file.originFileObj;
    importExcelStudent(fileReq, parsedFilter);
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
      `/education/student?page=${page.selected + 1}&limit=${perPage}`
    );
    getData({ page: page.selected + 1, limit: perPage });
    this.setState({ currentPage: page.selected });
  };
  handleRowsPerPage = (value) => {
    let { parsedFilter, getData } = this.props;

    let page = parsedFilter.page !== undefined ? parsedFilter.page : 10;
    history.push(`/education/student?page=${page}&limit=${value}`);
    this.setState({ rowsPerPage: value });
    getData({ page: parsedFilter.page, limit: value });
  };

  render() {
    let { columns, value, currentData, sidebar, data } = this.state;
    return (
      <div className="data-list">
        <Modal
          destroyOnClose={true}
          title="Thêm dữ liệu từ file excel"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Dragger
            onChange={this.onChangeExcel}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-hint">
              Click vào đây để chọn file excel hoặc kéo thả từ máy tính của bạn
            </p>
          </Dragger>
        </Modal>
        <Col lg="12">
          <Row>
            <Col lg="3">
              <Button
                color="primary"
                onClick={() => this.handleSidebar(true, true)}
                outline={true}
              >
                <Plus size={15} />
                <span className="align-middle">Tạo mới</span>
              </Button>
              <Button onClick={this.showModal} className=" ml-2" color="danger">
                <Download size={15} /> Import
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
                    this.state.totalRecords
                  } of ${
                    this.props.parsedFilter.limit
                      ? this.props.parsedFilter.limit
                      : 1
                  }`}</span>
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
          subHeader
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
      </div>
    );
  }
}
const ExpandableTable = ({ data }) => {
  return (
    <Table responsive striped>
      <thead>
        <tr>
          <th>Email </th>
          <th>Ngày sinh</th>
          <th>Chuyên ngành</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{data.identityNumber}</td>
          <td>{data.dob}</td>
          <td>Lập trình web </td>
        </tr>
      </tbody>
    </Table>
  );
};
const mapStateToProps = (state) => {
  return {
    dataList: state.assistantData,
  };
};

export default connect(mapStateToProps, {
  getData,
  importExcelStudent,
})(ListStudentEducation);
