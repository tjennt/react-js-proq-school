import React, { lazy } from "react";
import { Row, Col } from "reactstrap";
import BreadCrumbs from "../../../../components/@vuexy/breadCrumbs/BreadCrumb";

import { Route, Switch } from "react-router-dom";
 
const AttendanceClassTableRoute = lazy(() => import("./AttendanceClassList"));
const AttendanceClassRoute = lazy(() => import("./AttendanceClass/AttendanceClass"));

const Attendance = () => { 
  return (
    <React.Fragment>
      <BreadCrumbs
        breadCrumbTitle="Attendance"
        breadCrumbParent="GeneralTeacher"
        breadCrumbActive="Attendance"
      />
      <Row>
        <Col sm="12">
          <Switch>
            <Route path="/teacher/attendance/:id" component={AttendanceClassRoute} />
            <Route path="/teacher/attendance" component={AttendanceClassTableRoute} />
          </Switch>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Attendance;
