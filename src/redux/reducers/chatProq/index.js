import * as chatType from "../../constants/chat";
let initialState = {
  dataJoin: null,
  contentMessageIdGroup: [],
  dataGroup: [],
  dataSearch: [],
  SaveIdGroup:null,
  contact:null
};
const rootChat = (state = initialState, action) => {
  switch (action.type) {
    case chatType.JOIN_FRIEND: {
      return {
        ...state,
      };
    }
    case chatType.JOIN_FRIEND_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        dataJoin: data,
      };
    }
    case chatType.GET_MESSAGE_ID_GROUP: {
      return {
        ...state,
      };
    }
    case chatType.GET_MESSAGE_ID_GROUP_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        contentMessageIdGroup: data,
      };
    }
    case chatType.RECEIEVE_CHAT_SOCKET: {
      const { data } = action;
      state.contentMessageIdGroup.push(data);
      return {
        ...state,
        // contentMessageIdGroup: state.contentMessageIdGroup.concat(data),
      };
    }
    case chatType.GET_ALL_DATA_GROUP: {
      return {
        ...state,
      };
    }
    case chatType.GET_ALL_DATA_GROUP_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        dataGroup: data,
      };
    }
    case chatType.SEARCH_USER_CHAT: {
      return {
        ...state,
      };
    }
    case chatType.SEARCH_CHAT_USER_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        dataSearch: data,
      };
    }
    case chatType.STORE_SAVE_GROUP_CHAT:{
      const {id} = action.payload
      return{
        ...state,
        SaveIdGroup:id
      }
    }
    case chatType.SET_CONTACT:{
      const {value} = action.payload
      return{
        ...state,
        contact:value
      }
    }
    default:
      return state;
  }
};
export default rootChat;
