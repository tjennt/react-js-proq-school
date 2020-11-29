import React from "react";
import ReactDOM from "react-dom";
import { Input, Button } from "reactstrap";
import { Menu, MessageSquare, Send, Smile } from "react-feather";
import PerfectScrollbar from "react-perfect-scrollbar";
import { connect } from "react-redux";
import { togglePinned, sendMessage } from "../../../redux/actions/chat/index";
import userImg from "../../../assets/img/portrait/small/avatar-s-11.jpg";
import {
  getMessageIdGroup,
  sendChat,
  receiveChatSocket,
} from "../../../redux/actions/chatProQ";
import io from "socket.io-client";
import ReactEmoji from "react-emoji";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import { API_ENDPOINT_IMG } from "../../../redux/constants";

let socket;
class ChatLog extends React.Component {
  // static getDerivedStateFromProps(props, state) {
  //   // console.log(props.activeChatID);
  //   const { dataJoin } = props.activeChatID;
  //   // if (dataJoin !== state.idGroupID) {
  //   //   props.getMessageIdGroup(props.activeChatID.dataJoin._id);
  //   // }

  //   if (dataJoin !== state.idGroupID) {
  //     return {
  //       idGroupID: dataJoin,
  //       // activeChat: props.activeChat,
  //     };
  //   }
  //   // Return null if the state hasn't changed
  //   return null;
  // }

  state = {
    idGroupID: null,
    msg: "",
    contactName: null,
    avatar: null,
    activeUser: null,
    activeChat: null,
    showEmojis: false,
  };
  componentDidUpdate(prevProps, prevState) {
    if (this.props.activeChatID !== null) {
      if (this.props.activeChatID._id !== prevState.idGroupID) {
        this.setState({ idGroupID: this.props.activeChatID._id });
        this.props.getMessageIdGroup(this.props.activeChatID._id);
      }
    }
    if (this.props.contactUserChat !== null) {
      if (this.props.contactUserChat.user.fullName !== prevState.contactName) {
        this.setState({
          contactName: this.props.contactUserChat.user.fullName,
        });
      }
      if (this.props.contactUserChat.user.avatar !== prevState.avatar) {
        this.setState({
          avatar: this.props.contactUserChat.user.avatar,
        });
      }
    }
    // if (this.state.idGroupID) {
    //   console.log(this.state.idGroupID._id);
    // }
    this.scrollToBottom();
  }
  showEmojis = (e) => {
    this.setState(
      {
        showEmojis: true,
      },
      () => document.addEventListener("click", this.closeMenu)
    );
  };
  hideEmojs = () => {
    this.setState({
      showEmojis: false,
    });
  };
  // handleSendMessage = (id, isPinned, text) => {
  //   if (text.length > 0) {
  //     this.props.sendMessage(id, isPinned, text);
  //     this.setState({
  //       msg: "",
  //     });
  //   }
  // };
  componentDidMount() {
    socket = io(`https://server-dev.asia`);
    this.props.receiveChatSocket(socket);
    // console.log(socket);
    // socket.on("SEND_MESSAGE_CHAT", (data) => console.log(data));
    this.scrollToBottom();
  }

  handleTime = (time_to, time_from) => {
    const date_time_to = new Date(Date.parse(time_to));
    const date_time_from = new Date(Date.parse(time_from));
    return (
      date_time_to.getFullYear() === date_time_from.getFullYear() &&
      date_time_to.getMonth() === date_time_from.getMonth() &&
      date_time_to.getDate() === date_time_from.getDate()
    );
  };

