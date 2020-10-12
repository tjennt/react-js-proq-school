import { Formik, Form, Field } from "formik";
import React from "react";
import { Button, FormGroup } from "reactstrap";
import * as Yup from "yup";
import InputField from "../../../../../../utility/customFields/inputField";
import datePickerField from "../../../../../../utility/customFields/datePickerFields";
import SelectField from "../../../../../../utility/customFields/selectFields";

function FormSubject(props) {
  const { initialValues } = props;
  // const validationSchema = Yup.object().shape({
  //   title: Yup.string().required("Vui lòng nhập tiêu đề!"),
  //   content: Yup.string().required("Vui lòng nhập content !"),
  //   time_send: Yup.date().required("Vui lòng chọn ngày!"),
  // });
  const options = [
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
    { value: 5, label: "5" },
    { value: 6, label: "6" },
    { value: 7, label: "7" },
    { value: 8, label: "8" },
    { value: 9, label: "9" },
    { value: 10, label: "10" },
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
              label="Tên môn *"
              placeholder="Vui lòng nhập tên môn "
              name="subject"
              component={InputField}
              value={initialValues.title}
              type="text"
            />
            <Field
              name="Mã môn *"
              type="text"
              label="Mã môn"
              placeholder="Vui lòng nhập mã môn  "
              // value={initialValues.url}
              component={InputField}
            />
            <Field
              name="fail"
              placeholder="Vui lòng chọn "
              label="Fail điểm danh"
              value={initialValues.fail}
              component={SelectField}
              options={options}
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
