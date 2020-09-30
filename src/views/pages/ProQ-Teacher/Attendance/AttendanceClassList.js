import React from "react";

import classes from "./AttendanceClassList.module.scss";
import { Table, Card, CardHeader, CardBody, Button } from "reactstrap";

class AttendanceClassList extends React.Component {
  state = {
    columns: [
      {
        name: "#",
        selector: "id",
        sortable: true,
      },
      {
        name: "Tên lớp",
        selector: "nameClass",
        sortable: true,
      },
      {
        name: "Phòng",
        selector: "roomNumber",
        sortable: true,
      },
      {
        name: "Sỉ số",
        selector: "studentQuantity",
        sortable: true,
      },
      {
        name: "Hiện diện / Vắng",
        selector: "attendanceQuantity",
        sortable: true,
      },
    ],
    data: [
      {
        id: "WD14301",
        nameClass: "Lớp hoa dâm bụt",
        roomNumber: "406",
        studentQuantity: "30",
        attendanceQuantity: "28/1",
      },

      {
        id: "WD14302",
        nameClass: "Lớp hoa kỳ cục",
        roomNumber: "107",
        studentQuantity: "32",
        attendanceQuantity: "27/1",
      },

      {
        id: "WD14303",
        nameClass: "Lớp hoa huệ",
        roomNumber: "208",
        studentQuantity: "33",
        attendanceQuantity: "26/1",
      },

      {
        id: "WD14304",
        nameClass: "Lớp hoa hậu",
        roomNumber: "309",
        studentQuantity: "34",
        attendanceQuantity: "25/1",
      },
    ],
    sorting: "",
    doingAtten: localStorage.getItem("doingAtten") ? true : false,
  };
  sortHanlde = (sortable, selector, data) => {
    let update = [];
    let arrayData = [];
    if (sortable) {
      for (let obj of data) {
        arrayData.push(obj[selector]);
      }
      this.state.sorting !== selector ? arrayData.sort() : arrayData.reverse();
      for (let value of arrayData) {
        for (let object of data) {
          if (object[selector] === value) {
            update.push(object);
          }
        }
      }
    }
    this.setState({ ...this.state, data: update, sorting: selector });
  };
  attendanceHanle = (data, keyData) => {
    localStorage.setItem(
      "doingAtten",
      `${this.props.match.url}/${data[keyData].id}`
    );
    this.props.history.push(`${this.props.match.url}/${data[keyData].id}`);
  };

  render() { 
    //setup column, row-----------
    const { columns, data } = this.state;
    let columnsTable = [];
    for (let value of columns) {
      columnsTable = [
        ...columnsTable,
        <th
          key={value.name}
          className={
            value.selector === this.state.sorting ? classes.active : null
          }
          onClick={() => this.sortHanlde(value.sortable, value.selector, data)}
        >
          {value.name}
        </th>,
      ];
    }
    let rowsTable = [];
    let rowTable = [];
    for (let keyData in data) {
      for (let key in data[keyData]) {
        rowTable = [
          ...rowTable,
          <td key={Math.random()}>{data[keyData][key]}</td>,
        ];
      }
      rowsTable = [
        ...rowsTable,
        <tr
          key={Math.random()}
          onClick={() => this.attendanceHanle(data, keyData)}
        >
          {rowTable}
        </tr>,
      ];
      rowTable = [];
    }
    // -----------------------------
    return (
      <Card>
        <CardHeader>
          <span className="font-medium-4 text-primary">
            Danh sách điểm danh ngày 01/01/2020
          </span>
          {this.state.doingAtten ? (
            <Button
              color="primary"
              onClick={()=>this.props.history.push(
                localStorage.getItem("doingAtten")
              )}
            >
              Đang điểm danh
            </Button>
          ) : null}
        </CardHeader>
        <CardBody>
          <Table hover responsive className={classes.Table}>
            <thead>
              <tr>{columnsTable}</tr>
            </thead>
            <tbody>{rowsTable}</tbody>
          </Table>
        </CardBody>
      </Card>
    );
  }
}

export default AttendanceClassList;
