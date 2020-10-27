import * as educationType from "../../constants/education";

export const importExcelStudent = (file, params) => ({
  type: educationType.IMPORT_EXCEL_STUDENT,
  payload: {
    file,
    params,
  },
});
export const importExcelStudentSuccess = (data) => ({
  type: educationType.IMPORT_EXCEL_sTUDENT_SUCCESS,
  payload: {
    data,
  },
});
export const importExcelStudentFaild = (erro) => ({
  type: educationType.IMPORT_EXCEL_sTUDENT_FAIL,
  payload: {
    erro,
  },
});
