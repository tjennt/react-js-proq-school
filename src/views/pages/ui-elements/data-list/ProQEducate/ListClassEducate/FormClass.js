import { Formik, Form, Field } from "formik";
import React from "react";
import { Button, FormGroup } from "reactstrap";
// import * as Yup from "yup";
import InputField from "../../../../../../utility/customFields/inputField";
import SelectField from "../../../../../../utility/customFields/selectFields";

function FormClass(props) {
  const { initialValues, stage, specialization } = props;
  // const validationSchema = Yup.object().shape({
  //   title: Yup.string().required("Vui lòng nhập tiêu đề!"),
  //   content: Yup.string().required("Vui lòng nhập content !"),
  //   time_send: Yup.date().required("Vui lòng chọn ngày!"),
  // });
  const optionStage = stage
    ? stage.reduce(
        (arr, curr) => [...arr, { label: curr.name, value: curr._id }],
        []
      )
    : [];
  const optionSpecialization = specialization
    ? specialization.reduce(
        (arr, curr) => [...arr, { label: curr.name, value: curr._id }],
        []
      )
    : [];
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
              name="stage"
              label="Khóa *"
              value={initialValues.stage}
              placeholder="Vui lòng chọn khóa "
              component={SelectField}
              options={optionStage}
            />
            <Field
              name="specializate"
              label="Khóa *"
              value={initialValues.specializate}
              placeholder="Vui lòng chọn Chuyên ngành "
              component={SelectField}
              options={optionSpecialization}
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
