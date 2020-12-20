import React from "react";
import StatisticsCard from "../../../../../components/@vuexy/statisticsCard/StatisticsCard";
import { Star } from "react-feather";
import { TotalTeacher, totalTeacherData } from "./StatisticsData";
import { connect } from "react-redux";
class MoneyReceivedUser extends React.Component {
  render() {
    const { subject } = this.props;
    return (
      <StatisticsCard
        icon={<Star color="#fdc45e" size={22} />}
        iconBg="none"
        iconBgStyle="#fef0d7"
        stat={subject ? subject : 0}
        statTitle="Tổng môn đang dạy"
        options={TotalTeacher}
        series={totalTeacherData}
        type="area"
      />
    );
  }
}

export default connect(null, null)(MoneyReceivedUser);
