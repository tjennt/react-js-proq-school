import React from "react";
import { Row, Col } from "reactstrap";
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb";
import ProfileCards from "./Profile/ProfileCards";
class Profile extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Breadcrumbs
          breadCrumbTitle="Thông tin "
          breadCrumbParent="Tài khoản cá nhân"
          breadCrumbActive="Thông tin cá nhân"
        />
        <Row id="search-website">
          <Col
            className="mx-auto"
            lg={{ size: 4, order: 2 }}
            md={{ size: 12, order: 1 }}
            sm={{ size: 12, order: 1 }}
            xs={{ size: 12, order: 1 }}
          >
            <ProfileCards />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default Profile;
