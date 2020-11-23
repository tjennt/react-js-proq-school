import React from "react";
import { Row, Col } from "reactstrap";
import Breadcrumbs from "./../../../../components/@vuexy/breadCrumbs/BreadCrumb";
import ListSchedulesDate from "./ListSchedulesDate";
import queryString from "query-string";
// import { getToken } from "./../../../../utility/auth/setAuthToken";
import { connect } from "react-redux";
import { logoutWithJWT } from "./../../../../redux/actions/auth/loginActions";
class ScheduleStudentByDate extends React.Component {
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
          breadCrumbActive="Lịch học của sinh viên theo ngày"
        />
        <Row>
          <Col sm="12">
            <ListSchedulesDate
              thumbView={true}
              parsedFilter={queryString.parse(this.props.location.search)}
            />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default connect(null, { logoutWithJWT })(ScheduleStudentByDate);
