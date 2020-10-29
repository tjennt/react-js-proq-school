import { Formik, Form, Field } from "formik";
import React from "react";
import { Button, FormGroup } from "reactstrap";
// import * as Yup from "yup";
import InputField from "../../../../../../utility/customFields/inputField";
import datePickerField from "../../../../../../utility/customFields/datePickerFields";

function FormClass(props) {
  const { initialValues } = props;
  // const validationSchema = Yup.object().shape({
  //   title: Yup.string().required("Vui lòng nhập tiêu đề!"),
  //   content: Yup.string().required("Vui lòng nhập content !"),
  //   time_send: Yup.date().required("Vui lòng chọn ngày!"),
  // });
  // const options = [
  //   { value: 0, label: "Khuyến mãi " },
  //   { value: 1, label: "Khác" },
  // ];
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
              name="class"
              component={InputField}
              value={initialValues.title}
              type="text"
            />
            <Field
              name="Mã lớp *"
              type="text"
              label="Mã lớp"
              placeholder="Vui lòng nhập mã lớp  "
              // value={initialValues.url}
              component={InputField}
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

export default FormClass;
