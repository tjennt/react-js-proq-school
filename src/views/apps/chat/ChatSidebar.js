import React from "react";
import { Card, FormGroup, Input, Badge } from "reactstrap";
import { X, Search } from "react-feather";
import PerfectScrollbar from "react-perfect-scrollbar";
import { connect } from "react-redux";
import userImg from "../../../assets/img/portrait/small/avatar-s-11.jpg";
import { newDate } from "../../../utility/config";
import { searchChatUser } from "../../../redux/actions/chatProQ";
import {
  API_ENDPOINT_IMG,
  // API_ENDPOINT_IMG_TEACHER,
} from "../../../redux/constants";

class ChatSidebar extends React.Component {
  state = {
    chatsContacts: [],
    contacts: [],
    messages: [],
    status: null,
    value: "",
  };

  componentDidMount() {
    this.props.getAllDataGroup();
  }
  handleOnChange = (e) => {
    this.setState({ value: e.target.value });
  };
  searchChatUser = () => {
    this.props.searchChatUser(this.state.value);
  };
  joinFriendSearch = (item) => {
    const value = "";
    this.props.searchChatUser(value);
    this.props.joinFriend(item.idUser);
  };
  joinFriend = (item) => {
    console.log(item);
    const { idUserMe } = this.props;
    const value = item.members
      .filter((person) => person !== idUserMe)
      .map((filteredPerson) => {
        return filteredPerson;
      });
    this.props.joinFriend(value.toString());
    this.props.setContactUser(item);
  };
  render() {
    const { status, value } = this.state;
    const { chatGroup, idUserMe, dataUserSearch } = this.props;
    return (
      <Card className="sidebar-content h-100">
        <span
          className="sidebar-close-icon"
          onClick={() => this.props.mainSidebar(false)}
        >
          <X size={15} />
        </span>
        <div className="chat-fixed-search">
          <div className="d-flex align-items-center">
            <div className="sidebar-profile-toggle position-relative d-inline-flex">
              <div
                className="avatar"
                onClick={() => this.props.handleUserSidebar("open")}
              >
                <img src={userImg} alt="User Profile" height="40" width="40" />
                <span
                  className={
                    status === "dnd"
                      ? "avatar-status-busy"
                      : status === "away"
                      ? "avatar-status-away"
                      : status === "offline"
                      ? "avatar-status-offline"
                      : "avatar-status-online"
                  }
                />
              </div>
            </div>
            <FormGroup className="position-relative  mx-1 my-0 w-100">
              <Input
                className="round"
                type="text"
                placeholder="Tìm kiếm"
                onChange={(e) => this.handleOnChange(e)}
                value={value}
                onKeyPress={(event) => {
                  if (event.key === "Enter") {
                    this.searchChatUser();
                  }
                }}
              />
              <div
                onClick={this.searchChatUser}
                className="form-control-position"
                style={{ cursor: "pointer" }}
              >
                <Search size={15} />
              </div>
            </FormGroup>
          </div>
        </div>
        <PerfectScrollbar
          className="chat-user-list list-group"
          options={{
            wheelPropagation: false,
          }}
        >
          {dataUserSearch.length > 0 ? (
            <div>
              <h3 className="primary p-1 mb-0"> Kết quả tìm kiếm </h3>
              {dataUserSearch.map((item) => (
                <ul
                  onClick={() => this.joinFriendSearch(item)}
                  key={item._id}
                  className="chat-users-list-wrapper media-list"
                >
                  <li>
                    <div className="pr-1">
                      <span className="avatar avatar-md m-0">
                        <img
                          src={`${API_ENDPOINT_IMG}/${item.avatar}`}
                          alt={userImg}
                          height="38"
                          width="38"
                        />
                      </span>
                    </div>
                    <div className="user-chat-info">
                      <div className="contact-info">
                        <div>{item.fullName}</div>
                      </div>
                    </div>
                  </li>
                </ul>
              ))}
            </div>
          ) : null}

          <h3 className="primary p-1 mb-0">Trò truyện </h3>
          {chatGroup
            ? chatGroup.map((item) => (
                <ul
                  key={item._id}
                  onClick={() => this.joinFriend(item)}
                  className="chat-users-list-wrapper media-list"
                >
                  <li>
                    <div className="pr-1">
                      <span className="avatar avatar-md m-0">
                        <img
                          src={`${API_ENDPOINT_IMG}/${item.user.avatar}`}
                          alt={userImg}
                          height="38"
                          width="38"
                        />
                      </span>
                    </div>
                    <div className="user-chat-info">
                      <div className="contact-info">
                        <div>{item.user.fullName}</div>
                        <p className="truncate"> {item.lastMessage}</p>
                      </div>
                      <div className="contact-meta d-flex- flex-column">
                        <span className="float-right mb-15">
                          {/* {lastMsgMonth + " " + lastMsgDay} */}
                          {newDate(item.lastAt)}
                        </span>
                        <div className="unseen-msg">
                          <Badge
                            className="badge-md float-right"
                            color="success"
                            pill
                          >
                            online
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              ))
            : "Không có group"}
        </PerfectScrollbar>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    chat: state.chatApp.chats,
    chatGroup: state.chatProq.dataGroup,
    idUserMe: state.auth.login.values.loggedInUser._id,
    dataUserSearch: state.chatProq.dataSearch,
  };
};
export default connect(mapStateToProps, {
  searchChatUser,
})(ChatSidebar);
