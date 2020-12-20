import React from "react";
import ReactDOM from "react-dom";
import { Input, Button } from "reactstrap";
import { Menu, MessageSquare, Send, Smile } from "react-feather";
import PerfectScrollbar from "react-perfect-scrollbar";
import { connect } from "react-redux";
import { togglePinned, sendMessage } from "../../../redux/actions/chat/index";
import {
  getMessageIdGroup,
  sendChatGroup,
  receiveChatGroupSocket,
} from "../../../redux/actions/chatProQ";
import io from "socket.io-client";
import ReactEmoji from "react-emoji";
import "emoji-mart/css/emoji-mart.css";
import img from "../../../assets/img/default.jpg";
import { Picker } from "emoji-mart";

let socket;
class ChatLogGroup extends React.Component {
  state = {
    idGroupID: null,
    idGroupChat: null,
    msg: "",
    contactName: null,
    avatar: null,
    showEmojis: false,
    chatContent: [],
  };
  componentDidUpdate(prevProps, prevState) {
    if (this.props.idGroupChat !== null) {
      if (this.props.idGroupChat !== prevState.idGroupChat) {
        this.setState({ idGroupChat: this.props.idGroupChat });
      }
    }
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
  componentDidMount() {
    socket = io(`https://server-dev.asia`);
    this.props.receiveChatGroupSocket(socket);
    this.scrollToBottom();
  }
  componentWillUnmount() {
    try {
      socket.disconnect();
    } catch (error) {}
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
    if (this.state.idGroupChat) {
      this.props.sendChatGroup(this.state.idGroupChat, this.state.msg);
      this.setState({
        ...this.state,
        msg: "",
      });
    }
  };
  changeInput = (e) => {
    this.setState({
      ...this.state,
      msg: e.target.value,
    });
  };
  addEmoji = (emoji) => {
    this.setState({
      msg: `${this.state.msg}${emoji.native}`,
    });
  };
  render() {
    const { chatContent, idUserMe, contact } = this.props;
    console.log(contact);
    const { idGroupChat } = this.state;
    console.log(chatContent);
    return (
      <div className="content-right">
        <div className="chat-app-window ">
          <div
            className={`start-chat-area ${idGroupChat ? "d-none" : "d-flex"}`}
          >
            <span className="mb-1 start-chat-icon">
              <MessageSquare size={50} />
            </span>
            <h4 className="py-50 px-1 sidebar-toggle start-chat-text">
              Vui lòng chọn trò chuyện
            </h4>
          </div>
          <div className={` active-chat ${idGroupChat ? "d-block" : "d-none"}`}>
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
                    {contact && contact.type === "group" ? (
                      <img
                        src={img}
                        alt={contact.avatarGroup.name}
                        height="38"
                        width="38"
                      />
                    ) : (
                      <img
                        src={img}
                        alt={contact ? contact.avatar : ""}
                        height="38"
                        width="38"
                      />
                    )}

                    <span className={"avatar-status-online"} />
                  </div>
                  {contact && contact.type === "group" ? (
                    <h6 className="mb-0">{contact.name}</h6>
                  ) : (
                    <div>{contact ? contact.user.fullName : ""}</div>
                  )}
                </div>
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
                          {idGroupChat === content.group ? (
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
                                    src={img}
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
                          ) : null}
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
    contact: state.chatProq.contact,
    dataGroup: state.chatProq.dataGroup,
  };
};
export default connect(mapStateToProps, {
  togglePinned,
  sendMessage,
  getMessageIdGroup,
  sendChatGroup,
  receiveChatGroupSocket,
})(ChatLogGroup);
