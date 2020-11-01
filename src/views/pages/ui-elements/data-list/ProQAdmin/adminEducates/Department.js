import React from "react";
import { Row, Col } from "reactstrap";
import Breadcrumbs from "../../../../../../components/@vuexy/breadCrumbs/BreadCrumb";
import ListDepartmentConfig from "./ListDepartmentConfig";
import queryString from "query-string";
import { connect } from "react-redux";
import { logoutWithJWT } from "../../../../../../redux/actions/auth/loginActions";
class Department extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Breadcrumbs
          breadCrumbTitle="Phòng đào tạo "
          breadCrumbParent="Danh sách"
          breadCrumbActive="Danh sách phòng đào tạo"
        />
        <Row>
          <Col sm="12">
            <ListDepartmentConfig
              thumbView={true}
              parsedFilter={queryString.parse(this.props.location.search)}
            />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default connect(null, { logoutWithJWT })(Department);
