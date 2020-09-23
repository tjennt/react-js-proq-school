import React from "react";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
// import avatarImg from "../../../../assets/img/portrait/small/avatar-s-12.jpg"
import ListGroupFlush from "./ListGroupFlush";

class ProfileCards extends React.Component {
  render() {
    return (
      <Row>
        <Col sm="12">
          <Card>
            <CardHeader className="mx-auto">
              <div className="avatar mr-1 avatar-xl">
                {/* <img src={avatarImg} alt="avatarImg" /> */}
              </div>
            </CardHeader>
            <CardBody className="text-center">
              <h4>Zoila Legore</h4>
              <p>Backend Dev</p>
              <hr className="my-2" />
              <ListGroupFlush />
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}
export default ProfileCards;
