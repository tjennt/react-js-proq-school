import React from "react";
import { Row, Col } from "reactstrap";
import OrdersReceived from "../../pages/ui-elements/cards/statistics/OrdersReceived";
import MoneyReceivedCard from "../../pages/ui-elements/cards/statistics/MoneyReceived";
import "../../../assets/scss/pages/dashboard-analytics.scss";

import "../../../assets/scss/plugins/extensions/recharts.scss";
import "../../../assets/scss/plugins/charts/apex-charts.scss";
import { connect } from "react-redux";
import "antd/dist/antd.css";
// import CommentStudent from "./Comment";
import CustomersChart from "./Customers";
import {
  getDataTotalProduct,
  getDataTotaMony,
  getDataTotalUser,
  getDataDashboard,
  getDataTotalUserLogin,
} from "./../../../redux/actions/dataListDashboard/index";
import { getToken } from "../../../utility/auth/setAuthToken";
// import TableTotal from "./Table";
import { logoutWithJWT } from "../../../redux/actions/auth/loginActions";
import Revenue from "./Revenue";
import MoneyReceivedUser2 from "../../pages/ui-elements/cards/statistics/MoneyReceivedUser2";
import MoneyReceivedUser3 from "../../pages/ui-elements/cards/statistics/MoneyReceivedUser3";
let $danger_light = "#f29292",
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
    return (
      <React.Fragment>
        <Row className="match-height">
          <Col lg="3" md="6" sm="12">
            <MoneyReceivedUser2 UserCommission={this.props.user_commission} />
          </Col>
          <Col lg="3" md="6" sm="12">
            <OrdersReceived
              dataPubCommission={this.props.dataTotalPubCommission}
            />
          </Col>
          <Col lg="3" md="6" sm="12">
            <MoneyReceivedCard
              catbackCommission={this.props.catback_commission}
            />
          </Col>

          <Col lg="3" md="6" sm="12">
            <MoneyReceivedUser3 subject={this.props.subject} />
          </Col>
        </Row>
        <Row className="match-height">
          <Col lg="5">
            <CustomersChart
              totalSubjectFail={this.props.totalSubjectFail}
              color1="#2892fd"
              color2="#5ad092"
              color3="#ff6535"
              colorLight1="#d8ebff"
              colorLight2="#e1f7eb"
              colorLight3="#ffa68a"
            />
          </Col>
          <Col lg="7">
            <Revenue
              primary="#ff6535"
              dangerLight={$danger_light}
              strokeColor={$stroke_color}
              labelColor={$label_color}
            />
          </Col>
          {/* <Col lg="12">
            <TableTotal />
          </Col>
          <Col lg="12" className="mt-4">
            <CommentStudent />
          </Col> */}
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
    dataTotalPubCommission: state.dataDashBoard.dataDashboard.teacher,
    catback_commission: state.dataDashBoard.dataDashboard.class,
    user_commission: state.dataDashBoard.dataDashboard.student,
    subject: state.dataDashBoard.dataDashboard.subject,
    totalSubjectFail: state.dataDashBoard.dataDashboard.absence,
    // staticTotalUser: state.dataDashBoard.staticTotalUser,
    // staticTotalUserLogin: state.dataDashBoard.staticTotalUserLogin,
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
