import React from "react";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import { API_ENDPOINT } from "../../../../redux/constants/index";
import ListGroupFlush from "./ListGroupFlush";
import { connect } from "react-redux";
class ProfileCards extends React.Component {
  render() {
    const { information } = this.props;
    return (
      <Row>
        <Col sm="12">
          <Card>
            <CardHeader className="mx-auto">
              <div className="avatar mr-1 avatar-xl">
                {information.teacherId.avatar ? (
                  <img
                    src={`${API_ENDPOINT}/${information.teacherId.avatar}`}
                    alt="avatarImg"
                  />
                ) : (
                  ""
                )}
              </div>
            </CardHeader>
            <CardBody className="text-center">
              <h4>{information.teacherId.fullname}</h4>
              <p>{information.access}</p>
              <hr className="my-2" />
              <ListGroupFlush informationDetail={information} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    information: state.auth.login.values.loggedInUser,
  };
};
export default connect(mapStateToProps, null)(ProfileCards);
