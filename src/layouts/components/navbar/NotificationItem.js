import React from "react";
import { Media } from "reactstrap";
import * as Icon from "react-feather";
import "../../../assets/scss/components/notification.scss";
import {history} from "../../../history"
function NotificationItem(props) {
  const notificationItem = (id) => {
    props.checkUserSeen();
    history.push(`/student/news/${id}`)
  };
  return (
    <div className="d-flex justify-content-between">
      <Media
        onClick={()=>notificationItem(props.allNotiSocket._id)}
        className="d-flex align-items-start customNotificationActive"
      >
        <Media left href="#">
          <Icon.AlertTriangle className="font-medium-5 primary" size={21} />
        </Media>
        <Media body>
          <Media heading className=" media-heading" tag="h6">
            Có thông báo mới !
          </Media>
          <p className="notification-text">{props.allNotiSocket.title}</p>
        </Media>
        <small>
          <time className="media-meta" dateTime="2015-06-11T18:29:20+08:00">
            9 hours ago
          </time>
        </small>
      </Media>
    </div>
  );
}

export default NotificationItem;
