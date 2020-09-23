import { takeLatest } from "redux-saga/effects";
import * as authType from "../constants/auth";
import * as trancType from "../constants/tranc";
import { loginActionSaga, logoutSaga } from "./authSaga/authSaga";
import {
  getActionSaga,
  searchActionSaga,
  updateApprovedAcceptSaga,
} from "./trancSaga/trancSaga";
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
}
export default rootSaga;
