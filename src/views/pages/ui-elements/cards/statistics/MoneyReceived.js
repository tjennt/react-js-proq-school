import React from "react";
import StatisticsCard from "../../../../../components/@vuexy/statisticsCard/StatisticsCard";
import { User } from "react-feather";
import { MoneyReceived, ordersReceivedSeries } from "./StatisticsData";
class MoneyReceivedCard extends React.Component {
  render() {
    return (
      <StatisticsCard
        icon={<User className="danger" size={22} />}
        iconBg="danger"
        stat="100"
        statTitle="Lớp học"
        options={MoneyReceived}
        series={ordersReceivedSeries}
        type="area"
      />
    );
  }
}

export default MoneyReceivedCard;
