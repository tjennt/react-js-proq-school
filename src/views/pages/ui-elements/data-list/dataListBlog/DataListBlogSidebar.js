import React, { Component } from "react";
import { Label, FormGroup, Button, Input, Col, Row, Form } from "reactstrap";
import { X } from "react-feather";
import PerfectScrollbar from "react-perfect-scrollbar";
import classnames from "classnames";
import "flatpickr/dist/themes/light.css";
import "../../../../../assets/scss/plugins/forms/flatpickr/flatpickr.scss";
import { Editor } from "@tinymce/tinymce-react";
import { baseUrl } from "./../../../../../utility/config/index";
import { Upload, Select } from "antd";
import { AvField, AvForm } from "availity-reactstrap-validation";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import { toastWarning } from "./../../../../../utility/toast/toastHelper";
class DataListBlogSidebar extends Component {
  state = {
    id: "",
    thump_image: "",
    imgUpdate: "",
    title: "",
    content_detail: "",
    description: "",
    seo_description: "",
    seo_title: "",
    seo_keywords: "",
    url: "",
    tag: "",
    alt: "",
    author: "",
    category: 3,
    tagUpdate: "",
    schema: "",
  };

  addNew = false;
  componentDidUpdate(prevProps, prevState) {
    const { data } = this.props;
    if (data !== null && prevProps.data === null) {
      if (data.id !== prevState.id) this.setState({ id: data.id });
      if (data.title !== prevState.title) this.setState({ title: data.title });
      if (data.alt_blog !== prevState.alt)
        this.setState({ alt: data.alt_blog });
      if (data.author !== prevState.author)
        this.setState({ author: data.author });
      if (data.schema !== prevState.schema)
        this.setState({ schema: data.schema });
      if (data.content_detail !== prevState.content_detail)
        this.setState({ content_detail: data.content_detail });
      if (data.description !== prevState.description)
        this.setState({ description: data.description });
      if (data.seo_description !== prevState.seo_description)
        this.setState({ seo_description: data.seo_description });
      if (data.seo_title !== prevState.seo_title)
        this.setState({ seo_title: data.seo_title });
      if (data.schema !== prevState.schema)
        this.setState({ schema: data.schema });
      if (data.seo_keywords !== prevState.seo_keywords)
        this.setState({ seo_keywords: data.seo_keywords });
      if (data.url !== prevState.url) this.setState({ url: data.url });
      if (data.thump_image !== prevState.thump_image)
        this.setState({ thump_image: data.thump_image });
      if (data.category_blog !== prevState.category)
        this.setState({ category: data.category_blog });
      if (data.tags !== prevState.tagUpdate) {
        const { tags } = data;
        let datatags = tags.reduce((result, acc) => [...result, acc.id], []);
        this.setState({ tagUpdate: datatags });
      }
    }

    if (data === null && prevProps.data !== null) {
      this.setState({
        id: "",
        thump_image: "",
        imgUpdate: "",
        title: "",
        content_detail: "",
        description: "",
        seo_description: "",
        seo_title: "",
        seo_keywords: "",
        url: "",
        tag: "",
        alt: "",
        author: "",
        category: 3,
        tagUpdate: "",
        schema: "",
      });
    }
    if (this.addNew) {
      this.setState({
        id: "",
        thump_image: "",
        imgUpdate: "",
        title: "",
        content_detail: "",
        description: "",
        seo_description: "",
        seo_title: "",
        seo_keywords: "",
        url: "",
        tag: "",
        alt: "",
        author: "",
        category: 3,
        tagUpdate: "",
        schema: "",
      });
    }
    this.addNew = false;
  }

