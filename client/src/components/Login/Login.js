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
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const [incorrectPassword, setIncorrectPassword] = useState(false);
  const [incorrectEmail, setIncorrectEmail] = useState(false);

    //do the login stuff
    axios
      .post("/api/login", {
        username,
        password,
      })
      .then((resp) => {
        console.log(resp);
        alert(resp.data);
        history.push("/mygroups");
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data);
      });

  };

  const onSubmit = (e) => {
    verifyInfo();
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200">
      <Header2 />
      <div className="flex flex-col items-center justify-center ml-4">
        <div class="w-full max-w-lg bg-gray-400 p-12 shadow-2xl">
          <p className="text-center text-2xl font-bold mb-12"> Welcome Back </p>
          <div class="flex flex-wrap -mx-3 mb-4">
            <label
              class="block uppercase tracking-wide  text-xs font-bold mb-2"
              for="grid-last-name"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="email"
              class={
                incorrectEmail
                  ? "appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white border-red-500"
                  : "appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              }
              value={email}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div class="flex flex-wrap -mx-3 mb-4">
            <label
              class="block uppercase tracking-wide text-xs font-bold mb-2"
              for="grid-password"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="password"
              class={
                incorrectPassword
                  ? "appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white border-red-500"
                  : "appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              }
              value={password}
              onChange={(e) => onChange(e)}
            />
          </div>

          <button
            class="bg-blue-1000 hover:bg-gray-700 text-white font-bold py-2 px-4 w-full rounded border"
            onClick={onSubmit}
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
