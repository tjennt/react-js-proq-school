import React from "react";
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import DataTable from "react-data-table-component";
import { getDataClass } from "../../../../../../../redux/actions/dataListAssistance/index";
import { connect } from "react-redux";
import { Edit } from "react-feather";
import { Modal } from "antd";
import Select from "react-select";

import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
const ActionsComponent = (props) => {
  const showModal = () => {
    props.showModal();
  };
  return (
    <div className="data-list-action">
      <Edit onClick={showModal} className="cursor-pointer mr-1" size={20} />
    </div>
  );
};
const options = [
  { value: 1, label: "Nguyễn Văn A" },
  { value: 2, label: "Nguyễn Văn B" },
  { value: 3, label: "Nguyễn Văn C" },
  { value: 4, label: "Nguyễn Văn D" },
];
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
            showModal={this.showModal}
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
    selectTeacher: 1,
    sortIndex: [],
    addNew: "",
  };
  componentDidMount() {
    this.props.getDataClass();
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = (e) => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  };
  handleSelectedOptionChange = (value) => {
    this.setState({
      ...this.state,
      selectTeacher: value,
    });
  };
  render() {
    const { data, columns } = this.state;
    return (
      <div>
        <Modal
          title="Thay đổi giảng viên"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Select
            style={{ width: "100%" }}
            id="selectTeacher"
            value={this.state.selectTeacher}
            isClearable={true}
            onChange={this.handleSelectedOptionChange}
            placeholder="Vui lòng chọn giáo viên thay đổi"
            // isdisabled={disabled}
            options={options}
          ></Select>
        </Modal>
        <Card>
          <CardHeader>
            <CardTitle className="font-large-1 text-primary">
              Lịch học
            </CardTitle>
          </CardHeader>
          <CardBody>
            <DataTable data={data} columns={columns} noHeader pagination />
          </CardBody>
        </Card>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    dataList: state.assistantData,
  };
};

export default connect(mapStateToProps, { getDataClass })(ListDataSchedule);
