import { takeLatest } from "redux-saga/effects";
import * as authType from "../constants/auth";
import * as trancType from "../constants/tranc";
import * as assType from "../constants/assistant";
import * as educationType from "../constants/education";
import * as scheduleType from "../constants/schedule/index";
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
  addClassSaga,
  addSubjectSaga,
  importExcelStudentEduSaga,
  importExcelTeacherEduSaga,
} from "./educationSaga";
import { getDataSemesterSaga } from "./schedule/semesterSaga";
import { getDataSubjectSaga } from "./schedule/subjectSaga";
import { getDataBothStudySaga } from "./schedule/bothStudySaga";
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
  yield takeLatest(educationType.ADD_CLASS, addClassSaga);
  yield takeLatest(educationType.ADD_SUBJECT, addSubjectSaga);
  /**
   * Schedule
   */
  yield takeLatest(scheduleType.GET_SEMESTER, getDataSemesterSaga);
  yield takeLatest(scheduleType.GET_SUBJECT_FROM_CLASS, getDataSubjectSaga);
  yield takeLatest(scheduleType.GET_BOTHSTUDY, getDataBothStudySaga);
}
export default rootSaga;
