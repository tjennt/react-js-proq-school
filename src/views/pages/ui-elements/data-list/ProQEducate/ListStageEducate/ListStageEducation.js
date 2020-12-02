import React, { Component } from "react";
import DataTable from "react-data-table-component";
import classnames from "classnames";
import { history } from "../../../../../../history";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Edit,
  Plus,
} from "react-feather";
import { connect } from "react-redux";
import "antd/dist/antd.css";
import { getDataStage } from "../../../../../../redux/actions/dataListAssistance/index";
import { importExcelStudent } from "../../../../../../redux/actions/education/index";

import { addStage } from "../../../../../../redux/actions/education/index";
import Sidebar from "./StageEducationSidebar";
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
  UncontrolledDropdown,
} from "reactstrap";
import { Modal, Upload, Tooltip } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import ReactPaginate from "react-paginate";
import { newDate } from "../../../../../../utility/config";
const { Dragger } = Upload;

const ActionsComponent = (props) => {
  // function confirm(e) {
  //   props.changeStatus(props.row);
  // }
  // function cancel(e) {
  //   message.error("Hủy thay đổi trạng thái  !");
  // }
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

      {/* <Popconfirm
        title="Bạn có chắc chắn xóa sinh viên?"
        onConfirm={confirm}
        onCancel={cancel}
        okText="Có "
        cancelText="Không "
      >
        <Trash className="cursor-pointer" size={20} />
      </Popconfirm> */}
    </div>
  );
};
class ListStageEducation extends Component {
  static getDerivedStateFromProps(props, state) {
    if (
      props.dataList.dataStage !== state.data.length ||
      state.currentPage !== props.parsedFilter.page
    ) {
      return {
        data: props.dataList.dataStage,
        totalPages: props.dataList.toal_page_stage,
        // currentPage: parseInt(props.parsedFilter.page) - 1,
        // rowsPerPage: parseInt(props.parsedFilter.perPage),
        totalRecords: props.dataList.total_record_stage,
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
        name: "Khóa",
        selector: "stage",
        sortable: true,
        minWidth: "300px",
        cell: (row) => (
          <p title={row.name} className="text-truncate text-bold-500 mb-0">
            {row.name}
          </p>
        ),
      },
      {
        name: " Ngày bắt đầu",
        selector: "date_start",
        sortable: true,
        minWidth: "300px",
        cell: (row) => <p>{newDate(row.startAt)}</p>,
      },
      {
        name: " Ngày kết thúc",
        selector: "date_end",
        sortable: true,
        minWidth: "300px",
        cell: (row) => <p>{newDate(row.endAt)}</p>,
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
    const { parsedFilter, getDataStage } = this.props;

    const paginate = {
      page: 1,
      limit: 10,
    };
    let limit = parsedFilter || paginate;
    getDataStage(limit);
  }
  handleFilter = (e) => {
    this.setState({ value: e.target.value });
    this.props.filterData(e.target.value);
  };

  handleSidebar = (boolean, addNew = false) => {
    this.setState({ sidebar: boolean });
    if (addNew === true) this.setState({ currentData: null, addNew: true });
  };
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
    let { parsedFilter, getDataStage } = this.props;
    const { limit } = parsedFilter;
    let perPage = limit || 10;
    history.push(`/education/stage?page=${page.selected + 1}&limit=${perPage}`);
    getDataStage({ page: page.selected + 1, limit: perPage });
    this.setState({ currentPage: page.selected });
  };
  handleRowsPerPage = (value) => {
    let { parsedFilter, getDataStage } = this.props;

    let page = parsedFilter.page !== undefined ? parsedFilter.page : 1;
    history.push(`/education/stage?page=${page}&limit=${value}`);
    this.setState({ rowsPerPage: value });
    getDataStage({ page: parsedFilter.page, limit: value });
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
          noHeader={true}
          fixedHeader
          fixedHeaderScrollHeight={"55vh"}
          noDataComponent="Không có kì học"
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
          addData={this.props.addStage}
          handleSidebar={this.handleSidebar}
          parsedFilter={this.props.parsedFilter}
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
  getDataStage,
  importExcelStudent,
  addStage,
})(ListStageEducation);
