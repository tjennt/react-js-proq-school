import React from "react";
import Sidebar from "react-sidebar";
import { ContextLayout } from "../../../utility/context/Layout";
import ChatSidebarContent from "./ChatSidebar";
import ChatLog from "./ChatLog";
import ReceiverSidebar from "./receiverProfile";
import UserSidebar from "./UserSidebar";
import "../../../assets/scss/pages/app-chat.scss";
import {
  joinFriend,
  getAllDataGroup,
  saveGroupChat,
  getMessageIdGroup,
  setContact
} from "../../../redux/actions/chatProQ/index";
import { connect } from "react-redux";
const mql = window.matchMedia(`(min-width: 992px)`);

class Chat extends React.Component {
  state = {
    userProfile: false,
    sidebarDocked: mql.matches,
    sidebarOpen: false,
    activeChatID: null,
    activeChat: null,
    activeUser: null,
    receiverProfile: false,
    userSidebar: false,
    contactUserChat: null,
    idGroupChat:null
  };
  handleUserSidebar = (status) => {
    if (status === "open") {
      this.setState({
        userProfile: true,
      });
    } else {
      this.setState({
        userProfile: false,
      });
    }
  };
  handleActiveChat = (id, user, chats) => {
    this.setState({
      activeChatID: id,
      activeUser: user,
      activeChat: chats,
      
    });
  };

  UNSAFE_componentWillMount() {
    mql.addListener(this.mediaQueryChanged);
  }

  componentWillUnmount() {
    mql.removeListener(this.mediaQueryChanged);
  }

  onSetSidebarOpen = (open) => {
    this.setState({ sidebarOpen: open });
  };

  mediaQueryChanged = () => {
    this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
  };

  handleReceiverSidebar = (status) => {
    status === "open"
      ? this.setState({
          receiverProfile: true,
        })
      : this.setState({
          receiverProfile: false,
        });
  };
  setContactUser = (value) => {
    console.log(value)
    this.props.setContact(value)
    this.setState({ ...this.state, contactUserChat: value });
  };
  joinFriend = (value) => {
    this.setState({ ...this.state, activeChatID: value });
    this.props.joinFriend(value);
    this.props.saveGroupChat(null)


  };
  getIdGroup =(value)=>{
    this.props.saveGroupChat(value)
    this.props.getMessageIdGroup(value)
  }
  handleUserSidebar = (status) => {
    status === "open"
      ? this.setState({
          userSidebar: true,
        })
      : this.setState({
          userSidebar: false,
        });
  };

  render() {
    return (
      <div className="chat-application position-relative">
        <div
          className={`chat-overlay ${
            this.state.receiverProfile ||
            this.state.userSidebar ||
            this.state.sidebarOpen
              ? "show"
              : "d-none"
          }`}
          onClick={() => {
            this.handleReceiverSidebar("close");
            this.handleUserSidebar("close");
            this.onSetSidebarOpen(false);
          }}
        />
        <ContextLayout.Consumer>
          {(context) => (
            <Sidebar
              sidebar={
                <ChatSidebarContent
                  getAllDataGroup={this.props.getAllDataGroup}
                  joinFriend={this.joinFriend}
                  getIdGroup={this.getIdGroup}
                  setContactUser={this.setContactUser}
                  activeChatID={this.state.activeChatID}
                  handleActiveChat={this.handleActiveChat}
                  handleUserSidebar={this.handleUserSidebar}
                  mainSidebar={this.onSetSidebarOpen}
                />
              }
              docked={this.state.sidebarDocked}
              open={this.state.sidebarOpen}
              touch={false}
              sidebarClassName="chat-sidebar"
              contentClassName="sidebar-children d-none"
              pullRight={context.state.direction === "rtl"}
            >
              ""
            </Sidebar>
          )}
        </ContextLayout.Consumer>
        <UserSidebar
          userProfile={this.state.userSidebar}
          handleUserSidebar={this.handleUserSidebar}
        />
        <ChatLog
          contactUserChat={this.state.contactUserChat}
          saveGroupChat ={this.props.saveGroupChat}
          activeChatID={this.props.chatGroup}
          idGroupChat = {this.props.SaveIdGroup}
          activeChat={this.state.activeChat}
          activeUser={this.state.activeUser}
          handleReceiverSidebar={this.handleReceiverSidebar}
          mainSidebar={this.onSetSidebarOpen}
          mql={mql}
          handleActiveChat={this.handleActiveChat}
        />
        <ReceiverSidebar
          activeUser={this.state.activeUser}
          receiverProfile={this.state.receiverProfile}
          handleReceiverSidebar={this.handleReceiverSidebar}
        />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    chatGroup: state.chatProq.dataJoin,
    SaveIdGroup:state.chatProq.SaveIdGroup
  };
};
export default connect(mapStateToProps, {setContact, joinFriend, getAllDataGroup,saveGroupChat,getMessageIdGroup})(Chat);
