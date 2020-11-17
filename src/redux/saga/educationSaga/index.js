import { put, call } from "redux-saga/effects";
import { importExcelStudentApi } from "../../api/education/student";
import {
  getData,
  getDataTeacher,
  getDataSubject,
  getDataClass,
  getDataSeason,
  getDataStage,
} from "../../actions/dataListAssistance/index";
import {
  toastSuccess,
  toastWarning,
  toastError,
} from "../../../utility/toast/toastHelper";
import { importExcelTeacherApi } from "../../api/education/teacher";
import { addStageApi } from "../../api/education/stage";
import { addSeasonApi } from "../../api/education/season";
import { getDataSchedulesSuccess } from "../../actions/education";
import { getDataSchedulesApi } from "../../api/education/schedule";
import { addSubject } from "../../api/education/subject";
import { addClassApi } from "../../api/education/class";
import { addSpecializationApi } from "../../api/education/specialization";
import { getDataSpecialization } from "../../actions/schedule/getDataSpecialization";

/**
 * getSchedule
 */
export function* getSchedulesSaga({ payload }) {
  const { params } = payload;
  const param = {
    page: params ? params.page : "",
    limit: params ? params.limit : "",
  };
  try {
    const res = yield call(getDataSchedulesApi, param);
    const { data } = res;
    if (data.success === true) {
      console.log(data);
      let dataSchedule = data.payload.reduce(
        (arr, curr) => [
          ...arr,
          {
            class: curr.class.name,
            season: curr.season.name,
            shift: curr.shift,
            weekDays: curr.weekDays,
            id: curr._id,
            subject: curr.subject.name,
            createdAt: curr.createAt,
            startAt: curr.startAt,
          },
        ],
        []
      );
      yield put(
        getDataSchedulesSuccess(dataSchedule, data.total_page, data.total_item)
      );
    } else {
      toastWarning("Vui lòng thử lại sau");
    }
  } catch (error) {
    toastError(`Đã có lỗi xảy ra vui lòng thử lại ${error}`);
  }
}

/**
 * import
 */
export function* importExcelStudentEduSaga({ payload }) {
  const { file, params } = payload;
  let formData = new FormData();
  formData.append("excelFile", file);
  try {
    const res = yield call(importExcelStudentApi, formData);
    const { data } = res;
    if (data.success) {
      yield put(getData(params));
      toastSuccess("Import excel thành công");
    } else {
      toastWarning("Vui lòng thử lại sau !");
    }
  } catch (error) {
    toastWarning(`Đã có lỗi xảy ra :${error}`);
  }
}
/**
 * teacher
 */
export function* importExcelTeacherEduSaga({ payload }) {
  const { file, params } = payload;
  let formData = new FormData();
  formData.append("excelFile", file);
  try {
    const res = yield call(importExcelTeacherApi, formData);
    const { data } = res;
    if (data.success) {
      yield put(getDataTeacher(params));
      toastSuccess("Import excel thành công");
    } else {
      toastWarning("Vui lòng thử lại sau !");
    }
  } catch (error) {
    toastWarning(`Đã có lỗi xảy ra :${error}`);
  }
}
/**
 * class
 */
export function* addClassSaga({ payload }) {
  const { obj, params } = payload;
  const dataReq = {
    name: obj.nameClass,
    stage: obj.stage,
    specialization: obj.specializate,
  };
  try {
    const res = yield call(addClassApi, dataReq);
    const { data } = res;
    if (data.success) {
      yield put(getDataClass(params));
      toastSuccess("Thêm dữ liệu thành công!!!");
    } else {
      toastWarning("Thêm dữ liệu thất bại!");
    }
  } catch (error) {
    toastError("Đã có lỗi xảy ra vui lòng thử lại");
  }
}
/**
 * subject
 */
export function* addSubjectSaga({ payload }) {
  const { obj, params } = payload;
  const dataReq = {
    name: obj.nameSubject,
  };
  try {
    const res = yield call(addSubject, dataReq);
    const { data } = res;
    if (data.success) {
      yield put(getDataSubject(params));
      toastSuccess("Thêm thành công");
    } else {
      toastWarning("Vui lòng thử lại sau !");
    }
  } catch (error) {
    toastWarning(`Đã có lỗi xảy ra :${error}`);
  }
}
/**
 * create stage
 */
export function* addStageSaga({ payload }) {
  const { obj, params } = payload;
  const dataReq = {
    name: obj.name,
    startAt: obj.startAt,
    endAt: obj.startEnd,
  };
  try {
    const res = yield call(addStageApi, dataReq);
    const { data } = res;
    if (data.success) {
      yield put(getDataStage(params));
      toastSuccess("Thêm thành công");
    } else {
      toastWarning("Vui lòng thử lại sau");
    }
  } catch (error) {
    toastError("Đã có lỗi xảy ra ");
  }
}
/**
 * create seasib
 */
export function* addSeasonSaga({ payload }) {
  const { obj, params } = payload;
  const dataReq = {
    name: obj.name,
    startAt: obj.startAt,
    endAt: obj.startEnd,
  };
  try {
    const res = yield call(addSeasonApi, dataReq);
    const { data } = res;
    if (data.success) {
      yield put(getDataSeason(params));
      toastSuccess("Đã có lỗi xảy ra vui lòng thử lại");
    } else {
      toastWarning("Vui lòng thử lại sau");
    }
  } catch (error) {
    toastError(`Đã có lỗi xảy ra vui lòng thử lại sau ${error}`);
  }
}
/**
 * create specialization
 */
export function* addSpecializationSaga({ payload }) {
  const { obj, params } = payload;
  const dataReq = {
    name: obj.nameSpecialization,
    subject: obj.subject,
  };
  try {
    const res = yield call(addSpecializationApi, dataReq);
    const { data } = res;
    if (data.success) {
      yield put(getDataSpecialization(params));
      toastSuccess("Đã có lỗi xảy ra vui lòng thử lại");
    } else {
      toastWarning("Vui lòng thử lại sau");
    }
  } catch (error) {
    toastError(`Đã có lỗi xảy ra vui lòng thử lại sau ${error}`);
  }
}
