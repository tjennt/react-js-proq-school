import React from "react";
import { Row, Col } from "reactstrap";
import Breadcrumbs from "../../../../../components/@vuexy/breadCrumbs/BreadCrumb";
import DataListReportOrderConfig from "./DataListReportDebtConfig";
import queryString from "query-string";
import { getToken } from "../../../../../utility/auth/setAuthToken";
import { connect } from "react-redux";
import { logoutWithJWT } from "../../../../../redux/actions/auth/loginActions";
class ListViewReporDebt extends React.Component {
  componentDidMount() {
    let token = getToken();
    if (!token) {
      this.props.logoutWithJWT();
      return false;
    }
  }
  render() {
    return (
      <React.Fragment>
        <Breadcrumbs
          breadCrumbTitle="Báo cáo "
          breadCrumbParent="Báo cáo chi tiết"
          breadCrumbActive="Báo cáo công nợ với AC "
        />
        <Row>
          <Col sm="12">
            <DataListReportOrderConfig
              parsedFilter={queryString.parse(this.props.location.search)}
            />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default connect(null, { logoutWithJWT })(ListViewReporDebt);
