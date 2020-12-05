import React from "react";
import Sidebar from "react-sidebar";
import { ContextLayout } from "../../../utility/context/Layout";
import ChatSidebarContent from "./ChatSidebar";
import ChatLog from "./ChatLog";
import ChatLogGroup from "./ChatLogGroup";
import ReceiverSidebar from "./receiverProfile";
import UserSidebar from "./UserSidebar";
import "../../../assets/scss/pages/app-chat.scss";
import {
  joinFriend,
  getAllDataGroup,
  saveGroupChat,
  getMessageIdGroup,
  setContact,
  setDataJoin
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
    this.props.setContact(value)
    this.setState({ ...this.state, contactUserChat: value });
  };
  joinFriend = (value) => {
    this.props.joinFriend(value);
    this.props.saveGroupChat(null)

  };
  getIdGroup =(value)=>{
    this.props.saveGroupChat(value)
    this.props.getMessageIdGroup(value)
    this.props.setDataJoin()
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
    console.log(this.props.SaveIdGroup)
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
        {this.props.SaveIdGroup ? 
        <ChatLogGroup
          idGroupChat = {this.props.SaveIdGroup}
          handleReceiverSidebar={this.handleReceiverSidebar}
          mainSidebar={this.onSetSidebarOpen}
          mql={mql}
          handleActiveChat={this.handleActiveChat}
        />
        :
        <ChatLog
          contactUserChat={this.state.contactUserChat}
          saveGroupChat ={this.props.saveGroupChat}
          activeChatID={this.props.chatGroup}
          activeChat={this.state.activeChat}
          activeUser={this.state.activeUser}
          handleReceiverSidebar={this.handleReceiverSidebar}
          mainSidebar={this.onSetSidebarOpen}
          mql={mql}
          handleActiveChat={this.handleActiveChat}
        />
        }
        <ReceiverSidebar
        profile = {this.props.profile}
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
    SaveIdGroup:state.chatProq.SaveIdGroup,
    profile: state.auth.login.values.loggedInUser,

  };
};
export default connect(mapStateToProps, {setContact, joinFriend,setDataJoin, getAllDataGroup,saveGroupChat,getMessageIdGroup})(Chat);
