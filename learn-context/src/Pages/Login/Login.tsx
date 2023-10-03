import { Link, useNavigate } from "react-router-dom";
import styles from "../../User.module.css";
import { FormEvent, useEffect, useState } from "react";
import axios from "axios";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    email: "",
    password: "",
  });
  const [data, setData] = useState<
    {
      id: number;
      email: string;
      password: string;
    }[]
  >([]);
  let userLogIn: any;
  useEffect(() => {
    axios.get("http://localhost:8080/users").then((response) => {
      return setData(response.data);
    });
  }, []);
  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    userLogIn = data.find(
      (user) => user.email === email && user.password == password
    );
    if (!userLogIn) {
      setError({
        email: "Email or password is not match",
        password: "Email or password is not match",
      });
    } else {
      setEmail("");
      setPassword("");
      setError({ email: "", password: "" });
      alert("success");
    }
    localStorage.setItem("auth", userLogIn.id);
    localStorage.setItem("userLogin", JSON.stringify(userLogIn));
    navigate("/");
  }

  return (
    <div style={{ width: "350px", display: "block", margin: "0 auto" }}>
      <form onSubmit={handleLogin} action="" className={styles.formLogin}>
        <h1>LOG IN</h1>
        <p>Please enter your e-mail and password:</p>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          id="email"
        />
        <p className={styles.renderError}> {error.email}</p>
        <label className="error" id="error-email-login"></label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          id="password"
        />
        <p className={styles.renderError}> {error.password}</p>
        <label className="error" id="error-password-login"></label>
        <input className={styles.btnLogin} type="submit" value="LOGIN" />
        <p>
          Don't have an account? <Link to="/auth/register">Create one</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
