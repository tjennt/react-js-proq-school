import { takeLatest } from "redux-saga/effects";
import * as authType from "../constants/auth";
import * as trancType from "../constants/tranc";
import * as assType from "../constants/assistant";
import * as educationType from "../constants/education";
import * as scheduleType from "../constants/schedule/index";
import * as teacherType from "../constants/teacher";
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
import { getStageSaga } from "./assistant/stage";
import {
  addClassSaga,
  addSeasonSaga,
  addSpecializationSaga,
  addStageSaga,
  addSubjectSaga,
  getSchedulesSaga,
  importExcelStudentEduSaga,
  importExcelTeacherEduSaga,
} from "./educationSaga";
import { getDataSubjectSaga } from "./schedule/subjectSaga";
import { getDataBothStudySaga } from "./schedule/bothStudySaga";
import { getSeasonSaga } from "./assistant/season";
import { getSpecializationSaga } from "./schedule/specialization";
import { addSchedulesSaga } from "./schedule/schedulesSaga";
import {
  getSchedulesTeacgerSaga,
  getTeacherDetailSaga,
  scheduleSaga,
} from "./teacherSaga";
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
  yield takeLatest(assType.GET_DATA_STAGE, getStageSaga);
  yield takeLatest(assType.GET_DATA_SEASON, getSeasonSaga);
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
  yield takeLatest(educationType.CREATE_STAGE, addStageSaga);
  yield takeLatest(educationType.CREATE_SEASON, addSeasonSaga);
  yield takeLatest(educationType.GET_DATA_SCHEDULES, getSchedulesSaga);
  yield takeLatest(educationType.ADD_SEPCIALIZATION, addSpecializationSaga);
  /**
   * Schedule
   */
  yield takeLatest(scheduleType.GET_SUBJECT_FROM_CLASS, getDataSubjectSaga);
  yield takeLatest(scheduleType.GET_BOTHSTUDY, getDataBothStudySaga);
  yield takeLatest(scheduleType.GET_SPECIALIZATION, getSpecializationSaga);
  yield takeLatest(scheduleType.ADD_SCHEDULES, addSchedulesSaga);
  yield takeLatest(teacherType.GET_SCHEDULES_TEACHER, getSchedulesTeacgerSaga);
  yield takeLatest(teacherType.GET_SCHEDULE_ID, getTeacherDetailSaga);
  yield takeLatest(teacherType.SCHEDULES, scheduleSaga);
}
export default rootSaga;
