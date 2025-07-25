//

import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../_firepase.int";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Singup = () => {
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handelSingUp = (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;
    const terms = event.target.terms.checked;
    const name = event.target.name.value;
    const photo = event.target.photo.value;

    console.log(email, password, terms, name, photo);

    setErrorMessage("");
    setSuccess(false);

    if (password.length < 6) {
      setErrorMessage("Password should be at least 6 characters.");
      return;
    }

    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/;
    if (!regex.test(password)) {
      setErrorMessage(
        "Password must include uppercase, lowercase, number, and special character."
      );
      return;
    }

    if (!terms) {
      setErrorMessage("Please accept our terms and conditions.");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setSuccess(true);

        // ✅ Correct way to send verification
        sendEmailVerification(result.user).then(() => {
          console.log("Verification email sent.");
        });

        // updated prpfil

        const profile = {
          displayName: name,
          photoURL: photo,
        };

        updateProfile(auth.currentUser, profile)
          .then(() => {
            console.log("update profile ");
          })
          .catch(() => {
            console.log("user ERROR");
          });
      })
      .catch((error) => {
        console.log("ERROR", error.message);
        setErrorMessage(error.message);
      });
  };

  return (
    <div className="card bg-base-100 w-full max-w-sm shadow-2xl mx-auto">
      <h3 className="text-3xl font-bold mt-4 text-center">Sign Up</h3>
      <div className="card-body relative">
        <form onSubmit={handelSingUp} className="fieldset">
          <label className="label">Name</label>
          <input type="text" name="name" className="input" placeholder="Name" />

          <label className="label">Photo URL</label>
          <input
            type="text"
            name="photo"
            className="input"
            placeholder="Photo "
          />

          <label className="label">Email</label>
          <input
            type="email"
            name="email"
            className="input"
            placeholder="Email"
          />

          <label className="label">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="input w-full"
              placeholder="Password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-xl"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="mt-2">
            <input type="checkbox" name="terms" className="checkbox mr-2" />
            <span>Accept terms and conditions</span>
          </div>

          <button type="submit" className="btn btn-primary mt-4">
            Signup
          </button>
        </form>

        {errorMessage && (
          <p className="text-red-700 text-sm mt-2">{errorMessage}</p>
        )}
        {success && (
          <p className="text-green-600 text-sm mt-2">
            Account created! Please verify your email.
          </p>
        )}
        <p className="mt-4">
          Already have an account?{" "}
          <NavLink to="/login" className="text-blue-600 underline">
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Singup;




