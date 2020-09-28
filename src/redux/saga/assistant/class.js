import { put, call } from "redux-saga/effects";
import { getDataAssClassApi } from "../../api/assistant/class";
import { getDataClassSuccess } from "../../actions/dataListAssistance/index";
export function* getClassActionSaga({ payload }) {
  try {
    const res = yield call(getDataAssClassApi);
    const { data } = res;
    const dataResult = [];
    for (const item of data.payload.data) {
      let data = {};
      data.id_class = item._id;
      data.classCode = item.classCode;
      data.dateCreateClass = item.created_at;
      data.idStudent = item.idStudent._id;
      data.nameStudent = item.idStudent.fullname;
      data.idSubject = item.idSubject._id;
      data.nameSubject = item.idSubject.name;
      const dayRes = item.day.reduce((res, acc) => ({ acc }));
      data.statusDay = dayRes.status;
      data.day = dayRes.days;
      data.id_Day = dayRes._id;
      dataResult.push(data);
    }
    console.log(dataResult);
    yield put(getDataClassSuccess(dataResult));
  } catch (error) {}
}
