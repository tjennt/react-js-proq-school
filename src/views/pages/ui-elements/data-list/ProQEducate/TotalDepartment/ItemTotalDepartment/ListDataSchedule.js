import React from "react";
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import DataTable from "react-data-table-component";
import { getDataClass } from "../../../../../../../redux/actions/dataListAssistance/index";
import { connect } from "react-redux";
import Moment from "react-moment";
import { Edit } from "react-feather";
const ActionsComponent = (props) => {
  return (
    <div className="data-list-action">
      <Edit className="cursor-pointer mr-1" size={20} />
    </div>
  );
};
class ListDataSchedule extends React.Component {
  static getDerivedStateFromProps(props, state) {
    if (props.dataList.dataschedules !== state.data.length) {
      return {
        data: props.dataList.dataschedules,
      };
    }

    // Return null if the state hasn't changed
    return null;
  }
  state = {
    data: [],
    totalPages: 0,
    visible: false,
    currentPage: 0,
    columns: [
      {
        name: "Giáo viên",
        selector: "teacher",
        sortable: true,
        minWidth: "100px",
        cell: (row) => (
          <p title={row.classCode} className="text-truncate text-bold-500 mb-0">
            Nguyễn văn Long
          </p>
        ),
      },
      {
        name: "Ngày dạy",
        selector: "class",
        sortable: true,
        minWidth: "100px",
        cell: (row) => (
          <p title={row.classCode} className="text-truncate text-bold-500 mb-0">
            5/10/2020
          </p>
        ),
      },
      {
        name: "Chỉnh sửa",
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
    totalRecords: 0,
    sortIndex: [],
    addNew: "",
  };
  componentDidMount() {
    this.props.getDataClass();
  }
  render() {
    const { data, columns } = this.state;
    return (
      <Card>
        <CardHeader>
          <CardTitle className="font-large-1 text-primary">Lịch học</CardTitle>
        </CardHeader>
        <CardBody>
          <DataTable data={data} columns={columns} noHeader pagination />
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

export default connect(mapStateToProps, { getDataClass })(ListDataSchedule);
