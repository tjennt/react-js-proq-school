import React from "react";
import StatisticsCard from "../../../../../components/@vuexy/statisticsCard/StatisticsCard";
import { Package } from "react-feather";
import { totalProDuct } from "./StatisticsData";

import { connect } from "react-redux";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { currencyFormat } from "./../../../../../utility/config/index";
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
class TotalProduct extends React.Component {
  render() {
    const { dataTotalProduct } = this.props;
    if (!typeof dataTotalProduct !== undefined) {
      var dataResult = parseInt(dataTotalProduct);
      var dataTotal = currencyFormat(dataResult);
    }
    return (
      <StatisticsCard
        icon={<Package className="warning" size={22} />}
        stat={
          dataTotal ? (
            dataTotal
          ) : (
            <Spin
              style={{ color: "black" }}
              tip="0 VNĐ.Đang cập nhật"
              indicator={antIcon}
            />
          )
        }
        statTitle="Tổng giá trị hàng"
        options={totalProDuct}
        type="area"
      />
    );
  }
}
const mapStateToProps = (state) => {
  return {
    dataTotalproduct: state.dataDashBoard.dataTotalProduct,
    staticTotalProduct: state.dataDashBoard.staticTotalProduct,
  };
};

export default connect(mapStateToProps, null)(TotalProduct);
