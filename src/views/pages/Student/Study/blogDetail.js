import React from "react";
import { Row, Col, Card, CardBody } from "reactstrap";
import Breadcrumbs from "../../../../components/@vuexy/breadCrumbs/BreadCrumb";
import { getBlogDetail } from "../../../../redux/actions/blog/index";
import { connect } from "react-redux";
import CardHeader from "reactstrap/lib/CardHeader";
import CardTitle from "reactstrap/lib/CardTitle";

class BlogDetail extends React.Component {
  componentDidMount() {
    let id = this.props.match.params.id;
    this.props.getBlogDetail(id);
  }
  createMarkup() {
    const { blogDetail } = this.props
    return { __html: blogDetail ? blogDetail.description : "" }
  }
  render() {
    const { blogDetail } = this.props;
    return (
      <React.Fragment>
        <Breadcrumbs
          breadCrumbTitle="Thông báo"
          breadCrumbParent="Nội dung"
          breadCrumbActive="Chi tiết"
        />
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <CardTitle>
                  <span className="text-primary text-capitalize"> Chủ đề : {blogDetail ? blogDetail.title : ""} </span>
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div dangerouslySetInnerHTML={this.createMarkup()} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </React.Fragment >
    );
  }
}
const mapStateToProps = (state) => {
  return {
    blogDetail: state.dataBlog.blogDetail,
  };
};
export default connect(mapStateToProps, { getBlogDetail })(BlogDetail);
