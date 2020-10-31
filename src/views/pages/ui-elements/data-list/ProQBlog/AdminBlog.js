import React from "react";
import { Row, Col } from "reactstrap";
import Breadcrumbs from "../../../../../components/@vuexy/breadCrumbs/BreadCrumb";
import ListAdminBlogConfig from "./ListAdminBlogConfig";
import queryString from "query-string";
import { connect } from "react-redux";
import { logoutWithJWT } from "../../../../../redux/actions/auth/loginActions";
class AdminBlog extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Breadcrumbs
          breadCrumbTitle="Admin "
          breadCrumbParent="Quản lí bài viết"
          breadCrumbActive="Danh sách bài viết"
        />
        <Row>
          <Col sm="12">
            <ListAdminBlogConfig
              thumbView={true}
              parsedFilter={queryString.parse(this.props.location.search)}
            />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default connect(null, { logoutWithJWT })(AdminBlog);
