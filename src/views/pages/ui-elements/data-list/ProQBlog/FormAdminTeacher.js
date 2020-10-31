import { Formik, Form, Field } from "formik";
import React from "react";
import { Button, FormGroup } from "reactstrap";
import datePickerField from "../../../../../utility/customFields/datePickerFields";
import InputField from "../../../../../utility/customFields/inputField";
import SelectField from "../../../../../utility/customFields/selectFields";
// import * as Yup from "yup";

function FormBlog(props) {
  const { initialValues } = props;
  // const validationSchema = Yup.object().shape({
  //   title: Yup.string().required("Vui lòng nhập tiêu đề!"),
  //   content: Yup.string().required("Vui lòng nhập content !"),
  //   time_send: Yup.date().required("Vui lòng chọn ngày!"),
  // });
  const optionCategory = [
    { value: 0, label: "Thông tin học tập" },
    { value: 1, label: " Thông tin hoạt động" },
    { value: 2, label: "Thông tin học phí" },
  ];
  const optionLocation = [
    { value: 0, label: "Cơ sở 1" },
    { value: 1, label: " Cơ sở 2" },
    { value: 2, label: "Cơ sở 3" },
  ];
  const optionsDay = [
    { value: 0, label: "Chủ nhật" },
    { value: 1, label: "thứ 2" },
    { value: 2, label: "thứ 3" },
    { value: 3, label: "thứ 4" },
    { value: 4, label: "thứ 5" },
    { value: 5, label: "thứ 6" },
    { value: 6, label: "thứ 7" },
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
              label="Người đăng *"
              placeholder="Vui lòng nhập tên người đăng  "
              name="author"
              component={InputField}
              value={initialValues.author}
              type="text"
            />
            <Field
              label="Nội dung *"
              placeholder="Vui lòng nhập nội dung "
              name="content"
              component={InputField}
              value={initialValues.email}
              type="textarea"
            />
            <Field
              name="Thứ"
              placeholder="Vui lòng chọn thứ "
              label="Chọn thứ "
              value={initialValues.date}
              component={SelectField}
              options={optionsDay}
            />
            <Field
              name="Thể loại"
              placeholder="Vui lòng chọn thể loại "
              label="Thể loại "
              value={initialValues.role}
              component={SelectField}
              options={optionCategory}
            />
            <Field
              name="location"
              placeholder="Vui lòng chọn cơ sở "
              label="Thể loại "
              value={initialValues.location}
              component={SelectField}
              options={optionLocation}
            />
            <Field
              name="timeUpdate"
              label="Thời gian cập nhật *"
              // value={initialValues.time_send}
              placeholder="Vui lòng nhập Thời gian cập nhật "
              component={datePickerField}
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

export default FormBlog;
