import React from "react";
// import { Link } from "react-router-dom";
import { CardBody, FormGroup, Form, Button, Label, Input } from "reactstrap";
import { Mail, Lock } from "react-feather";
import {
  loginWithJWT,
  changeRole,
  loginWithGoogle,
} from "../../../../redux/actions/auth/loginActions";
import { connect } from "react-redux";
// import { history } from "../../../../history";
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
    this.props.loginWithGoogle(res.tokenId);
  };
  render() {
    return (
      <React.Fragment>
        <CardBody className="pt-1">
          <Form action="/" onSubmit={this.handleLogin}>
            <FormGroup className="form-label-group position-relative has-icon-left">
              <Input
                type="username"
                name="email"
                placeholder="Tài khoản"
                onChange={(e) => this.setState({ email: e.target.value })}
              />
              <div className="form-control-position">
                <Mail size={15} />
              </div>
              <Label>Tài khoản</Label>
            </FormGroup>
            <FormGroup className="form-label-group position-relative has-icon-left">
              <Input
                type="password"
                name="password"
                placeholder="Mật khẩu"
                value={this.state.password}
                onChange={(e) => this.setState({ password: e.target.value })}
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
export default connect(mapStateToProps, {
  loginWithJWT,
  changeRole,
  loginWithGoogle,
})(LoginJWT);
