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
class SimpleLineChartjs extends React.Component {
  render() {
    const { staticProduct } = this.props;
    if (staticProduct) {
      var data = staticProduct.data;
    }
    return (
      <Card>
        <CardHeader>
          <CardTitle>Tổng giá trị hàng</CardTitle>
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
                    new Intl.NumberFormat(["vi"]).format(value)
                  }
                />
                <Legend />
                <Line
                  name="Tổng giá trị hàng hóa"
                  type="monotone"
                  dataKey="value"
                  stroke={this.props.primary}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardBody>
      </Card>
    );
  }
}
export default SimpleLineChartjs;
