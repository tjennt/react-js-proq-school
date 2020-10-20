import React from "react";
import StatisticsCard from "../../../../../components/@vuexy/statisticsCard/StatisticsCard";
import { User } from "react-feather";
import { MoneyReceived, ordersReceivedSeries } from "./StatisticsData";
import { connect } from "react-redux";
class MoneyReceivedUser extends React.Component {
  render() {
    return (
      <StatisticsCard
        icon={<User className="warning" size={22} />}
        iconBg="warning"
        stat="1000"
        statTitle="Sinh viên"
        options={MoneyReceived}
        series={ordersReceivedSeries}
        type="area"
      />
    );
  }
}

export default connect(null, null)(MoneyReceivedUser);
