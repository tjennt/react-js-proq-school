import React from "react";
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap";
import Chart from "react-apexcharts";
import { Settings } from "react-feather";

class Revenue extends React.Component {
  state = {
    options: {
      chart: {
        toolbar: {
          show: false,
        },
        animations: {
          enabled: false,
        },
      },
      stroke: {
        curve: "smooth",
        dashArray: [0, 8],
        width: [4, 2],
      },
      grid: {
        borderColor: this.props.labelColor,
      },
      legend: {
        show: false,
      },
      colors: [this.props.dangerLight, this.props.strokeColor],

      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          inverseColors: false,
          gradientToColors: [this.props.primary, this.props.strokeColor],
          shadeIntensity: 1,
          type: "horizontal",
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100, 100, 100],
        },
      },
      markers: {
        size: 0,
        hover: {
          size: 5,
        },
      },
      xaxis: {
        labels: {
          style: {
            colors: this.props.strokeColor,
          },
        },
        axisTicks: {
          show: false,
        },
        categories: ["01", "05", "09", "13", "17", "21", "26", "31"],
        axisBorder: {
          show: false,
        },
        tickPlacement: "on",
      },
      yaxis: {
        tickAmount: 5,
        labels: {
          style: {
            color: this.props.strokeColor,
          },
          formatter: (val) => {
            return val > 999 ? (val / 1000).toFixed(1) + "k" : val;
          },
        },
      },
      tooltip: {
        x: { show: false },
      },
    },
    series: [
      {
        name: "This Month",
        data: [450, 470, 440, 475, 455, 480, 465, 486],
      },
    ],
  };
  render() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Biểu đồ thẻ hiện theo tháng</CardTitle>
          <Settings size={20} className="cursor-pointer text-muted" />
        </CardHeader>
        <CardBody>
          <div className="d-flex justify-content-start mb-1">
            <div className="mr-2">
              <p className="mb-50 text-bold-600">This Month</p>
              <h2 className="text-bold-400">
                {/* <sup className="font-medium-1 mr-50">$</sup> */}
                <span className="text-success">1000</span>
              </h2>
            </div>
          </div>
          <Chart
            options={this.state.options}
            series={this.state.series}
            type="line"
            height={260}
          />
        </CardBody>
      </Card>
    );
  }
}
export default Revenue;
