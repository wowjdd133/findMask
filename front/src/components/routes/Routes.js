import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from "../header";
import Map from "../../pages/Map";
import Main from "../../pages/Main";
import World from "../../pages/World";

const routes = () => (
  <Router>
    <Header />
    <Route path="/Map" component={Map} />
    <Route path="/World" component={World} />
    <Route exact path="/" component={Main} />
  </Router>
);

export default routes;
