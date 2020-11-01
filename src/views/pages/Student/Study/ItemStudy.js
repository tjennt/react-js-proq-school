import React from "react";
import { MoreHorizontal } from "react-feather";
import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader, CardTitle, Col } from "reactstrap";

const ItemStudy = () => {
  return (
    <Col lg="3" className="mt-2">
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <MoreHorizontal size={15} className="cursor-pointer" />
        </CardHeader>
        <CardBody>
          <p>
            CS1_ĐIỂM THI LẠI CÁC MÔN ENT1125, ENT1225,ENT2125, COM107,
            VIE1016,VIE1026,BUS1024 _ ĐỢT THI: 15/10/2020
          </p>
          {/* <div className="mt-1">
            <h6 className="mb-0">Người đăng: Thế Linh</h6>
          </div> */}
          <div className="mt-1">
            <h6 className="mb-0">Cơ sở : Cơ sở 3</h6>
          </div>
          <div className="mt-1">
            <h6 className="mb-0"> Thời gian cập nhật:</h6>
            <p>09:33:42 ngày 18/10/2020</p>
          </div>
          <div className="mt-1 float-right">
            <Link to={`/student/news/${23}`}>Xem thêm</Link>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ItemStudy;
