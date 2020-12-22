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
  Trash,
} from "react-feather";
import { connect } from "react-redux";
import "antd/dist/antd.css";
import {
  getData,
  getDataClass,
  exportExcelStudent,
  updateDataStudent,
  deleteDataStudent,
  uploadFile,
} from "../../../../../../redux/actions/dataListAssistance/index";
import { importExcelStudent } from "../../../../../../redux/actions/education/index";
import Sidebar from "./DataListStudentSidebar";
import "./../../../../../../assets/scss/plugins/extensions/react-paginate.scss";
import "./../../../../../../assets/scss/pages/data-list.scss";
import "../../../../../../assets/scss/plugins/extensions/sweet-alerts.scss";
import Select from "react-select";
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
import { Popconfirm, message, Modal, Upload, Tooltip } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import Moment from "react-moment";
import ReactPaginate from "react-paginate";
import { API_ENDPOINT_IMG } from "../../../../../../redux/constants";
import Spinner from "reactstrap/lib/Spinner";
import img from "../../../../../../assets/img/default.jpg";
import { uploadFileApi, changeAvatarApi } from "../../../../../../redux/api/assistant/student";
import { toastSuccess } from "../../../../../../utility/toast/toastHelper";

const { Dragger } = Upload;

const ActionsComponent = (props) => {
  function confirm(e) {
    props.deleteRow(props.row);
  }
  function cancel(e) {
    message.error("Hủy thay đổi trạng thái  !");
  }
  return (
    <div className="data-list-action">
      <Tooltip placement="topLeft" title="Chỉnh sửa">
        <Edit
          className="cursor-pointer mr-1"
          size={20}
          onClick={() => {
            return props.currentData(props.row);
          }}
        />
      </Tooltip>
      <Tooltip placement="topLeft" title="Xóa">
        <Popconfirm
          title="Bạn có chắc chắn xóa sinh viên?"
          onConfirm={confirm}
          onCancel={cancel}
          okText="Có "
          cancelText="Không "
        >
          <Trash className="cursor-pointer" size={20} />
        </Popconfirm>
      </Tooltip>
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
        name: "",
        selector: "name",
        sortable: true,
        minWidth: "50px",
        maxWidth: "70px",
        cell: (row) => {
          return (
            <div style={{ height: "38px", width: "40px", overflow: 'hidden', borderRadius: "50%", position: 'relative' }}>
              <img
                style={{  transform: 'translate(-50%, -50%)', top: '50%', left: '50%', position: 'absolute' }}
                height="40px"
                width="auto"
                src={row.studentId.avatar.name 
                  ? `https://upload-service-proq.herokuapp.com/md/${row.studentId.avatar.medium}` 
                  : '/assets/img/default.jpg'}
                alt={row.avatar}
              />
            </div>
          )
        },
      },
      {
        name: "Tên",
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
        name: "Email",
        selector: "email",
        sortable: true,
        minWidth: "240px",
        cell: (row) => (
          <p title={row.email} className="text-truncate text-bold-500 mb-0">
            {row.email}
          </p>
        ),
      },
      {
        name: "Ngày sinh",
        selector: "dob",
        sortable: true,
        // minWidth: "300px",
        cell: (row) => <Moment format="DD/MM/YYYY">{row.studentId.dob}</Moment>,
      },
      {
        name: "Số CMND",
        selector: "dob",
        sortable: true,
        // minWidth: "300px",
        cell: (row) => (
          <p
            title={row.studentId.identityNumber}
            className="text-truncate text-bold-500 mb-0"
          >
            {row.studentId.identityNumber}
          </p>
        ),
      },
      {
        name: "Ngày tạo",
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
    visibleExport: "",
    file: "",
    nameFile: "",
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
  handleDelete = (row) => {
    const { getData, deleteDataStudent } = this.props;
    deleteDataStudent(row.studentId._id, this.props.parsedFilter);
    if (this.state.data.length - 1 === 0) {
      history.push(
        `/education/student?page=${parseInt(
          this.props.parsedFilter.page - 1
        )}&limit=${this.props.parsedFilter.perPage}`
      );
      getData({
        page: this.props.parsedFilter.page - 1,
        limit: this.props.parsedFilter.perPage,
      });
    }
  };
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  showModalExportExcel = () => {
    this.setState({
      visibleExport: true,
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
  handleChangeClass = (value) => {
    this.setState({
      ...this.state,
      classArr: value,
    });
  };
  handleOkStudent = (e) => {
    const { classArr, nameFile } = this.state;
    this.props.exportExcelStudent(classArr, nameFile);
    this.setState({
      ...this.state,
      visibleExport: false,
    });
  };
  handleCancelStudent = (e) => {
    this.setState({
      visibleExport: false,
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

    let page = parsedFilter.page !== undefined ? parsedFilter.page : 1;
    history.push(`/education/student?page=${page}&limit=${value}`);
    this.setState({ rowsPerPage: value });
    getData({ page: parsedFilter.page, limit: value });
  };



  onUploadFile = async (e, id) => {
    console.log(e.target.files[0])
    const file = e.target.files[0];
    const formdata = new FormData();
    formdata.append('image', file);
    try {
      const res = await uploadFileApi(formdata);
      console.log(res)
      const changeAvatar = {
        avatar: res.data.images[0],
        targetId: this.state.currentData.studentId._id
      }
      console.log(changeAvatar)
      const res2 = await changeAvatarApi('student', changeAvatar)
      console.log(res2)
      toastSuccess("Cập nhật thành công !");
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    let { columns, value, currentData, sidebar, data } = this.state;
    let { classOption } = this.props;
    const arrDataClass = classOption
      ? classOption.reduce(
          (arr, curr) => [...arr, { label: curr.name, value: curr._id }],
          []
        )
      : [];

      console.log(this.state?.currentData )
    return data ? (
      <Card>
        <CardBody className="data-list">
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
                Click vào đây để chọn file excel hoặc kéo thả từ máy tính của
                bạn
              </p>
            </Dragger>
          </Modal>
          <Modal
            destroyOnClose={true}
            title="Xuất excel"
            visible={this.state.visibleExport}
            onOk={this.handleOkStudent}
            onCancel={this.handleCancelStudent}
          >
            <Select
              placeholder="Vui lòng chọn lớp"
              value={this.state.classArr}
              onChange={this.handleChangeClass}
              options={arrDataClass}
            />
            <Input
              onChange={(e) => this.setState({ nameFile: e.target.value })}
              className="mt-2"
              placeholder="Bạn có thể đặt tên file excel"
            />
          </Modal>
          <Col lg="12">
            <Row>
              <Col lg="7">
                <Button
                  onClick={this.showModal}
                  className=" ml-2"
                  color="success"
                >
                  <Download size={15} /> Nhập excel
                </Button>
                <Button
                  onClick={this.showModalExportExcel}
                  className=" ml-2"
                  color="primary"
                >
                  <Download size={15} /> Xuất excel
                </Button>
              </Col>
              {/* <Col lg="3">
                <Select
                  placeholder="Chọn lớp..."
                  options={arrDataClass}
                  styles={{ maxWidth: "100px" }}
                />
              </Col> */}
              <Col lg="5">
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
                    {this.state.totalRecords < 10 ? (
                      <span className="align-middle mx-50">
                        {this.state.totalRecords}
                      </span>
                    ) : (
                      <span className="align-middle mx-50">{`Hiển thị: ${
                        this.props.parsedFilter.limit
                          ? this.props.parsedFilter.limit
                          : 10
                      }`}</span>
                      // <span className="align-middle mx-50">{`${
                      //   this.props.parsedFilter.limit
                      //     ? this.props.parsedFilter.limit
                      //     : 10
                      // } trong tổng ${this.state.totalRecords}`}</span>
                    )}

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
            noHeader={true}
            fixedHeader
            fixedHeaderScrollHeight={"49vh"}
            noDataComponent="Không có dữ liệu học sinh"
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
            updateData={this.props.updateDataStudent}
            // addData={this.props.addData}
            handleSidebar={this.handleSidebar}
            thumbView={this.props.thumbView}
            getData={this.props.getData}
            dataParams={this.props.parsedFilter}
            addNew={this.state.addNew}
            uploadFile={this.onUploadFile}
          />
          <div
            className={classnames("data-list-overlay", {
              show: sidebar,
            })}
            onClick={() => this.handleSidebar(false, true)}
          />
        </CardBody>
      </Card>
    ) : (
      <div className="text-center">
        {" "}
        <Spinner color="primary" />{" "}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    dataList: state.assistantData,
    classOption: state.assistantData.dataClass,
  };
};

export default connect(mapStateToProps, {
  getData,
  importExcelStudent,
  getDataClass,
  exportExcelStudent,
  updateDataStudent,
  deleteDataStudent,
  uploadFile,
})(ListStudentEducation);
