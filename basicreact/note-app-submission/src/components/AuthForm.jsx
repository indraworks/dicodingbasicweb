import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useInput } from "../utils/UseInput";

const AuthForm = () => {
  const [isRegister, setIsRegister] = useState(false);
  const { login, register } = useUser();
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { name, handleNameChange } = useInput("");
  const [email, handleEmailChange] = useInput("");
  const [password, handlePasswordChange] = useInput("");

  const navigate = useNavigate();

  //handleSubmi
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); //clear previous error
    if (isRegister) {
      //handle registration
      const { error } = await register({ name, email, password });
      if (error) {
        setError("Registration Failed.please try again..");
      } else {
        navigate("/");
      }
    } else {
      //handle login
      const { error } = await login({ email, password });
      if (error) {
        setError("Login failed .Please check your credential");
      } else {
        navigate("/");
      }
    }
  };

  return (
    <div className="input-login">
      <h2>{isRegister ? "Register" : "Login"}</h2>
      {error && (
        <p className="error" style={{ color: "var(--error)" }}>
          {error}
        </p>
      )}
      <form onSubmit={handleSubmit}>
        {isRegister && (
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={handleNameChange}
              required
              placeholder="Enter your Name"
            />
          </div>
        )}
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
            placeholder="Enter your email "
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
            placeholder="Enter your password "
            minLength={isRegister ? 6 : undefined}
          />
        </div>
        <button type="submit">{isRegister ? "Register" : "Login"}</button>
      </form>
      <p className="auth-toggle">
        {isRegister ? (
          <>
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => setIsRegister(false)}
              className="link-button"
            >
              Login here
            </button>
          </>
        ) : (
          <>
            Dont have account ?(" ")
            <button
              type="button"
              onClick={() => setIsRegister(true)}
              className="link-button"
            >
              Register here
            </button>
          </>
        )}
      </p>
    </div>
  );
};

export default AuthForm;
