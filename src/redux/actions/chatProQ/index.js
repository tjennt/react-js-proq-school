import * as chatType from "../../constants/chat/index";
export const joinFriend = (idFriend) => ({
  type: chatType.JOIN_FRIEND,
  payload: {
    idFriend,
  },
});
export const joinFriendSuccss = (data) => ({
  type: chatType.JOIN_FRIEND_SUCCESS,
  payload: {
    data,
  },
});
export const getMessageIdGroup = (idGroup) => ({
  type: chatType.GET_MESSAGE_ID_GROUP,
  payload: {
    idGroup,
  },
});
export const getMessageIdGroupSuccess = (data) => ({
  type: chatType.GET_MESSAGE_ID_GROUP_SUCCESS,
  payload: {
    data,
  },
});
export const sendChat = (idGroup, msg) => ({
  type: chatType.SEND_CHAT,
  payload: {
    idGroup,
    msg,
  },
});
export const sendChatSuccess = (data) => ({
  type: chatType.SEND_CHAT_SUCCESS,
  payload: {
    data,
  },
});
export const receiveChatSocket = (socket) => {
  return (dispatch) => {
    socket.on("SEND_MESSAGE_CHAT", (data) => {
      console.log(data);
      dispatch({
        type: chatType.RECEIEVE_CHAT_SOCKET,
        data: data,
      });
    });
  };
};
export const getAllDataGroup = () => ({
  type: chatType.GET_ALL_DATA_GROUP,
});
export const getAllDataGroupSuccess = (data) => ({
  type: chatType.GET_ALL_DATA_GROUP_SUCCESS,
  payload: {
    data,
  },
});
export const searchChatUser = (text) => ({
  type: chatType.SEARCH_USER_CHAT,
  payload: {
    text,
  },
});
export const searchChatUserSuccess = (data) => ({
  type: chatType.SEARCH_CHAT_USER_SUCCESS,
  payload: {
    data,
  },
});
