import React from "react";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
// import avatarImg from "../../../../assets/img/portrait/small/avatar-s-12.jpg"
import ListGroupFlush from "./ListGroupFlush";

class ItemSchedule extends React.Component {
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
              <h4>JAVASCRIPT NÂNG CAO</h4>
              <p>Thông tin chi tiết</p>
              <hr className="my-2" />
              <ListGroupFlush />
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}
export default ItemSchedule;
