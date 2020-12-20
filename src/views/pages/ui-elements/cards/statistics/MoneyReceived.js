import React from "react";
import StatisticsCard from "../../../../../components/@vuexy/statisticsCard/StatisticsCard";
import { Aperture } from "react-feather";
import { MoneyReceived, ordersReceivedSeries } from "./StatisticsData";
class MoneyReceivedCard extends React.Component {
  render() {
    const { catbackCommission } = this.props;
    return (
      <StatisticsCard
        icon={<Aperture color="#ff6535" size={22} />}
        iconBg="danger"
        iconBgStyle="#ffa68a"
        stat={catbackCommission ? catbackCommission : 0}
        statTitle="Lớp học"
        options={MoneyReceived}
        series={ordersReceivedSeries}
        type="area"
      />
    );
  }
}

export default MoneyReceivedCard;
