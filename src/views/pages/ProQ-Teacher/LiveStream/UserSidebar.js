import React from "react";
import { X, ChevronDown, ChevronLeft } from "react-feather";
import { Collapse, ListGroup, ListGroupItem } from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import { connect } from "react-redux";
import { changeStatus } from "../../../../redux/actions/chat/index";
import Radio from "../../../../components/@vuexy/radio/RadioVuexy";
import userImg from "../../../../assets/img/portrait/small/avatar-s-neo.jpg";
import classes from "./LiveStream.module.scss";
class UserSidebar extends React.Component {
  static getDerivedStateFromProps(props, state) {
    if (props.chat.status !== state.status) {
      return {
        status: props.chat.status,
      };
    }
    // Return null if the state hasn't changed
    return null;
  }

  state = {
    value:
      "Dessert chocolate cake lemon drops jujubes. Biscuit cupcake ice cream bear claw brownie brownie marshmallow.",
    status: null,
    statusToggle: false,
  };

  joinclassHandle = () => {
    this.props.handleUserSidebar("close");
  };

  render() {
    const status = this.state.status;
    let statusText =
      status === "active"
        ? ["Hoạt động", "success"]
        : status === "dnd"
        ? ["Không làm phiền", "danger"]
        : status === "away"
        ? ["Chờ đợi", "warning"]
        : ["Không có mặt", "secondary"];
    return (
      <div
        className={`chat-profile-sidebar ${
          this.props.userProfile ? "show" : null
        }`}
      >
        <header className="chat-profile-header">
          <div
            className="close-icon"
            onClick={() => this.props.handleUserSidebar("close")}
          >
            <X size={24} />
          </div>
          <div className="header-profile-sidebar">
            <div className="avatar">
              <img src={userImg} alt="User Profile" height="66" width="66" />
              <span
                className={`${
                  status === "offline"
                    ? "avatar-status-offline"
                    : status === "dnd"
                    ? "avatar-status-busy"
                    : status === "away"
                    ? "avatar-status-away"
                    : "avatar-status-online"
                } avatar-status-lg`}
              />
            </div>
            <h4 className="chat-user-name">Neo Nguyen</h4>
          </div>
        </header>
        <div className="profile-sidebar-area">
          <PerfectScrollbar
            className="scroll-area"
            options={{
              wheelPropagation: false,
            }}
          >
            <p
              className="mb-1 font-medium-3  font-weight-bold"
              onClick={() => {
                this.setState({ statusToggle: !this.state.statusToggle });
              }}
            >
              Trạng thái:
              <span
                className={
                  statusText[1] +
                  " font-medium-1 float-right font-weight-normal "
                }
              >
                {statusText[0]}
                {this.state.statusToggle ? (
                  <ChevronDown size="18" />
                ) : (
                  <ChevronLeft size="18" />
                )}
              </span>
            </p>
            <Collapse isOpen={this.state.statusToggle}>
              <ul className="list-unstyled user-status">
                <li className="pb-50">
                  <Radio
                    label="Hoạt động"
                    color="success"
                    defaultChecked={true}
                    name="userStatus"
                    onClick={() => this.props.changeStatus("active")}
                  />
                </li>
                <li className="pb-50">
                  <Radio
                    label="Không làm phiền"
                    color="danger"
                    defaultChecked={false}
                    name="userStatus"
                    onClick={() => this.props.changeStatus("dnd")}
                  />
                </li>
                <li className="pb-50">
                  <Radio
                    label="Treo máy"
                    color="warning"
                    defaultChecked={false}
                    name="userStatus"
                    onClick={() => this.props.changeStatus("away")}
                  />
                </li>
                <li className="pb-50">
                  <Radio
                    label="Không có mặt"
                    color="secondary"
                    defaultChecked={false}
                    name="userStatus"
                    onClick={() => this.props.changeStatus("offline")}
                  />
                </li>
              </ul>
            </Collapse>

            <ListGroup tag="div" className="mt-3">
              <ListGroupItem
                tag="div"
                className={classes.LinkJoinClass}
                onClick={() => this.joinclassHandle()}
              >
                ReactJS - WEB1001
              </ListGroupItem>
              <ListGroupItem
                tag="div"
                className={classes.LinkJoinClass}
                onClick={() => this.joinclassHandle()}
              >
                Javasript
              </ListGroupItem>
              <ListGroupItem
                tag="div"
                className={classes.LinkJoinClass}
                onClick={() => this.joinclassHandle()}
              >
                VueJS
              </ListGroupItem>
              <ListGroupItem
                tag="div"
                className={classes.LinkJoinClass}
                onClick={() => this.joinclassHandle()}
              >
                AngularJS
              </ListGroupItem>
              <ListGroupItem
                tag="div"
                className={classes.LinkJoinClass}
                onClick={() => this.joinclassHandle()}
              >
                Kỹ năng làm việc
              </ListGroupItem>
              <ListGroupItem tag="div" disabled>
                Laravel - đã học xong
              </ListGroupItem>
            </ListGroup>
          </PerfectScrollbar>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    chat: state.chatApp.chats,
  };
};
export default connect(mapStateToProps, { changeStatus })(UserSidebar);
