import React from "react";
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap";
import Chart from "react-apexcharts";

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
        categories: [
          "2013",
          "2014",
          "2015",
          "2016",
          "2017",
          "2018",
          "2019",
          "2020",
        ],
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
        },
      },
      tooltip: {
        x: { show: false },
      },
    },
    series: [
      {
        name: "Số lượng",
        data: [
          Math.ceil(Math.random() * 999),
          Math.ceil(Math.random() * 999),
          Math.ceil(Math.random() * 999),
          Math.ceil(Math.random() * 999),
          Math.ceil(Math.random() * 999),
          Math.ceil(Math.random() * 999),
          Math.ceil(Math.random() * 999),
          Math.ceil(Math.random() * 999),
        ],
      },
    ],
  };
  render() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Biểu đồ Sinh viên mới </CardTitle>
          {/* <Settings size={20} className="cursor-pointer text-muted" /> */}
        </CardHeader>
        <CardBody className="mt-4">
          <div className="mr-2 d-flex justify-content-around align-items-center ">
            <p className="mb-50 text-bold-600">Số lượng học sinh mới</p>
            <h2 className="text-bold-400">
              <span className="text-danger">
                {" "}
                {
                  this.state.series[0].data[
                    this.state.series[0].data.length - 1
                  ]
                }{" "}
              </span>
            </h2>
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
