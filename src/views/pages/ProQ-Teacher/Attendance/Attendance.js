import React, { lazy } from "react";
import { Row, Col } from "reactstrap";
import BreadCrumbs from "../../../../components/@vuexy/breadCrumbs/BreadCrumb";

import { Route, Switch } from "react-router-dom";

const AttendanceClassTableRoute = lazy(() =>
  import("./AttendanceClassListText")
);
const AttendanceClassRoute = lazy(() =>
  import("./AttendanceClass/AttendanceClass")
);

const Attendance = () => {
  return (
    <React.Fragment>
      <BreadCrumbs
        breadCrumbTitle="Giáo viên"
        breadCrumbParent="Danh sách"
        breadCrumbActive="Điểm danh "
      />
      <Row>
        <Col sm="12">
          <Switch>
            <Route
              path="/teacher/attendance/:id"
              component={AttendanceClassRoute}
            />
            <Route
              path="/teacher/attendance"
              component={AttendanceClassTableRoute}
            />
          </Switch>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Attendance;
