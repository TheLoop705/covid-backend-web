import React, { useCallback, useState } from "react";
import { withRouter } from "react-router-dom";
import app from "./base";
import { MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";
import "firebase/firestore";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [description, setDescription] = useState("");

  const handleSignUp = async (event) => {
    const db = app.firestore();
    event.preventDefault();
    window.email = email;
    try {
      await app.auth().createUserWithEmailAndPassword(email.trim(), password);
      const userRef = await db.collection("Restaurants").add({
        name: name,
        email: email,
        phone: phone,
        location: location,
        description: description,
        image: "",
        pdf: "",
      });
      console.log(userRef);
      console.log("Documnet Created");
      setName("");
      setDescription("");
      setEmail("");
      setLocation("");
      setPassword("");
      setPhone("");
    } catch (error) {
      alert(error);
    }
  };

  const style = {
    display: "flex",
    justifyContent: "center",
  };

  const color = {
    color: "white",
  };

  return (
    <div>
      <div style={style}>
        <h2 style={color}>Register Restaurants</h2>
      </div>
      <div style={{ marginTop: "20px" }}></div>
      <div style={style}>
        <form className="needs-validation">
          <MDBRow>
            <MDBCol md="6">
              <label style={color}>
                Name
                <MDBInput
                  icon="user"
                  name="name"
                  type="text"
                  id="materialFormRegisterNameEx"
                  outline
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></MDBInput>
              </label>
            </MDBCol>
            <MDBCol md="6">
              <label style={color}>
                Email
                <MDBInput
                  icon="envelope-open"
                  type="email"
                  id="materialFormRegisterConfirmEx3"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  outline
                ></MDBInput>
              </label>
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol md="6">
              <label style={color}>
                Location
                <MDBInput
                  icon="city"
                  type="text"
                  id="materialFormRegisterPasswordEx4"
                  name="location"
                  outline
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                ></MDBInput>
              </label>
            </MDBCol>
            <MDBCol md="6">
              <label style={color}>
                Phone
                <MDBInput
                  icon="map-marked-alt"
                  type="text"
                  id="materialFormRegisterPasswordEx4"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  outline
                  required
                ></MDBInput>
              </label>
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol md="6">
              <label style={color}>
                Password
                <MDBInput
                  icon="map-marked-alt"
                  type="password"
                  id="materialFormRegisterPasswordEx4"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  outline
                  required
                ></MDBInput>
              </label>
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol md="6">
              <label style={color}>Description</label>
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol>
              <MDBCol md="20">
                <MDBInput
                  type="textarea"
                  rows="5"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </MDBCol>
            </MDBCol>
          </MDBRow>
          <div style={style}>
            <MDBBtn rounded color="success" onClick={handleSignUp}>
              Register
            </MDBBtn>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withRouter(SignUp);
