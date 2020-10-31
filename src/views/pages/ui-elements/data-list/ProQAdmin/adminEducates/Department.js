import React from "react";
import { Row, Col } from "reactstrap";
import Breadcrumbs from "../../../../../../components/@vuexy/breadCrumbs/BreadCrumb";
<<<<<<< HEAD
import ListDepartmentConfig from "./ListDepartmentConfig";
=======
import ListClassConfig from "./ListClassConfig";
>>>>>>> 598f33b62cb27da0629f936f9e4f8fa7d8f75670
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
<<<<<<< HEAD
          breadCrumbActive="Danh sách phòng đào tạo"
        />
        <Row>
          <Col sm="12">
            <ListDepartmentConfig
=======
          breadCrumbActive="Danh sách phân lớp"
        />
        <Row>
          <Col sm="12">
            <ListClassConfig
>>>>>>> 598f33b62cb27da0629f936f9e4f8fa7d8f75670
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
