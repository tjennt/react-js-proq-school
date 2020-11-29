import { call, put } from "redux-saga/effects";
import {
  getCategorySuccess,
  getNotifyAllSuccess,
  getNotifyAll,
} from "../../actions/blog";
import {
  addBlogApi,
  deleteNotiApi,
  getDataCategoryApi,
  getNotiApi,
  updateBlogApi,
} from "../../api/blog";
import { toastSuccess } from "../../../utility/toast/toastHelper";
import { message } from "antd";
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
