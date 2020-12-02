import { Formik, Form, Field } from "formik";
import React from "react";
import { Button, Col, FormGroup,  Row } from "reactstrap";
import InputField from "../../../../../utility/customFields/inputField";
import SelectField from "../../../../../utility/customFields/selectFields";
import InputTextTinyField from "../../../../../utility/customFields/inputTiny/inputTiny";
// import * as Yup from "yup";

function FormBlog(props) {
  const { initialValues, dataCategory } = props;
  // const validationSchema = Yup.object().shape({
  //   title: Yup.string().required("Vui lòng nhập tiêu đề!"),
  //   content: Yup.string().required("Vui lòng nhập content !"),
  //   time_send: Yup.date().required("Vui lòng chọn ngày!"),
  // });
  const optionCategory = [
    {
      value: dataCategory ? dataCategory.fee : "",
      label: dataCategory ? dataCategory.fee : "",
    },
    {
      value: dataCategory ? dataCategory.activity : "",
      label: dataCategory ? dataCategory.activity : "",
    },
    {
      value: dataCategory ? dataCategory.learning : "",
      label: dataCategory ? dataCategory.learning : "",
    },
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
            <Row>
              <Col lg="6">
                <Field
                  name="location"
                  placeholder="Vui lòng chọn cơ sở "
                  label="Cơ sở "
                  value={initialValues.location}
                  component={InputField}
                />
              </Col>
              <Col lg="6">
                <Field
                  name="category"
                  placeholder="Vui lòng chọn thể loại "
                  label="Thể loại "
                  value={initialValues.category}
                  component={SelectField}
                  options={optionCategory}
                />
              </Col>
              <Col lg="6">
                <Field
                  label="Tiêu đề *"
                  placeholder="Vui lòng nhập tiêu đề  "
                  name="title"
                  component={InputField}
                  value={initialValues.title}
                  type="text"
                />
              </Col>

              <Col lg="12" className="mt-5">
                <Field
                  label="Nội dung thông báo  *"
                  placeholder="Vui lòng nhập thông báo  "
                  name="content"
                  component={InputTextTinyField}
                  value={initialValues.content}
                />
              </Col>
            </Row>
            <FormGroup>
              <Button
                className="mt-1"
                disabled={!isValid}
                color="primary"
                type="submit"
              >
                Lưu
              </Button>
              <Button
                onClick={() => resetForm({})}
                className="ml-2 mt-1"
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
