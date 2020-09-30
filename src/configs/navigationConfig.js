import React from "react";
import * as Icon from "react-feather";
const navigationConfig = [
  {
    id: "groupheader5",
    type: "groupHeader",
    groupTitle: "PHÒNG CÔNG TÁC ",
    permissions: ["ADMIN", "ACCOUNT1", "ACCOUNT2"],
  },
  {
    id: "totalSupport",
    title: "Tổng hợp",
    type: "item",
    icon: <Icon.Circle size={12} />,
    permissions: ["ADMIN", "ACCOUNT1", "ACCOUNT2", "MARKETING"],
    navLink: "/assistTant",
  },
  {
    id: "searchStudentAssistant",
    title: "Tra cứu",
    type: "item",
    icon: <Icon.Circle size={12} />,
    permissions: ["ADMIN", "assistant"],
    navLink: "/assistant/search",
  },
  {
    id: "list ",
    title: "Danh sách ",
    type: "collapse",
    icon: <Icon.Circle size={12} />,
    permissions: ["ADMIN", "ACCOUNT1", "ACCOUNT2", "MARKETING"],
    children: [
      {
        id: "listStudentAssistant",
        title: "Ds.Sinh viên",
        type: "item",
        icon: <Icon.FileText size={18} />,
        permissions: ["admin", "assistant"],
        navLink: "/assistant/list/student",
      },
      {
        id: "listTeacherAssistant",
        title: "Ds.Giáo viên",
        type: "item",
        icon: <Icon.FileText size={18} />,
        permissions: ["admin", "assistant"],
        navLink: "/assistant/list/teacher",
      },
      {
        id: "listClassAssistant",
        title: "Ds.Lớp",
        type: "item",
        icon: <Icon.FileText size={18} />,
        permissions: ["admin", "assistant"],
        navLink: "/assistant/list/class",
      },
      {
        id: "listSubjectAssistant",
        title: "Ds.Môn",
        type: "item",
        icon: <Icon.FileText size={18} />,
        permissions: ["admin", "assistant"],
        navLink: "/assistant/list/subject",
      },
    ],
  },
  {
    id: "groupheader1",
    type: "groupHeader",
    groupTitle: "Phòng đào tạo",
    permissions: ["ADMIN", "ACCOUNT1", "ACCOUNT2"],
  },
  {
    id: "generalDepartment",
    title: "Tổng hợp",
    type: "item",
    icon: <Icon.Circle size={12} />,
    permissions: ["ADMIN", "ACCOUNT1", "ACCOUNT2"],
    navLink: "/department",
  },
  {
    id: "listDepartment",
    title: "Danh sách",
    type: "collapse",
    icon: <Icon.Circle size={12} />,
    permissions: ["ADMIN", "ACCOUNT1", "ACCOUNT2"],
    children: [
      {
        id: "listStudentDepartment",
        title: "Ds.Sinh viên",
        type: "item",
        icon: <Icon.FileText size={18} />,
        permissions: ["admin", "department"],
        navLink: "/department/list/student",
      },
      {
        id: "listTeacherDepartment",
        title: "Ds.Giảng viên",
        type: "item",
        icon: <Icon.FileText size={18} />,
        permissions: ["admin", "department"],
        navLink: "/department/list/teacher",
      },
      {
        id: "listClassDepartment",
        title: "Ds.Lớp",
        type: "item",
        icon: <Icon.FileText size={18} />,
        permissions: ["admin", "department"],
        navLink: "/department/list/class",
      },
      {
        id: "listSubjectDepartment",
        title: "Ds.Môn ",
        type: "item",
        icon: <Icon.FileText size={18} />,
        permissions: ["admin", "department"],
        navLink: "/department/list/subject",
      },
    ],
  },
  {
    id: "searchGeneralDepartment",
    title: "Tra cứu",
    type: "item",
    icon: <Icon.Circle size={12} />,
    permissions: ["ADMIN", "assistant"],
    navLink: "/department/search",
  },
  {
    id: "groupheader5",
    type: "groupHeader",
    groupTitle: "Giảng viên",
    permissions: ["ADMIN", "teacher"],
  },
  {
    id: "generalTeacher",
    title: "Lớp dạy",
    type: "item",
    icon: <Icon.Circle size={12} />,
    permissions: ["ADMIN", "teacher"],
    navLink: "/teacher/listClass",
  },
  {
    id: "attendance",
    title: "Điểm danh",
    type: "item",
    icon: <Icon.Circle size={12} />,
    permissions: ["ADMIN", "teacher"],
    navLink: "/teacher/attendance",
  },
  {
    id: "emailTeacher",
    title: "Hộp thư GV",
    type: "item",
    icon: <Icon.Circle size={12} />,
    permissions: ["ADMIN", "teacher"],
    navLink: "/teacher/email",
  },
  {
    id: "LiveSteamTeacher",
    title: "Học trực tuyến",
    type: "item",
    icon: <Icon.Circle size={12} />,
    permissions: ["ADMIN", "teacher"],
    navLink: "/teacher/liveStream",
  },

  //------------------
  // Student
  //-----------------

  {
    type: "groupHeader",
    groupTitle: "Sinh viên",
    permissions: ["ADMIN", "student"],
  },
  {
    id: "generalStudent",
    title: "Thông báo chung",
    type: "item",
    icon: <Icon.Circle size={12} />,
    permissions: ["ADMIN", "student"],
    navLink: "/student/news/",
  },
  {
    id: "scoreStudent",
    title: "Điểm học",
    type: "item",
    icon: <Icon.Circle size={12} />,
    permissions: ["ADMIN", "student"],
    navLink: "/student/score",
  },
  {
    id: "scheduleStudent",
    title: "Lịch học",
    type: "item",
    icon: <Icon.Circle size={12} />,
    permissions: ["ADMIN", "student"],
    navLink: "/student/schedule",
  },
  {
    id: "attendanceCheckList",
    title: "Điểm danh",
    type: "item",
    icon: <Icon.Circle size={12} />,
    permissions: ["ADMIN", "student"],
    navLink: "/student/attendance",
  },
  {
    id: "leaningStudent",
    title: "Học trực tuyến",
    type: "collapse",
    icon: <Icon.Circle size={12} />,
    permissions: ["ADMIN", "student"],
    children: [
      {
        id: "documentStudent",
        title: "Tài liệu và bài tập",
        type: "item",
        icon: <Icon.Download size={15} />,
        permissions: ["ADMIN", "student"],
        navLink: "/student/document",
      },
      {
        id: "livesteamStudent",
        title: "Điểm danh",
        type: "item",
        icon: <Icon.Airplay size={15} />,
        permissions: ["ADMIN", "student"],
        navLink: "/student/livestream",
      },
    ],
  },
];

export default navigationConfig;
