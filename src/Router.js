import React, { Suspense, lazy } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { history } from "./history";
import { connect } from "react-redux";
import Spinner from "./components/@vuexy/spinner/Loading-spinner";
import { ContextLayout } from "./utility/context/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Route-based code splitting
const dashboard = lazy(() =>
  import("./views/dashboard/analytics/AnalyticsDashboard")
);
const ListViewSale = lazy(() =>
  import("./views/pages/ui-elements/data-list/dataListSale/ListViewSale")
);
const ThumbViewDataListFCM = lazy(() =>
  import(
    "./views/pages/ui-elements/data-list/dataListPushFCM/ThumbViewDataListFCM"
  )
);
const ThumbViewDataListBlog = lazy(() =>
  import(
    "./views/pages/ui-elements/data-list/dataListBlog/ThumbViewBlogDataList"
  )
);
const ListViewCoun = lazy(() =>
  import("./views/pages/ui-elements/data-list/dataListCounpons/ListViewCoun")
);
const ListViewUser = lazy(() =>
  import("./views/pages/ui-elements/data-list/dataListUser/ListViewUser")
);
const ListViewTransac = lazy(() =>
  import(
    "./views/pages/ui-elements/data-list/dataListTransaction/ListViewTransac"
  )
);
const ThumbViewHotDeal = lazy(() =>
  import("./views/pages/ui-elements/data-list/dataListHotDeal/ThumbViewHotDeal")
);
const ListViewTags = lazy(() =>
  import("./views/pages/ui-elements/data-list/dataListTags/ListViewTags")
);
const ListShop = lazy(() =>
  import(
    "./views/pages/ui-elements/data-list/dataListShop/ThumbViewDataListShop"
  )
);
const ThumbViewDataListAdmin = lazy(() =>
  import(
    "./views/pages/ui-elements/data-list/dataListAdmin/ThumbViewDataListAdmin"
  )
);
const ListViewVoteApp = lazy(() =>
  import("./views/pages/ui-elements/data-list/dataListVoteApp/ListViewVoteApp")
);
const listViewReward = lazy(() =>
  import("./views/pages/ui-elements/data-list/dataListReward/ListViewReward")
);
// const ListViewReportOrder = lazy(() =>
//   import(
//     "./views/pages/ui-elements/data-list/dataListReportOrder/ListViewReportOrder"
//   )
// );
// const ListViewReporDebt = lazy(() =>
//   import(
//     "./views/pages/ui-elements/data-list/dataListReportDebt/ListViewReporDebt"
//   )
// );
// const accountantReportMoneyUser = lazy(() =>
//   import(
//     "./views/pages/ui-elements/data-list/dataListReportMoU/ListViewReporMoU"
//   )
// );
// const ListViewReporSOU = lazy(() =>
//   import(
//     "./views/pages/ui-elements/data-list/dataListReportSOU/ListViewReporSOU"
//   )
// );
const ListViewCategory = lazy(() =>
  import(
    "./views/pages/ui-elements/data-list/dataListCategory/ListViewCategory"
  )
);
const ListViewCategoryShop = lazy(() =>
  import(
    "./views/pages/ui-elements/data-list/dataListShopCategory/ListViewCategoryShop"
  )
);
const commingSoon = lazy(() => import("./views/pages/misc/ComingSoon"));
const login = lazy(() => import("./views/pages/authentication/login/Login"));

// Set Layout and Component Using App Route
const RouteConfig = ({ component: Component, fullLayout, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      return (
        <ContextLayout.Consumer>
          {(context) => {
            let LayoutTag =
              fullLayout === true
                ? context.fullLayout
                : context.state.activeLayout === "horizontal"
                ? context.horizontalLayout
                : context.VerticalLayout;
            return (
              <LayoutTag {...props} permission={props.user}>
                <Suspense fallback={<Spinner />}>
                  <Component {...props} />
                </Suspense>
              </LayoutTag>
            );
          }}
        </ContextLayout.Consumer>
      );
    }}
  />
);
const mapStateToProps = (state) => {
  return {
    user: state.auth.login.userRole,
  };
};

const AppRoute = connect(mapStateToProps)(RouteConfig);
class AppRouter extends React.Component {
  render() {
    return (
      <Router history={history}>
        <ToastContainer />
        <Switch>
          <AppRoute exact path="/login" component={login} fullLayout />
          <AppRoute path="/transaction" component={ListViewTransac} />
          <AppRoute path="/sale" component={ListViewSale} />
          <AppRoute path="/pushFCM" component={ThumbViewDataListFCM} />
          <AppRoute path="/accountantOrder" component={commingSoon} />
          <AppRoute path="/blog" component={ThumbViewDataListBlog} />
          <AppRoute path="/user" component={ListViewUser} />
          <AppRoute path="/hotdeal" component={ThumbViewHotDeal} />
          <AppRoute path="/listcounpons" component={ListViewCoun} />
          <AppRoute path="/tags" component={ListViewTags} />
          <AppRoute path="/reward" component={listViewReward} />
          <AppRoute path="/listShop" component={ListShop} />
          <AppRoute path="/category" component={ListViewCategory} />
          <AppRoute path="/voteApp" component={ListViewVoteApp} />
          <AppRoute path="/moneyUser" component={commingSoon} />
          <AppRoute path="/accountantDebt" component={commingSoon} />
          <AppRoute path="/shopCategory" component={ListViewCategoryShop} />
          <AppRoute path="/accountantReportMoneyUser" component={commingSoon} />
          <AppRoute path="/banner" component={commingSoon} />
          <AppRoute path="/accountAdmin" component={ThumbViewDataListAdmin} />
          <AppRoute path="/" component={dashboard} />
          <AppRoute component={login} fullLayout />
        </Switch>
      </Router>
    );
  }
}

export default AppRouter;
