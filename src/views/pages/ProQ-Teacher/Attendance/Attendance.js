import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import BreadCrumbs from "../../../../components/@vuexy/breadCrumbs/BreadCrumb";
import queryString from "query-string";

import AttendanceClassListText from "./AttendanceClassListText";
class Attendance extends Component {
  render() {
    return (
      <React.Fragment>
        <BreadCrumbs
          breadCrumbTitle="Giáo viên"
          breadCrumbParent="Danh sách"
          breadCrumbActive="Điểm danh "
        />
        <Row>
          <Col sm="12">
            <AttendanceClassListText
              parsedFilter={queryString.parse(this.props.location.search)}
            />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default Attendance;
