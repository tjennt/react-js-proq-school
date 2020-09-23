import React from "react";
import { Row, Col } from "reactstrap";
import Breadcrumbs from "../../../../../components/@vuexy/breadCrumbs/BreadCrumb";
import ThumbViewHotDealConfig from "./ThumbViewHotDealConfig";
import queryString from "query-string";
import { getToken } from "../../../../../utility/auth/setAuthToken";
import { connect } from "react-redux";
import { logoutWithJWT } from "../../../../../redux/actions/auth/loginActions";
class ThumbViewHotDeal extends React.Component {
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
          breadCrumbTitle="Hot deal "
          breadCrumbParent="Dữ liệu hot deal"
          breadCrumbActive="Danh sách "
        />
        <Row>
          <Col sm="12">
            <ThumbViewHotDealConfig
              thumbView={true}
              parsedFilter={queryString.parse(this.props.location.search)}
            />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default connect(null, { logoutWithJWT })(ThumbViewHotDeal);
