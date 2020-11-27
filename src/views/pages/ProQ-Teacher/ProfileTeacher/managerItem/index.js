import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  ListGroup,
  ListGroupItem,
  TabContent,
  TabPane,
} from "reactstrap";
import { Modal, Input } from "antd";
import "antd/dist/antd.css";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
export default function ManagerItem(props) {
  const { data, updateManager } = props;
  const [passwordOld, setPasswordOld] = useState("");
  const [passwordNew, setPassWordNew] = useState("");
  const [visible, setVisible] = useState(false);
  const showModal = () => {
    setVisible(true);
  };
  const handleOk = () => {
    updateManager(passwordOld, passwordNew);
    setVisible(false);
  };
  const handleCancel = () => {
    setVisible(false);
  };
  return (
    <React.Fragment>
      <Modal
        title="Đổi mật khẩu"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input.Password
          onChange={(e) => setPasswordOld({ passwordOld: e.target.value })}
          placeholder={"Nhập mật khẩu cũ "}
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
        />
        <Input.Password
          className="mt-2"
          onChange={(e) => setPassWordNew({ passwordNew: e.target.value })}
          placeholder={"Nhập mật khẩu mới "}
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
        />
      </Modal>
      <Card>
        <CardHeader className="justify-content-center">
          <CardTitle> Thông tin chung </CardTitle>
        </CardHeader>
        <CardBody>
          <TabContent activeTab="1">
            <TabPane tabId="1">
              <ListGroup flush className="text-left">
                <ListGroupItem> </ListGroupItem>
                <ListGroupItem>
                  Họ và tên : {data ? data.fullname : ""}
                </ListGroupItem>
                <ListGroupItem>Email : {data ? data.email : ""}</ListGroupItem>
                <ListGroupItem>
                  {" "}
                  Ngày sinh: {data ? data.dob : ""}{" "}
                </ListGroupItem>
                <ListGroupItem>
                  Địa chỉ : {data ? data.address : ""}{" "}
                </ListGroupItem>
              </ListGroup>
            </TabPane>
          </TabContent>
        </CardBody>
      </Card>
    </React.Fragment>
  );
}
