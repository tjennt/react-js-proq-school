import React from "react";
// import { history } from "../../../history";
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Badge,
} from "reactstrap";
import * as Icon from "react-feather";
import { connect } from "react-redux";
import { logoutWithJWT } from "./../../../redux/actions/auth/loginActions";
import PerfectScrollbar from "react-perfect-scrollbar";
import NotificationItem from "./NotificationItem";
import { toastSuccess } from "../../../utility/toast/toastHelper";
import socket from "socket.io-client";

let io;
const UserDropdown = (props) => {
  const logout = (e) => {
    e.preventDefault();
    props.logoutWithJWT();
  };
  const profile = (e) => {
    // history.push("/profile");
  };
  return (
    <DropdownMenu right>
      <DropdownItem tag="a" href="#" onClick={(e) => logout(e)}>
        <Icon.Power size={14} className="mr-50" />
        <span className="align-middle">Đăng xuất</span>
      </DropdownItem>
      <DropdownItem tag="a" href="#" onClick={(e) => profile(e)}>
        <Icon.User size={14} className="mr-50" />
        <span className="align-middle">Tài khoản</span>
      </DropdownItem>
    </DropdownMenu>
  );
};
class NavbarUser extends React.PureComponent {
  state = {
    navbarSearch: false,
    suggestions: [],
    text: "",
  };
  componentDidMount() {
    io = socket(`https://server-dev.asia`);
    io.on("SEND_MESSAGE_CHAT", (data) => {
      if (data.from !== this.props.idUser) {
        toastSuccess("Bạn có tin nhắn mới");
      } else {
        return false;
      }
    });
    io.on("ON_NOTIFY", (data) => {
      if (this.props.role === "student") {
        toastSuccess("Bạn có thông báo mới từ trường !!!!");
      } else {
        return false;
      }
    });
  }
  // socket = () => {
  //   const { text } = this.state;
  //   const { token, idUser } = this.props;
  //   const data = {
  //     text,
  //     token,
  //     idUser,
  //   };
  //   io.emit("client-send-message-to-server", {
  //     message: data,
  //   });
  // };
  render() {
    return (
      <ul className="nav navbar-nav navbar-nav-user float-right">
        {/* <Input onChange={(e) => this.setState({ text: e.target.value })} /> */}
        {/* <Button onClick={this.socket}>Noti </Button> */}
        <UncontrolledDropdown
          tag="li"
          className="dropdown-notification nav-item"
        >
          <DropdownToggle tag="a" className="nav-link nav-link-label">
            <Icon.Bell size={21} />
            <Badge pill color="primary" className="badge-up">
              {" "}
              5{" "}
            </Badge>
          </DropdownToggle>
          <DropdownMenu tag="ul" right className="dropdown-menu-media">
            <li className="dropdown-menu-header">
              <div className="dropdown-header mt-0">
                <h3 className="text-white">5 Yêu cầu </h3>
                <span className="notification-title">Yêu cầu rút tiền </span>
              </div>
            </li>
            <PerfectScrollbar
              className="media-list overflow-hidden position-relative"
              options={{
                wheelPropagation: false,
              }}
            >
              <NotificationItem checkNotification={this.checkNotification} />
              <NotificationItem checkNotification={this.checkNotification} />
              <NotificationItem checkNotification={this.checkNotification} />
              <NotificationItem checkNotification={this.checkNotification} />
              <NotificationItem checkNotification={this.checkNotification} />
              <NotificationItem checkNotification={this.checkNotification} />
            </PerfectScrollbar>
          </DropdownMenu>
        </UncontrolledDropdown>
        <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
          <DropdownToggle tag="a" className="nav-link dropdown-user-link">
            <div className="user-nav d-sm-flex d-none">
              <span
                style={{ color: "red" }}
                className="user-name text-bold-600"
              >
                ProQ School
              </span>
            </div>
            <span data-tour="user">
              <img
                src={this.props.userImg}
                className="round"
                height="40"
                width="40"
                alt="avatar"
              />
            </span>
          </DropdownToggle>
          <UserDropdown logoutWithJWT={this.logout} {...this.props} />
        </UncontrolledDropdown>
      </ul>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    role: state.auth.login.userRole,
    token: state.auth.login.values.loggedInUser.token,
    idUser: state.auth.login.values.loggedInUser._id,
  };
};
export default connect(mapStateToProps, { logoutWithJWT })(NavbarUser);
