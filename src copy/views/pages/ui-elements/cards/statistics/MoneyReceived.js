import React from "react";
import StatisticsCard from "../../../../../components/@vuexy/statisticsCard/StatisticsCard";
import { DollarSign } from "react-feather";
import { MoneyReceived, ordersReceivedSeries } from "./StatisticsData";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { currencyFormat } from "./../../../../../utility/config/index";
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
class MoneyReceivedCard extends React.Component {
  render() {
    const { catbackCommission } = this.props;
    if (typeof catbackCommission !== undefined) {
      var dataTotal = currencyFormat(catbackCommission);
    }
    return (
      <StatisticsCard
        icon={<DollarSign className="danger" size={22} />}
        iconBg="danger"
        stat={
          dataTotal ? (
            dataTotal
          ) : (
            <Spin
              style={{ color: "black" }}
              tip="0 VNĐ. Đang cập nhật..."
              indicator={antIcon}
            />
          )
        }
        statTitle="Tổng hoàn tiền catback"
        options={MoneyReceived}
        series={ordersReceivedSeries}
        type="area"
      />
    );
  }
}

export default MoneyReceivedCard;
