import React from "react";
import StatisticsCard from "../../../../../components/@vuexy/statisticsCard/StatisticsCard";
import { connect } from "react-redux";
import { Users } from "react-feather";
import { subscribersGained } from "./StatisticsData";

class UserDaily extends React.Component {
  render() {
    const { userDaily } = this.props;
    return (
      <StatisticsCard
        icon={<Users className="primary" size={22} />}
        stat={userDaily ? userDaily : "0 Người dùng"}
        statTitle="Người dùng"
        options={subscribersGained}
        type="area"
      />
    );
  }
}

export default connect(null, null)(UserDaily);
