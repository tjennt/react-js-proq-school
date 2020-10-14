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
                  <ListGroupItem>Lớp:Kinh doanh online</ListGroupItem>
                  <ListGroupItem>Giảng viên: Hồng Thiên Tú</ListGroupItem>
                  <ListGroupItem>Ngày bắt đầu : 05/10/2020</ListGroupItem>
                  <ListGroupItem>Ngày kết thúc : 05/10/2020</ListGroupItem>
                  <ListGroupItem>Thứ học :Thứ hai 3 thứ 4</ListGroupItem>
                  <ListGroupItem>Ca học:ca 5</ListGroupItem>
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
