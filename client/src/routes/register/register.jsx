import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import apiRequest from "../../lib/apiRequest";

function Register() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const formData = new FormData(e.target);

    const userName = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    // Basic form validation (you can add more)
    if (!userName || !email || !password) {
      setError("All fields are required");
      setIsLoading(false);
      return;
    }

    try {
      const res = await apiRequest.post("/auth/register", {
        userName,
        email,
        password,
      });

      // You can also check for specific statuses or responses
      if (res.status === 200) {
        // Redirect to login page after successful registration
        navigate("/login");
      } else {
        // Handle unexpected status codes or responses
        setError("Unexpected response from the server.");
      }
    } catch (err) {
      console.log(err);
      setError(err?.response?.data?.message || "Registration failed. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          <input name="username" type="text" placeholder="Username" />
          <input name="email" type="text" placeholder="Email" />
          <input name="password" type="password" placeholder="Password" />
          <button disabled={isLoading}>{isLoading ? "Registering..." : "Register"}</button>
          {error && <span className="error-message">{error}</span>}
          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="Background" />
      </div>
    </div>
  );
}

export default Register;
