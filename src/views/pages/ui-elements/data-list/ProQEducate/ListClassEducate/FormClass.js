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
              value={initialValues.nameClass}
              type="text"
            />
            <Field
              name="idClass"
              type="text"
              label="Mã lớp"
              placeholder="Vui lòng nhập mã lớp  "
              value={initialValues.idClass}
              component={InputField}
            />
            <Field
              name="start_time"
              label="Thời gian bắt đầu *"
              value={initialValues.start_time}
              placeholder="Vui lòng nhập thời gian bắt đầu "
              component={datePickerField}
            />
            <Field
              name="end_time"
              label="Thời gian kết thúc *"
              value={initialValues.end_time}
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
