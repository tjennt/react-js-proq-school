import React from "react";
import StatisticsCard from "../../../../../components/@vuexy/statisticsCard/StatisticsCard";
import { Star } from "react-feather";
import { TotalStudent, totalStudentData } from "./StatisticsData";
import { connect } from "react-redux";
class MoneyReceivedUser extends React.Component {
  render() {
    return (
      <StatisticsCard
        icon={<Star color="#2892fd" size={22} />}
        iconBg="none"
        iconBgStyle="#c9e4fe"
        stat={Math.ceil(Math.random() * 9999)}
        statTitle="Tổng sinh viên giỏi"
        options={TotalStudent}
        series={totalStudentData}
        type="area"
      />
    );
  }
}

export default connect(null, null)(MoneyReceivedUser);
