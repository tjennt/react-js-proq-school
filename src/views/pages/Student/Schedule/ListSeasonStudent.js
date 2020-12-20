import React, { Component } from "react";
import DataTable from "react-data-table-component";
import { history } from "../../../../history";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "react-feather";
import { connect } from "react-redux";
import "antd/dist/antd.css";
import { getDataSeason } from "../../../../redux/actions/dataListAssistance/index";
import "../../../../assets/scss/plugins/extensions/react-paginate.scss";
import "../../../../assets/scss/pages/data-list.scss";
import "../../../../assets/scss/plugins/extensions/sweet-alerts.scss";
import {
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown,
  Card,
  CardBody
} from "reactstrap";
import Moment from "react-moment";
import ReactPaginate from "react-paginate";
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
class ListSeasonStudent extends Component {
  static getDerivedStateFromProps(props, state) {
    if (
      props.dataList.dataSeason !== state.data.length ||
      state.currentPage !== props.parsedFilter.page
    ) {
      return {
        data: props.dataList.dataSeason,
        totalPages: props.dataList.total_page_season,
        // currentPage: parseInt(props.parsedFilter.page) - 1,
        // rowsPerPage: parseInt(props.parsedFilter.perPage),
        totalRecords: props.dataList.total_record_season,
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
        name: "Học kỳ",
        selector: "season",
        sortable: true,
        minWidth: "300px",
        cell: (row) => (
          <p
            title={row.studentCode}
            className="text-truncate text-bold-500 mb-0"
          >
            {row.name}
          </p>
        ),
      },
      {
        name: " Ngày bắt đầu",
        selector: "date_start",
        sortable: true,
        minWidth: "300px",
        cell: (row) => <Moment format="DD/MM/YYYY">{row.startAt}</Moment>,
      },
      {
        name: " Ngày kết thúc",
        selector: "date_end",
        sortable: true,
        minWidth: "300px",
        cell: (row) => <Moment format="DD/MM/YYYY">{row.endAt}</Moment>,
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
    const { parsedFilter, getDataSeason } = this.props;

    const paginate = {
      page: 1,
      limit: 10,
    };
    let limit = parsedFilter || paginate;
    getDataSeason(limit);
  }
  handleFilter = (e) => {
    this.setState({ value: e.target.value });
    this.props.filterData(e.target.value);
  };

  handlePagination = (page) => {
    let { parsedFilter, getData } = this.props;
    const { limit } = parsedFilter;
    let perPage = limit || 10;
    history.push(
      `/education/student?page=${page.selected + 1}&limit=${perPage}`
    );
    getData({ page: page.selected + 1, limit: perPage });
    this.setState({ currentPage: page.selected });
  };
  handleRowsPerPage = (value) => {
    let { parsedFilter, getData } = this.props;

    let page = parsedFilter.page !== undefined ? parsedFilter.page : 1;
    history.push(`/education/student?page=${page}&limit=${value}`);
    this.setState({ rowsPerPage: value });
    getData({ page: parsedFilter.page, limit: value });
  };
  onRowClicked = (state) => {
    history.push(`/student/schedule/${state._id}`);
  };
  render() {
    let { columns, value, data } = this.state;
    return (
      <Card>
        <CardBody className="data-list">
          <Col lg="12">
            <Row>
              <Col lg="12">
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
                    <span className="align-middle mx-50">{`Hiển thị: ${this.props.parsedFilter.limit
                      ? this.props.parsedFilter.limit
                      : 10
                      }`}</span>
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
                <span className="btn btn-outline-primary btn-rounded float-right mr-2">
                  Tổng {this.state.totalRecords}</span>
              </Col>
            </Row>
          </Col>
          <DataTable
            className="dataTable-custom"
            data={value.length ? "" : data}
            columns={columns}
            noHeader={true}
            fixedHeader
            fixedHeaderScrollHeight={"50vh"}
            pointerOnHover
            onRowClicked={this.onRowClicked}
            highlightOnHover
            customStyles={selectedStyle}
            // fixedHeaderScrollHeight={"55vh"}
            noDataComponent="Không có dữ liệu học sinh"
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

export default connect(mapStateToProps, {
  getDataSeason,
})(ListSeasonStudent);
