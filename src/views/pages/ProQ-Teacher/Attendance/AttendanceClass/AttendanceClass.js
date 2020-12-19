import React, { Component } from "react";
import DataTable from "react-data-table-component";
import { history } from "../../../../../history";
import { Switch } from "antd";
import { connect } from "react-redux";
import "antd/dist/antd.css";
import queryString from "query-string";
import {
  getDataSchedulesTeacherId,
  schedule,
} from "../../../../../redux/actions/teacher/index";
import "../../../../../assets/scss/plugins/extensions/react-paginate.scss";
import "../../../../../assets/scss/pages/data-list.scss";
import "../../../../../assets/scss/plugins/extensions/sweet-alerts.scss";
import Moment from "react-moment";
import { API_ENDPOINT_IMG } from "../../../../../redux/constants";
import { Button, Col, Row } from "reactstrap";
import BreadCrumbs from "../../../../../components/@vuexy/breadCrumbs/BreadCrumb";
import Card from "reactstrap/lib/Card";
import CardBody from "reactstrap/lib/CardBody";
// import { Popconfirm, message } from "antd";
const selectedStyle = {
  rows: {
    selectedHighlighStyle: {
      backgroundColor: "rgba(115,103,240,.05)",
      color: "#7367F0 !important",
      boxShadow: "0 0 1px 0 #7367F0 !important",
      "&:hover": {
        transform: "translateY(0px) !important",
      },
    },
  },
};
const ActionsComponent = (props) => {
  const { row } = props;
  function onChange(checked) {
    props.switchAtten(checked, row);
  }
  return (
    <div className="data-list-action">
      <Switch
        defaultChecked={row.status ? true : false}
        // checked={props.switch}
        onChange={onChange}
        className="cursor-pointer mr-1"
        size={20}
        style={{backgroundColor: row.status ? '#ff3c00e8' : '#ccc', outline: 'none', boxShadow: 'none'}}
        onClick={() => {
          return props.currentData(props.row);
        }}
      />
    </div>
  );
};

class ListStudentEducation extends Component {
  static getDerivedStateFromProps(props, state) {
    if (props.dataList.dataDetail !== state.data.length) {
      return {
        data: props.dataList.dataDetail,
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
        name: "",
        selector: "name",
        sortable: true,
        minWidth: "50px",
        maxWidth: "70px",
        cell: (row) => (
          <img
            style={{ borderRadius: '50%', marginLeft: 'auto' }}
            height="50px"
            src={`${API_ENDPOINT_IMG}/${row.avatar}`}
            alt={row.avatar}
          />
        ),
      },
      {
        name: "Họ và Tên",
        selector: "student",
        sortable: true,
        minWidth: "200px",
        cell: (row) => (
          <p title={row.fullName} className="text-truncate text-bold-500 mb-0">
            {row.fullName}
          </p>
        ),
      },
      {
        name: "Ngày học",
        selector: "date",
        sortable: true,
        // minWidth: "300px",
        cell: (row) => <Moment format="DD/MM/YYYY">{row.date}</Moment>,
      },
      {
        name: "Điểm danh",
        sortable: true,
        cell: (row) => (
          <ActionsComponent
            row={row}
            switch={this.state.switch}
            switchAtten={this.switchAtten}
            onRowClicked={this.onRowClicked}
            currentData={this.handleCurrentData}
          />
        ),
      },
    ],
    allData: [],
    value: "",
    rowsPerPage: 4,
    currentData: null,
    switch: false,
    totalRecords: 0,
    selectedRows: null,
    addNew: "",
  };

  thumbView = this.props.thumbView;
  componentDidMount() {
    let params = queryString.parse(this.props.location.search);
    let id = this.props.match.params.id;
    this.props.getDataSchedulesTeacherId(params, id);
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
  switchAtten = (value, data) => {
    let id = this.props.match.params.id;
    let params = queryString.parse(this.props.location.search);
    this.props.schedule(data, id, params);
    this.setState({
      ...this.state,
      switch: value,
    });
  };
  onRowClicked = (value) => {
    this.setState({
      ...this.state,
      switch: true,
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


  backHome = () => {
    history.goBack();
  };
  render() {
    let { columns, value, data } = this.state;

    return (
      <Card> 
        <CardBody  className="data-list">
          <BreadCrumbs
            breadCrumbTitle="Giáo viên"
            breadCrumbParent="Danh sách"
            breadCrumbActive="Điểm danh "
          />
          <Row>
            <Col lg="6">
              <Button color="primary" onClick={this.backHome}>
                {" "}
                Quay lại
              </Button>
            </Col>
          </Row>
          <DataTable
            className="dataTable-custom"
            data={value.length ? "" : data}
            columns={columns}
            noHeader={true}
            noDataComponent="Không có sinh viên"
            pointerOnHover
            selectableRowsHighlight
            onSelectedRowsChange={this.onSelectedRowsChange}
            highlightOnHover
            customStyles={selectedStyle}
          />
        </CardBody>
      </Card>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    dataList: state.dataTeacher,
  };
};

export default connect(mapStateToProps, {
  getDataSchedulesTeacherId,
  schedule,
})(ListStudentEducation);
