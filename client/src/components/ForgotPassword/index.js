import { React, useState } from "react";
import Header2 from "../Header/header2";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("")
  const [incorrectEmail, setIncorrectEmail] = useState(false);
  const [emailSent, setEmailSent] = useState(false)
  const [emailSentError, setEmailSentError] = useState(false)

  const verifyInfo = () => {
    setIncorrectEmail(
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
    );
    return (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
    );
  };

  const onChange = (e) => {
    setEmail(e.target.value)
  };

  const onSubmit = (e) => {
    const invalid = verifyInfo();
    
    if (!invalid) {
      const authentication = getAuth();
      sendPasswordResetEmail(authentication, email).then((res) => {
        setEmailSentError(false)
        setEmailSent(true)
      })
      .catch((error) => {
        setEmailSent(false)
        setEmailSentError(true)
      }
    )}
  };


  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200">
      <Header2 />
      <div className="flex flex-col items-center justify-center ml-4">
        <div class="w-full max-w-lg bg-gray-400 p-12 shadow-2xl">
          <p className="text-center text-2xl font-bold mb-6 mt-4"> Forgot Password </p>
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
          </div>

          <button
            class="bg-blue-1000 hover:bg-gray-700 text-white font-bold py-2 px-4 w-full rounded border"
            onClick={onSubmit}
            id="submit-button"
          >
            Send password reset email
          </button>

          <p className={`text-center text-md ${emailSent ? "text-green-700" : "text-red-700"} italic mt-2 ${emailSent || emailSentError ? "visible" : "invisible"}`}>
            {
              emailSent ? "Password reset email sent!" : "No user with that email exists!"
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
