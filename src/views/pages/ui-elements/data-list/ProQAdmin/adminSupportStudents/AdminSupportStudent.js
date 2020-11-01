import React from "react";
import { Row, Col } from "reactstrap";
import Breadcrumbs from "../../../../../../components/@vuexy/breadCrumbs/BreadCrumb";
import ListAdminSupportConfig from "./ListAdminSupportConfig";
import queryString from "query-string";
import { connect } from "react-redux";
import { logoutWithJWT } from "../../../../../../redux/actions/auth/loginActions";
class AdminSupportStudent extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Breadcrumbs
          breadCrumbTitle="Admin "
          breadCrumbParent="Quản lí tài khoản"
          breadCrumbActive="Danh sách tài khoản công tác sinh viên"
        />
        <Row>
          <Col sm="12">
            <ListAdminSupportConfig
              thumbView={true}
              parsedFilter={queryString.parse(this.props.location.search)}
            />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default connect(null, { logoutWithJWT })(AdminSupportStudent);
