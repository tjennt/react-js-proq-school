import { put, call } from "redux-saga/effects";
import { STATUS_CODE } from "../../constants";
import { toastSuccess, toastError } from "../../../utility/toast/toastHelper";
import {
  getDataTranc,
  trancSearch,
  updateAcceptDone,
  updateApprovedAccept,
} from "../../api/tranc";
import { getData, getDataSuccess } from "../../actions/dataListTransaction";
export function* getActionSaga({ payload }) {
  const { params } = payload;
  try {
    const res = yield call(getDataTranc, { params });
    const { status: statusCode, data } = res;
    if (statusCode === STATUS_CODE.SUCCESS) {
      yield put(getDataSuccess(data.data.data, data.data.total_page));
    }
  } catch (error) {}
}
export function* searchActionSaga({ payload }) {
  const { search } = payload;
  try {
    const res = yield call(trancSearch, {
      search,
    });
    const { status: statusCode, data } = res;
    if (statusCode === STATUS_CODE.SUCCESS) {
      yield put(getDataSuccess(data.data.data, data.data.total_page));
    }
  } catch (error) {}
}
export function* updateApprovedAcceptSaga({ payload }) {
  const { description, status, row, params } = payload;
  const dataJson = {
    description: description,
    status: status,
  };
  try {
    const res = yield call(updateApprovedAccept, row.id, dataJson);
    const { status: statusCode } = res;
    if (statusCode === STATUS_CODE.SUCCESS) {
      yield put(getData(params));
      toastSuccess("Chuyển trạng thái thành công");
    }
  } catch (error) {
    toastError("Chuyển trạng thái thất bại!");
  }
}
export function* updateAcceptDoneSaga({ payload }) {
  const { status, row } = payload;
  const data = {
    status: status,
  };
  try {
    yield call(updateAcceptDone, row.id, data);
  } catch (error) {}
}
