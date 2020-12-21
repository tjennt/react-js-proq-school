import React, { Component } from "react";
import { Card, CardBody, CardHeader, Col } from "reactstrap";
import Breadcrumbs from "../../../../components/@vuexy/breadCrumbs/BreadCrumb";
import ManagerItem from "./managerItem";
import { getProfileTeacher } from "../../../../redux/actions/teacher/index";
import { connect } from "react-redux";
import { API_ENDPOINT_IMG_TEACHER } from "../../../../redux/constants";
class ManagerProfileTeacher extends Component {
  componentDidMount() {
    const { getProfileTeacher } = this.props;
    getProfileTeacher();
  }
  render() {
    
    const { dataProfile } = this.props.profile;

    return (
      <div>
        <Breadcrumbs
          breadCrumbTitle="Thông tin "
          breadCrumbParent="Thông tin sinh viên "
          breadCrumbActive="Thông tin  cá nhân"
        />
        <Col sm="8" className="mx-auto">
          <Card>
            <CardHeader className="mx-auto">
              <div className="avatar mr-1 avatar-xl">
                <img
                  src={`/assets/img/default.jpg`}
                  alt="avatarImg"
                />
              </div>
            </CardHeader>
            <CardBody className="text-center">
              <h4> {dataProfile ? dataProfile.fullname : ""} </h4>
              <p className="text-uppercase">
                {" "}
                {dataProfile ? dataProfile.teacherCode : ""}{" "}
              </p>
              <hr className="my-2" />
              <ManagerItem data={dataProfile} />
            </CardBody>
          </Card>
        </Col>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    profile: state.dataTeacher,
  };
};
export default connect(mapStateToProps, { getProfileTeacher })(
  ManagerProfileTeacher
);
