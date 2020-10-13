import React, { Component } from "react";
import DataTable from "react-data-table-component";
import classnames from "classnames";
import { history } from "../../../../../../history";
import { Edit, Plus, RefreshCw } from "react-feather";
import { connect } from "react-redux";
import "antd/dist/antd.css";
import { getDataClass } from "../../../../../../redux/actions/dataListAssistance/index";
import Sidebar from "./DataListClassSidebar";
import "./../../../../../../assets/scss/plugins/extensions/react-paginate.scss";
import "./../../../../../../assets/scss/pages/data-list.scss";
import "../../../../../../assets/scss/plugins/extensions/sweet-alerts.scss";
import Moment from "react-moment";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table,
} from "reactstrap";
import Chip from "../../../../../../components/@vuexy/chips/ChipComponent";
import { Popconfirm, message } from "antd";
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
        title="Bạn có chắc chắn thay đổi trạng thái?"
        onConfirm={confirm}
        onCancel={cancel}
        okText="Có "
        cancelText="Không "
      >
        <RefreshCw className="cursor-pointer" size={20} />
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
          outline
        >
          <Plus size={15} />
          <span className="align-middle">Tạo mới</span>
        </Button>
      </div>
    </div>
  );
};

class ListClassConfig extends Component {
  static getDerivedStateFromProps(props, state) {
    if (
      props.dataList.dataschedules !== state.data.length ||
      state.currentPage !== props.parsedFilter.page
    ) {
      return {
        data: props.dataList.dataschedules,
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
        name: "Sinh viên",
        selector: "student",
        sortable: true,
        minWidth: "200px",
        cell: (row) => (
          <p
            title={row.nameStudent}
            className="text-truncate text-bold-500 mb-0"
          >
            {row.nameStudent}
          </p>
        ),
      },
      {
        name: "Lớp",
        selector: "class",
        sortable: true,
        minWidth: "200px",
        cell: (row) => (
          <p title={row.classCode} className="text-truncate text-bold-500 mb-0">
            {row.classCode}
          </p>
        ),
      },
      {
        name: "Môn học",
        selector: "subject",
        sortable: true,
        minWidth: "200px",
        cell: (row) => (
          <p
            title={row.nameSubject}
            className="text-truncate text-bold-500 mb-0"
          >
            {row.nameSubject}
          </p>
        ),
      },
      {
        name: "Ngày tạo",
        selector: "dateCreate",
        sortable: true,
        // minWidth: "300px",
        cell: (row) => (
          <Moment format="DD/MM/YYYY">{row.dateCreateClass}</Moment>
        ),
      },
      {
        name: "Trạng thái ",
        selector: "type",
        maxWidth: "140px",
        sortable: true,
        cell: (row) => (
          <Chip
            onClick={this.changeStatus}
            className="m-0"
            color={row.statusDay ? "success" : "danger"}
            text={row.statusDay ? "Điểm danh" : "Chưa điểm danh"}
          />
        ),
      },
      // {
      //   name: "Thao tác",
      //   sortable: true,
      //   cell: (row) => (
      //     <ActionsComponent
      //       row={row}
      //       getData={this.props.getData}
      //       parsedFilter={this.props.parsedFilter}
      //       currentData={this.handleCurrentData}
      //       deleteRow={this.handleDelete}
      //       changeStatus={(row) => this.changeStatus(row)}
      //     />
      //   ),
      // },
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
  };

  thumbView = this.props.thumbView;

  componentDidMount() {
    this.props.getDataClass();
  }
  handleFilter = (e) => {
    this.setState({ value: e.target.value });
    this.props.filterData(e.target.value);
  };

  handleSidebar = (boolean, addNew = false) => {
    this.setState({ sidebar: boolean });
    if (addNew === true) this.setState({ currentData: null, addNew: true });
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
    let { columns, data, value, currentData, sidebar } = this.state;
    return (
      <div className="data-list">
        <Card>
          <CardHeader>
            <CardTitle className="font-large-1 text-primary">
              {this.props.TitleTable}
            </CardTitle>
          </CardHeader>
          <CardBody className="rdt_Wrapper">
            <DataTable
              className="dataTable-custom"
              data={value.length ? "" : data}
              columns={columns}
              noHeader
              pagination
              subHeader
              subHeaderComponent={
                <CustomHeader
                  value={value}
                  handleSidebar={this.handleSidebar}
                  handleFilter={this.handleFilter}
                />
              }
              expandableRows
              expandOnRowClicked
              expandableRowsComponent={<ExpandableTable />}
            />
          </CardBody>
        </Card>
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
    <Table responsive>
      <thead>
        <tr>
          <th>Thông tin Chi tiết</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Name</td>
          <td>{data.name}</td>
        </tr>
        <tr>
          <td>Email</td>
          <td>{data.email}</td>
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
  getDataClass,
})(ListClassConfig);