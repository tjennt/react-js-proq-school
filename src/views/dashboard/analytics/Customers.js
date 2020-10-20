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

class Productorders extends React.Component {
  state = {
    series: [23, 68, 56, 46, 32],
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
                this.props.primary,
                this.props.warning,
                this.props.danger,
                this.props.dangerLight,
                this.props.dangerLight,
              ],
              fill: {
                type: "gradient",
                gradient: {
                  gradientToColors: [
                    this.props.primaryLight,
                    this.props.warningLight,
                    this.props.dangerLight,
                    this.props.dangerLight,
                    this.props.dangerLight,
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
              labels: [
                "Javascript",
                "PHP",
                "Wordpress",
                "C++",
                "Khởi sự danh nghiệp",
              ],
            }}
            series={this.state.series}
            type="pie"
            height={290}
          />
        </CardBody>
        <ListGroup flush>
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
              <span className="text-bold-600">Javascript</span>
            </div>
            <div className="product-result">
              <span>23</span>
            </div>
          </ListGroupItem>
          <ListGroupItem className="d-flex justify-content-between">
            <div className="item-info">
              <div
                className="bg-warning"
                style={{
                  height: "10px",
                  width: "10px",
                  borderRadius: "50%",
                  display: "inline-block",
                  margin: "0 5px",
                }}
              />
              <span className="text-bold-600">PHP</span>
            </div>
            <div className="product-result">
              <span>68</span>
            </div>
          </ListGroupItem>
          <ListGroupItem className="d-flex justify-content-between">
            <div className="item-info">
              <div
                className="bg-danger"
                style={{
                  height: "10px",
                  width: "10px",
                  borderRadius: "50%",
                  display: "inline-block",
                  margin: "0 5px",
                }}
              />
              <span className="text-bold-600">Wordpress</span>
            </div>
            <div className="product-result">
              <span>46</span>
            </div>
          </ListGroupItem>
        </ListGroup>
      </Card>
    );
  }
}
export default Productorders;
