import React from "react";
import { Row, Col } from "reactstrap";
import Breadcrumbs from "../../../../../components/@vuexy/breadCrumbs/BreadCrumb";
import ThumbViewShopConfig from "./ThumbViewShopConfig";
import queryString from "query-string";
import { getToken } from "../../../../../utility/auth/setAuthToken";
import { connect } from "react-redux";
import { logoutWithJWT } from "../../../../../redux/actions/auth/loginActions";
class ThumbViewDataListShop extends React.Component {
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
          breadCrumbTitle=" Cửa hàng "
          breadCrumbParent="Danh sách cửa hàng "
          breadCrumbActive="Chi tiết cửa hàng"
        />
        <Row>
          <Col sm="12">
            <ThumbViewShopConfig
              thumbView={true}
              parsedFilter={queryString.parse(this.props.location.search)}
            />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default connect(null, { logoutWithJWT })(ThumbViewDataListShop);
