import { takeLatest } from "redux-saga/effects";
import * as authType from "../constants/auth";
import * as trancType from "../constants/tranc";
import * as assType from "../constants/assistant";
import { loginActionSaga, logoutSaga } from "./authSaga/authSaga";
import {
  getActionSaga,
  searchActionSaga,
  updateApprovedAcceptSaga,
} from "./trancSaga/trancSaga";
import { getStudentActionSaga } from "./assistant/student";
function* rootSaga() {
  //login //auth
  yield takeLatest(authType.LOGIN, loginActionSaga);
  yield takeLatest(authType.LOGOUT, logoutSaga);
  //transaction
  yield takeLatest(trancType.GET_DATA_TRANSACTION, getActionSaga);
  yield takeLatest(trancType.TRANSACTION_SEARCH, searchActionSaga);
  yield takeLatest(
    trancType.UPDATE_STATUS_TRANSACTION_APPROVED,
    updateApprovedAcceptSaga
  );
  //assistant
  yield takeLatest(assType.GET_DATA_STUDENT_ASS, getStudentActionSaga);
}
export default rootSaga;
