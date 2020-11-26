import { takeLatest } from "redux-saga/effects";
import * as authType from "../constants/auth";
import * as trancType from "../constants/tranc";
import * as assType from "../constants/assistant";
import * as educationType from "../constants/education";
import * as scheduleType from "../constants/schedule/index";
import * as teacherType from "../constants/teacher";
import * as studentType from "../constants/student";
import * as chatType from "../constants/chat";
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
import {
  deleteDataStudentSaga,
  exportExcelStudentSaga,
  getStudentActionSaga,
  updateDataStudentSaga,
} from "./assistant/student";
import {
  exportExcelTeacherSaga,
  getTeacherActionSaga,
  updateDataTeacherSaga,
  deleteDataTeacherSaga,
} from "./assistant/teacher";
import {
  getClassActionSaga,
  updateDataClassSaga,
  deleteDataClassSaga,
} from "./assistant/class";
import { getSubjectActionSaga, updateSubjectSaga } from "./assistant/subject";
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
import {
  getDataSubjectSaga,
  getDataSubjectUpdateSaga,
} from "./schedule/subjectSaga";
import { getDataBothStudySaga } from "./schedule/bothStudySaga";
import { getSeasonSaga } from "./assistant/season";
import {
  getSpecializationSaga,
  updateDataSpecialSaga,
} from "./schedule/specialization";
import {
  addSchedulesSaga,
  deleteScheduleSaga,
  updateSchedulesSaga,
} from "./schedule/schedulesSaga";
import {
  getProfileTeacherSaga,
  getSchedulesTeacgerSaga,
  getTeacherDetailSaga,
  scheduleSaga,
  getDataSchedulesAllSaga,
} from "./teacherSaga";
import {
  getDataProfileStudentSaga,
  getDataSchedulesDetailIdSaga,
  getDataSchedulesIdSaga,
  getDataScheduleStudentSaga,
} from "./student/index";
import {
  getAllGroupSaga,
  getMessageGroupByIdSaga,
  joinFriend,
  sendChatSaga,
} from "./chat";
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
  yield takeLatest(assType.EXPORT_EXCEL_STUDENT, exportExcelStudentSaga);
  yield takeLatest(assType.EXPORT_EXCEL_TEACHER, exportExcelTeacherSaga);
  yield takeLatest(assType.UPDATE_DATA_STUDENT, updateDataStudentSaga);
  yield takeLatest(assType.DELETE_DATA_STUDENT, deleteDataStudentSaga);
  yield takeLatest(assType.UPDATE_DATA_TEACHER, updateDataTeacherSaga);
  yield takeLatest(assType.DELETE_DATA_TEACHER, deleteDataTeacherSaga);
  yield takeLatest(assType.UPDATE_DATA_CLASS, updateDataClassSaga);
  yield takeLatest(assType.DELETE_DATA_CLASS, deleteDataClassSaga);
  yield takeLatest(assType.UPDATE_DATA_SUBJECT, updateSubjectSaga);
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
  yield takeLatest(
    scheduleType.UPDATE_DATA_SPECIALIZATION,
    updateDataSpecialSaga
  );
  /**
   * Schedule
   */
  yield takeLatest(scheduleType.GET_SUBJECT_FROM_CLASS, getDataSubjectSaga);
  yield takeLatest(scheduleType.GET_SUBJECT_UPDATE, getDataSubjectUpdateSaga);
  yield takeLatest(scheduleType.GET_BOTHSTUDY, getDataBothStudySaga);
  yield takeLatest(scheduleType.GET_SPECIALIZATION, getSpecializationSaga);
  yield takeLatest(scheduleType.ADD_SCHEDULES, addSchedulesSaga);
  yield takeLatest(scheduleType.UPDATE_SCHEDULES, updateSchedulesSaga);
  yield takeLatest(scheduleType.DELETE_SCHEDULES, deleteScheduleSaga);
  yield takeLatest(teacherType.GET_SCHEDULES_TEACHER, getSchedulesTeacgerSaga);
  yield takeLatest(teacherType.GET_SCHEDULE_ID, getTeacherDetailSaga);
  yield takeLatest(teacherType.SCHEDULES, scheduleSaga);
  yield takeLatest(teacherType.GET_SCHEDULES_ALL, getDataSchedulesAllSaga);
  yield takeLatest(teacherType.GET_PROFILE_TEACHER, getProfileTeacherSaga);
  /**
   * student
   */
  yield takeLatest(
    studentType.GET_DATA_SCHEDULE_STUDENT_ID,
    getDataSchedulesIdSaga
  );
  yield takeLatest(
    studentType.GET_DATA_SCHEDULE_STUDENT_ID_DETAIL,
    getDataSchedulesDetailIdSaga
  );
  yield takeLatest(
    studentType.GET_DATA_SCHEDULE_STUDENT_ALL,
    getDataScheduleStudentSaga
  );
  yield takeLatest(
    studentType.GET_DATA_PROFILE_STUDENT,
    getDataProfileStudentSaga
  );
  /**
   * chat
   */
  yield takeLatest(chatType.JOIN_FRIEND, joinFriend);
  yield takeLatest(chatType.GET_MESSAGE_ID_GROUP, getMessageGroupByIdSaga);
  yield takeLatest(chatType.SEND_CHAT, sendChatSaga);
  yield takeLatest(chatType.GET_ALL_DATA_GROUP, getAllGroupSaga);
}
export default rootSaga;
