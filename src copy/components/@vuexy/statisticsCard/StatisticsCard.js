import React from "react";
import { Card, CardBody, Row, Col } from "reactstrap";
class StatisticsCards extends React.Component {
  render() {
    return (
      <Card>
        <CardBody>
          <Row>
            <Col className="col-lg-4">
              <div className="icon-section mt-2 text-center">
                <div
                  className={`avatar avatar-stats p-50 m-0 ${
                    this.props.iconBg
                      ? `bg-rgba-${this.props.iconBg}`
                      : "bg-rgba-primary"
                  }`}
                >
                  <div
                    style={{ width: "59px", height: "57px" }}
                    className="avatar-content"
                  >
                    {this.props.icon}
                  </div>
                </div>
              </div>
            </Col>
            <Col className="col-lg-8">
              <div className="title-section">
                <p style={{ fontSize: "15pt" }} className="mb-0 mt-2 ">
                  {this.props.statTitle}
                </p>
                <h2 className="text-bold-600 mt-1 mb-75">{this.props.stat}</h2>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  }
}
export default StatisticsCards;
