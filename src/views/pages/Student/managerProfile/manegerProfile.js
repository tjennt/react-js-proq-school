import React, { Component } from "react";
import { Card, CardBody, CardHeader, Col } from "reactstrap";
import Breadcrumbs from "../../../../components/@vuexy/breadCrumbs/BreadCrumb";
import ManagerItem from "./managerItem";
import { getDataProfileStudent } from "../../../../redux/actions/student/index";
import { connect } from "react-redux";
import { API_ENDPOINT_IMG } from "../../../../redux/constants";
class ManagerProfile extends Component {
  componentDidMount() {
    const { getDataProfileStudent } = this.props;
    getDataProfileStudent();
  }
  render() {
    const { dataProfile } = this.props.profile;
    console.log(dataProfile);
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
                  src={`${API_ENDPOINT_IMG}/${
                    dataProfile ? dataProfile.studentId.avatar : ""
                  }`}
                  alt="avatarImg"
                />
              </div>
            </CardHeader>
            <CardBody className="text-center">
              <h4> {dataProfile ? dataProfile.studentId.fullName : ""} </h4>
              <p className="text-uppercase">
                {" "}
                {dataProfile ? dataProfile.studentId.studentCode : ""}{" "}
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
    profile: state.scheduleStudent,
  };
};
export default connect(mapStateToProps, { getDataProfileStudent })(
  ManagerProfile
);
