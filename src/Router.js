import React, { Suspense, lazy } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { history } from "./history";
import { connect } from "react-redux";
import Spinner from "./components/@vuexy/spinner/Loading-spinner";
import { ContextLayout } from "./utility/context/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//assistant
const dashboard = lazy(() =>
  import("./views/dashboard/analytics/AnalyticsDashboard")
);
const Profile = lazy(() => import("./views/pages/Profile/index"));
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
// const commingSoon = lazy(() => import("./views/pages/misc/ComingSoon"));

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
const ListAttdance = lazy(() =>
  import(
    "./views/pages/ProQ-Teacher/Attendance/AttendanceClass/AttendanceClass"
  )
);
const Attendance = lazy(() =>
  import("./views/pages/ProQ-Teacher/Attendance/Attendance")
);
// const EmailTeacher = lazy(() =>
//   import("./views/pages/ProQ-Teacher/EmailTeacher/Email")
// );
// const LiveStreamTeacher = lazy(() =>
//   import("./views/pages/ProQ-Teacher/LiveStream/Chat")
// );
// Educate
const ClassEducate = lazy(() =>
  import(
    "./views/pages/ui-elements/data-list/ProQEducate/ListClassEducate/class"
  )
);
const SubjectEducate = lazy(() =>
  import(
    "./views/pages/ui-elements/data-list/ProQEducate/ListSubjectEducate/subject"
  )
);
const StudentEducate = lazy(() =>
  import(
    "./views/pages/ui-elements/data-list/ProQEducate/ListStudentEducate/student"
  )
);
const TeacherEducate = lazy(() =>
  import(
    "./views/pages/ui-elements/data-list/ProQEducate/ListTeacherEducate/EducationTeacher"
  )
);
const Department = lazy(() =>
  import(
    "./views/pages/ui-elements/data-list/ProQEducate/department/Department"
  )
);
const TotalDepartment = lazy(() =>
  import(
    "./views/pages/ui-elements/data-list/ProQEducate/TotalDepartment/TotalDepartment"
  )
);
const Schedules = lazy(() =>
  import(
    "./views/pages/ui-elements/data-list/ProQEducate/TotalDepartment/ItemTotalDepartment/Schedules"
  )
);
const ListStage = lazy(() =>
  import(
    "./views/pages/ui-elements/data-list/ProQEducate/ListStageEducate/index"
  )
);
const ListSeason = lazy(() =>
  import(
    "./views/pages/ui-elements/data-list/ProQEducate/ListSeasonEducate/index"
  )
);
const Specialization = lazy(() =>
  import(
    "./views/pages/ui-elements/data-list/ProQEducate/ListSpecializationEducate/specialization"
  )
);
//student
const StudyStudent = lazy(() => import("./views/pages/Student/Study"));
const markStudent = lazy(() =>
  import("./views/pages/Student/MarkStudent/markStudent")
);
const scheduleStudent = lazy(() =>
  import("./views/pages/Student/Schedule/ScheduleStudent")
);
const AttendanceStudent = lazy(() =>
  import("./views/pages/Student/Attendance/AttendanceStudent")
);
const ListSchedules = lazy(() =>
  import("./views/pages/Student/ListSeasonEducate/ListSchedules")
);
//chat
const Chat = lazy(() => import("./views/apps/chat/Chat"));
//acount admin
const AccountAdminTeacher = lazy(() =>
  import(
    "./views/pages/ui-elements/data-list/ProQAdmin/adminTeachers/AdminTeacher"
  )
);
const AccountAdminSupport = lazy(() =>
  import(
    "./views/pages/ui-elements/data-list/ProQAdmin/adminSupportStudents/AdminSupportStudent"
  )
);
const AccountAdminDepartment = lazy(() =>
  import(
    "./views/pages/ui-elements/data-list/ProQAdmin/adminEducates/ListDepartmentConfig"
  )
);
const BlogAdmin = lazy(() =>
  import("./views/pages/ui-elements/data-list/ProQBlog/AdminBlog")
);
const BlogDetail = lazy(() => import("./views/pages/Student/Study/blogDetail"));
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
          <AppRoute exact path="/" component={dashboard} />
          <AppRoute path="/assistant/search" component={searchStudent} />
          <AppRoute path="/profile" component={Profile} />
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
          <AppRoute path="/department" component={Department} />
          {/* Educate */}
          <AppRoute exact path="/education/class" component={ClassEducate} />
          <AppRoute path="/education/subject" component={SubjectEducate} />
          <AppRoute path="/education/student" component={StudentEducate} />
          <AppRoute path="/education/teacher" component={TeacherEducate} />
          <AppRoute path="/education/stage" component={ListStage} />
          <AppRoute path="/education/season" component={ListSeason} />
          <AppRoute
            path="/education/specialization"
            component={Specialization}
          />
          <AppRoute
            exact
            path="/education/totalDepartment"
            component={TotalDepartment}
          />
          <AppRoute
            path="/education/totalDepartment/schedules"
            component={Schedules}
          />
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
          <AppRoute path="/student/news/:id" component={BlogDetail} />
          <AppRoute exact path="/teacher/attendance" component={Attendance} />
          <AppRoute path="/teacher/attendance/:id" component={ListAttdance} />
          {/* <AppRoute path="/teacher/email" component={commingSoon} />
          <AppRoute path="/teacher/liveStream" component={commingSoon} /> */}
          {/* student */}
          <AppRoute exact path="/student/news" component={StudyStudent} />
          <AppRoute path="/student/score" component={markStudent} />
          <AppRoute
            exact
            path="/student/schedule"
            component={scheduleStudent}
          />
          <AppRoute path="/student/schedule/:id" component={ListSchedules} />
          <AppRoute path="/student/attendance" component={AttendanceStudent} />
          <AppRoute path="/chat" component={Chat} />
          {/* Admin */}
          <AppRoute
            path="/admin/account/teacher"
            component={AccountAdminTeacher}
          />
          <AppRoute
            path="/admin/account/suport"
            component={AccountAdminSupport}
          />
          <AppRoute
            path="/admin/account/educate"
            component={AccountAdminDepartment}
          />
          <AppRoute path="/admin/blog" component={BlogAdmin} />

          <AppRoute component={login} fullLayout />
        </Switch>
      </Router>
    );
  }
}

export default AppRouter;
