import React from "react";
import { Row, Col, Button } from "reactstrap";
import OrdersReceived from "../../pages/ui-elements/cards/statistics/OrdersReceived";
import MoneyReceivedCard from "../../pages/ui-elements/cards/statistics/MoneyReceived";
import "../../../assets/scss/pages/dashboard-analytics.scss";
import { DatePicker, Space } from "antd";
import moment from "moment";
import "../../../assets/scss/plugins/extensions/recharts.scss";
import "../../../assets/scss/plugins/charts/apex-charts.scss";
import { connect } from "react-redux";
import "antd/dist/antd.css";
import CustomersChart from "./Customers";
import {
  getDataTotalProduct,
  getDataTotaMony,
  getDataTotalUser,
  getDataDashboard,
  getDataTotalUserLogin,
} from "./../../../redux/actions/dataListDashboard/index";
import MoneyReceivedUser from "../../pages/ui-elements/cards/statistics/MoneyReceivedUser";
import { getToken } from "../../../utility/auth/setAuthToken";
import TableTotal from "./Table";
import { logoutWithJWT } from "../../../redux/actions/auth/loginActions";
import Revenue from "./Revenue";
import { history } from "../../../history";
const { RangePicker } = DatePicker;
let $primary = "#7367F0",
  $danger = "#EA5455",
  $warning = "#FF9F43",
  $primary_light = "#9c8cfc",
  $warning_light = "#FFC085",
  $danger_light = "#f29292",
  $stroke_color = "#b9c3cd",
  $label_color = "#e7eef7";
class AnalyticsDashboard extends React.Component {
  state = {
    visible: false,
    confirmLoading: false,
    loadings: [],
    dateStart: null,
    dateEnd: null,
  };
  enterLoading = (index) => {
    const {
      getDataDashboard,
      getDataTotalProduct,
      getDataTotaMony,
      getDataTotalUser,
      getDataTotalUserLogin,
    } = this.props;
    const { dateStart, dateEnd } = this.state;
    getDataDashboard(dateStart, dateEnd);
    getDataTotalProduct(dateStart, dateEnd);
    getDataTotaMony(dateStart, dateEnd);
    getDataTotalUser(dateStart, dateEnd);
    getDataTotalUserLogin(dateStart, dateEnd);
  };
  componentDidMount() {
    let token = getToken();
    const {
      logoutWithJWT,
      getDataDashboard,
      getDataTotalProduct,
      getDataTotaMony,
      getDataTotalUser,
      getDataTotalUserLogin,
    } = this.props;
    if (!token) {
      logoutWithJWT();
    } else {
      getDataDashboard();
      getDataTotalProduct();
      getDataTotaMony();
      getDataTotalUser();
      getDataTotalUserLogin();
    }
  }
  onChangeValue = (dates, dateStrings) => {
    this.setState({
      ...this.state,
      dateStart: dateStrings[0],
      dateEnd: dateStrings[1],
    });
  };
  render() {
    const { loadings } = this.state;
    return (
      <React.Fragment>
        <Row className="match-height">
          <Col lg="12" md="6" sm="12" className="mb-2">
            <Row>
              <Col lg="3" md="6" sm="12">
                <Space direction="vertical" size={12}>
                  <RangePicker
                    ranges={{
                      Ngày: [moment().startOf("days"), moment().endOf("days")],
                      Tuần: [moment().startOf("week"), moment().endOf("week")],
                      Tháng: [
                        moment().startOf("month"),
                        moment().endOf("month"),
                      ],
                      Quý: [
                        moment().startOf("quarter"),
                        moment().endOf("quarter"),
                      ],
                      Năm: [moment().startOf("year"), moment().endOf("year")],
                    }}
                    onChange={this.onChangeValue}
                  />
                </Space>
              </Col>
              <Col lg="4" md="6" sm="12">
                <Button
                  color="primary"
                  loading={loadings[0]}
                  onClick={() => this.enterLoading(0)}
                >
                  Tìm kiếm
                </Button>
              </Col>
            </Row>
          </Col>
          <Col lg="4" md="6" sm="12">
            <OrdersReceived
              dataPubCommission={this.props.dataTotalPubCommission}
            />
          </Col>
          <Col lg="4" md="6" sm="12">
            <MoneyReceivedCard
              catbackCommission={this.props.catback_commission}
            />
          </Col>
          <Col lg="4" md="6" sm="12">
            <MoneyReceivedUser UserCommission={this.props.user_commission} />
          </Col>
        </Row>
        <Row className="match-height">
          <Col lg="5">
            <CustomersChart
              primary={$primary}
              warning={$warning}
              danger={$danger}
              primaryLight={$primary_light}
              warningLight={$warning_light}
              dangerLight={$danger_light}
            />
          </Col>
          <Col lg="7">
            <Revenue
              primary={$primary}
              dangerLight={$danger_light}
              strokeColor={$stroke_color}
              labelColor={$label_color}
            />
          </Col>
          <Col>
            <TableTotal />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}
const mapStateToProp = (state) => {
  return {
    title: state.modalReducer.title,
    modal: state.modalReducer.modal,
    dataTotalBilling: state.dataDashBoard.dataDashboard.total_billing,
    dataTotalUser: state.dataDashBoard.dataDashboard.total_user,
    dataTotalPubCommission:
      state.dataDashBoard.dataDashboard.total_pub_commission,
    catback_commission: state.dataDashBoard.dataDashboard.catback_commission,
    user_commission: state.dataDashBoard.dataDashboard.user_commission,
    staticTotalUser: state.dataDashBoard.staticTotalUser,
    staticTotalUserLogin: state.dataDashBoard.staticTotalUserLogin,
    role: state.auth.login.userRole,
  };
};
export default connect(mapStateToProp, {
  getDataTotalProduct,
  getDataTotaMony,
  getDataDashboard,
  getDataTotalUserLogin,
  getDataTotalUser,
  logoutWithJWT,
})(AnalyticsDashboard);
