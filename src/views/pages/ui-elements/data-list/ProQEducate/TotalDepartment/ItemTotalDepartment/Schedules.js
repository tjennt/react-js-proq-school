import React from "react";
import { Row, Col } from "reactstrap";
import Breadcrumbs from "../../../../../../../components/@vuexy/breadCrumbs/BreadCrumb";
import ListDataSchedule from "./ListDataSchedule";
import "../../../../../../../assets/scss/pages/search.scss";
import ItemSchedule from "./Schedule/itemSchedule";

// import "../../../assets/scss/pages/search.scss";
class Schedules extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Breadcrumbs
          breadCrumbTitle=" Phòng Đào tạo"
          breadCrumbParent="Danh sách"
          breadCrumbActive="Danh sách chi tiết lịch học"
        />
        <Row id="search-website">
          <Col
            lg={{ size: 8, order: 1 }}
            md={{ size: 12, order: 2 }}
            sm={{ size: 12, order: 2 }}
            xs={{ size: 12, order: 2 }}
          >
            <ListDataSchedule />
          </Col>
          <Col
            lg={{ size: 4, order: 2 }}
            md={{ size: 12, order: 1 }}
            sm={{ size: 12, order: 1 }}
            xs={{ size: 12, order: 1 }}
          >
            <ItemSchedule />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default Schedules;
