import { React, useState, useEffect } from "react";
import history from "../Navigation/history";
import Header2 from "../Header/header2";
import axios from "axios";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  useEffect(() => {
    let authToken = sessionStorage.getItem("Auth Token");
    if (authToken) {
      history.push("/mygroups");
    }
  }, []);

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
      const authentication = getAuth();
      signInWithEmailAndPassword(authentication, email, password).then(
        (response) => {
          sessionStorage.setItem(
            "Auth Token",
            response._tokenResponse.refreshToken
          );
          axios
            .get("/api/getUsername", { params: { email: email } })
            .then((res) => {
              // setUsername(res.data);
              sessionStorage.setItem("username", res.data);
              history.push("/findgroups");
            });
        }
      ).catch((e) => {
        setIncorrectPassword(true);
      });
    }
  };

  const forgotPassword = (e) => {
    history.push("/forgotpassword")
  }

  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200">
      <Header2 />
      <div className="flex flex-col items-center justify-center ml-4">
        <div class="w-full max-w-lg bg-gray-400 p-12 shadow-2xl">
          <p className="text-center text-2xl font-bold mb-8"> Welcome Back </p>
          <div class="flex flex-wrap -mx-3 mb-4">
            <label
              class="block uppercase tracking-wide  text-xs font-bold mb-2"
              for="grid-last-name"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
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
            {
              incorrectEmail ? <p class="text-red-700 text-s italic">Invalid email!</p> : <></>
            }
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
              id="password"
              placeholder="password"
              class={
                incorrectPassword
                  ? "appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white border-red-500"
                  : "appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              }
              value={password}
              onChange={(e) => onChange(e)}
            />
            {
              incorrectPassword ? <p class="text-red-700 text-s italic">Password incorrect!</p> : <></>
            }
          </div>

          <button
            class="bg-blue-1000 hover:bg-gray-700 text-white font-bold py-2 px-4 w-full rounded border"
            onClick={onSubmit}
            id="submit-button"
          >
            Log In
          </button>

          <button
            class="bg-blue-1000 text-white font-bold py-2 my-3 px-4 w-full rounded"
            id="forgot-password-button"
            onClick={forgotPassword}
          >
            Forgot your password?
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
