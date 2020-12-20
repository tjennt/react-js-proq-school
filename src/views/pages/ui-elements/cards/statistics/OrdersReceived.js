import React from "react";
import StatisticsCard from "../../../../../components/@vuexy/statisticsCard/StatisticsCard";
import { User } from "react-feather";
import { ordersReceived, ordersReceivedSeries } from "./StatisticsData";

class OrdersReceived extends React.Component {
  render() {
    const { dataPubCommission } = this.props;
    return (
      <StatisticsCard
        icon={<User className="success" size={22} />}
        iconBg="success"
        stat={dataPubCommission ? dataPubCommission : 0}
        statTitle="Giảng viên"
        options={ordersReceived}
        series={ordersReceivedSeries}
        type="area"
      />
    );
  }
}

export default OrdersReceived;
