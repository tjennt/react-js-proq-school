import { call, put } from "redux-saga/effects";
import {
  getAllDataGroupSuccess,
  getMessageIdGroupSuccess,
  joinFriendSuccss,
  searchChatUserSuccess,
  getAllDataGroup
} from "../../actions/chatProQ";
import {
  joinFriendApi,
  getMessageGroupByIdApi,
  sendChat,
  getAllGroupApi,
  searchUserApi,
  addChatGroupApi
} from "../../api/chat";
export function* joinFriend({ payload }) {
  const { idFriend } = payload;
  try {
    const res = yield call(joinFriendApi, idFriend||"");
    const { data } = res;
    if (data.success) {
      yield put(joinFriendSuccss(data.payload));
    }
  } catch (error) {}
}
export function* getMessageGroupByIdSaga({ payload }) {
  const { idGroup } = payload;   
  console.log(idGroup)
  try {
    const res = yield call(getMessageGroupByIdApi, idGroup||"");
    const { data } = res;
    if (data.success) {
      yield put(getMessageIdGroupSuccess(data.payload.reverse()));
    }
  } catch (error) {}
}
export function* sendChatSaga({ payload }) {
  const { idGroup, msg } = payload;
  const data = {
    content: msg,
  };
  try {
    yield call(sendChat, idGroup, data);
  } catch (error) {}
}
export function* sendChatGroupSaga({ payload }) {
  const { idGroup, msg } = payload;
  const data = {
    content: msg,
  };
  try {
    yield call(sendChat, idGroup, data);
  } catch (error) {}
}
export function* getAllGroupSaga() {
  try {
    const res = yield call(getAllGroupApi);
    const { data } = res;
    if (data.success) {
      yield put(getAllDataGroupSuccess(data.payload));
    }
  } catch (error) {}
}
export function* searchUserSaga({ payload }) {
  const { text } = payload;
  let param = {};
  if (text) {
    param = {
      text: text,
    };
  } else {
    param = {};
  }

  try {
    const res = yield call(searchUserApi, param);
    const { data } = res;
    if (data.success) {
      yield put(searchChatUserSuccess(data.payload));
    }
  } catch (error) {}
}

export  function* addChatGroupSaga({payload}){
  const {data,nameGroup} =payload
  console.log(data)
  const arrData =data.map(item=>item.value)
  const dataReq={
    mems:arrData,
    name: nameGroup||"Không tên",
  }
  const params={}
  try {
    const res = yield call(addChatGroupApi,dataReq)
    const {data} =res
    if(data.success){
      yield put(getAllDataGroup(params))
    }
  } catch (error) {
    
  }
}