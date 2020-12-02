import React from "react";
import { Row, Col, Container } from "reactstrap";
import Breadcrumbs from "../../../../components/@vuexy/breadCrumbs/BreadCrumb";
import { getBlogDetail } from "../../../../redux/actions/blog/index";
import { connect } from "react-redux";
import createDOMPurify from "dompurify";
import { JSDOM } from "jsdom";

const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);
class BlogDetail extends React.Component {
  componentDidMount() {
    let id = this.props.match.params.id;
    this.props.getBlogDetail(id);
  }
  render() {
    const { blogDetail } = this.props;
    const rawHTML = `${blogDetail ? blogDetail.description : ""}`;
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
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(rawHTML),
                  }}
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
