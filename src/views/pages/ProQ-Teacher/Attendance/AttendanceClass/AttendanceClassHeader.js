import React from "react";
import classes from "../AttendanceClassList.module.scss";

const AttendanceClassHeader = React.memo((props) => {
  const { columns } = props;
  let columnsTable = []; // Setup comlumns------------
  for (let value of columns) {
    columnsTable = [
      ...columnsTable,
      <th
        key={value.name}
        className={value.selector === props.sorting ? classes.active : null}
        onClick={() => props.sortHand(value.sortable, value.selector)}
      >
        {value.name}
      </th>,
    ];
  }
  return (
    <thead>
      <tr>{columnsTable}</tr>
    </thead>
  );
});

export default AttendanceClassHeader;
