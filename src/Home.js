import React from "react";
import PersistentDrawerLeft from "./components/Drawer";
import { Switch } from "react-router-dom";
import SignUp from "./SignUp";
import PrivateRoute from "./PrivateRoute";
import Restaurant from "./components/Restaurants";
import Qrcode from "./components/Qrcode";

const Home = () => {
  return (
    <>
      <PersistentDrawerLeft />
      <Switch>
        <PrivateRoute exact path="/qrcode" component={Qrcode} />
        <PrivateRoute exact path="/restaurants" component={Restaurant} />
        <PrivateRoute exact path="/signup" component={SignUp} />
      </Switch>
    </>
  );
};

export default Home;
