import { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import React from "react";
import QRCode from "qrcode.react";
import { MDBRow, MDBCol } from "mdbreact";
import app from "../base";
import "firebase/firestore";

const Qrcode = () => {
  const [name, setName] = useState("");
  const [countryData, setCountryData] = useState([]);

  useEffect(() => {
    const db = app.firestore();
    console.log("effect");
    const unsub = db.collection("Restaurants").onSnapshot((snapshot) => {
      snapshot.docs.forEach((e) => {
        setCountryData((prev) => {
          return [...prev, e.data().name];
        });
      });
    });
    return () => {
      console.log("cleanup");
      unsub();
    };
  }, []);

  const color = {
    color: "white",
  };
  const style = {
    display: "flex",
    justifyContent: "center",
    color: "white",
  };

  const style1 = {
    display: "flex",
    justifyContent: "center",
  };

  const style2 = {
    marginTop: "10px",
  };

  const style3 = {
    display: "flex",
    justifyContent: "center",
    color: "white",
    cursor: "pointer",
    marginTop: "5px",
  };

  const downloadQR = () => {
    const canvas = document.getElementById("123456");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "123456.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div>
      <h2 style={style}>Generate QRcode</h2>
      <div style={style2}></div>
      <MDBRow style={style1}>
        <MDBCol md="2">
          <label style={color}>
            <b>Restaurant name</b>
            <select
              name="country"
              value={name}
              onChange={(event) => setName(event.target.value)}
            >
              {countryData.map((e, key) => {
                return (
                  <option key={key} value={e}>
                    {e}
                  </option>
                );
              })}
            </select>
          </label>
        </MDBCol>
      </MDBRow>
      <div style={style1}>
        <QRCode
          id="123456"
          value={name}
          size={290}
          level={"H"}
          includeMargin={true}
        />
      </div>
      <div style={style3}>
        <a onClick={downloadQR}> Download QR </a>
      </div>
    </div>
  );
};

export default withRouter(Qrcode);
