import { Formik, Form, Field } from "formik";
import React from "react";
import { Button, Col, FormGroup, Label, Row } from "reactstrap";
import datePickerField from "../../../../../utility/customFields/datePickerFields";
import InputField from "../../../../../utility/customFields/inputField";
import SelectField from "../../../../../utility/customFields/selectFields";
import { Editor } from "@tinymce/tinymce-react";
// import * as Yup from "yup";

function FormBlog(props) {
  const { initialValues } = props;
  // const validationSchema = Yup.object().shape({
  //   title: Yup.string().required("Vui lòng nhập tiêu đề!"),
  //   content: Yup.string().required("Vui lòng nhập content !"),
  //   time_send: Yup.date().required("Vui lòng chọn ngày!"),
  // });
  const optionCategory = [
    { value: 0, label: "Thông tin học tập" },
    { value: 1, label: " Thông tin hoạt động" },
    { value: 2, label: "Thông tin học phí" },
  ];
  const optionLocation = [
    { value: 0, label: "Cơ sở 1" },
    { value: 1, label: " Cơ sở 2" },
    { value: 2, label: "Cơ sở 3" },
  ];
  const handleEditorChange = (content) => {
    this.setState({
      ...this.state,
      description: content,
    });
  };
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
              <Col lg="4">
                <Field
                  label="Tiêu đề *"
                  placeholder="Vui lòng nhập tiêu đề  "
                  name="author"
                  component={InputField}
                  value={initialValues.title}
                  type="text"
                />
              </Col>
              <Col lg="4">
                <Field
                  label="Người đăng *"
                  placeholder="Vui lòng nhập tên người đăng  "
                  name="author"
                  component={InputField}
                  value={initialValues.author}
                  type="text"
                />
              </Col>
              <Col lg="4">
                <Field
                  name="Thể loại"
                  placeholder="Vui lòng chọn thể loại "
                  label="Thể loại "
                  value={initialValues.category}
                  component={SelectField}
                  options={optionCategory}
                />
              </Col>
              <Col lg="4">
                <Field
                  name="location"
                  placeholder="Vui lòng chọn cơ sở "
                  label="Cơ sở "
                  value={initialValues.location}
                  component={SelectField}
                  options={optionLocation}
                />
              </Col>
              <Col lg="4">
                <Field
                  name="timeUpdate"
                  label="Thời gian cập nhật *"
                  // value={initialValues.time_send}
                  placeholder="Vui lòng nhập Thời gian cập nhật "
                  component={datePickerField}
                />
              </Col>
              <Col lg="12">
                <Field
                  label="Nội dung ngắn *"
                  placeholder="Vui lòng nhập nội dung ngắn "
                  name="content"
                  component={InputField}
                  value={initialValues.content}
                  type="textarea"
                />
              </Col>
              <Col lg="12">
                <Label> Nhập nội dung </Label>
                <Editor
                  apiKey="uw0hs0g8n91y3rz2nzswbknc1uv3kkvll0v4eb4o7wztgibm"
                  init={{
                    height: 500,
                    plugins:
                      "print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons",
                    imagetools_cors_hosts: ["picsum.photos"],
                    menubar: "file edit view insert format tools table help",
                    toolbar:
                      "undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl",
                  }}
                  onEditorChange={handleEditorChange}
                  id="data-body"
                ></Editor>
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
