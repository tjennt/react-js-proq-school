import React from "react";
import {
  Card,
  FormGroup,
  Input,
  Badge,
  Button,
  ListGroupItem,
} from "reactstrap";
import { X, Search } from "react-feather";
import PerfectScrollbar from "react-perfect-scrollbar";
import { connect } from "react-redux";
import {
  getChats,
  getContactChats,
  searchContacts,
  markSeenAllMessages,
} from "../../../redux/actions/chat/index";
import userImg from "../../../assets/img/portrait/small/avatar-s-11.jpg";
import { newDate } from "../../../utility/config";
// import {} from "../../../redux/"

class ChatSidebar extends React.Component {
  // static getDerivedStateFromProps(props, state) {
  //   if (
  //     props.chat.chatContacts.length !== state.chatContacts ||
  //     props.chat.contacts.length !== state.contacts ||
  //     props.chat.chats.length !== state.chats ||
  //     props.chat.status !== state.status
  //   ) {
  //     return {
  //       chatsContacts: props.chat.chatContacts,
  //       contacts: props.chat.contacts,
  //       chats: props.chat.chats,
  //       status: props.chat.status,
  //     };
  //   }
  //   // Return null if the state hasn't changed
  //   return null;
  // }
  state = {
    chatsContacts: [],
    contacts: [],
    messages: [],
    status: null,
    value: "",
  };

  // getChatContents = () => {
  //   this.props.getChats();
  //   this.props.getContactChats();
  // };
  componentDidMount() {
    this.props.getAllDataGroup();
  }
  // async componentDidMount() {
  //   await this.getChatContents();
  //   this.setState({
  //     chatsContacts: this.props.chat.chatContacts,
  //     contacts: this.props.chat.contacts,
  //     chats: this.props.chat.chats,
  //     status: this.props.chat.status,
  //   });
  // }
  handleChat = (item) => {
    console.log(item);
  };
  handleOnChange = (e) => {
    this.setState({ value: e.target.value });
    // this.props.searchContacts(e.target.value);
  };
  joinFriend = (item) => {
    const { idUserMe } = this.props;
    const value = item.members
      .filter((person) => person !== idUserMe)
      .map((filteredPerson) => {
        return filteredPerson;
      });
    this.props.joinFriend(value.toString());
  };
  render() {
    const { status, value } = this.state;
    const { chatGroup, idUserMe } = this.props;
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
            <FormGroup className="position-relative has-icon-left mx-1 my-0 w-100">
              <Input
                className="round"
                type="text"
                placeholder="Search contact or start a new chat"
                // onChange={(e) => this.handleOnChange(e)}
                // value={value}
              />
              <div className="form-control-position">
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
          {/* <FormGroup className="position-relative has-icon-left mx-1 my-0 w-70 mt-2">
            <Input
              className="round"
              type="text"
              placeholder="nhập text demo id"
              onChange={(e) => this.handleOnChange(e)}
              value={value}
            />
            <Button onClick={this.joinFriend}> Tạo group </Button>
          </FormGroup> */}
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
                          src={userImg}
                          alt={userImg}
                          height="38"
                          width="38"
                        />
                      </span>
                    </div>
                    <div className="user-chat-info">
                      <div className="contact-info">
                        {item.members
                          .filter((person) => person !== idUserMe)
                          .map((filteredPerson) => (
                            <div key={filteredPerson}>{filteredPerson}</div>
                          ))}
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
                            color="primary"
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
  };
};
export default connect(mapStateToProps, {
  getChats,
  getContactChats,
  searchContacts,
  markSeenAllMessages,
})(ChatSidebar);
