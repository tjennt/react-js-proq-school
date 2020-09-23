import React, { Component } from "react";
import { Label, Input, FormGroup, Button } from "reactstrap";
import { X } from "react-feather";
import PerfectScrollbar from "react-perfect-scrollbar";
import classnames from "classnames";

class DataListCouSidebar extends Component {
  state = {
    id: "",
    name: "",
    category: "Audio",
    order_status: "pending",
    price: "",
    img: "",
    popularity: {
      popValue: "",
    },
  };

  addNew = false;

  componentDidUpdate(prevProps, prevState) {
    const { data } = this.props;
    if (data !== null && prevProps.data === null) {
      if (data.id !== prevState.id) this.setState({ id: data.id });
      if (data.name !== prevState.name) this.setState({ name: data.name });
      if (data.category !== prevState.category)
        this.setState({ category: data.category });
      if (data.popularity.popValue !== prevState.popularity) {
        this.setState({
          popularity: {
            ...this.state.popularity,
            popValue: data.popularity.popValue,
          },
        });
      }
      if (data.order_status !== prevState.order_status)
        this.setState({ order_status: data.order_status });
      if (data.price !== prevState.price) this.setState({ price: data.price });
      if (data.img !== prevState.img) this.setState({ img: data.img });
    }
    if (data === null && prevProps.data !== null) {
      this.setState({
        id: "",
        name: "",
        category: "Audio",
        order_status: "pending",
        price: "",
        img: "",
        popularity: {
          popValue: "",
        },
      });
    }
    if (this.addNew) {
      this.setState({
        id: "",
        name: "",
        category: "Audio",
        order_status: "pending",
        price: "",
        img: "",
        popularity: {
          popValue: "",
        },
      });
    }
    this.addNew = false;
  }

  handleSubmit = (obj) => {
    const {
      data,
      updateData,
      addData,
      dataParams,
      handleSidebar,
      getData,
    } = this.props;
    if (data !== null) {
      updateData(obj);
    } else {
      this.addNew = true;
      addData(obj);
    }
    let params = Object.keys(dataParams).length
      ? dataParams
      : { page: 1, perPage: 4 };
    handleSidebar(false, true);
    getData(params);
  };

  render() {
    let { show, handleSidebar, data, thumbView } = this.props;
    let { name, category, order_status, price, popularity, img } = this.state;
    return (
      <div
        className={classnames("data-list-sidebar", {
          show: show,
        })}
      >
        <div className="data-list-sidebar-header mt-2 px-2 d-flex justify-content-between">
          <h4>{data !== null ? "UPDATE DATA" : "ADD NEW DATA"}</h4>
          <X size={20} onClick={() => handleSidebar(false, true)} />
        </div>
        <PerfectScrollbar
          className="data-list-fields px-2 mt-3"
          options={{ wheelPropagation: false }}
        >
          {thumbView && img.length ? (
            <FormGroup className="text-center">
              <img className="img-fluid" src={img} alt={name} />
              <div className="d-flex flex-wrap justify-content-between mt-2">
                <label
                  className="btn btn-flat-primary"
                  htmlFor="update-image"
                  color="primary"
                >
                  Upload Image
                  <input
                    type="file"
                    id="update-image"
                    hidden
                    onChange={(e) =>
                      this.setState({
                        img: URL.createObjectURL(e.target.files[0]),
                      })
                    }
                  />
                </label>
                <Button
                  color="flat-danger"
                  onClick={() => this.setState({ img: "" })}
                >
                  Remove Image
                </Button>
              </div>
            </FormGroup>
          ) : null}
          <FormGroup>
            <Label for="data-name">Name</Label>
            <Input
              type="text"
              value={name}
              placeholder="Apple IphoneX"
              onChange={(e) => this.setState({ name: e.target.value })}
              id="data-name"
            />
          </FormGroup>
          <FormGroup>
            <Label for="data-category">Category</Label>
            <Input
              type="select"
              id="data-category"
              value={category}
              onChange={(e) => this.setState({ category: e.target.value })}
            >
              <option>Audio</option>
              <option>Computers</option>
              <option>Fitness</option>
              <option>Appliances</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="data-popularity">Popularity</Label>
            <Input
              type="number"
              value={popularity.popValue}
              id="data-popularity"
              placeholder="0 - 100%"
              onChange={(e) =>
                this.setState({
                  popularity: { popularity, popValue: e.target.value },
                })
              }
            />
          </FormGroup>
          <FormGroup>
            <Label for="data-status">Order Status</Label>
            <Input
              type="select"
              id="data-status"
              value={order_status}
              onChange={(e) => this.setState({ order_status: e.target.value })}
            >
              <option>pending</option>
              <option>canceled</option>
              <option>delivered</option>
              <option>on hold</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="data-price">Price</Label>
            <Input
              type="number"
              value={price}
              onChange={(e) => this.setState({ price: e.target.value })}
              id="data-price"
              placeholder="69.99"
            />
          </FormGroup>
          {this.props.thumbView && img.length <= 0 ? (
            <label
              className="btn btn-primary"
              htmlFor="upload-image"
              color="primary"
            >
              Upload Image
              <input
                type="file"
                id="upload-image"
                hidden
                onChange={(e) =>
                  this.setState({ img: URL.createObjectURL(e.target.files[0]) })
                }
              />
            </label>
          ) : null}
        </PerfectScrollbar>
        <div className="data-list-sidebar-footer px-2 d-flex justify-content-start align-items-center mt-1">
          <Button color="primary" onClick={() => this.handleSubmit(this.state)}>
            {data !== null ? "Update" : "Submit"}
          </Button>
          <Button
            className="ml-1"
            color="danger"
            outline
            onClick={() => handleSidebar(false, true)}
          >
            Cancel
          </Button>
        </div>
      </div>
    );
  }
}
export default DataListCouSidebar;
