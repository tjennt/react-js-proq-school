import React, { Component } from "react";
import {
  Card,
  Button,
  CardBody,
  CardImg,
  Container,
  Row,
  Col,
} from "reactstrap";
import * as Icon from "react-feather";
import classnames from "classnames";
import { history } from "../../../../../history";
import { ChevronLeft, ChevronRight, Plus } from "react-feather";
import { connect } from "react-redux";
import "antd/dist/antd.css";
import { Skeleton } from "antd";
import { baseUrl } from "./../../../../../utility/config/index";
import {
  getData,
  deleteData,
  updateData,
  addData,
  filterData,
} from "../../../../../redux/actions/dataListShop/index";
import Sidebar from "./DataListShopSidebar";
import Chip from "../../../../../components/@vuexy/chips/ChipComponent";
import "./../../../../../assets/scss/plugins/extensions/react-paginate.scss";
import "./../../../../../assets/scss/pages/data-list.scss";
import "../../../../../assets/scss/plugins/extensions/sweet-alerts.scss";
import Moment from "react-moment";
import ReactPaginate from "react-paginate";
const chipColors = {
  0: "warning",
  1: "primary",
};
const chipText = {
  0: "Không hoạt động ",
  1: "Hoạt động",
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
const ActionsComponent = (props) => {
  return (
    <div className="data-list-action d-flex justify-content-between mt-2">
      <Button.Ripple
        className="gradient-light-primary text-white"
        color="primary"
        outline
        onClick={() => {
          return props.currentData(props.row);
        }}
      >
        <Icon.Edit size={15} /> Chỉnh sửa
      </Button.Ripple>
      <Button.Ripple color="primary" outline>
        <Icon.Eye size={15} /> Xem chi tiết
      </Button.Ripple>
    </div>
  );
};
class ThumbViewShopConfig extends Component {
  static getDerivedStateFromProps(props, state) {
    if (
      props.dataList.data.length !== state.data.length ||
      state.currentPage !== props.parsedFilter.page
    ) {
      return {
        data: props.dataList.data,
        // allData: props.dataList.filteredData,
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
    const { getData, parsedFilter } = this.props;
    getData(parsedFilter);
  }
  handleFilter = (e) => {
    this.setState({ value: e.target.value });
    this.props.filterData(e.target.value);
  };

  handleSidebar = (boolean, addNew = false) => {
    this.setState({ sidebar: boolean });
    if (addNew === true) this.setState({ currentData: null, addNew: true });
  };
  handleCurrentData = (obj) => {
    this.setState({ currentData: obj });
    this.handleSidebar(true);
  };

  handlePagination = (page) => {
    let { parsedFilter, getData } = this.props;
    let perPage = parsedFilter.perPage !== undefined ? parsedFilter.perPage : 4;

    history.push(`/listShop?page=${page.selected + 1}&perPage=${perPage}`);
    getData({ page: page.selected + 1, perPage: perPage });
    this.setState({ currentPage: page.selected });
  };

  render() {
    let {
      data,
      totalPages,
      rowsPerPage,
      currentData,
      sidebar,
      totalRecords,
      sortIndex,
    } = this.state;
    return (
      <div
        className={`data-list ${
          this.props.thumbView ? "thumb-view" : "list-view"
        }`}
      >
        <Container>
          <div className="d-flex justify-content-between">
            <CustomHeader
              handleSidebar={this.handleSidebar}
              handleFilter={this.handleFilter}
              handleRowsPerPage={this.handleRowsPerPage}
              rowsPerPage={rowsPerPage}
              total={totalRecords}
              index={sortIndex}
            />
            <ReactPaginate
              className="mb-2"
              previousLabel={<ChevronLeft size={15} />}
              nextLabel={<ChevronRight size={15} />}
              breakLabel="..."
              breakClassName="break-me"
              pageCount={totalPages}
              containerClassName="vx-pagination separated-pagination pagination-end pagination-sm mb-0 mt-2"
              activeClassName="active"
              forcePage={
                this.props.parsedFilter.page
                  ? parseInt(this.props.parsedFilter.page - 1)
                  : 0
              }
              onPageChange={(page) => this.handlePagination(page)}
            />
          </div>
          <Row className="mt-2">
            {data ? (
              data.map((item) => (
                <Col key={item.id} lg="4" md="6" sm="12">
                  <Card style={{ position: "relative" }}>
                    <CardImg
                      top
                      className="img-fluid"
                      src={`${baseUrl}/images/brand-connect/${item.image}`}
                      alt="card image cap"
                    />
                    <CardBody>
                      <div className="card-btns d-flex justify-content-between mt-2">
                        <h3 className="text-uppercase "> {item.name} </h3>
                        {item.type === null ? (
                          ""
                        ) : (
                          <p className=" font-weight-bold"> {item.type}</p>
                        )}
                      </div>
                      <hr className="my-1" />
                      <div className="card-btns d-flex justify-content-between mt-2">
                        <div className="float-left">
                          <Chip
                            className="mb-0"
                            color={chipColors[item.status]}
                            text={chipText[item.status]}
                          />
                          <p>Trạng thái </p>
                        </div>
                        <div className="float-right">
                          <p className="font-medium-2 mb-0">
                            {" "}
                            <Moment format="DD/MM/YYYY" className="font-italic">
                              {item.created_at}
                            </Moment>{" "}
                          </p>
                          <p>Ngày tạo</p>
                        </div>
                      </div>
                      <div>
                        <ActionsComponent
                          row={item}
                          getData={this.props.getDataBlog}
                          parsedFilter={this.props.parsedFilter}
                          currentData={this.handleCurrentData}
                          deleteRow={(row) => this.handleDelete(row)}
                        />
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              ))
            ) : (
              <Skeleton />
            )}
          </Row>
        </Container>
        {/* <BasicSweetCallback /> */}
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

const mapStateToProps = (state) => {
  return {
    dataList: state.DataShop,
  };
};

export default connect(mapStateToProps, {
  getData,
  deleteData,
  updateData,
  addData,
  // getInitialData,
  filterData,
})(ThumbViewShopConfig);
