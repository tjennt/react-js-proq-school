import { Formik, Form, Field } from "formik";
import React from "react";
import { Button, FormGroup } from "reactstrap";
import * as Yup from "yup";
import InputField from "../../../../../../utility/customFields/inputField";
import datePickerField from "../../../../../../utility/customFields/datePickerFields";
import SelectFieldMulti from "../../../../../../utility/customFields/selectFields/selectFieldsMulti";
import SelectField from "../../../../../../utility/customFields/selectFields";

function FormDepartment(props) {
  const { initialValues } = props;
  // const validationSchema = Yup.object().shape({
  //   title: Yup.string().required("Vui lòng nhập tiêu đề!"),
  //   content: Yup.string().required("Vui lòng nhập content !"),
  //   time_send: Yup.date().required("Vui lòng chọn ngày!"),
  // });
  const optionsDay = [
    { value: 0, label: "Chủ nhật" },
    { value: 1, label: "thứ 2" },
    { value: 2, label: "thứ 3" },
    { value: 3, label: "thứ 4" },
    { value: 4, label: "thứ 5" },
    { value: 5, label: "thứ 6" },
    { value: 6, label: "thứ 7" },
  ];
  const optionCa = [
    { value: 0, label: " ca 1" },
    { value: 1, label: " ca 2" },
    { value: 2, label: "ca 3" },
    { value: 3, label: "ca 4" },
    { value: 4, label: "ca 5" },
    { value: 5, label: "ca 6" },
    { value: 6, label: "ca 7" },
    { value: 7, label: "ca 8" },
    { value: 8, label: "ca 9" },
    { value: 9, label: "ca 10" },
  ];
  const optionsTeacher = [
    { value: 1, label: "Nguyễn Văn A" },
    { value: 2, label: "Nguyễn Văn B" },
    { value: 3, label: "Nguyễn Văn C" },
    { value: 4, label: "Nguyễn Văn D" },
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
              label="Tên lớp *"
              placeholder="Vui lòng nhập tên lớp "
              name="nameClass"
              component={InputField}
              value={initialValues.title}
              type="text"
            />
            <Field
              name="Môn *"
              type="subject"
              label="Mã Môn"
              placeholder="Vui lòng nhập mã môn  "
              // value={initialValues.url}
              component={InputField}
            />
            <Field
              value={initialValues.days}
              name="days"
              label="Thứ"
              placeholder="Vui lòng chọn thứ "
              component={SelectFieldMulti}
              options={optionsDay}
              isMulti={true}
            />
            <Field
              name="Thời gian bắt đầu"
              label="Thời gian bắt đầu *"
              // value={initialValues.time_send}
              placeholder="Vui lòng nhập thời gian bắt đầu "
              component={datePickerField}
            />
            <Field
              name="Thời gian kết thúc "
              label="Thời gian kết thúc *"
              // value={initialValues.time_send}
              placeholder="Vui lòng thời gian kết thúc * "
              component={datePickerField}
            />
            <Field
              name="ca"
              placeholder="Vui lòng chọn ca "
              label="Ca "
              value={initialValues.ca}
              component={SelectField}
              options={optionCa}
            />
            <Field
              name="teacher"
              placeholder="Vui lòng giảng viên "
              label="Giảng viên"
              value={initialValues.teacher}
              component={SelectField}
              options={optionsTeacher}
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
