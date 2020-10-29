import React from "react";
import StatisticsCard from "../../../../../components/@vuexy/statisticsCard/StatisticsCard";
import { Users } from "react-feather";
import { subscribersGained } from "./StatisticsData";
import { connect } from "react-redux";
class SubscriberGained extends React.Component {
  render() {
    const { dataUser } = this.props;
    return (
      <StatisticsCard
        icon={<Users className="primary" size={22} />}
        stat={dataUser ? dataUser : "0 Người dùng"}
        statTitle="Tổng user"
        options={subscribersGained}
        type="area"
      />
    );
  }
}
const mapStateToProps = (state) => {
  return {
    dataTotalUser: state.dataDashBoard.dataTotalUser,
    staticTotalUser: state.dataDashBoard.staticTotalUser,
  };
};

export default connect(mapStateToProps, null)(SubscriberGained);
