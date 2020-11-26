import { Formik, Form, Field } from "formik";
import React from "react";
import { Button, FormGroup } from "reactstrap";
import * as Yup from "yup";
import InputField from "../../../../../../utility/customFields/inputField";
import SelectField from "../../../../../../utility/customFields/selectFields";

function FormClass(props) {
  const { initialValues, stage, specialization, handleSidebar, data } = props;
  const validationSchema = Yup.object().shape({
    nameClass: Yup.string().required("Vui lòng nhập lớp!"),
    stage: Yup.string().required("Vui lòng chọn khóa!"),
    specializate: Yup.string().required("Vui lòng chọn chuyên ngành!"),
  });
  const handleCancle = () => {
    handleSidebar(false, true);
  };
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
      validationSchema={validationSchema}
      onSubmit={props.onSubmitForm}
    >
      {(formikProps) => {
        const { isValid, isSubmitting } = formikProps;
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
              isClearable={isSubmitting}
              isDisabled={data ? true : false}
              value={initialValues.stage}
              placeholder="Vui lòng chọn khóa "
              component={SelectField}
              options={optionStage}
            />
            <Field
              name="specializate"
              label="Chuyên ngành *"
              isDisabled={data ? true : false}
              value={initialValues.specializate}
              placeholder="Vui lòng chọn Chuyên ngành "
              component={SelectField}
              options={optionSpecialization}
            />
            <FormGroup>
              <Button disabled={!isValid} color="primary" type="submit">
                Lưu
              </Button>
              <Button onClick={handleCancle} className="ml-2" color="danger">
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