  scrollToBottom = () => {
    const chatContainer = ReactDOM.findDOMNode(this.chatArea);
    chatContainer.scrollTop = chatContainer.scrollHeight;
  };
  handlleMessage = (e) => {
    e.preventDefault();
    this.props.sendChat(this.state.idGroupID, this.state.msg);
    this.setState({
      ...this.state,
      msg: "",
    });
  };
  changeInput = (e) => {
    this.setState({
      ...this.state,
      msg: e.target.value,
    });
  };
  addEmoji = (emoji) => {
    console.log(emoji);
    this.setState({
      msg: `${this.state.msg}${emoji.native}`,
    });
  };
  render() {
    const { chatContent, idUserMe } = this.props;
    const { idGroupID, contactName, avatar } = this.state;
    console.log(idGroupID);

    return (
      <div className="content-right">
        <div className="chat-app-window ">
          <div className={`start-chat-area ${idGroupID ? "d-none" : "d-flex"}`}>
            <span className="mb-1 start-chat-icon">
              <MessageSquare size={50} />
            </span>
            <h4 className="py-50 px-1 sidebar-toggle start-chat-text">
              Vui lòng chọn trò chuyện
            </h4>
          </div>
          <div className={` active-chat ${idGroupID ? "d-block" : "d-none"}`}>
            <div className="chat_navbar">
              <header className="chat_header d-flex justify-content-between align-items-center p-1">
                <div className="d-flex align-items-center">
                  <div
                    className="sidebar-toggle d-block d-lg-none mr-1"
                    onClick={() => this.props.mainSidebar(true)}
                  >
                    <Menu size={24} />
                  </div>
                  <div
                    className="avatar user-profile-toggle m-0 m-0 mr-1"
                    onClick={() => this.props.handleReceiverSidebar("open")}
                  >
                    <img
                      src={`${API_ENDPOINT_IMG}/${avatar}`}
                      alt={userImg}
                      height="40"
                      width="40"
                    />
                    <span className={"avatar-status-online"} />
                  </div>
                  <h6 className="mb-0">{contactName}</h6>
                </div>
                {/* <span
                  className="favorite"
                  onClick={() => {
                    if (activeChat) {
                      this.props.togglePinned(
                        activeUser.uid,
                        !activeChat.isPinned
                      );
                    }
                  }}
                >
                  <Star
                    size={22}
                    stroke={
                      activeChat && activeChat.isPinned === true
                        ? "#FF9F43"
                        : "#626262"
                    }
                  />
                </span> */}
              </header>
            </div>
            <PerfectScrollbar
              className="user-chats"
              options={{
                wheelPropagation: false,
              }}
              ref={(el) => {
                this.chatArea = el;
              }}
            >
              <div className="chats">
                <React.Fragment>
                  {" "}
                  {chatContent
                    ? chatContent.map((content) => (
                        <div key={content._id}>
                          {
                            (content.group = idGroupID ? (
                              <div
                                className={`${
                                  content.from === idUserMe
                                    ? "chat  chat-right"
                                    : "chat chat-left"
                                }`}
                              >
                                <div className="chat-avatar">
                                  <div className="avatar m-0">
                                    <img
                                      src={userImg}
                                      alt="chat avatar"
                                      height="40"
                                      width="40"
                                    />
                                  </div>
                                </div>
                                <div className="chat-body">
                                  <div className="chat-content">
                                    {ReactEmoji.emojify(content.content)}
                                  </div>
                                </div>
                              </div>
                            ) : null)
                          }
                        </div>
                      ))
                    : "Không có tin nhắn"}
                </React.Fragment>
              </div>
            </PerfectScrollbar>
            <div className="chat-app-form">
              <form
                className="chat-app-input d-flex align-items-center justify-content-between"
                onSubmit={this.handlleMessage}
              >
                <Input
                  type="text"
                  className="message mr-1 ml-50 w-75"
                  placeholder="Vui lòng nhập tin nhắn "
                  value={this.state.msg}
                  onChange={this.changeInput}
                />
                {this.state.showEmojis ? (
                  <span
                    // style={styles.emojiPicker}
                    className="emoji-mart"
                    // onLeave={true}
                    onSelect={this.addEmoji}
                    onMouseLeave={this.hideEmojs}
                    ref={(el) => (this.emojiPicker = el)}
                  >
                    <Picker
                      onSelect={this.addEmoji}
                      emojiTooltip={true}
                      title="weChat"
                    />
                  </span>
                ) : null}
                <p
                  // style={styles.getEmojiButton}
                  onClick={this.showEmojis}
                >
                  <Smile style={{ cursor: "pointer" }} />
                  {/* {String.fromCodePoint(0x1f60a)} */}
                </p>
                <Button color="primary">
                  <Send className="d-lg-none" size={15} />
                  <span className="d-lg-block d-none">Send</span>
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    chat: state.chatApp.chats,
    chatContent: state.chatProq.contentMessageIdGroup,
    idUserMe: state.auth.login.values.loggedInUser._id,
  };
};
export default connect(mapStateToProps, {
  togglePinned,
  sendMessage,
  getMessageIdGroup,
  sendChat,
  receiveChatSocket,
})(ChatLog);
