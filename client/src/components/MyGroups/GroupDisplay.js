import React from "react";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { FormControl, TextField, Button, CardContent } from "@material-ui/core";
import { ThemeProvider, styled } from "@material-ui/core/styles";
import { useState } from "react";
import history from "../Navigation/history";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Card from "@material-ui/core/Card";

const theme = createTheme({
  palette: {
    type: "light",
    background: {
      default: "#ffffff",
    },
    primary: {
      main: "#DEDEDE",
      black: "#000000",
    },
    secondary: {
      main: "#68709c",
    },
  },
  typography: {
    h1: {
      fontSize: "35px",
      margin: "auto",
      textAlign: "center",
      fontWeight: "600",
      paddingTop: "200px",
    },
    h2: {
      fontSize: "25px",
      fontWeight: "400",
    },
    h6: {
      fontSize: "18px",
      margin: "auto",
      textAlign: "center",
      fontWeight: "400",
      paddingTop: "10px",
    },
  },
});

const styles = {
  cardStyle: {
    background: theme.palette.primary.main,
    boxShadow: "none",
    marginTop: "10px",
  },
  type: {
    fontSize: "16px",
    padding: "0",
    margin: "0 0 10px 0",
    fontWeight: "400",
  },
};

const MainGridContainer = styled(Grid)(({ theme }) => ({
  padding: "1rem",
  background: theme.palette.background.default,
  height: "100vh",
}));

const GroupDisplay = (props) => {
  const [title, setTitle] = React.useState("Loded Diper");
  const [description, setDescription] = React.useState(
    "A cool band for even cooler guyz"
  );
  const [type, setType] = React.useState("music");
  const [members, setMembers] = React.useState("4");

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Card style={styles.cardStyle}>
          <CardContent>
            <h2 style={{ marginBottom: "0px", marginTop: "5px" }}>
              {props.title}
            </h2>
            <p style={styles.type}>
              {props.type} | {props.members} members
            </p>
            <p style={{ fontSize: "18px", padding: "0", margin: "0" }}>
              {props.description}
            </p>
          </CardContent>
        </Card>
      </ThemeProvider>
    </div>
  );
};

export default GroupDisplay;
