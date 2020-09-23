import React from "react";
import { Row, Col } from "reactstrap";
import Breadcrumbs from "../../../../../components/@vuexy/breadCrumbs/BreadCrumb";
import ThumbViewAdminConfig from "./ThumbViewAdminConfig";
import queryString from "query-string";
import { getToken } from "../../../../../utility/auth/setAuthToken";
import { connect } from "react-redux";
import { logoutWithJWT } from "../../../../../redux/actions/auth/loginActions";
class ThumbViewDataListAdmin extends React.Component {
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
          breadCrumbTitle="Tài khoản admin"
          breadCrumbParent="Dữ liệu admin"
          breadCrumbActive="Danh sách admin "
        />
        <Row>
          <Col sm="12">
            <ThumbViewAdminConfig
              thumbView={true}
              parsedFilter={queryString.parse(this.props.location.search)}
            />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default connect(null, { logoutWithJWT })(ThumbViewDataListAdmin);
