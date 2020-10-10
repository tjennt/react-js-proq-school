import React, { Suspense, lazy } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { history } from "./history";
import { connect } from "react-redux";
import Spinner from "./components/@vuexy/spinner/Loading-spinner";
import { ContextLayout } from "./utility/context/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const dashboard = lazy(() =>
  import("./views/dashboard/analytics/AnalyticsDashboard")
);
//assistant
const studentAssistant = lazy(() =>
  import("./views/pages/ui-elements/data-list/ProQAsisstants/student/student")
);
const teacherAssistant = lazy(() =>
  import("./views/pages/ui-elements/data-list/ProQAsisstants/teacher/teacher")
);
const searchStudent = lazy(() =>
  import(
    "./views/pages/ui-elements/data-list/ProQAsisstants/SearchStudentProQ/SearchProQ"
  )
);
const classAssi = lazy(() =>
  import("./views/pages/ui-elements/data-list/ProQAsisstants/class/class")
);
const subject = lazy(() =>
  import("./views/pages/ui-elements/data-list/ProQAsisstants/subject/subject")
);
const commingSoon = lazy(() => import("./views/pages/misc/ComingSoon"));

const login = lazy(() => import("./views/pages/authentication/login/Login"));
const register = lazy(() =>
  import("./views/pages/authentication/register/Register")
);
// Teacher ----------
const GeneralTeacher = lazy(() =>
  import("./views/pages/ProQ-Teacher/GeneralTeacher/ListView")
);
const ListClassTeacher = lazy(() =>
  import("./views/pages/ProQ-Teacher/GeneralTeacher/ListView")
);

const Attendance = lazy(() =>
  import("./views/pages/ProQ-Teacher/Attendance/Attendance")
);
const EmailTeacher = lazy(() =>
  import("./views/pages/ProQ-Teacher/EmailTeacher/Email")
);
const LiveStreamTeacher = lazy(() =>
  import("./views/pages/ProQ-Teacher/LiveStream/Chat")
);

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
          <AppRoute exact path="/register" component={register} fullLayout />
          <AppRoute path="/assisttant" component={dashboard} />
          <AppRoute path="/assistant/search" component={searchStudent} />
          <AppRoute
            path="/assistant/list/student"
            component={studentAssistant}
          />
          <AppRoute
            path="/assistant/list/teacher"
            component={teacherAssistant}
          />
          <AppRoute path="/assistant/list/class" component={classAssi} />
          <AppRoute path="/assistant/list/subject" component={subject} />
          <AppRoute path="/department" component={dashboard} />

          {/* teacher */}
          <AppRoute
            exact
            path="/teacher/listClass"
            component={GeneralTeacher}
          />
          <AppRoute
            path="/teacher/listClass/:id"
            component={ListClassTeacher}
          />
          <AppRoute path="/teacher/attendance" component={Attendance} />
          <AppRoute path="/teacher/email" component={commingSoon} />
          <AppRoute path="/teacher/liveStream" component={commingSoon} />

          <AppRoute component={login} fullLayout />
        </Switch>
      </Router>
    );
  }
}

export default AppRouter;
