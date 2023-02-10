import React, { useCallback, useContext } from "react";
import { Redirect } from "react-router-dom";
import app from "./base.js";
import { AuthContext } from "./Auth.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { MDBBtn } from "mdbreact";

const Login = ({ history }) => {
  const { currentUser } = useContext(AuthContext);

  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/restaurants");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  if (currentUser) {
    return <Redirect to="/restaurants" />;
  }

  const divStyle = {
    marginTop: "15%",
    display: "flex",
    justifyContent: "center",
  };

  const divStyle1 = {
    display: "flex",
    justifyContent: "center",
  };

  const divStyle2 = {
    padding: "2px",
    marginTop: "10px",
    display: "flex",
    justifyContent: "center",
  };

  return (
    <div style={divStyle}>
      <div>
        <div style={divStyle1}>
          <h1 style={{ color: "white" }}>Restaurants login</h1>
        </div>
        <div style={{ marginTop: "15px" }}></div>
        <form onSubmit={handleLogin}>
          <div style={divStyle1}>
            <label>
              <input
                name="email"
                type="email"
                placeholder="Email"
                className="form-control form-control-sm"
              />
            </label>
          </div>
          <div style={divStyle1}>
            <label>
              <input
                name="password"
                type="password"
                placeholder="Password"
                className="form-control form-control-sm"
              />
            </label>
          </div>
          <div style={divStyle2}>
            <MDBBtn color="success" type="submit">
              Login
            </MDBBtn>
            {/* <button type="submit" className="gradient='aqua'">
              Log in
            </button> */}
          </div>
        </form>
      </div>
    </div>
  );
};

// export default withRouter(Login);
export default Login;
