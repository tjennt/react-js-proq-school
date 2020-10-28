import React, { Component } from "react";
import DataTable from "react-data-table-component";
import classnames from "classnames";
import { history } from "../../../../../../history";
import { connect } from "react-redux";
import "antd/dist/antd.css";
import { getData } from "../../../../../../redux/actions/dataListAssistance/index";
import Sidebar from "./DataListStudentSidebar";
import "./../../../../../../assets/scss/plugins/extensions/react-paginate.scss";
import "./../../../../../../assets/scss/pages/data-list.scss";
import "../../../../../../assets/scss/plugins/extensions/sweet-alerts.scss";
import { Card, CardBody, Table } from "reactstrap";
// import Chip from "../../../../../../components/@vuexy/chips/ChipComponent";
// import { Popconfirm, message } from "antd";
// const selectedStyle = {
//   rows: {
//     selectedHighlighStyle: {
//       backgroundColor: "rgba(115,103,240,.05)",
//       color: "#7367F0 !important",
//       boxShadow: "0 0 1px 0 #7367F0 !important",
//       "&:hover": {
//         transform: "translateY(0px) !important",
//       },
//     },
//   },
// };
// const ActionsComponent = (props) => {
//   function confirm(e) {
//     props.changeStatus(props.row);
//   }
//   function cancel(e) {
//     message.error("Hủy thay đổi trạng thái  !");
//   }
//   return (
//     <div className="data-list-action">
//       <Edit
//         className="cursor-pointer mr-1"
//         size={20}
//         onClick={() => {
//           return props.currentData(props.row);
//         }}
//       />
//       <Popconfirm
//         title="Bạn có chắc chắn thay đổi trạng thái?"
//         onConfirm={confirm}
//         onCancel={cancel}
//         okText="Có "
//         cancelText="Không "
//       >
//         <RefreshCw className="cursor-pointer" size={20} />
//       </Popconfirm>
//     </div>
//   );
// };

// const CustomHeader = (props) => {
//   return (
//     <div className="data-list-header d-flex justify-content-between flex-wrap">
//       <div className="actions-left d-flex flex-wrap">
//         <Button
//           className="add-new-btn"
//           color="primary"
//           onClick={() => props.handleSidebar(true, true)}
//           outline
//         >
//           <Plus size={15} />
//           <span className="align-middle">Tạo mới</span>
//         </Button>
//       </div>
//     </div>
//   );
// };

class ListStudentConfig extends Component {
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
        name: "Avatar",
        selector: "name",
        sortable: true,
        minWidth: "200px",
        cell: (row) => (
          <p title={row.fullname} className="text-truncate text-bold-500 mb-0">
            {row.fullname}
          </p>
        ),
      },
      {
        name: "Tên",
        selector: "name",
        sortable: true,
        minWidth: "200px",
        cell: (row) => (
          <p title={row.fullname} className="text-truncate text-bold-500 mb-0">
            {row.fullname}
          </p>
        ),
      },
      {
        name: "Mã sinh viên",
        selector: "idST",
        sortable: true,
        // minWidth: "300px",
        cell: (row) => (
          <p title={row.code} className="text-truncate text-bold-500 mb-0">
            {row.code}
          </p>
        ),
      },
      {
        name: "Lớp",
        selector: "classCode",
        sortable: true,
        // minWidth: "300px",
        cell: (row) => (
          <p title={row.classCode} className="text-truncate text-bold-500 mb-0">
            {row.classCode}
          </p>
        ),
      },
      {
        name: " Ngày Tạo ",
        selector: "date",
        sortable: true,
        // minWidth: "300px",
        cell: (row) => (
          <p
            title={row.created_at}
            className="text-truncate text-bold-500 mb-0"
          >
            {/* {row.created_at} */}
            11/10/2020
          </p>
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
    this.props.getData();
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
    let { columns, value, currentData, sidebar, data } = this.state;
    console.log(data);
    return (
      <div className="data-list">
        <Card>
          <CardBody>
            <DataTable
              className="dataTable-custom"
              data={value.length ? "" : data}
              columns={columns}
              noHeader
              pagination
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
          <td>Chaulinh0302cr7@gmail.com</td>
          <td> 03/02/200</td>
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
})(ListStudentConfig);
