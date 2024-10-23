import { useState } from "react";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";

function Login() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await apiRequest.post("/auth/login", {
        email,
        password,
      });

      console.log(res.data);
      const userData = res.data;
      localStorage.setItem("user", JSON.stringify(userData.userInfo));

      navigate("/");
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input name="email" required type="email" placeholder="Email" />
          <input name="password" type="password" required placeholder="Password" />
          <button disabled={isLoading}>{isLoading ? "Logging in..." : "Login"}</button>
          {error && <span className="error-message">{error}</span>}
          <Link to="/register">{"Don't"} have an account? Register here</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="Background" />
      </div>
    </div>
  );
}

export default Login;
