import React from "react";
import { Media } from "reactstrap";
import * as Icon from "react-feather";
import "../../../assets/scss/components/notification.scss";

function NoNotificationItem(props) {
  return (
    <div className="d-flex justify-content-between">
      <Media className="d-flex align-items-start customNotificationActive">
        <Media left href="#">
          <Icon.AlertTriangle className="font-medium-5 success" size={21} />
        </Media>
        <Media body>
          <Media heading className=" media-heading" tag="h6">
            Chưa có thông báo mới
          </Media>
        </Media>
      </Media>
    </div>
  );
}

export default NoNotificationItem;
