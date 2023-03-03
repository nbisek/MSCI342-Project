import React from "react";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { FormControl, TextField, Button } from "@material-ui/core";
import { ThemeProvider, styled } from "@material-ui/core/styles";
import { useState } from "react";
import history from "../Navigation/history";
import Header2 from "../Header/header2";
import axios from "axios";

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const [incorrectPassword, setIncorrectPassword] = useState(false);
  const [incorrectEmail, setIncorrectEmail] = useState(false);

  const { email, password } = inputs;

  const verifyInfo = () => {
    setIncorrectEmail(
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(inputs.email)
    );
    setIncorrectPassword(inputs.password == "");
    return (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(inputs.email) ||
      inputs.password == ""
    );
  };

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    const invalid = verifyInfo();

    const { email, password } = inputs;
    if (!invalid) {
      axios
        .post("/api/login", {
          username: email,
          password,
        })
        .then((resp) => {
          console.log(resp);
          alert(resp.data);
          history.push("/findgroups");
        })
        .catch((err) => {
          console.log(err);
          alert(err.response.data);
        });
    }
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
