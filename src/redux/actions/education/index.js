import * as educationType from "../../constants/education";

export const importExcelStudent = (file, params) => ({
  type: educationType.IMPORT_EXCEL_STUDENT,
  payload: {
    file,
    params,
  },
});
export const importExcelClass = (file, params) => ({
  type: educationType.IMPORT_EXCEL_CLASS,
  payload: {
    file,
    params,
  },
});

export const importExcelTeacer = (file, params) => ({
  type: educationType.IMPORT_EXCEL_TEACHER,
  payload: {
    file,
    params,
  },
});
