import React from "react";
import { Row, Col } from "reactstrap";
import Breadcrumbs from "../../../../../../components/@vuexy/breadCrumbs/BreadCrumb";
import ListStageEducation from "./ListStageEducation";
import queryString from "query-string";
// import { getToken } from "../../../../../../utility/auth/setAuthToken";
import { connect } from "react-redux";
import { logoutWithJWT } from "../../../../../../redux/actions/auth/loginActions";
class StageEducation extends React.Component {
  // componentDidMount() {
  //   let token = getToken();
  //   if (!token) {
  //     this.props.logoutWithJWT();
  //     return false;
  //   }
  // }
  render() {
    return (
      <React.Fragment>
        <Breadcrumbs
          breadCrumbTitle="Phòng đào tạo "
          breadCrumbParent="Danh sách"
          breadCrumbActive="Danh sách khóa học"
        />
        <Row>
          <Col sm="12">
            <ListStageEducation
              thumbView={true}
              parsedFilter={queryString.parse(this.props.location.search)}
            />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default connect(null, { logoutWithJWT })(StageEducation);
