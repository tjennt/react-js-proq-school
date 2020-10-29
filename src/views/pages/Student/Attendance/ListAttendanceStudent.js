import React, { Component } from "react";
import DataTable from "react-data-table-component";
import classnames from "classnames";
import { history } from "../../../../history";
import { Download } from "react-feather";
import { connect } from "react-redux";
import "antd/dist/antd.css";
import { getData } from "../../../../redux/actions/dataListAssistance/index";
import "./../../../../assets/scss/plugins/extensions/react-paginate.scss";
import "./../../../../assets/scss/pages/data-list.scss";
import { Button, Input } from "reactstrap";
import { Modal } from "antd";

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
    console.log(data);
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

        <DataTable
          className="dataTable-custom"
          data={value.length ? "" : data}
          columns={columns}
          noHeader
          pagination
          noDataComponent="Không có dữ liệu"
          subHeader
          subHeaderComponent={
            <CustomHeader
              handleSidebar={this.handleSidebar}
              showModal={this.showModal}
              handleFilter={this.handleFilter}
              handleRowsPerPage={this.handleRowsPerPage}
            />
          }
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
