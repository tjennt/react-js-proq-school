import React from "react";
import { Row, Col } from "reactstrap";
import Breadcrumbs from "../../../../../components/@vuexy/breadCrumbs/BreadCrumb";
import DataListTransactionConfig from "./DataListTransactionConfig";
import queryString from "query-string";
import { getToken } from "../../../../../utility/auth/setAuthToken";
import { connect } from "react-redux";
import { logoutWithJWT } from "../../../../../redux/actions/auth/loginActions";
class ListViewSale extends React.Component {
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
          breadCrumbTitle="Yêu cầu rút tiền"
          breadCrumbParent="Dữ liệu rút tiền"
          breadCrumbActive="Yêu cầu rút tiền"
        />
        <Row>
          <Col sm="12">
            <DataListTransactionConfig
              parsedFilter={queryString.parse(this.props.location.search)}
            />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default connect(null, { logoutWithJWT })(ListViewSale);
