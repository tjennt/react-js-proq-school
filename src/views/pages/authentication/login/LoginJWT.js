import React from "react";
// import { Link } from "react-router-dom";
import { CardBody, FormGroup, Form, Button, Label } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Mail, Lock } from "react-feather";
import {
  loginWithJWT,
  changeRole,
} from "../../../../redux/actions/auth/loginActions";
import { connect } from "react-redux";
import { history } from "../../../../history";
import GoogleLogin from "react-google-login";
class LoginJWT extends React.Component {
  state = {
    email: "",
    password: "",
    remember: false,
  };
  handleChangeChecked = (event) => {
    this.setState({
      remember: event.target.checked,
    });
  };
  handleLogin = (e) => {
    e.preventDefault();
    this.props.loginWithJWT(this.state);
  };
  responseGoogle = (res) => {
    console.log(res);
    console.log(res.profileObj);
  };
  render() {
    return (
      <React.Fragment>
        <CardBody className="pt-1">
          <Form action="/" onSubmit={this.handleLogin}>
            <AvForm>
              <FormGroup className="form-label-group position-relative has-icon-left">
                <AvField
                  type="email"
                  name="email"
                  // label="Name (default error message)"
                  placeholder="Tài khoản"
                  value={this.state.email}
                  errorMessage="Thông tin không được để trống"
                  onChange={(e) => this.setState({ email: e.target.value })}
                  validate={{
                    required: { value: true },
                  }}
                />
                <div className="form-control-position">
                  <Mail size={15} />
                </div>
                <Label>Tài khoản</Label>
              </FormGroup>
              <FormGroup className="form-label-group position-relative has-icon-left">
                <AvField
                  type="password"
                  name="password"
                  errorMessage="Thông tin không được để trống"
                  placeholder="Mật khẩu"
                  value={this.state.password}
                  onChange={(e) => this.setState({ password: e.target.value })}
                  validate={{
                    required: { value: true },
                  }}
                />
                <div className="form-control-position">
                  <Lock size={15} />
                </div>
                <Label>Mật khẩu</Label>
              </FormGroup>
              <div className="d-flex justify-content-between">
                <GoogleLogin
                  clientId="1038607072813-rdjohk5kccvju3891r4vj73b9o0knphu.apps.googleusercontent.com"
                  onSuccess={this.responseGoogle}
                  onFailure={this.onFailure}
                  cookiePolicy={"single_host_origin"}
                />
                <Button.Ripple color="primary" type="submit">
                  Đăng nhập
                </Button.Ripple>
              </div>
            </AvForm>
          </Form>
        </CardBody>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    values: state.auth.login,
  };
};
export default connect(mapStateToProps, { loginWithJWT, changeRole })(LoginJWT);
