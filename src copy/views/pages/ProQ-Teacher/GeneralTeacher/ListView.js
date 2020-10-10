import React from "react";
import { Row, Col } from "reactstrap";
import { Route, Switch } from "react-router-dom";

import Breadcrumbs from "../../../../components/@vuexy/breadCrumbs/BreadCrumb";
import ListClass from "./ListClass";
import ListStudentClass from "./ListStudentClass";

export const ListClassRoute = (props) => {
  const { view } = props;
  const result =
    view === "classList" ? (
      <React.Fragment>
        <Breadcrumbs
          breadCrumbTitle="Trang Giảng viên"
          breadCrumbParent="Trang Giảng viên"
          breadCrumbActive="Danh sách lớp dạy"
        />
        <Row>
          <Col sm="12">
            <ListClass {...props} />
          </Col>
        </Row>
      </React.Fragment>
    ) : (
      <React.Fragment>
        <Breadcrumbs
          breadCrumbTitle="Danh sách Sinh viên"
          breadCrumbParent="Trang Giảng viên"
          breadCrumbParent2="Danh sách lớp dạy"
          breadCrumbActive={props.match.params.id}
        />
        <Row>
          <Col sm="12">
            <ListStudentClass {...props} />
          </Col>
        </Row>
      </React.Fragment>
    );

  return result;
};

class ListView extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route
            path="/teacher/listClass/:id"
            render={() => (
              <ListClassRoute view="studentClassList" {...this.props} />
            )}
          />
          <Route
            exact
            path="/teacher/listClass"
            render={() => <ListClassRoute view="classList" {...this.props} />}
          />
        </Switch>
      </React.Fragment>
    );
  }
}

export default ListView;
