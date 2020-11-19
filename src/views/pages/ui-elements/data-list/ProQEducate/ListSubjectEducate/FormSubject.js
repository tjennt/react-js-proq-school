import { Formik, Form, Field } from "formik";
import React from "react";
import { Button, FormGroup } from "reactstrap";
import * as Yup from "yup";
import InputField from "../../../../../../utility/customFields/inputField";
function FormSubject(props) {
  const { initialValues } = props;
  const validationSchema = Yup.object().shape({
    nameSubject: Yup.string().required("Vui lòng nhập môn!"),
  });
  return (
    <Formik
      enableReinitialize="true"
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={props.onSubmitForm}
    >
      {(formikProps) => {
        const { isValid, resetForm } = formikProps;
        return (
          <Form>
            <Field
              label="Tên môn *"
              placeholder="Vui lòng nhập tên môn "
              name="nameSubject"
              component={InputField}
              value={initialValues.nameSubject}
              type="text"
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

export default FormSubject;
