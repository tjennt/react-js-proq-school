import { combineReducers } from "redux";
import customizer from "./customizer/";
import auth from "./auth/";
import navbar from "./navbar/Index";
import DataListReducer from "./../reducers/data-list/pushReducer";
import DataBlogReducer from "./../reducers/data-list/blogReducer";
import DataCountReducer from "./../reducers/data-list/counReducer";
import DataSaleReducer from "./data-list/saleReducer";
import DataUserReducer from "./data-list/userReducer";
import DataTransacReducer from "./data-list/transactionReducer";
import DataHotDealReducer from "./data-list/hotDealReducer";
import DataTagsReducer from "./data-list/tagsReducer";
import modalReducer from "./ui/modalReducer";
import DataShopReducer from "./data-list/shopReducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import DataAdminReducer from "./data-list/listAdminReducer";
import DataTotalProductReducer from "./data-list/DashboardReducer";
import DataVoteReducer from "./data-list/voteAppReducer";
import DataRewardReducer from "./data-list/rewardReducer";
import DataCateReducer from "./data-list/categoryReducer";

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
  dataList: DataListReducer,
  dataBlog: DataBlogReducer,
  dataCount: DataCountReducer,
  dataSale: DataSaleReducer,
  dataUser: DataUserReducer,
  dataTransaction: DataTransacReducer,
  dataHotDeal: DataHotDealReducer,
  dataTags: DataTagsReducer,
  DataShop: DataShopReducer,
  dataListAdmin: DataAdminReducer,
  DataVoteReducer: DataVoteReducer,
  dataListReward: DataRewardReducer,
  dataListCategory: DataCateReducer,
});

export default persistReducer(persistConfig, rootReducer);
