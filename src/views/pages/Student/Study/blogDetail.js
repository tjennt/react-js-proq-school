import React from "react";
import { Row, Col, Container } from "reactstrap";
import Breadcrumbs from "../../../../components/@vuexy/breadCrumbs/BreadCrumb";
import { getBlogDetail } from "../../../../redux/actions/blog/index";
import { connect } from "react-redux";

class BlogDetail extends React.Component {
  componentDidMount() {
    let id = this.props.match.params.id;
    this.props.getBlogDetail(id);
  }
  createMarkup(){
    const {blogDetail} = this.props
    return{__html:blogDetail ? blogDetail.description : ""}
  }
  render() {
    const { blogDetail } = this.props;
    return (
      <React.Fragment>
        <Breadcrumbs
          breadCrumbTitle="Thông báo  "
          breadCrumbParent="Nội dung"
          breadCrumbActive={blogDetail ? blogDetail.title : ""}
        />
        <Row>
          <Col sm="12">
            <Container>
              {" "}
              {
                <div
                  dangerouslySetInnerHTML={this.createMarkup()}
                />
              }
            </Container>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    blogDetail: state.dataBlog.blogDetail,
  };
};
export default connect(mapStateToProps, { getBlogDetail })(BlogDetail);
