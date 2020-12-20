import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import Chart from "react-apexcharts";

const SUBJECT = ['Java', 'DotNet', 'Angular']
class Productorders extends React.Component {
  state = {
    series: [Math.ceil(Math.random() * 30),
    Math.ceil(Math.random() * 50),
    Math.ceil(Math.random() * 20)],
  };
  render() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Sinh viên vắng của môn học</CardTitle>
        </CardHeader>
        <CardBody className="pt-0">
          <Chart
            options={{
              chart: {
                dropShadow: {
                  enabled: false,
                  blur: 5,
                  left: 1,
                  top: 1,
                  opacity: 0.2,
                },
                toolbar: {
                  show: false,
                },
              },
              colors: [
                this.props.color1,
                this.props.color2,
                this.props.color3,
                this.props.color4,
                this.props.color5,
              ],
              fill: {
                type: "gradient",
                gradient: {
                  gradientToColors: [
                    this.props.colorLight1,
                    this.props.colorLight2,
                    this.props.colorLight3,
                    this.props.colorLight4,
                    this.props.colorLight5,
                  ],
                },
              },
              dataLabels: {
                enabled: false,
              },
              legend: { show: false },
              stroke: {
                width: 5,
              },
              labels: SUBJECT,
            }}
            series={this.state.series}
            type="pie"
            height={290}
          />
        </CardBody>
        <ListGroup flush>
          {this.state.series.map((item, index) => (
            <ListGroupItem className="d-flex justify-content-between">
              <div className="item-info">
                <div
                  className="bg-primary"
                  style={{
                    height: "10px",
                    width: "10px",
                    borderRadius: "50%",
                    display: "inline-block",
                    margin: "0 5px",
                  }}
                />
                <span className="text-bold-600"> {SUBJECT[index]} </span>
              </div>
              <div className="product-result">
                <span> {item} </span>
              </div>
            </ListGroupItem>
          ))}
        </ListGroup>
      </Card>
    );
  }
}
export default Productorders;
