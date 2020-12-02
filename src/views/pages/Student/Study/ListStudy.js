import React from "react";
import { Badge, Button, Col, Input, Row } from "reactstrap";
import ItemStudy from "./ItemStudy";
import Select from "react-select";
// import "../../../assets/scss/plugins/extensions/react-paginate.scss";
import "../../../../assets/scss/plugins/extensions/react-paginate.scss";
import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "react-feather";
import {
  getDataNotiFee,
  getDataNotiLearning,
  getDataNotiActivity,
} from "../../../../redux/actions/blog";
import { connect } from "react-redux";
import ItemFee from "./ItemFee";
import ItemLearning from "./ItemLearning";
import NotNoti from "./LoadingNoti/NotNoti";
const optionsCategory = [
  { value: 0, label: "Thông tin học tập" },
  { value: 1, label: "Thông tin hoạt động" },
  { value: 2, label: "Thôn tin học phí" },
];
class ListStudy extends React.Component {
  state = {
    category: 0,
    imageFound: [{ id: "0" }, { id: "1" }, { id: "2" }],
  };
  componentDidMount() {
    this.props.getDataNotiFee();
    this.props.getDataNotiLearning();
    this.props.getDataNotiActivity();
  }
  handleSelectedOptionChange = (value) => {
    this.setState({
      ...this.state,
      category: value,
    });
  };

  handlePagination = (page) => {
    // let { parsedFilter, getData } = this.props;
    // let perPage = parsedFilter.perPage !== undefined ? parsedFilter.perPage : 4;
  };
  render() {
    return (
      <Row>
        <Col lg="4">
          <Select
            style={{ width: "100%" }}
            id="catyegory"
            isClearable={true}
            onChange={this.handleSelectedOptionChange}
            placeholder="Chọn thể loại"
            // isdisabled={disabled}
            options={optionsCategory}
          />
        </Col>
        <Col lg="4">
          <Input placeholder="Vui lòng Nhập  thông tin !" />
        </Col>
        <Col lg="4">
          <Button color="primary">Tìm kiếm</Button>
        </Col>
        <Col lg="12">
          <Badge className="mt-1" style={{ fontSize: "12pt" }} color="success">
            {" "}
            Thông tin học tập
          </Badge>

          <Row>
            {!this.props.loading ? (
              this.props.dataLearning.map((item) => (
                <ItemLearning item={item} />
              ))
            ) : (
              <Row>
                {this.state.imageFound.map((item) => (
                  <Col key={item.id} lg="4">
                    <NotNoti />
                  </Col>
                ))}
              </Row>
            )}
          </Row>
          <ReactPaginate
            previousLabel={<ChevronLeft size={15} />}
            nextLabel={<ChevronRight size={15} />}
            breakLabel="..."
            breakClassName="break-me"
            pageCount={this.props.dataBlogTotalPage.total_page_learning}
            containerClassName="vx-pagination separated-pagination pagination-end pagination-sm mb-0 mt-2"
            activeClassName="active"
            // forcePage={
            //   this.props.parsedFilter.page
            //     ? parseInt(this.props.parsedFilter.page - 1)
            //     : 0
            // }
            // onPageChange={(page) => this.handlePagination(page)}
          />
        </Col>
        <Col lg="12">
          <Badge className="mt-1" style={{ fontSize: "12pt" }} color="primary">
            Thông tin hoạt động{" "}
          </Badge>
          <Row>
            {!this.props.loading ? (
              this.props.dataActivity.map((item) => <ItemStudy item={item} />)
            ) : (
              <Row>
                {this.state.imageFound.map((item) => (
                  <Col key={item.id} lg="4">
                    <NotNoti />
                  </Col>
                ))}
              </Row>
            )}
          </Row>
          <ReactPaginate
            previousLabel={<ChevronLeft size={15} />}
            nextLabel={<ChevronRight size={15} />}
            breakLabel="..."
            breakClassName="break-me"
            pageCount={this.props.dataBlogTotalPage.total_page_activity}
            containerClassName="vx-pagination separated-pagination pagination-end pagination-sm mb-0 mt-2"
            activeClassName="active"
            // forcePage={
            //   this.props.parsedFilter.page
            //     ? parseInt(this.props.parsedFilter.page - 1)
            //     : 0
            // }
            // onPageChange={(page) => this.handlePagination(page)}
          />
        </Col>
        <Col lg="12">
          <Badge className="mt-1" style={{ fontSize: "12pt" }} color="info">
            Thông tin học phí
          </Badge>
          <Row>
            {!this.props.loading ? (
              this.props.dataFee.map((item) => <ItemFee item={item} />)
            ) : (
              <Row>
                {this.state.imageFound.map((item) => (
                  <Col key={item.id} lg="4">
                    <NotNoti />
                  </Col>
                ))}
              </Row>
            )}
          </Row>
          <ReactPaginate
            previousLabel={<ChevronLeft size={15} />}
            nextLabel={<ChevronRight size={15} />}
            breakLabel="..."
            breakClassName="break-me"
            pageCount={this.props.dataBlogTotalPage.total_page_fee}
            containerClassName="vx-pagination separated-pagination pagination-end pagination-sm mb-0 mt-2"
            activeClassName="active"
            // forcePage={
            //   this.props.parsedFilter.page
            //     ? parseInt(this.props.parsedFilter.page - 1)
            //     : 0
            // }
            // onPageChange={(page) => this.handlePagination(page)}
          />
        </Col>
      </Row>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    dataFee: state.dataBlog.dataNotiFee,
    dataActivity: state.dataBlog.dataNotiActivity,
    dataLearning: state.dataBlog.dataNotiLearning,
    dataBlogTotalPage: state.dataBlog,
    loading: state.ui.showLoading,
  };
};
export default connect(mapStateToProps, {
  getDataNotiFee,
  getDataNotiLearning,
  getDataNotiActivity,
})(ListStudy);
