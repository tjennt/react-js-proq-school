import React from "react";
import { CustomInput } from "reactstrap";

import classes from "../AttendanceClassList.module.scss";

const AttendanceClassRows = React.memo((props) => {
  const { data } = props;
  let rowsTable = []; //setup Row------
  let rowTable = [];
  let images = null;

  for (let keyData in data) {
    for (let key in data[keyData]) {
      if (key === "image") {
        let i = data[keyData][key];
        images = require("../../../../../assets/img/profile/user-uploads/" + i);
        rowTable = [
          ...rowTable,
          <td key={Math.random()} className={classes.Image}>
            <img className="img-fluid rounded-circle"
                height="136"
                width="136" src={images} alt={`"${data[keyData][key]}"`}  />
          </td>,
        ];
      } else if (key === "attendance") {
        rowTable = [
          ...rowTable,
          <td key={Math.random()}>
            <CustomInput
              type="switch"
              id={data[keyData].id}
              name="customSwitch"
              checked={data[keyData].attendance}
              onChange={(e) => props.onChangeHand(e, data[keyData].id)}
            />
          </td>,
        ];
      } else {
        rowTable = [
          ...rowTable,
          <td key={Math.random()}> {data[keyData][key]} </td>,
        ];
      }
    }
    rowsTable = [
      ...rowsTable,
      <tr
        key={Math.random()}
        className={data[keyData].attendance === true ? classes.rowActive: null}
        onClick={() => props.onRowClick(data[keyData].id)}
      >
        {rowTable}
      </tr>,
    ];
    rowTable = [];
  }
  return <tbody>{rowsTable}</tbody>;
});

export default AttendanceClassRows;
