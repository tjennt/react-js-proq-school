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
  Trash,
} from "react-feather";
import { connect } from "react-redux";
import "antd/dist/antd.css";
import { getData } from "../../../../../../redux/actions/dataListAssistance/index";
import {
  importExcelStudent,
  updateSpecialization,
} from "../../../../../../redux/actions/education/index";
import Sidebar from "./SpecializationSidebar";
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
import { Popconfirm, message, Tooltip } from "antd";
import ReactPaginate from "react-paginate";
import {
  getDataSpecialization,
  setEditSpecialization,
} from "../../../../../../redux/actions/schedule/getDataSpecialization";
import {
  addSpecialization,
  deleteSpecialization,
} from "../../../../../../redux/actions/education/index";
import { getDataSubject } from "../../../../../../redux/actions/dataListAssistance/index";
import { newDate } from "../../../../../../utility/config";

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
      <Popconfirm
        title="Bạn có chắc chắn xóa chuyên ngành?"
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
class ListSpecializationEducation extends Component {
  static getDerivedStateFromProps(props, state) {
    if (
      props.dataList.dataSpecial !== state.data.length ||
      state.currentPage !== props.parsedFilter.page
    ) {
      return {
        data: props.dataList.dataSpecial,
        totalPages: props.dataList.total_page_special,
        totalRecords: props.dataList.total_record_special,
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
        name: "Chuyên ngành",
        selector: "name",
        sortable: true,
        // minWidth: "300px",
        cell: (row) => (
          <p title={row.name} className="text-truncate text-bold-500 mb-0">
            {row.name}
          </p>
        ),
      },
      {
        name: " Ngày Tạo ",
        selector: "date",
        sortable: true,
        // minWidth: "300px",
        cell: (row) => <p format="DD/MM/YYYY">{newDate(row.createdAt)}</p>,
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
    file: "",
  };

  thumbView = this.props.thumbView;

  componentDidMount() {
    const { parsedFilter, getDataSpecialization, getDataSubject } = this.props;

    const paginate = {
      page: 1,
      limit: 10,
    };
    let limit = parsedFilter || paginate;
    let dataAll = {
      page: "",
      limit: 10000,
    };
    getDataSpecialization(limit);
    getDataSubject(dataAll);
  }
  handleSidebar = (boolean, addNew = false) => {
    this.setState({ sidebar: boolean });
    if (addNew === true) this.setState({ currentData: null, addNew: true });
  };
  handleDelete = (row) => {
    this.props.deleteSpecialization(row, this.props.parsedFilter);
    // this.props.getData(this.props.parsedFilter);
    // if (this.state.data.length - 1 === 0) {
    //   history.push(
    //     `/education/student?page=${parseInt(
    //       this.props.parsedFilter.page - 1
    //     )}&limit=${this.props.parsedFilter.perPage}`
    //   );
    //   this.props.getData({
    //     page: this.props.parsedFilter.page - 1,
    //     perPage: this.props.parsedFilter.perPage,
    //   });
    // }
  };
  handleCurrentData = (obj) => {
    this.props.setEditSpecialization(obj);
    this.setState({ currentData: obj });
    this.handleSidebar(true);
  };
  handlePagination = (page) => {
    let { parsedFilter, getDataSpecialization } = this.props;
    const { limit } = parsedFilter;
    let perPage = limit || 10;
    history.push(
      `/education/specialization?page=${page.selected + 1}&limit=${perPage}`
    );
    getDataSpecialization({ page: page.selected + 1, limit: perPage });
    this.setState({ currentPage: page.selected });
  };
  handleRowsPerPage = (value) => {
    let { parsedFilter, getDataSpecialization } = this.props;

    let page = parsedFilter.page !== undefined ? parsedFilter.page : 1;
    history.push(`/education/specialization?page=${page}&limit=${value}`);
    this.setState({ rowsPerPage: value });
    getDataSpecialization({ page: parsedFilter.page, limit: value });
  };
  handleAddData = () => {
    this.handleSidebar(true, true);
    this.props.setEditSpecialization(null);
  };
  render() {
    let { columns, value, sidebar, data } = this.state;
    return (
      <div className="data-list">
        <Col lg="12">
          <Row>
            <Col lg="3">
              <Button
                color="primary"
                onClick={this.handleAddData}
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
                  disabled={this.state.totalRecords < 10 ? true : false}
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
                    <span className="align-middle mx-50">{`${
                      this.props.parsedFilter.limit
                        ? this.props.parsedFilter.limit
                        : 10
                    } of ${this.state.totalRecords}`}</span>
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
            </Col>
          </Row>
        </Col>
        <DataTable
          className="dataTable-custom"
          data={value.length ? data : data}
          columns={columns}
          noHeader={true}
          fixedHeader
          fixedHeaderScrollHeight={"55vh"}
          noDataComponent="Không có chuyên ngành"
          expandableRows
          expandOnRowClicked
          expandableRowsComponent={<ExpandableTable data={data} />}
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
          subject={this.props.subject}
          show={sidebar}
          data={this.props.dataEdit}
          updateData={this.props.updateSpecialization}
          addData={this.props.addSpecialization}
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
const ExpandableTable = ({ data }) => {
  return (
    <Table responsive dark>
      {/* <thead>
        <tr>
          <th>Môn </th>
        </tr>
      </thead> */}
      <thead>
        {data &&
          data.subject.map((item) => (
            <tr key={item._id}>
              <td> {item.name} </td>
            </tr>
          ))}
      </thead>
    </Table>
  );
};
const mapStateToProps = (state) => {
  return {
    dataList: state.dataSchedule,
    subject: state.assistantData.dataSubject,
    dataEdit: state.dataSchedule.setTaskDataSpecial,
  };
};

export default connect(mapStateToProps, {
  getData,
  importExcelStudent,
  getDataSpecialization,
  getDataSubject,
  addSpecialization,
  setEditSpecialization,
  updateSpecialization,
  deleteSpecialization,
})(ListSpecializationEducation);
