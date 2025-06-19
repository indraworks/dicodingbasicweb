import React from "react";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { register } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await register({ name, email, password });
    if (error) {
      setError("register failed.Please try in later time!");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="input-login">
      <h2>Login</h2>
      {error && (
        <p className="error" style={{ color: "var(--error)" }}>
          {error}
        </p>
      )}
      <form className="input-login" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="name">Name</label>
          <input
            type="name"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter your name"
          />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default RegisterPage;

/*
jgn lupa add css selector class error di css global file kita


*/
