import { toast } from "react-toastify";
export const toastError = (message) => {
  if (message !== null && (typeof message !== "undefined") & (message !== "")) {
    toast.error(message);
  }
};
export const toastWarning = (message) => {
  if (message !== null && (typeof message !== "undefined") & (message !== "")) {
    toast.warning(message);
  }
};
export const toastSuccess = (message) => {
  if (message !== null && (typeof message !== "undefined") & (message !== "")) {
    toast.success(message);
  }
};
