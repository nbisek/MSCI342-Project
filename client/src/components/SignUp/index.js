import { React, useState, useContext } from "react";
import history from "../Navigation/history";
import axios from "axios";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    verifyPassword: "",
    name: "",
  });

  const [incorrectName, setIncorrectName] = useState(false);
  const [incorrectEmail, setIncorrectEmail] = useState(false);
  const [passwordWrongLen, setPasswordWrongLen] = useState(false);
  const [nonMatchingPasswords, setNonMatchingPasswords] = useState(false);

  const { email, password, verifyPassword, name } = inputs;

  const verifyInfo = () => {
    setIncorrectName(inputs.name == "");
    setIncorrectEmail(
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(inputs.email)
    );
    setPasswordWrongLen(inputs.password.length < 6)
    setNonMatchingPasswords(inputs.password != inputs.verifyPassword)
    return (
      inputs.name == "" ||
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(inputs.email) ||
      inputs.password.length < 6 ||
      inputs.password != inputs.verifyPassword
    );
  };

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const invalid = verifyInfo();

    if (!invalid) {
      const { email, password, name } = inputs;
      const authentication = getAuth();
      axios
        .post("/api/signup", { email: email, username: name })
        .then((res) => {
          if (res.data == "success") {
            createUserWithEmailAndPassword(
              authentication,
              email,
              password
            ).then((response) => {
              sessionStorage.setItem(
                "Auth Token",
                response._tokenResponse.refreshToken
              );
              // setUsername(name);
              sessionStorage.setItem("username", name);
              history.push("/findgroups");
            });
          }
        });
    }
  };

  return (
    <>
      <div class="w-full max-w-lg bg-gray-400 p-12 shadow-2xl">
        <p className="text-center text-3xl font-bold mb-8"> Ready to Collab?</p>

        <div class="flex flex-wrap -mx-3 mb-4">
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide  text-xs font-bold mb-2"
              for="grid-first-name"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="name"
              id="name"
              class={
                incorrectName
                  ? "appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white border-red-500"
                  : "appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              }
              value={name}
              onChange={(e) => onChange(e)}
            />
            {
              incorrectName ? <p class="text-red-700 text-s italic">Name missing!</p> : <></>
            }
          </div>
          <div class="w-full md:w-1/2 px-3">
            <label
              class="block uppercase tracking-wide  text-xs font-bold mb-2"
              for="grid-last-name"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
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
              incorrectEmail ? <p class="text-red-700 text-s italic">Email format is incorrect!</p> : <></>
            }
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-4">
          <div class="w-full px-3">
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
                passwordWrongLen || nonMatchingPasswords
                  ? "appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white border-red-500"
                  : "appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              }
              value={password}
              onChange={(e) => onChange(e)}
            />
            {
              passwordWrongLen ? <p class="text-red-700 text-s italic">Password length must be at least 6 characters!</p> : <></>
            }
          </div>
          <div class="w-full px-3 mt-5">
            <label
              class="block uppercase tracking-wide text-xs font-bold mb-2"
              for="grid-password"
            >
              Verify Password
            </label>
            <input
              type="password"
              name="verifyPassword"
              id="verifyPassword"
              placeholder="password"
              class={
                passwordWrongLen || nonMatchingPasswords
                  ? "appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white border-red-500"
                  : "appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              }
              value={verifyPassword}
              onChange={(e) => onChange(e)}
            />
            {
              nonMatchingPasswords ? <p class="text-red-700 text-s italic">Passwords don't match!</p> : <></>
            }
          </div>
        </div>
        <div class="flex items-center justify-center">
          <button
            class="bg-blue-1000 hover:bg-gray-700 text-white font-bold py-2 px-4 w-full rounded border"
            id="signup-button"
            onClick={onSubmit}
          >
            Sign Up
          </button>
        </div>
      </div>
    </>
  );
};

export default SignUp;
