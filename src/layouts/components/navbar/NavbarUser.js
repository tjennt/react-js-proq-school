import React from "react";
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";
import * as Icon from "react-feather";
import { connect } from "react-redux";
import { logoutWithJWT } from "./../../../redux/actions/auth/loginActions";
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
        <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
          <DropdownToggle tag="a" className="nav-link dropdown-user-link">
            <div className="user-nav d-sm-flex d-none">
              <span
                style={{ color: "red" }}
                className="user-name text-bold-600"
              >
                Catback Admin
              </span>
              <span className="user-status"> {this.props.role}</span>
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
