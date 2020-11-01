import { Formik, Form, Field } from "formik";
import React from "react";
import { Button, FormGroup } from "reactstrap";
// import * as Yup from "yup";
import InputField from "../../../../../../utility/customFields/inputField";
import SelectField from "../../../../../../utility/customFields/selectFields";

function FormDepartment(props) {
  const { initialValues } = props;
  // const validationSchema = Yup.object().shape({
  //   title: Yup.string().required("Vui lòng nhập tiêu đề!"),
  //   content: Yup.string().required("Vui lòng nhập content !"),
  //   time_send: Yup.date().required("Vui lòng chọn ngày!"),
  // });
  const optionRole = [
    { value: 0, label: " Giảng viên" },
    { value: 1, label: " Đào tạo" },
    { value: 2, label: " Công tác sinh viên" },
    { value: 3, label: "Admin" },
  ];
  const optionStatus = [
    { value: true, label: " Kích hoạt" },
    { value: false, label: "Chưa kích hoạt" },
  ];

  return (
    <Formik
      enableReinitialize="true"
      initialValues={initialValues}
      // validationSchema={validationSchema}
      onSubmit={props.onSubmitForm}
    >
      {(formikProps) => {
        const { isValid, resetForm } = formikProps;
        return (
          <Form>
            <Field
              label="Tên Giảng viên *"
              placeholder="Vui lòng nhập tên giảng viên "
              name="fullName"
              component={InputField}
              value={initialValues.fullName}
              type="text"
            />
            <Field
              label="Tên tài khoảng *"
              placeholder="Vui lòng nhập tên giảng viên "
              name="username"
              component={InputField}
              value={initialValues.username}
              type="text"
            />
            <Field
              label="Email *"
              placeholder="Vui lòng nhập email "
              name="email"
              component={InputField}
              value={initialValues.email}
              type="text"
            />
            <Field
              label="Mật khẩu *"
              placeholder="Vui lòng nhập mật khẩu "
              name="password"
              component={InputField}
              value={initialValues.password}
              type="password"
            />
            <Field
              name="role"
              placeholder="Vui lòng chọn quyền "
              label="Quyền "
              value={initialValues.role}
              component={SelectField}
              options={optionRole}
            />
            <Field
              name="status"
              placeholder="Vui lòng chọn quyền "
              label="Quyền "
              value={initialValues.status}
              component={SelectField}
              options={optionStatus}
            />
            <FormGroup>
              <Button disabled={!isValid} color="primary" type="submit">
                Lưu
              </Button>
              <Button
                onClick={() => resetForm({})}
                className="ml-2"
                color="danger"
              >
                {" "}
                Huỷ{" "}
              </Button>
            </FormGroup>
          </Form>
        );
      }}
    </Formik>
  );
}

export default FormDepartment;
