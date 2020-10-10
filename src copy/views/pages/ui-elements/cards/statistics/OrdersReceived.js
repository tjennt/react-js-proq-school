import React from "react";
import StatisticsCard from "../../../../../components/@vuexy/statisticsCard/StatisticsCard";
import { DollarSign } from "react-feather";
import { ordersReceived } from "./StatisticsData";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { currencyFormat } from "./../../../../../utility/config/index";
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

class OrdersReceived extends React.Component {
  render() {
    const { dataPubCommission } = this.props;
    if (typeof dataPubCommission !== undefined) {
      var dataResult = parseInt(dataPubCommission);
      var dataTotal = currencyFormat(dataResult);
    }
    return (
      <StatisticsCard
        icon={<DollarSign className="success" size={22} />}
        iconBg="success"
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
        statTitle="Doanh thu"
        options={ordersReceived}
        type="area"
      />
    );
  }
}

export default OrdersReceived;
