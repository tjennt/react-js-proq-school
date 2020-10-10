import React from "react";
import { Row, Col } from "reactstrap";
import Breadcrumbs from "../../../../../../components/@vuexy/breadCrumbs/BreadCrumb";
import ListTSubjectConfig from "./ListTSubjectConfig";
import queryString from "query-string";
import { getToken } from "../../../../../../utility/auth/setAuthToken";
import { connect } from "react-redux";
import { logoutWithJWT } from "../../../../../../redux/actions/auth/loginActions";
class subject extends React.Component {
  // componentDidMount() {
  //   let token = getToken();
  //   if (!token) {
  //     this.props.logoutWithJWT();
  //     return false;
  //   }
  // }
  render() {
    return (
      <React.Fragment>
        <Breadcrumbs
          breadCrumbTitle="Phòng công tác "
          breadCrumbParent="Danh sách"
          breadCrumbActive="Danh sách giảng viên"
        />
        <Row>
          <Col sm="12">
            <ListTSubjectConfig
              thumbView={true}
              parsedFilter={queryString.parse(this.props.location.search)}
            />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default connect(null, { logoutWithJWT })(subject);
