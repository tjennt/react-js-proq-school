import React from "react";
// import { Row, Col } from "reactstrap";
import Breadcrumbs from "../../../../components/@vuexy/breadCrumbs/BreadCrumb";
import AboutCard from "./ListStudy";
class Study extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Breadcrumbs
          breadCrumbTitle="Sinh viên"
          breadCrumbParent="Thông báo"
          breadCrumbActive="Thông báo Sinh viên"
        />
        <AboutCard />
      </React.Fragment>
    );
  }
}

export default Study;
