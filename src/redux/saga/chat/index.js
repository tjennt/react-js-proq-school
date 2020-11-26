import { call, put } from "redux-saga/effects";
import {
  getAllDataGroupSuccess,
  getMessageIdGroupSuccess,
  joinFriendSuccss,
} from "../../actions/chatProQ";
import {
  joinFriendApi,
  getMessageGroupByIdApi,
  sendChat,
  getAllGroupApi,
} from "../../api/chat";
export function* joinFriend({ payload }) {
  const { idFriend } = payload;
  try {
    const res = yield call(joinFriendApi, idFriend);
    const { data } = res;
    if (data.success) {
      yield put(joinFriendSuccss(data.payload));
    }
  } catch (error) {}
}
export function* getMessageGroupByIdSaga({ payload }) {
  const { idGroup } = payload;
  try {
    const res = yield call(getMessageGroupByIdApi, idGroup);
    const { data } = res;
    if (data.success) {
      yield put(getMessageIdGroupSuccess(data.payload.reverse()));
    }
  } catch (error) {}
}
export function* sendChatSaga({ payload }) {
  const { idGroup, msg } = payload;
  console.log(payload);
  const data = {
    content: msg,
  };
  try {
    const res = yield call(sendChat, idGroup, data);
    console.log(res);
  } catch (error) {}
}
export function* getAllGroupSaga() {
  try {
    const res = yield call(getAllGroupApi);
    console.log(res);
    const { data } = res;
    if (data.success) {
      yield put(getAllDataGroupSuccess(data.payload));
    }
  } catch (error) {}
}