import React from "react";
import StatisticsCard from "../../../../../components/@vuexy/statisticsCard/StatisticsCard";
import { User } from "react-feather";
import { ordersReceived, ordersReceivedSeries } from "./StatisticsData";

class OrdersReceived extends React.Component {
  render() {
    return (
      <StatisticsCard
        icon={<User className="success" size={22} />}
        iconBg="success"
        stat="1000"
        statTitle="Giảng viên"
        options={ordersReceived}
        series={ordersReceivedSeries}
        type="area"
      />
    );
  }
}

export default OrdersReceived;
