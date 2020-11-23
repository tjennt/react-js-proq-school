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