  handleSubmit = (obj) => {
    let params = Object.keys(this.props.dataParams).length
      ? this.props.dataParams
      : { page: 1, perPage: 4 };
    if (this.props.data !== null) {
      this.props.updateData(obj, params);
      this.props.handleSidebar(false, true);
    } else {
      const {
        title,
        description,
        seo_description,
        seo_title,
        seo_keywords,
        url,
        alt,
        author,
      } = this.state;
      if (
        !title |
        !description |
        !seo_description |
        !seo_title |
        !seo_keywords |
        !url |
        !alt |
        !author
      ) {
        toastWarning("vui lòng điền đẩy đủ thông tin *");
        return false;
      }
      this.props.addData(obj);
      this.addNew = true;
      this.props.handleSidebar(false, true);
    }
    this.props.getData(params);
  };
  handleEditorChange = (content) => {
    this.setState({
      ...this.state,
      content_detail: content,
    });
  };
  onChange = ({ fileList: newFileList }) => {
    this.setState({
      imgUpdate: newFileList,
    });
  };
  handleChange = (value) => {
    this.setState({
      ...this.state,
      tag: value,
    });
  };
  handleChangeTag = (value) => {
    this.setState({
      ...this.state,
      tagUpdate: value,
    });
  };
  handleChangeCategory = (value) => {
    this.setState({
      ...this.state,
      category: value,
    });
  };
  render() {
    const { Option } = Select;
    let { show, handleSidebar, data, dataTagsBLog, thumbView } = this.props;
    let {
      thump_image,
      imgUpdate,
      title,
      content_detail,
      description,
      seo_description,
      seo_title,
      seo_keywords,
      url,
      schema,
      tagUpdate,
      alt,
      category,
      author,
    } = this.state;
    let children = dataTagsBLog.data.map((item) => {
      return (
        <Option key={item.id} value={item.id}>
          {item.name}
        </Option>
      );
    });
    return (
      <div
        className={classnames("data-list-sidebarBlog", {
          show: show,
        })}
      >
        <div className="data-list-sidebar-header mt-2 px-2 d-flex justify-content-between">
          <h4>{data !== null ? "Cập nhật dữ liệu" : "Thêm dữ liệu"}</h4>
          <X size={20} onClick={() => handleSidebar(false, true)} />
        </div>
        <PerfectScrollbar
          className="data-list-fields px-2 mt-3"
          options={{ wheelPropagation: false }}
        >
          <Form>
            <AvForm>
              <Row>
                {thumbView && thump_image.length ? (
                  <Col sm="12">
                    {thump_image ? (
                      <FormGroup className="text-center">
                        <img
                          width={"120px"}
                          className="img-fluid"
                          src={`${baseUrl}${thump_image}`}
                          alt={title}
                        />
                        <div className="d-flex flex-wrap justify-content-between mt-2">
                          <Button
                            color="flat-danger"
                            onClick={() => this.setState({ thump_image: "" })}
                          >
                            Remove Image
                          </Button>
                        </div>
                      </FormGroup>
                    ) : (
                      <Upload
                        fileList={imgUpdate}
                        onChange={this.onChange}
                        //  onPreview={onPreview}
                      >
                        {imgUpdate.length < 1 && "+ Tải hình "}
                      </Upload>
                    )}
                  </Col>
                ) : null}
                <Col sm="12">
                  {thumbView && thump_image.length <= 0 ? (
                    <Upload
                      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      fileList={imgUpdate}
                      onChange={this.onChange}
                      listType="picture-card"
                    >
                      {imgUpdate.length < 1 && "+ Tải hình"}
                    </Upload>
                  ) : null}
                </Col>
                <Col sm="6">
                  <FormGroup>
                    <Label for="data-alt">Thẻ Alt *</Label>
                    <AvField
                      validate={{
                        required: { value: true },
                      }}
                      errorMessage="Thông tin không được để trống"
                      name="alt"
                      type="text"
                      value={alt}
                      placeholder="Thẻ Alt"
                      onChange={(e) => this.setState({ alt: e.target.value })}
                      id="data-AltImage"
                    />
                  </FormGroup>
                </Col>
                <Col sm="6">
                  <FormGroup>
                    <Label for="data-name">Tiêu đề bài viết *</Label>
                    <AvField
                      type="text"
                      name="text"
                      value={title}
                      placeholder="Tiêu đề bài viết"
                      onChange={(e) => this.setState({ title: e.target.value })}
                      id="data-name"
                      validate={{
                        required: { value: true },
                      }}
                      errorMessage="Thông tin không được để trống"
                    />
                  </FormGroup>
                </Col>

                <Col sm="6">
                  <FormGroup>
                    <Label for="data-seoTitle">Tiêu đề SEO *</Label>
                    <AvField
                      name="seo_title"
                      type="text"
                      value={seo_title}
                      placeholder=" Tiêu đề SEO"
                      onChange={(e) =>
                        this.setState({ seo_title: e.target.value })
                      }
                      id="data-seoTitle"
                      validate={{
                        required: { value: true },
                      }}
                      errorMessage="Thông tin không được để trống"
                    />
                  </FormGroup>
                </Col>
                <Col sm="6">
                  <FormGroup>
                    <Label for="data-seoTitle">Tags</Label>
                    {tagUpdate ? (
                      <Select
                        mode="multiple"
                        style={{ width: "100%" }}
                        placeholder="Please select"
                        value={tagUpdate}
                        onChange={this.handleChangeTag}
                      >
                        {children}
                      </Select>
                    ) : (
                      <Select
                        mode="multiple"
                        style={{ width: "100%" }}
                        placeholder="Please select"
                        onChange={this.handleChange}
                      >
                        {children}
                      </Select>
                    )}

                    <br />
                  </FormGroup>
                </Col>

                <Col sm="6">
                  <FormGroup>
                    <Label for="data-description">Mô tả ngắn *</Label>
                    <AvField
                      name="description"
                      validate={{
                        required: { value: true },
                      }}
                      errorMessage="Thông tin không được để trống"
                      type="text"
                      value={description}
                      placeholder="Mô tả ngắn"
                      onChange={(e) =>
                        this.setState({ description: e.target.value })
                      }
                      id="data-description"
                    />
                  </FormGroup>
                </Col>
                <Col sm="6">
                  <FormGroup>
                    <Label for="data-seoDescription">Mô tả SEO *</Label>
                    <AvField
                      type="text"
                      name="seoDescription"
                      errorMessage="Thông tin không được để trống"
                      validate={{
                        required: { value: true },
                      }}
                      value={seo_description}
                      placeholder=" Mô tả SEO"
                      onChange={(e) =>
                        this.setState({ seo_description: e.target.value })
                      }
                      id="data-seoDescription"
                    />
                  </FormGroup>
                </Col>
                <Col sm="6">
                  <FormGroup>
                    <Label for="data-seoKeyword">Từ khóa *</Label>
                    <AvField
                      type="text"
                      errorMessage="Thông tin không được để trống"
                      validate={{
                        required: { value: true },
                      }}
                      name="seoKeyword"
                      value={seo_keywords}
                      placeholder=" Từ khóa"
                      onChange={(e) =>
                        this.setState({ seo_keywords: e.target.value })
                      }
                      id="data-seoDescription"
                    />
                  </FormGroup>
                </Col>
                <Col sm="6">
                  <FormGroup>
                    <Label for="data-url">Url *</Label>
                    <AvField
                      type="text"
                      errorMessage="Thông tin không được để trống"
                      validate={{
                        required: { value: true },
                      }}
                      name="url"
                      value={url}
                      placeholder="Url"
                      onChange={(e) => this.setState({ url: e.target.value })}
                      id="data-url"
                    />
                  </FormGroup>
                </Col>
                <Col sm="6">
                  <FormGroup>
                    <Label for="data-author">Tác giả *</Label>
                    <AvField
                      type="text"
                      validate={{
                        required: { value: true },
                      }}
                      name="author"
                      errorMessage="Thông tin không được để trống"
                      value={author}
                      placeholder="Tác giả"
                      onChange={(e) =>
                        this.setState({ author: e.target.value })
                      }
                      id="data-author"
                    />
                  </FormGroup>
                </Col>
                <Col sm="6">
                  <Label for="data-seoKeyword">Thể loại *</Label>
                  <Select
                    value={category}
                    style={{ width: "100%" }}
                    onChange={this.handleChangeCategory}
                  >
                    <Option value={1}>Tin tức </Option>
                    <Option value={2}>Sự kiện</Option>
                    <Option value={3}>Tổng hợp</Option>
                  </Select>
                </Col>
                <Col sm="12">
                  <FormGroup>
                    <Label for="data-url">Schema</Label>
                    <Input
                      style={{ height: "120px" }}
                      type="textarea"
                      name="text"
                      value={schema}
                      onChange={(e) =>
                        this.setState({ schema: e.target.value })
                      }
                      id="exampleText"
                      rows="3"
                      placeholder="Nhập script"
                    />
                  </FormGroup>
                </Col>
                <Col sm="12">
                  <FormGroup>
                    <Label for="data-body">Nội dung</Label>
                    <Editor
                      apiKey="8ba52s96tqwh6bzvs0z25ah91bgaoc5z7rt6huap2qow7kvh"
                      init={{
                        height: 500,
                        menubar: false,
                        plugins:
                          "print preview powerpaste casechange importcss tinydrive searchreplace autolink autosave save directionality advcode visualblocks visualchars fullscreen image link media mediaembed template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists checklist wordcount tinymcespellchecker a11ychecker textpattern noneditable help formatpainter pageembed charmap mentions quickbars linkchecker emoticons advtable",
                        tinydrive_token_provider: function (success, failure) {
                          success({
                            token: `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqb2huZG9lIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjoxNjI4NDk0MzEyLCJpYXQiOjE1OTczOTAzMTJ9.d0CxHrFKX-S3j9rsDUTJaKkljC_DSGSREHowXwi14qXcjg5jww5uA3Rmpg8zXvRReBLRLyS2RZqkGLuksHkXv52RybIgIEd-T-5Mq4lszPeOPEL60EDreHsECqnt9XoeK_rxB-yMJmQ34kyJO6e_eKRjwNQSf_T2FNJzhCyqa1XrrC0B0t42eL_v1t-wBPS_2dDNZGXQ7nXSUst4DxtbA137AFgDGTYxvxAeJV6WSGto_hqe5DkLxHKqhaQIi3J0tj4s0gpZjo30UchgmLTpJtbCYSjpcBDuYOHw3tSRBnl5xUYID9ZDEcNC6kJo5WVgFQEP938L760e-YjS0xeGeQ`,
                          });
                        },
                        autosave_interval: "30s",
                        menubra:
                          "file edit view insert format tools table help",
                        toolbar:
                          "undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist | forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media pageembed template link anchor codesample | a11ycheck ltr rtl | showcomments addcomment",
                      }}
                      onEditorChange={this.handleEditorChange}
                      id="data-body"
                      value={content_detail}
                    ></Editor>
                  </FormGroup>
                </Col>
              </Row>
            </AvForm>
          </Form>
        </PerfectScrollbar>
        <div className="data-list-sidebar-footer px-2 d-flex justify-content-start align-items-center mt-1">
          <Button onClick={() => this.handleSubmit(this.state)} color="primary">
            {data !== null ? "Cập nhật" : "Lưu"}
          </Button>
          <Button
            className="ml-1"
            color="danger"
            outline
            onClick={() => handleSidebar(false, true)}
          >
            Hủy
          </Button>
        </div>
      </div>
    );
  }
}
const mapStateToProp = (state) => {
  return {
    addDataSuccess: state.dataBlog.addDataSuccess,
  };
};
export default connect(mapStateToProp)(DataListBlogSidebar);
