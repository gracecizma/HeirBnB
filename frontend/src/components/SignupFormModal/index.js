import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();


  const validate = () => {
    const validationErrors = {};

    if (username && username.length < 4) {
      validationErrors.username('Username must be at least 4 characters')
    }
    if (password && password.length < 6) {
      validationErrors.password('Password must be at least 6 characters')
    }
    if (password && confirmPassword && password !== confirmPassword) {
      validationErrors.password('Passwords do not match')
    }
    return validationErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate()
    setErrors(validationErrors)

    if (!Object.values(validationErrors).length) {
      return dispatch(sessionActions.signup({ email, username, firstName, lastName, password }))
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return
  };

  return (
    <>
      <div className="signup-container">

        <h1 className="signup-header">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Email {errors.email &&
              <span className="error-message">{errors.email}</span>}
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Username {errors.username &&
              <span className="error-message">{errors.username}</span>}
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <label>
            First Name {errors.firstName &&
              <span className="error-message">{errors.firstName}</span>}
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </label>
          <label>
            Last Name {errors.lastName &&
              <span className="error-message">{errors.lastName}</span>}
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </label>
          <label>
            Password {errors.password &&
              <span className="error-message">{errors.password}</span>}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <label>
            Confirm Password
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
          <button className="signup-button"
            type="submit"
            disabled={
              (!email.length ||
                !username.length ||
                !lastName.length ||
                !firstName.length ||
                !password.length)
              ||
              (username.length < 4)
              ||
              (password.length < 6)
              ||
              (confirmPassword !== password)
            }
          >
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
}

export default SignupFormModal;
