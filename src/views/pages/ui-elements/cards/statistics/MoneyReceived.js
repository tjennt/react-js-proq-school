import React from "react";
import StatisticsCard from "../../../../../components/@vuexy/statisticsCard/StatisticsCard";
import { User, Aperture } from "react-feather";
import { MoneyReceived, ordersReceivedSeries } from "./StatisticsData";
class MoneyReceivedCard extends React.Component {
  render() {
    return (
      <StatisticsCard
        icon={<Aperture color="#ff6535" size={22} />}
        iconBg="danger"
        iconBgStyle="#ffa68a"
        stat={Math.ceil(Math.random() * 999)}
        statTitle="Lớp học"
        options={MoneyReceived}
        series={ordersReceivedSeries}
        type="area"
      />
    );
  }
}

export default MoneyReceivedCard;
