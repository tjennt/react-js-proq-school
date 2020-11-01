import { takeLatest } from "redux-saga/effects";
import * as authType from "../constants/auth";
import * as trancType from "../constants/tranc";
import * as assType from "../constants/assistant";
import * as educationType from "../constants/education";
import {
  loginActionSaga,
  loginWithGoogleSaga,
  logoutSaga,
} from "./authSaga/authSaga";
import {
  getActionSaga,
  searchActionSaga,
  updateApprovedAcceptSaga,
} from "./trancSaga/trancSaga";
import { getStudentActionSaga } from "./assistant/student";
import { getTeacherActionSaga } from "./assistant/teacher";
import { getClassActionSaga } from "./assistant/class";
import { getSubjectActionSaga } from "./assistant/subject";
import {
  importExcelStudentEduSaga,
  importExcelTeacherEduSaga,
} from "./educationSaga";
function* rootSaga() {
  //login //auth
  yield takeLatest(authType.LOGIN, loginActionSaga);
  yield takeLatest(authType.LOGOUT, logoutSaga);
  yield takeLatest(authType.LOGIN_GOOGLE, loginWithGoogleSaga);
  //transaction
  yield takeLatest(trancType.GET_DATA_TRANSACTION, getActionSaga);
  yield takeLatest(trancType.TRANSACTION_SEARCH, searchActionSaga);
  yield takeLatest(
    trancType.UPDATE_STATUS_TRANSACTION_APPROVED,
    updateApprovedAcceptSaga
  );
  //assistant
  yield takeLatest(assType.GET_DATA_STUDENT_ASS, getStudentActionSaga);
  yield takeLatest(assType.GET_DATA_TEACHER_ASS, getTeacherActionSaga);
  yield takeLatest(assType.GET_DATA_CLASS_ASS, getClassActionSaga);
  yield takeLatest(assType.GET_DATA_SUBJECT_ASS, getSubjectActionSaga);
  //education
  yield takeLatest(
    educationType.IMPORT_EXCEL_STUDENT,
    importExcelStudentEduSaga
  );
  yield takeLatest(
    educationType.IMPORT_EXCEL_TEACHER,
    importExcelTeacherEduSaga
  );
}
export default rootSaga;
