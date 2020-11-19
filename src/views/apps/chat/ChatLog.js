import React from "react";
import ReactDOM from "react-dom";
import { Input, Button } from "reactstrap";
import { Menu, Send } from "react-feather";
import PerfectScrollbar from "react-perfect-scrollbar";
import { connect } from "react-redux";
import { togglePinned, sendMessage } from "../../../redux/actions/chat/index";
import userImg from "../../../assets/img/portrait/small/avatar-s-11.jpg";

class ChatLog extends React.Component {
  // static getDerivedStateFromProps(props, state) {
  //   if (
  //     props.activeUser !== state.activeChat ||
  //     props.activeChat !== state.activeChat
  //   ) {
  //     return {
  //       activeUser: props.activeUser,
  //       activeChat: props.activeChat,
  //     };
  //   }
  //   // Return null if the state hasn't changed
  //   return null;
  // }
  state = {
    msg: "",
    activeUser: null,
    activeChat: null,
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
    this.scrollToBottom();
  }
  componentDidUpdate() {
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

  render() {
    const { activeUser } = this.state;
    // let activeUserUid = activeUser && activeUser.uid ? activeUser.uid : null,
    //   activeChat =
    //     activeUser && activeUser.uid
    //       ? this.props.chat.chats[activeUserUid]
    //       : null;

    // let renderChats =
    //   activeChat && activeChat !== undefined && activeChat.msg
    //     ? activeChat.msg.map((chat, i) => {
    //         let renderSentTime = () => {
    //           if (
    //             i > 0 &&
    //             !this.handleTime(chat.time, activeChat.msg[i - 1].time)
    //           ) {
    //             return (
    //               <div className="divider">
    //                 <div className="divider-text">
    //                   {new Date().getDate() +
    //                     " " +
    //                     new Date().toLocaleString("default", {
    //                       month: "short",
    //                     })}
    //                 </div>
    //               </div>
    //             );
    //           }
    //         };
    //         let renderAvatar = () => {
    //           if (i > 0) {
    //             if (
    //               chat.isSent === true &&
    //               activeChat.msg[i - 1].isSent !== true
    //             ) {
    //               return (
    //                 <div className="chat-avatar">
    //                   <div className="avatar m-0">
    //                     <img
    //                       src={userImg}
    //                       alt="chat avatar"
    //                       height="40"
    //                       width="40"
    //                     />
    //                   </div>
    //                 </div>
    //               );
    //             } else if (chat.isSent !== true) {
    //               return (
    //                 <div className="chat-avatar">
    //                   <div className="avatar m-0">
    //                     <img
    //                       src={activeUser.photoURL}
    //                       alt="chat avatar"
    //                       height="40"
    //                       width="40"
    //                     />
    //                   </div>
    //                 </div>
    //               );
    //             } else {
    //               return "";
    //             }
    //           } else {
    //             return (
    //               <div className="chat-avatar">
    //                 <div className="avatar m-0">
    //                   <img
    //                     src={chat.isSent ? userImg : activeUser.photoURL}
    //                     alt="chat avatar"
    //                     height="40"
    //                     width="40"
    //                   />
    //                 </div>
    //               </div>
    //             );
    //           }
    //         };
    //         return (
    //       <React.Fragment key={i}>
    //         {renderSentTime()}
    //         <div
    //           className={`chat ${
    //             chat.isSent !== true ? "chat-left" : "chat-right"
    //           }`}
    //         >
    //           {renderAvatar()}
    //           <div className="chat-body">
    //             <div className="chat-content">{chat.textContent}</div>
    //           </div>
    //         </div>
    //       </React.Fragment>
    //     );
    //   })
    // : null;

    return (
      <div className="content-right">
        <div className="chat-app-window">
          <div
            className={`active-chat "d-block"
            }`}
          >
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
                    <img src={userImg} alt={userImg} height="40" width="40" />
                    <span className={"avatar-status-online"} />
                  </div>
                  <h6 className="mb-0">linh </h6>
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
                  <div
                    className={`chat  chat-right 
                   `}
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
                      <div className="chat-content">Bắt đầu </div>
                    </div>
                  </div>
                  <div
                    className={`chat chat-left
                   `}
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
                      <div className="chat-content">Kết thúc</div>
                    </div>
                  </div>
                </React.Fragment>
              </div>
            </PerfectScrollbar>
            <div className="chat-app-form">
              <form
                className="chat-app-input d-flex align-items-center"
                onSubmit={(e) => {
                  e.preventDefault();
                  this.handleSendMessage(
                    activeUser.uid,
                    false,
                    this.state.msg,
                    activeUser
                  );
                }}
              >
                <Input
                  type="text"
                  className="message mr-1 ml-50"
                  placeholder="Type your message"
                  value={this.state.msg}
                  onChange={(e) => {
                    e.preventDefault();
                    this.setState({
                      msg: e.target.value,
                    });
                  }}
                />
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
  };
};
export default connect(mapStateToProps, { togglePinned, sendMessage })(ChatLog);
