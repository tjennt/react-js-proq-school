import { combineReducers } from "redux";
import customizer from "./customizer/";
import auth from "./auth/";
import chatReducer from "./chat/";
import navbar from "./navbar/Index";
import modalReducer from "./ui/modalReducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import DataTotalProductReducer from "./data-list/DashboardReducer";
import assistantReducer from "./data-list/assistReducer";
import scheduleReducer from "./schedule";
import uiReducer from "./ui/loadingReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};
const rootReducer = combineReducers({
  customizer: customizer,
  modalReducer: modalReducer,
  auth: auth,
  navbar: navbar,
  dataDashBoard: DataTotalProductReducer,
  assistantData: assistantReducer,
  chatApp: chatReducer,
  dataSchedule: scheduleReducer,
  ui: uiReducer,
});

export default persistReducer(persistConfig, rootReducer);
