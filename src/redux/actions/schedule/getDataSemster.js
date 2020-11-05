import * as semesterType from "../../constants/schedule/index";
export const getDataSemester = () => ({
  type: semesterType.GET_SEMESTER,
});
export const getDataSemesterSuccess = (data) => ({
  type: semesterType.GET_SEMESTER_SUCCESS,
  payload: {
    data,
  },
});
export const getDataSemesterFail = (error) => ({
  type: semesterType.GET_SEMESTER_FAIL,
  payload: {
    error,
  },
});
