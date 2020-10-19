import React from "react";
import { Row, Col } from "reactstrap";
import Breadcrumbs from "../../../../../../components/@vuexy/breadCrumbs/BreadCrumb";
import ListAdminTeacherConfig from "./ListAdminTeacherConfig";
import queryString from "query-string";
import { connect } from "react-redux";
import { logoutWithJWT } from "../../../../../../redux/actions/auth/loginActions";
class AdminTeacher extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Breadcrumbs
          breadCrumbTitle="Admin "
          breadCrumbParent="Quản lí tài khoản"
          breadCrumbActive="Danh sách tài khoảng giáo viên"
        />
        <Row>
          <Col sm="12">
            <ListAdminTeacherConfig
              thumbView={true}
              parsedFilter={queryString.parse(this.props.location.search)}
            />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default connect(null, { logoutWithJWT })(AdminTeacher);
