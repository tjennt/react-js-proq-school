import React from "react";
import { Card, FormGroup, Input, Badge } from "reactstrap";
import { X, PlusCircle } from "react-feather";
import PerfectScrollbar from "react-perfect-scrollbar";
import { connect } from "react-redux";
import userImg from "../../../assets/img/portrait/small/avatar-s-11.jpg";
import { newDate } from "../../../utility/config";
import { searchChatUser,addChatGroup ,setContact} from "../../../redux/actions/chatProQ";
import AsyncSelect from "react-select/async";
import {
  API_ENDPOINT_IMG,
  API_ENDPOINT_IMG_TEACHER,
} from "../../../redux/constants";
import { Modal } from "antd";
import "antd/dist/antd.css";
import Axios from "axios";
import { getToken } from "../../../utility/auth/setAuthToken";
let config
class ChatSidebar extends React.Component {
  state = {
    chatsContacts: [],
    contacts: [],
    messages: [],
    status: null,
    value: "",
    nameGroup:"",
    inputValue: [],
    isModalVisible: false,
  };

  componentDidMount() {
    // this.props.getAllDataGroup();
    let  token = getToken()
    config = {
    headers: {
      "content-type": "application/json; charset=utf-8",
      authorization: `Bearer ${token}`,
    },
  };
  }
  handleOnChange = (e) => {
    this.setState({ value: e.target.value });
    this.props.searchChatUser(this.state.value);
  };
  searchChatUser = () => {
    this.props.searchChatUser(this.state.value);
  };
  handleOk = () => {
    this.props.addChatGroup(this.state.inputValue,this.state.nameGroup)
    this.setState({
      ...this.state,
      isModalVisible:false
    })
  };
  handleCancel = () => {
    this.setState({
      ...this.state,
      isModalVisible: false,
    });
  };
  joinFriendSearch = (item) => {
    const valueContact={
      id:item._id,
      avatar: `uploads/user-avatar/${item.avatar}`,
      user:{
        fullName:item.fullName
      }
    }
    this.props.joinFriend(item.idUser);
    this.props.setContact(valueContact)
  };
  joinFriend = (item) => {
    if(item.info){
      console.log("group")
      this.props.getIdGroup(item._id);
    }else{
      this.props.joinFriend(item.user._id);
    }
    this.props.setContactUser(item);
  };
  showModal = () => {
    this.setState({
      ...this.state,
      isModalVisible: true,
    });
  };
  
  handleChangeSearch = (selectedOption) => {
    this.setState({
      ...this.state,
      inputValue: selectedOption,
    });
    
  };
  fetchData = (inputValue, callback) => {
    if (!inputValue) {
      callback([]);
    } else {
      setTimeout(() => {
        Axios.get(
          `https://server-dev.asia/v1/users/search?text=${inputValue}`,config
        )
          .then((data) => {
            const tempArray = [];
            data.data.payload.forEach((element) => {
              tempArray.push({
                label: `${element.fullName}`,
                value: element.idUser,
              });
            });
            callback(tempArray);
          })
          .catch((error) => {
            console.log(error, "catch the hoop");
          });
      });
    }
  };
  render() {
    const { status, value, isModalVisible } = this.state;
    const { chatGroup, dataUserSearch } = this.props;
    return (
      <Card className="sidebar-content h-100">
        <Modal
          title="Taọ nhóm chat"
          visible={isModalVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
        <Input
          onChange={e=>this.setState({nameGroup:e.target.value})}
          placeholder="Vui lòng nhập tên nhóm"
        />
          <AsyncSelect
          className="mt-2"
            isMulti
            // labelKey={"fullName"}
            // valueKey={"_id"}
            // options={optionUser}
            onChange={this.handleChangeSearch}
            defaultOptions={false}
            loadOptions={this.fetchData}
          />
        </Modal>
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
                <img src={`${this.props.profile.studentId? `${API_ENDPOINT_IMG}/${this.props.profile.studentId.avatar}`:`${API_ENDPOINT_IMG_TEACHER}/${this.props.profile.teacherId.avatar}`}`} alt="User Profile" height="40" width="40" />
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
                style={{ width: "80%" }}
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
              {/* <div
                onClick={this.searchChatUser}
                className="form-control-position"
                style={{ cursor: "pointer" }}
              >
                <Search size={15} />
              </div> */}
              <div
                onClick={this.showModal}
                className="form-control-position"
                style={{ cursor: "pointer" }}
              >
                <PlusCircle size={20} />
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
                          src={ item.avatar ?` ${API_ENDPOINT_IMG}/${item.avatar}`:"" }
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
                      {item.type ==="group" ?
                          <img
                          src={`${API_ENDPOINT_IMG_TEACHER}/${item.avatarGroup.name}`}
                          alt={item.avatarGroup.name}
                          height="38"
                          width="38"
                        />
                       : <img
                          src={ item.avatar ?` ${API_ENDPOINT_IMG_TEACHER}/${item.avatar}`:""}
                          alt={userImg}
                          height="38"
                          width="38"
                        /> }
                        
                      </span>
                    </div>
                    <div className="user-chat-info">
                      <div className="contact-info">
                      {item.user ? <div> {item.user.fullName}</div> : <div>{item.name}</div>  }
                       
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
    profile: state.auth.login.values.loggedInUser,
    dataUserSearch: state.chatProq.dataSearch,
  };
};
export default connect(mapStateToProps, {
  searchChatUser,
  addChatGroup,
  setContact
})(ChatSidebar);
