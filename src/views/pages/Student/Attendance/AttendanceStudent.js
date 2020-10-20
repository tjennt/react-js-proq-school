import React from "react";
import { Row, Col } from "reactstrap";
import Breadcrumbs from "./../../../../components/@vuexy/breadCrumbs/BreadCrumb";
import ListAttendanceStudent from "./ListAttendanceStudent";
import queryString from "query-string";
import { connect } from "react-redux";
import { logoutWithJWT } from "./../../../../redux/actions/auth/loginActions";
class AttendanceStudent extends React.Component {
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
          breadCrumbTitle="Sinh viên "
          breadCrumbParent="Thông báo "
          breadCrumbActive="Điểm danh của sinh viên"
        />
        <Row>
          <Col sm="12">
            <ListAttendanceStudent
              thumbView={true}
              parsedFilter={queryString.parse(this.props.location.search)}
            />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default connect(null, { logoutWithJWT })(AttendanceStudent);
