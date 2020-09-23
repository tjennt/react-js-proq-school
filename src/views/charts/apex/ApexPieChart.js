import React from "react";
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap";
import Chart from "react-apexcharts";

class ApexPieCharts extends React.Component {
  state = {
    options: {
      colors: this.props.themeColors,
      labels: ["Facebook", "Google", "Apple ID"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 350,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
    series: [],
  };
  render() {
    const { TotalUserLogin } = this.props;
    if (TotalUserLogin) {
      // var label = TotalUserLogin.label;
      var data = TotalUserLogin.data;
    }
    return (
      <Card>
        <CardHeader>
          <CardTitle>Nguồn User</CardTitle>
        </CardHeader>
        <CardBody>
          <Chart
            options={this.state.options}
            series={data ? data : []}
            type="pie"
            height={350}
          />
        </CardBody>
      </Card>
    );
  }
}
export default ApexPieCharts;
