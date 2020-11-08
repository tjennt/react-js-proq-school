import { Formik, Form, Field } from "formik";
import React from "react";
import { Button, FormGroup } from "reactstrap";
// import * as Yup from "yup";
import InputField from "../../../../../../utility/customFields/inputField";
import datePickerField from "../../../../../../utility/customFields/datePickerFields";

function FormStage(props) {
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
              label="Tên khóa học *"
              placeholder="Vui lòng nhập tên khóa học "
              name="name"
              component={InputField}
              value={initialValues.name}
              type="text"
            />
            <Field
              name="startAt"
              label="Thời gian bắt đầu"
              placeholder="Vui lòng nhập chọn thời gian bắt đầu "
              value={initialValues.startAt}
              component={datePickerField}
            />
            <Field
              format="dd/mm/yyyy"
              name="startEnd"
              label="Thời gian kết thúc"
              placeholder="Vui lòng nhập chọn thời gian kết thúc "
              value={initialValues.startEnd}
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

export default FormStage;
