import React from "react";
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

class SimpleAreaChart extends React.Component {
  render() {
    const { totalUser } = this.props;
    if (totalUser) {
      var data = totalUser.data;
    }
    return (
      <Card>
        <CardHeader>
          <CardTitle>Người dùng</CardTitle>
        </CardHeader>
        <CardBody>
          <div className="recharts-wrapper">
            <ResponsiveContainer>
              <AreaChart
                width={500}
                height={400}
                data={data}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area
                  name="Nguời dùng"
                  type="monotone"
                  dataKey="value"
                  stackId="1"
                  stroke={this.props.primary}
                  fill={this.props.primary}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardBody>
      </Card>
    );
  }
}
export default SimpleAreaChart;
