import { Formik, Form, Field } from "formik";
import React from "react";
import { Button, FormGroup } from "reactstrap";
// import * as Yup from "yup";
import InputField from "../../../../../../utility/customFields/inputField";
import selectFieldsMulti from "../../../../../../utility/customFields/selectFields/selectFieldsMulti";

function FormSpecialization(props) {
  const { initialState, subject } = props;
  // const validationSchema = Yup.object().shape({
  //   title: Yup.string().required("Vui lòng nhập tiêu đề!"),
  //   content: Yup.string().required("Vui lòng nhập content !"),
  //   time_send: Yup.date().required("Vui lòng chọn ngày!"),
  // });
  const optionSubject = subject
    ? subject.reduce(
        (arr, curr) => [...arr, { value: curr._id, label: curr.name }],
        []
      )
    : [];
  return (
    <Formik
      enableReinitialize="true"
      initialValues={initialState}
      // validationSchema={validationSchema}
      onSubmit={props.onSubmitForm}
    >
      {(formikProps) => {
        const { isValid } = formikProps;
        return (
          <Form>
            <Field
              label="Tên chuyên ngành *"
              placeholder="Vui lòng nhập tên chuyên ngành "
              name="nameSpecialization"
              component={InputField}
              value={initialState.nameSpecialization}
              type="text"
            />
            <Field
              name="subject"
              label="Chọn môn học"
              placeholder="Chọn môn học "
              value={initialState.subject}
              component={selectFieldsMulti}
              isMulti={true}
              options={optionSubject}
            />

            <FormGroup>
              <Button disabled={!isValid} color="primary" type="submit">
                Lưu
              </Button>
              <Button
                onClick={() => props.handleSidebar(false,true)}
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

export default FormSpecialization;
