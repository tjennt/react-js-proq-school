import React from "react";
import { MoreHorizontal } from "react-feather";
import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader, CardTitle, Col } from "reactstrap";
import { newDate } from "../../../../utility/config";

const ItemFee = (props) => {
  const { item } = props;
  return (
    <Col lg="3" className="mt-2">
      <Card>
        <CardHeader>
          <CardTitle>{item.title} </CardTitle>
          <MoreHorizontal size={15} className="cursor-pointer" />
        </CardHeader>
        <CardBody>
          {/* <div className="mt-1">
            <h6 className="mb-0">Người đăng: Thế Linh</h6>
          </div> */}
          <div className="mt-1">
            <h6 className="mb-0">{item.place}</h6>
          </div>
          <div className="mt-1">
            <h6 className="mb-0"> Thời gian cập nhật:</h6>
            <p> {newDate(item.updatedAt)} </p>
          </div>
          <div className="mt-1 float-right">
            <Link to={`/student/news/${item._id}`}>Xem thêm</Link>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ItemFee;