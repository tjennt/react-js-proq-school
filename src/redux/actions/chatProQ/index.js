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
export const sendChatGroup = (idGroup, msg) => ({
  type: chatType.SEND_CHAT_GROUP,
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
export const receiveChatSocket = (io,dataGroup) => {
  return (dispatch) => {
    io.on("SEND_MESSAGE_CHAT", (data) => {
      const dataRes ={
        images:data.images,
        files:data.files,
        viewers:data.viewers,
        _id:data._id,
        content:data.content,
        group:data.group._id,
        from:data.from,
        createAt:data.createAt,
        updateAt:data.updateAt
      }
        dispatch({
        type: chatType.RECEIEVE_CHAT_SOCKET,
        data: dataRes,
      });
    });
  };
};
export const receiveChatGroupSocket = (io) => {
  return (dispatch) => {
    io.on("SEND_MESSAGE_CHAT", (data) => { 
      const dataRes ={
        images:data.images,
        files:data.files,
        viewers:data.viewers,
        _id:data._id,
        content:data.content,
        group:data.group._id,
        from:data.from,
        createAt:data.createAt,
        updateAt:data.updateAt
      }
        dispatch({
        type: chatType.RECEIEVE_CHAT_SOCKET_GROUP,
        data: dataRes,
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

export const addChatGroup =(data,nameGroup,params)=>({
  type:chatType.ADD_CHAT_GROUP,
  payload:{
    data,
    nameGroup,
    params
  }
})
export const saveGroupChat =(id)=>({
  type:chatType.STORE_SAVE_GROUP_CHAT,
  payload:{
    id
  }
})

export const setContact=(value) =>({
  type:chatType.SET_CONTACT,
  payload:{
    value
  }
})
export const setDataJoin =()=>({
  type:chatType.SET_DATA_JOIN
})