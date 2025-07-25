import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import React, { useRef, useState } from "react";
import { auth } from "../../_firepase.int";
import { NavLink } from "react-router-dom";

const Login = () => {
  const [success, setSuccess] = useState(false);
  const [loginError, setLoginError] = useState("");
  const emailref = useRef();

  const handelLogin = (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    console.log(email, password);

    setSuccess(false);
    setLoginError("");

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setSuccess(true);
        if (!result.user.emailVerified) {
        
          setLoginError("Please Verifide email ");
        } else {
          setSuccess(true);
        }
      })
      .catch((error) => {
        console.log("ERROR", error.message);
        setLoginError(error.message);
      });
  };

  const forgetPassword = () => {
    console.log("forgetr password", emailref.current.value);
const email = emailref.current.value;
if(!email ){
consolelog("Place proivate tha valid email addres ")

} 
else {

  sendPasswordResetEmail(auth, email)
  .then ( () => {
alert('password Resent Email Sent ')


  })

}

  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">Welcome back! Please login to your account.</p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handelLogin}>
            <div className="card-body">
              <fieldset className="fieldset">
                <label className="label">Email</label>

                <input
                  ref={emailref}
                  type="email"
                  className="input"
                  name="email"
                  placeholder="Email"
                />
                <label className="label">Password</label>
                <input
                  type="password"
                  className="input"
                  name="password"
                  placeholder="Password"
                />
                <div onClick={forgetPassword}>
                  <a className="link link-hover"> Forgot password? </a>
                </div>
                <button className="btn btn-neutral mt-4">Login</button>
              </fieldset>
            </div>
          </form>

          {success && (
            <p className="text-green-600 text-center">Login Success</p>
          )}
          {loginError && (
            <p className="text-red-600 text-center">{loginError}</p>
          )}
          <p className="text-center mt-2">
            New to This Website? <NavLink to="/singup">Signup</NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
