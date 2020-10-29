import React from "react";
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
class SimpleLineChartMoneyReceived extends React.Component {
  render() {
    const { totalMoney } = this.props;
    if (totalMoney) {
      var data = totalMoney.data;
    }
    return (
      <Card>
        <CardHeader>
          <CardTitle>Hoàn tiền và doanh thu </CardTitle>
        </CardHeader>
        <CardBody>
          <div className="recharts-wrapper">
            <ResponsiveContainer>
              <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip
                  formatter={(value) =>
                    new Intl.NumberFormat("vi").format(value)
                  }
                />
                <Legend />
                <Line
                  name="Tổng doanh thu"
                  type="monotone"
                  dataKey="pub_commission"
                  stroke={this.props.primary}
                  activeDot={{ r: 8 }}
                />
                <Line
                  name="Tổng hoàn tiền catback"
                  type="monotone"
                  dataKey="catback_commission"
                  stroke={this.props.success}
                />
                <Line
                  name="Tổng hoàn tiền user"
                  type="monotone"
                  dataKey="user_commission"
                  stroke={this.props.danger}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardBody>
      </Card>
    );
  }
}
export default SimpleLineChartMoneyReceived;
