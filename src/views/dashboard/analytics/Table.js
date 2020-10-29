import React, { Component } from "react";
import DataTable from "react-data-table-component";
import { history } from "./../../../history";
import { Download } from "react-feather";
import { connect } from "react-redux";
import "antd/dist/antd.css";
import { getData } from "./../../../redux/actions/dataListAssistance/index";
import "./../../../assets/scss/plugins/extensions/react-paginate.scss";
import "./../../../assets/scss/pages/data-list.scss";
import "./../../../assets/scss/plugins/extensions/sweet-alerts.scss";
import { Button, Card, CardBody } from "reactstrap";
import { Modal, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";

const { Dragger } = Upload;

const CustomHeader = (props) => {
  const showModal = () => {
    props.showModal();
  };
  return (
    <div className="data-list-header d-flex justify-content-between flex-wrap">
      <div className="actions-left d-flex flex-wrap">
        <Button onClick={showModal} className=" ml-2" color="danger">
          <Download size={15} /> Export Excel
        </Button>
      </div>
    </div>
  );
};

class TableTotal extends Component {
  static getDerivedStateFromProps(props, state) {
    if (props.dataList.data !== state.data.length) {
      return {
        data: props.dataList.data,
        totalPages: props.dataList.totalPages,
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
        name: "Môn",
        selector: "subject",
        sortable: true,
        minWidth: "200px",
        cell: (row) => (
          <p title={row.subject} className="text-truncate text-bold-500 mb-0">
            PHP
          </p>
        ),
      },
      {
        name: "Lớp",
        selector: "class",
        sortable: true,
        minWidth: "200px",
        cell: (row) => (
          <p title={row.class} className="text-truncate text-bold-500 mb-0">
            WD14305
          </p>
        ),
      },
      {
        name: "Số lượng SV Vắng",
        selector: "studentFail",
        sortable: true,
        // minWidth: "300px",
        cell: (row) => (
          <p
            title={row.studentFail}
            className="text-truncate text-bold-500 mb-0"
          >
            20
          </p>
        ),
      },
      {
        name: "Sỉ số",
        selector: "total",
        sortable: true,
        // minWidth: "300px",
        cell: (row) => (
          <p title={row.total} className="text-truncate text-bold-500 mb-0">
            50
          </p>
        ),
      },
      {
        name: "Giảng viên ",
        selector: "teacher",
        sortable: true,
        // minWidth: "300px",
        cell: (row) => (
          <p title={row.teacher} className="text-truncate text-bold-500 mb-0">
            {/* {row.created_at} */}
            Mua TC
          </p>
        ),
      },
      {
        name: "Ngày",
        selector: "date",
        cell: (row) => (
          <p title={row.dae} className="text-truncate text-bold-500 mb-0">
            {/* {row.created_at} */}
            20/10/2020
          </p>
        ),
      },
    ],
    allData: [],
    rowsPerPage: 4,
    visible: false,
  };

  thumbView = this.props.thumbView;

  componentDidMount() {
    this.props.getData();
  }
  handleFilter = (e) => {
    this.setState({ value: e.target.value });
    this.props.filterData(e.target.value);
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
  handlePagination = (page) => {
    let { parsedFilter, getData } = this.props;
    let perPage = parsedFilter.perPage !== undefined ? parsedFilter.perPage : 4;

    history.push(`/accountAdmin?page=${page.selected + 1}&perPage=${perPage}`);
    getData({ page: page.selected + 1, perPage: perPage });
    this.setState({ currentPage: page.selected });
  };

  render() {
    let { columns, data } = this.state;
    console.log(data);
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
        <Card>
          <CardBody>
            <DataTable
              className="dataTable-custom"
              data={data}
              columns={columns}
              noHeader
              pagination
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

export default connect(mapStateToProps, {
  getData,
})(TableTotal);