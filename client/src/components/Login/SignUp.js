import React from "react";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { FormControl, TextField, Button } from "@material-ui/core";
import { ThemeProvider, styled } from "@material-ui/core/styles";
import { useState } from "react";
import history from "../Navigation/history";
import axios from "axios";

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

const SignUp = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [retypePassword, setRetypePassword] = React.useState("");
  const [error, setError] = React.useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, name, retypePassword);

    //Check if the passwords match up
    if (password === retypePassword) {
      axios
        .post("api/signup", {
          username,
          password, // TODO: this probably shouldn't be plain text
          name,
        })
        .then((resp) => {
          setUsername("");
          setPassword("");
          setName("");
          setRetypePassword("");
          setError(false);
          alert(resp.data);
          history.push("/mygroups");
        })
        .catch((err) => {
          console.log(err);
          alert(err.response.data);
        });
    } else {
      setError(true);
    }
  };

  const createAccount = () => {
    history.push("/login");
  };

  const onSubmit = () => {
    console.log("Hello world");
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
                  id="email"
                  label="Email"
                  style={{ width: "20rem", padding: "0", margin: "auto" }}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  type="email"
                />
                <TextField
                  id="name"
                  label="Name"
                  style={{ width: "20rem", padding: "0", margin: "0 1rem 0 0" }}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <TextField
                  id="password"
                  label="Password"
                  style={{ width: "20rem", padding: "0", margin: "0 1rem 0 0" }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  type="password"
                />
                <TextField
                  id="retypePassword"
                  label="Retype password"
                  style={{ width: "20rem", padding: "0", margin: "0 1rem 0 0" }}
                  value={retypePassword}
                  onChange={(e) => setRetypePassword(e.target.value)}
                  required
                  type="password"
                />
                {error && (
                  <p>The passwords do not match up, try re-entering them</p>
                )}

                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  id="signup-button"
                >
                  Sign Up
                </Button>
              </form>
            </FormControl>
            <h6>
              Have an account??
              <span
                style={{ textDecoration: "underline" }}
                onClick={() => createAccount()}
              >
                Log in.
              </span>
            </h6>
          </Grid>
        </MainGridContainer>
      </ThemeProvider>
    </div>
  );
};

export default SignUp;
