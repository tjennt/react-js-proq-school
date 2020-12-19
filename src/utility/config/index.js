import * as moment from "moment";
export const currencyFormat = (num) => {
  if (num) {
    return num.toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + " VNĐ ";
  } else {
    return "0 VNĐ";
  }
};
export const numberFormat = (num) => {
  if (num) {
    return num.toFixed(2);
  }
};
export const baseUrl = "http://122.248.226.220";
// export const baseUrl = "https://catback.vn";
export const newDate = (date) => {
  let dateParse = moment(date).format("DD-MM-YYYY");
  return dateParse;
};
export const CONFIG_TIME_ATTENDANCE = {
  1: { from: 7, to: 9 },
  2: { from: 9, to: 11 },
  3: { from: 11, to: 13 },
  4: { from: 13, to: 15 },
  5: { from: 15, to: 17 },
  6: { from: 17, to: 19 },
};
