import React from "react"
import {
  ListGroup,
  ListGroupItem,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  TabContent,
  TabPane,
} from "reactstrap"
 
class ListGroupFlush extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Card>
          <CardHeader className="justify-content-center">
            <CardTitle > Thông tin chung  </CardTitle>
          </CardHeader>
          <CardBody>
            <TabContent activeTab="1">
              <TabPane tabId="1">
                <ListGroup flush className="text-left">
                  <ListGroupItem>Cras justo odio</ListGroupItem>
                  <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
                  <ListGroupItem>Morbi leo risus</ListGroupItem>
                  <ListGroupItem>Porta ac consectetur ac</ListGroupItem>
                  <ListGroupItem>
                    consectetur adipisicing elit. Veniam, nulla.
                  </ListGroupItem>
                  <ListGroupItem>Vestibulum at eros</ListGroupItem>
                  <ListGroupItem>
                    Lorem ipsum Quibusdam, voluptas.
                  </ListGroupItem>
                </ListGroup>
              </TabPane>
            </TabContent>
          </CardBody>
        </Card>
      </React.Fragment>
    )
  }
}
export default ListGroupFlush
