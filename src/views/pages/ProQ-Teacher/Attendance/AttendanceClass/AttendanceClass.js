import React, { useState } from "react";

import classes from "../AttendanceClassList.module.scss";
import {
  Table,
  Card,
  CardHeader,
  CardBody,
  Button,
  CardFooter,
  Row,
  Col,
} from "reactstrap";
import AttendanceClassHeader from "./AttendanceClassHeader";
import { useCallback } from "react";
import AttendanceClassRows from "./AttendanceClassRows";
import { ChevronsLeft } from "react-feather";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../../../assets/scss/plugins/extensions/toastr.scss";

const AttendanceClassTable = React.memo((props) => {
  const [columns] = useState([
    {
      name: "MSSV",
      selector: "id",
      sortable: true,
    },
    {
      name: "Họ và tên",
      selector: "name",
      sortable: true,
    },
    {
      name: "Điểm danh",
      selector: "attendance",
      sortable: true,
    },
    {
      name: "Ảnh",
      selector: "image",
      sortable: false,
    },
    {
      name: "Ghi chú",
      selector: "note",
      sortable: false,
    },
  ]);
  const [data, setData] = useState([
    {
      id: "PS10475",
      name: "Nguyen Viet Binh",
      attendance: false,
      image: "user-01.jpg",
      note: "ghi chu cai coi",
    },
    {
      id: "PS10476",
      name: "Nguyen Viet Chau",
      attendance: false,
      image: "user-02.jpg",
      note: "ghi chu cai coi",
    },
    {
      id: "PS104757",
      name: "Nguyen Viet Dinh",
      attendance: true,
      image: "user-03.jpg",
      note: "ghi chu cai coi",
    },
  ]);
  const [sorting, setSorting] = useState("");

  const sortHanlde = useCallback(
    (sortable, selector) => {
      let update = [];
      let arrayData = [];
      if (sortable) {
        for (let obj of data) {
          arrayData.push({ id: obj.id, value: obj[selector] });
        }
        sorting !== selector
          ? arrayData.sort((a, b) => a[1] - b[1])
          : arrayData.reverse((a, b) => a[1] - b[1]);
        for (let objArrayData of arrayData) {
          for (let object of data) {
            if (
              object[selector] === objArrayData.value &&
              object.id === objArrayData.id
            ) {
              update.push(object);
            }
          }
        }
        setData(update);
        setSorting(selector);
      }
    },
    [sorting, data]
  );

  const onChangeHandle = useCallback(
    (e, id) => {
      let updateData = data;
      for (let key in updateData) {
        if (updateData[key].id === id) {
          updateData[key].attendance = e.target.checked;
        }
      }
      setData([...updateData]);
    },
    [data]
  );
  const onRowClickHandle = useCallback(
    (id) => {
      let updateData = data;
      for (let key in updateData) {
        if (updateData[key].id === id) {
          updateData[key].attendance = !updateData[key].attendance;
        }
      }
      setData([...updateData]);
    },
    [data]
  );

  const notifyTopRight = (text) =>
    toast.info(text, {
      position: toast.POSITION.TOP_RIGHT,
    });

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <CardHeader>
              <div className="d-flex w-100 justify-content-between">
                <div className="primary font-large-1">
                  Điểm danh lớp {props.match.params.id}
                  <span
                    className="cursor-pointer ml-2 text-danger"
                    onClick={() => props.history.goBack()}
                  >
                    <ChevronsLeft size="24" />
                  </span>
                </div>
                <div>
                  <Button.Ripple
                    color="primary"
                    outline
                    onClick={() => notifyTopRight("Lưu thành công")}
                  >
                    Lưu lại
                  </Button.Ripple>
                </div>
              </div>
            </CardHeader>
            <CardBody>
              <Table hover responsive className={classes.Table}>
                <AttendanceClassHeader
                  sortHand={sortHanlde}
                  columns={columns}
                  sorting={sorting}
                />
                <AttendanceClassRows
                  data={data}
                  onChangeHand={onChangeHandle}
                  onRowClick={onRowClickHandle}
                />
              </Table>
            </CardBody>
            <CardFooter>
              <div className="d-flex w-100 justify-content-between">
                <span
                  className="cursor-pointer ml-2 text-danger"
                  onClick={() => props.history.goBack()}
                >
                  <ChevronsLeft size="24" />
                </span>
                <Button.Ripple
                  color="primary"
                  outline
                  onClick={() => notifyTopRight("Lưu thành công")}
                >
                  Lưu lại
                </Button.Ripple>
              </div>
            </CardFooter>
          </Card>
        </Col>
        <ToastContainer />
      </Row>
    </React.Fragment>
  );
});

export default AttendanceClassTable;
