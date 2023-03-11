import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { app } from '../../config/firebase-config';

import Home from "../Home";
import Login from "../Login/Login";
import { Grid } from "@material-ui/core";
import PrivateRoute from "../Navigation/PrivateRoute.js";
import { ThemeProvider, styled } from "@material-ui/core/styles";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import { useState } from "react";

const theme = createTheme({
  palette: {
    type: "light",
    background: {
      default: "#d4cfcb",
    },
    primary: {
      main: "#68709c",
    },
    secondary: {
      main: "#68709c",
    },
  },
  typography: {
    h1: {
      fontSize: "35px",
    },
  },
});

const MainGridContainer = styled(Grid)(({ theme }) => ({
  padding: "2.5rem 4rem 2rem 4rem",
}));

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //
    };
  }

  componentDidMount() {
    //
  }

  componentWillUnmount() {
    this.listener();
  }

  render() {
    return (
      <Router>
        <PrivateRoute exact path="/" component={Home} />
      </Router>
    );
  }
}

export default App;
