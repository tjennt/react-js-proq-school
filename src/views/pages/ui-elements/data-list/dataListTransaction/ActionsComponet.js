import React, { Component } from "react";
import { Button, Input } from "antd";
import tick from "../../../../../assets/img/icons/tick.svg";
import { Modal } from "antd";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import {
  updateStatusAcceptApproved,
  updateStatusAcceptDone,
} from "../../../../../redux/actions/dataListTransaction/index";
const { TextArea } = Input;

class ActionsComponet extends Component {
  state = {
    visible: false,
    visibleAccept: false,
    visibileDone: false,
    description: "",
  };
  showModalDone = () => {
    this.setState({
      visibileDone: true,
    });
  };
  showModalAccept = () => {
    this.setState({
      visibleAccept: true,
    });
  };
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  handleOk = (e) => {
    const { parsedFilter, row, updateStatusAcceptApproved } = this.props;
    const { description } = this.state;
    let params = Object.keys(parsedFilter).length
      ? parsedFilter
      : { page: 1, perPage: 4 };
    updateStatusAcceptApproved(description, -1, row, params);
    this.setState({
      visible: false,
    });
  };
  handleOkAccept = (e) => {
    const { parsedFilter, row, updateStatusAcceptApproved } = this.props;
    let params = Object.keys(parsedFilter).length
      ? parsedFilter
      : { page: 1, perPage: 4 };
    const { description } = this.state;
    updateStatusAcceptApproved(description, 1, row, params);
    this.setState({
      visibleAccept: false,
    });
  };
  handleOkDone = (e) => {
    const { parsedFilter, updateStatusAcceptDone, row } = this.props;
    let params = Object.keys(parsedFilter).length
      ? parsedFilter
      : { page: 1, perPage: 4 };
    updateStatusAcceptDone(2, row, params);
    this.setState({
      visibileDone: false,
    });
  };
  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  };
  handleCancelAccept = (e) => {
    this.setState({
      visibleAccept: false,
    });
  };
  handleCancelDone = (e) => {
    this.setState({
      visibileDone: false,
    });
  };
  render() {
    const { row, userRole } = this.props;
    const { description } = this.state;
    var xhtml = null;
    if (row.status === -1) {
      xhtml = (
        <div>
          <div
            style={{
              width: "20px",
              marginLeft: "20px",
            }}
          >
            {" "}
            <img src={tick} alt="tick" />
          </div>
        </div>
      );
    } else if (row.status === 0) {
      xhtml = (
        <div>
          <Button
            onClick={this.showModal}
            style={{
              borderRadius: "20px",
            }}
            type="danger"
          >
            {" "}
            Từ chối
          </Button>
          <Button
            onClick={this.showModalAccept}
            style={{
              backgroundColor: "#FFA000",
              color: "#fff",
              marginLeft: "8px",
              borderRadius: "20px",
              border: "none",
            }}
            type="success"
          >
            Chấp nhận
          </Button>
        </div>
      );
    } else if (row.status === 1 && userRole !== "ACCOUNT1") {
      xhtml = (
        <div>
          <Button
            onClick={this.showModalDone}
            style={{
              backgroundColor: "#00ca77",
              color: "#fff",
              marginLeft: "8px",
              borderRadius: "20px",
              border: "none",
            }}
            type="warning"
          >
            {" "}
            Hoàn tất
          </Button>
        </div>
      );
    } else {
      xhtml = (
        <div>
          <div
            style={{
              width: "20px",
              marginLeft: "20px",
            }}
          >
            {" "}
            <img src={tick} alt="tick" />
          </div>
        </div>
      );
    }
    return (
      <div className="data-list-action d-flex pd-2">
        {" "}
        <Modal
          cancelText="Hủy"
          okText="Xác nhận"
          title="Phản hồi cho khách hàng "
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <TextArea
            value={description}
            onChange={(e) => this.setState({ description: e.target.value })}
            type="text"
            placeholder="Vui lòng nhập lí do "
          />
        </Modal>
        <Modal
          cancelText="Hủy"
          okText="Xác nhận"
          title="Hoàn tiền cho khách hàng "
          visible={this.state.visibleAccept}
          onOk={this.handleOkAccept}
          onCancel={this.handleCancelAccept}
        >
          <p>Bạn có muốn chấp nhận hay không </p>
        </Modal>{" "}
        <Modal
          cancelText="Hủy"
          okText="Xác nhận"
          title="Hoàn tất quá trình"
          visible={this.state.visibileDone}
          onOk={this.handleOkDone}
          onCancel={this.handleCancelDone}
        >
          <p>Bạn có muốn hoàn tất hay không </p>
        </Modal>{" "}
        {xhtml}{" "}
      </div>
    );
  }
}
export const mapStateToProps = (state) => {
  return {
    userRole: state.auth.login.userRole,
  };
};
export default connect(mapStateToProps, {
  updateStatusAcceptApproved,
  updateStatusAcceptDone,
})(ActionsComponet);
