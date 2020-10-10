import React from "react";
import { Row, Col } from "reactstrap";
import SuberscribersGained from "../../pages/ui-elements/cards/statistics/SubscriberGained";
import TotalProduct from "../../pages/ui-elements/cards/statistics/TotalProduct";
import OrdersReceived from "../../pages/ui-elements/cards/statistics/OrdersReceived";
import MoneyReceivedCard from "../../pages/ui-elements/cards/statistics/MoneyReceived";
import "../../../assets/scss/pages/dashboard-analytics.scss";
import { DatePicker, Space } from "antd";
import { Button } from "antd";
import moment from "moment";
import "../../../assets/scss/plugins/extensions/recharts.scss";
import "../../../assets/scss/plugins/charts/apex-charts.scss";
import { connect } from "react-redux";
import {
  getDataTotalProduct,
  getDataTotaMony,
  getDataTotalUser,
  getDataDashboard,
  getDataTotalUserLogin,
} from "./../../../redux/actions/dataListDashboard/index";
import MoneyReceivedUser from "../../pages/ui-elements/cards/statistics/MoneyReceivedUser";
import SimpleLineChartMoneyReceived from "../../charts/recharts/SimpleLineChartMoneyReceived";
import SimpleLineChartjs from "../../charts/recharts/SimpleLineChartjs";
import ApexPieCharts from "../../charts/apex/ApexPieChart";
import SimpleAreaChart from "../../charts/recharts/SimpleAreaChart";
import { getToken } from "../../../utility/auth/setAuthToken";
import { logoutWithJWT } from "../../../redux/actions/auth/loginActions";
const { RangePicker } = DatePicker;
let $primary = "#7367F0",
  $success = "#28C76F",
  $danger = "#EA5455",
  $warning = "#FF9F43",
  $info = "#00cfe8";
let themeColors = [$primary, $success, $danger, $warning, $info];
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
    // if (!token) {
    //   logoutWithJWT();
    // } else {
    getDataDashboard();
    getDataTotalProduct();
    getDataTotaMony();
    getDataTotalUser();
    getDataTotalUserLogin();
    // }
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
                  type="primary"
                  loading={loadings[0]}
                  onClick={() => this.enterLoading(0)}
                >
                  Tìm kiếm
                </Button>
              </Col>
            </Row>
          </Col>
          <Col lg="4" md="6" sm="12">
            <TotalProduct dataTotalProduct={this.props.dataTotalBilling} />
          </Col>
          <Col lg="4" md="6" sm="12">
            <SuberscribersGained dataUser={this.props.dataTotalUser} />
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
        <Row>
          <Col lg="5">
            <ApexPieCharts
              TotalUserLogin={this.props.staticTotalUserLogin}
              themeColors={themeColors}
            />
          </Col>
          <Col lg="7">
            <SimpleAreaChart
              totalUser={this.props.staticTotalUser}
              primary={$primary}
              danger={$danger}
              success={$success}
            />
          </Col>
          <Col lg="12">
            <SimpleLineChartMoneyReceived
              totalMoney={this.props.staticTotalMoney}
              primary={$primary}
              danger={$danger}
              success={$success}
            />
          </Col>
          <Col lg="12">
            <SimpleLineChartjs
              staticProduct={this.props.staticTotalProduct}
              primary={$primary}
              success={$success}
            />
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
    staticTotalProduct: state.dataDashBoard.staticTotalProduct,
    staticTotalMoney: state.dataDashBoard.staticTotalMoney,
    staticTotalUser: state.dataDashBoard.staticTotalUser,
    staticTotalUserLogin: state.dataDashBoard.staticTotalUserLogin,
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
