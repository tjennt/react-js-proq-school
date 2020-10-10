import React from "react";
import StatisticsCard from "../../../../../components/@vuexy/statisticsCard/StatisticsCard";
import { DollarSign } from "react-feather";
import { MoneyReceived, ordersReceivedSeries } from "./StatisticsData";
import { connect } from "react-redux";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { currencyFormat } from "../../../../../utility/config/index";
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
class MoneyReceivedUser extends React.Component {
  render() {
    const { UserCommission } = this.props;
    if (typeof UserCommission !== undefined) {
      var dataResult = parseInt(UserCommission);
      var dataTotal = currencyFormat(dataResult);
    }
    return (
      <StatisticsCard
        icon={<DollarSign className="warning" size={22} />}
        iconBg="warning"
        stat={
          dataTotal ? (
            dataTotal
          ) : (
            <Spin
              style={{ color: "black" }}
              tip="0 VNĐ. Đang cập nhật..."
              indicator={antIcon}
            />
          )
        }
        statTitle="Tổng hoàn tiền user"
        options={MoneyReceived}
        series={ordersReceivedSeries}
        type="area"
      />
    );
  }
}

export default connect(null, null)(MoneyReceivedUser);
