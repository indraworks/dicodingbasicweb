import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useInput } from "../utils/UseInput";

const AuthForm = () => {
  const [isRegister, setIsRegister] = useState(false);
  const { login, register } = useUser();

  const [error, setError] = useState("");

  const nameInput = useInput("");
  const emailInput = useInput("");
  const passwordInput = useInput("");

  const navigate = useNavigate();

  //handleSubmi
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); //clear previous error
    try {
      const authData = isRegister
        ? {
            name: nameInput.value,
            email: emailInput.value,
            password: passwordInput.value,
          }
        : {
            email: emailInput.value,
            password: passwordInput.value,
          };
      const { error: authError } = await (isRegister ? register : login)(
        authData
      );
      if (authError) {
        setError(
          isRegister
            ? "Registration Failed. Please try again!"
            : "Login Failed.Please check your credential!"
        );
      } else {
        navigate("/");
      }
    } catch (err) {
      setError("un Expected error occured!");
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
              id="name"
              name="name"
              value={nameInput.value}
              onChange={nameInput.onChange}
              required
              placeholder="Enter your Name"
            />
          </div>
        )}
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={emailInput.value}
            onChange={emailInput.onChange}
            required
            placeholder="Enter your email "
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={passwordInput.value}
            onChange={passwordInput.onChange}
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

/*
old script!
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






*/
