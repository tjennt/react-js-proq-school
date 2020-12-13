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
import { Button, Col, Input, Row } from "reactstrap";
import { Modal, 
  // Upload 
} from "antd";
// import { InboxOutlined } from "@ant-design/icons";

// const { Dragger } = Upload;

const CustomHeader = (props) => {
  const showModal = () => {
    props.showModal();
  };
  return (
    <Row>
      <Col lg="3">
        <h2>Nhận xét của giáo viên</h2>
      </Col>
      <Col lg="3">
        <Button onClick={showModal} className=" ml-2" color="danger">
          <Download size={15} /> Export Excel
        </Button>
      </Col>
    </Row>
  );
};

class Comment extends Component {
  static getDerivedStateFromProps(props, state) {
    if (props.dataList.dataClass !== state.data.length) {
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
        name: "Tên giáo viên",
        selector: "nameTeacher",
        sortable: true,
        minWidth: "200px",
        cell: (row) => (
          <p title={row.subject} className="text-truncate text-bold-500 mb-0">
            Mua TC
          </p>
        ),
      },
      {
        name: "Nhận xét",
        selector: "class",
        sortable: true,
        minWidth: "200px",
        cell: (row) => (
          <p title={row.class} className="text-truncate text-bold-500 mb-0">
            Sửa máy lạnh nóng quá
          </p>
        ),
      },
      {
        name: "Ngày nhận xét",
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
    return (
      <div className="data-list">
        <Modal
          destroyOnClose={true}
          title="Xuất file excel"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Input placeholder="Vui lòng nhập tên file excel" />
        </Modal>
        <DataTable
          data={data}
          columns={columns}
          noHeader
          fixedHeader
          fixedHeaderScrollHeight={"55vh"}
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
})(Comment);
