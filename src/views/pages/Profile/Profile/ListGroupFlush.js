import React from "react";
import {
  ListGroup,
  ListGroupItem,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  TabContent,
  TabPane,
} from "reactstrap";

class ListGroupFlush extends React.Component {
  render() {
    const { informationDetail } = this.props;
    return (
      <React.Fragment>
        <Card>
          <CardHeader className="justify-content-center">
            <CardTitle> Thông tin chung </CardTitle>
          </CardHeader>
          <CardBody>
            <TabContent activeTab="1">
              <TabPane tabId="1">
                <ListGroup flush className="text-left">
                  <ListGroupItem> {informationDetail.email} </ListGroupItem>
                  <ListGroupItem>
                    {informationDetail.teacherId
                      ? informationDetail.teacherId.phone
                      : ""}
                  </ListGroupItem>
                  <ListGroupItem>
                    {" "}
                    {informationDetail.teacherId.dob}
                  </ListGroupItem>
                  <ListGroupItem>
                    {informationDetail.teacherId
                      ? informationDetail.teacherId.specialization
                      : ""}
                  </ListGroupItem>
                </ListGroup>
              </TabPane>
            </TabContent>
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}
export default ListGroupFlush;
