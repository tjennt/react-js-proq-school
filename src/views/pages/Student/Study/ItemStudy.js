import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader, CardTitle, Col } from "reactstrap";
import { newDate } from "../../../../utility/config";

const ItemStudy = (props) => {
  const { item } = props;
  const limitTitle = 200;
  let title = item.title;
  if (title.length < limitTitle) {
    title = title.slice(0, title.length)
  }
  if (title.length > limitTitle) {
    title = title.slice(0, limitTitle);
    title = title.slice(0, title.lastIndexOf(" "))
    title = title+ " ..."
  }
  return (
    <Col lg="4" className="mt-2">
      <Card style={{ minHeight: "200px", height: '100%' }}>
        <CardHeader>
          <CardTitle className="text-uppercase" style={{ width: "270px" }}>
            <Link to={`/student/news/${item._id}`}>{title} </Link>
          </CardTitle>
          {/* <MoreHorizontal size={15} className="cursor-pointer" /> */}
        </CardHeader>
        <CardBody className="d-flex flex-column justify-content-end">
          {/* <div className="mt-1">
            <h6 className="mb-0">Người đăng: Thế Linh</h6>
          </div> */}
          <div className="mt-1">
            <h6 className="mb-0">Cơ sở : {item.place}</h6>
          </div>
          <div className="mt-1 d-flex">
            <h6 className="mr-2"> Thời gian cập nhật:</h6>
            <span> {newDate(item.updatedAt)} </span>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ItemStudy;
