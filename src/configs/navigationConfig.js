import React from "react";
import * as Icon from "react-feather";
const navigationConfig = [
  {
    id: "groupheader5",
    type: "groupHeader",
    groupTitle: "Thống kê",
    permissions: ["admin", "teacher", "master", "staff"],
  },
  {
    id: "totalSupport",
    title: "Tổng hợp",
    type: "item",
    icon: <Icon.Circle size={12} />,
    permissions: ["admin", "teacher", "master", "staff"],
    navLink: "/",
  },
  // {
  //   id: "searchStudentAssistant",
  //   title: "Tra cứu",
  //   type: "item",
  //   icon: <Icon.Circle size={12} />,
  //   permissions: ["admin"],
  //   navLink: "/assistant/search",
  // },
  {
    id: "list ",
    title: "Danh sách ",
    type: "collapse",
    icon: <Icon.Circle size={12} />,
    permissions: ["admin", "master", "staff"],
    children: [
      {
        id: "listStudentAssistant",
        title: "Ds.Sinh viên",
        type: "item",
        icon: <Icon.FileText size={18} />,
        permissions: ["admin", "master", "staff"],
        navLink: "/assistant/list/student",
      },
      {
        id: "listTeacherAssistant",
        title: "Ds.Giáo viên",
        type: "item",
        icon: <Icon.FileText size={18} />,
        permissions: ["admin", "master", "staff"],
        navLink: "/assistant/list/teacher",
      },
      {
        id: "listClassAssistant",
        title: "Ds.Lớp",
        type: "item",
        icon: <Icon.FileText size={18} />,
        permissions: ["admin", "master", "staff"],
        navLink: "/assistant/list/class",
      },
    ],
  },
  {
    id: "groupheader1",
    type: "groupHeader",
    groupTitle: "Quản lý",
    permissions: ["admin", "master"],
  },
  // {
  //   id: "totalDepartment",
  //   title: "Tổng hợp",
  //   type: "item",
  //   icon: <Icon.Circle size={12} />,
  //   permissions: ["admin"],
  //   navLink: "/education/totalDepartment",
  // },
  {
    id: "generalDepartment",
    title: "Phân lớp",
    type: "item",
    icon: <Icon.Circle size={12} />,
    permissions: ["admin", "master"],
    navLink: "/department",
  },
  {
    id: "listDepartment",
    title: "Quản lý",
    type: "collapse",
    icon: <Icon.Circle size={12} />,
    permissions: ["admin", "master"],
    children: [
      {
        id: "listStudentDepartment",
        title: "Sinh viên",
        type: "item",
        icon: <Icon.FileText size={18} />,
        permissions: ["admin", "master"],
        navLink: "/education/student",
      },
      {
        id: "listTeacherDepartment",
        title: "Giảng viên",
        type: "item",
        icon: <Icon.FileText size={18} />,
        permissions: ["admin", "master"],
        navLink: "/education/teacher",
      },
      {
        id: "listClassDepartment",
        title: "Lớp học",
        type: "item",
        icon: <Icon.FileText size={18} />,
        permissions: ["admin", "master"],
        navLink: "/education/class",
      },
      {
        id: "listSubjectDepartment",
        title: "Môn học ",
        type: "item",
        icon: <Icon.FileText size={18} />,
        permissions: ["admin", "master"],
        navLink: "/education/subject",
      },
      {
        id: "listStage",
        title: "Khóa học",
        type: "item",
        icon: <Icon.FileText size={18} />,
        permissions: ["admin", "master"],
        navLink: "/education/stage",
      },
      {
        id: "listSeason",
        title: "Kì học",
        type: "item",
        icon: <Icon.FileText size={18} />,
        permissions: ["admin", "master"],
        navLink: "/education/season",
      },
      {
        id: "listSpecialization",
        title: "Chuyên ngành",
        type: "item",
        icon: <Icon.FileText size={18} />,
        permissions: ["admin", "master"],
        navLink: "/education/specialization",
      },
    ],
  },
  {
    id: "groupheader5",
    type: "groupHeader",
    groupTitle: "Giảng viên",
    permissions: ["teacher"],
  },
  {
    id: "schedules",
    title: "Lịch dạy",
    type: "item",
    icon: <Icon.Circle size={12} />,
    permissions: ["teacher"],
    navLink: "/teacher/schedule",
  },
  {
    id: "attendance",
    title: "Điểm danh",
    type: "item",
    icon: <Icon.Circle size={12} />,
    permissions: ["teacher"],
    navLink: "/teacher/attendance",
  },
  {
    id: "profile",
    title: "Thông tin giảng viên",
    type: "item",
    icon: <Icon.Circle size={12} />,
    permissions: ["teacher"],
    navLink: "/teacher/profile",
  },
  {
    id: "emailTeacher",
    title: "Hộp thư GV",
    type: "item",
    icon: <Icon.Circle size={12} />,
    permissions: ["teacher"],
    navLink: "/teacher/email",
  },
  // {
  //   id: "LiveSteamTeacher",
  //   title: "Học trực tuyến",
  //   type: "item",
  //   icon: <Icon.Circle size={12} />,
  //   permissions: ["teacher"],
  //   navLink: "/teacher/liveStream",
  // },
  {
    id: "groupheader5",
    type: "groupHeader",
    groupTitle: "Thông báo",
    permissions: ["admin"],
  },
  {
    id: "blog",
    title: "Thông báo",
    type: "item",
    icon: <Icon.Circle size={12} />,
    permissions: ["admin", "master", "staff"],
    navLink: "/admin/blog",
  },
  //------------------
  // Student
  //-----------------

  {
    type: "groupHeader",
    groupTitle: "Sinh viên",
    permissions: ["admin", "student"],
  },
  {
    id: "generalStudent",
    title: "Thông báo chung",
    type: "item",
    icon: <Icon.Circle size={12} />,
    permissions: ["admin", "student"],
    navLink: "/student/news",
  },
  // {
  //   id: "scoreStudent",
  //   title: "Điểm học",
  //   type: "item",
  //   icon: <Icon.Circle size={12} />,
  //   permissions: ["student"],
  //   navLink: "/student/score",
  // },
  {
    id: "scheduleStudent",
    title: "Lịch học theo kì",
    type: "item",
    icon: <Icon.Circle size={12} />,
    permissions: ["student"],
    navLink: "/student/schedule",
  },
  {
    id: "scheduleYouStudent",
    title: "Lịch học của bạn",
    type: "item",
    icon: <Icon.Circle size={12} />,
    permissions: ["student"],
    navLink: "/student/scheduleDate",
  },
  {
    id: "profile",
    title: "Thông tin sinh viên",
    type: "item",
    icon: <Icon.Circle size={12} />,
    permissions: ["student"],
    navLink: "/student/profile",
  },
  // {
  //   id: "leaningStudent",
  //   title: "Học trực tuyến",
  //   type: "collapse",
  //   icon: <Icon.Circle size={12} />,
  //   permissions: ["student"],
  //   children: [
  //     {
  //       id: "documentStudent",
  //       title: "Tài liệu và bài tập",
  //       type: "item",
  //       icon: <Icon.Download size={15} />,
  //       permissions: ["student"],
  //       navLink: "/student/document",
  //     },
  //     {
  //       id: "livesteamStudent",
  //       title: "Điểm danh",
  //       type: "item",
  //       icon: <Icon.Airplay size={15} />,
  //       permissions: ["student"],
  //       navLink: "/student/livestream",
  //     },
  //   ],
  // },
  {
    type: "groupHeader",
    groupTitle: "Trò truyện",
    permissions: [ "student", "teacher"],
  },
  {
    id: "Hội họp",
    title: "chat",
    type: "item",
    icon: <Icon.MessageCircle size={15} />,
    permissions: [ "student", "Chat", "teacher"],
    navLink: "/chat",
  },
  // {
  //   type: "groupHeader",
  //   groupTitle: "admin",
  //   permissions: ["admin"],
  // },
  // {
  //   id: "accountTeacher",
  //   title: "Tài khoản giáo viên",
  //   type: "item",
  //   icon: <Icon.Circle size={12} />,
  //   permissions: ["admin"],
  //   navLink: "/admin/account/teacher",
  // },
  // {
  //   id: "accountDaotao",
  //   title: "Tài khoản đào tạo",
  //   type: "item",
  //   icon: <Icon.Circle size={12} />,
  //   permissions: ["admin"],
  //   navLink: "/admin/account/educate",
  // },
  // {
  //   id: "accountSupportStudent",
  //   title: "Tài khoản CTSV",
  //   type: "item",
  //   icon: <Icon.Circle size={12} />,
  //   permissions: ["admin"],
  //   navLink: "/admin/account/suport",
  // },
];

export default navigationConfig;
