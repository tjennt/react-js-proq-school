import React from "react";
import { Row, Col } from "reactstrap";
import Breadcrumbs from "../../../../../../components/@vuexy/breadCrumbs/BreadCrumb";
import ListClassConfig from "./ListClassConfig";
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
          breadCrumbActive="Danh sách phân lớp"
        />
        <Row>
          <Col sm="12">
            <ListClassConfig
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
