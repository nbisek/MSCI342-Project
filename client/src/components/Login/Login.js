import React from "react";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { FormControl, TextField, Button } from "@material-ui/core";
import { ThemeProvider, styled } from "@material-ui/core/styles";
import { useState } from "react";
import history from "../Navigation/history";

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
    h6: {
      fontSize: "16px",
      margin: "auto",
      textAlign: "center",
      fontWeight: "400",
      paddingTop: "10px",
    },
  },
});

const MainGridContainer = styled(Grid)(({ theme }) => ({
  padding: "1rem",
  background: theme.palette.background.default,
  height: "100vh",
}));

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: theme.palette.primary.black,
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: theme.palette.primary.black,
      borderRadius: "100px",
      borderWidth: "2px",
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.black,
    },
  },
});

const inputStyle = {
  border: "solid 2px black",
  borderRadius: "30px",
  boxShadow: "none",
  height: "35px",
  fontSize: "18px",
  padding: "5px 15px",
  focus: "none",
  margin: "auto",
};

const Login = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);

    //do the login stuff

    setUsername("");
    setPassword("");

    //if the account exists
    history.push("/mygroups");
  };

  const createAccount = () => {
    history.push("/signup");
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <MainGridContainer
          container
          spacing={0}
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Grid item xs={12} m={2}>
            <h1 style={theme.typography.h1}>WarriorsTogether</h1>
            <h6 style={theme.typography.h6}>Bringing students together</h6>

            <FormControl
              className="review-form"
              autoComplete="off"
              onSubmit={handleFormSubmit}
            >
              <form>
                <TextField
                  id="actor-name"
                  label="Email"
                  style={{ width: "20rem", padding: "0", margin: "auto" }}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  type="email"
                />
                <TextField
                  id="actor-name"
                  label="Password"
                  style={{ width: "20rem", padding: "0", margin: "0 1rem 0 0" }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  type="password"
                />

                <Button variant="contained" color="primary" type="submit">
                  Login
                </Button>
              </form>
            </FormControl>
            <h6>
              Dont have an account?{" "}
              <span
                style={{ textDecoration: "underline" }}
                onClick={() => createAccount()}
              >
                Sign up.
              </span>
            </h6>
          </Grid>
        </MainGridContainer>
      </ThemeProvider>
    </div>
  );
};

export default Login;
