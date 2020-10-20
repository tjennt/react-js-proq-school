import React from "react";
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

const UserDropdown = (props) => {
  const logout = (e) => {
    e.preventDefault();
    props.logoutWithJWT();
  };
  return (
    <DropdownMenu right>
      <DropdownItem tag="a" href="#" onClick={(e) => logout(e)}>
        <Icon.Power size={14} className="mr-50" />
        <span className="align-middle">Đăng xuất</span>
      </DropdownItem>
    </DropdownMenu>
  );
};
class NavbarUser extends React.PureComponent {
  state = {
    navbarSearch: false,
    suggestions: [],
  };
  render() {
    return (
      <ul className="nav navbar-nav navbar-nav-user float-right">
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
  };
};
export default connect(mapStateToProps, { logoutWithJWT })(NavbarUser);
