import { call, delay, put } from "redux-saga/effects";
import {
  getCategorySuccess,
  getNotifyAllSuccess,
  getNotifyAll,
  getDataNotiFeeSuccess,
  getDataNotiActivitySuccess,
  getDataNotiLearningSuccess,
} from "../../actions/blog";
import {
  addBlogApi,
  deleteNotiApi,
  getDataActivityNoti,
  getDataCategoryApi,
  getDataFeeNoti,
  getNotiApi,
  updateBlogApi,
  getDataLearningNoti,
} from "../../api/blog";
import { toastError, toastSuccess } from "../../../utility/toast/toastHelper";
import { message } from "antd";
import { hideLoading, showLoading } from "../../actions/ui";
export function* getCategorySaga() {
  try {
    const res = yield call(getDataCategoryApi);
    const { data } = res;
    if (data.success) {
      yield put(getCategorySuccess(data.payload));
    }
  } catch (error) {}
}
export function* addBlogSaga({ payload }) {
  const { params, data } = payload;

  const dataReq = {
    title: data.title,
    description: data.content,
    place: data.location,
    type: data.category,
  };
  try {
    const res = yield call(addBlogApi, dataReq);
    const { data } = res;
    if (data.success) {
      yield put(getNotifyAll(params));
      toastSuccess("Thêm thông báo thành công ");
    }
  } catch (err) {}
}
export function* updateBlogSaga({ payload }) {
  const { params, data: obj } = payload;
  const dataReq = {
    title: obj.title,
    description: obj.content,
    place: obj.location,
    type: obj.category,
  };
  try {
    const res = yield call(updateBlogApi, obj.id, dataReq);
    const { data } = res;
    if (data.success) {
      yield put(getNotifyAll(params));
      toastSuccess("Cập nhật  thành công ");
    }
  } catch (err) {}
}
export function* getNotifySaga({ payload }) {
  const { params } = payload;
  const param = {
    page: params ? params.page : "",
    limit: params ? params.limit : "",
  };
  try {
    const res = yield call(getNotiApi, param);
    const { data } = res;
    if (data.success) {
      yield put(
        getNotifyAllSuccess(data.payload, data.total_page, data.total_item)
      );
    }
  } catch (error) {}
}
export function* deleteNotifySaga({ payload }) {
  const { id, params } = payload;
  try {
    const res = yield call(deleteNotiApi, id);
    const { data } = res;
    if (data.success) {
      yield put(getNotifyAll(params));
      message.success("Xoá thành công ");
    }
  } catch (error) {}
}
/**
 * student
 */
export function* getDataNotiFeeSaga({ payload }) {
  const { params } = payload;
  yield put(showLoading());
  const param = {
    page: params ? params.page : "",
    limit: params ? params.limit : "",
  };
  try {
    const res = yield call(getDataFeeNoti, param);
    const { data } = res;
    if (data.success) {
      yield delay(500);
      yield put(hideLoading());
      yield put(getDataNotiFeeSuccess(data.payload, data.total_page));
    }
  } catch (error) {
    yield put(hideLoading());
    toastError("Vui lòng thử lại sau");
  }
}
export function* getDataNotiActivitySaga({ payload }) {
  const { params } = payload;
  yield put(showLoading());

  const param = {
    page: params ? params.page : "",
    limit: params ? params.limit : "",
  };
  try {
    const res = yield call(getDataActivityNoti, param);
    const { data } = res;
    if (data.success) {
      yield delay(500);
      yield put(hideLoading());
      yield put(getDataNotiActivitySuccess(data.payload, data.total_page));
    }
  } catch (error) {
    yield put(hideLoading());
    toastError("Vui lòng thử lại sau");
  }
}
export function* getDataNotiLearningSaga({ payload }) {
  const { params } = payload;
  yield put(showLoading());

  const param = {
    page: params ? params.page : "",
    limit: params ? params.limit : "",
  };
  try {
    const res = yield call(getDataLearningNoti, param);
    const { data } = res;
    if (data.success) {
      yield delay(500);
      yield put(hideLoading());
      yield put(getDataNotiLearningSuccess(data.payload, data.total_page));
    }
  } catch (error) {
    yield put(hideLoading());
    toastError("Vui lòng thử lại sau");
  }
}
