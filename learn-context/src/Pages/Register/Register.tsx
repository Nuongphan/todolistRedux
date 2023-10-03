import { FormEvent, useEffect, useState } from "react";
import styles from "../../User.module.css";
import axios from "axios";
const Register = () => {
  const regex = /^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/i;
  const [error, setError] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    repeatPassword: "",
  });
  const [repeatPassword, setRepeatPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState<
    {
      id: number;
      firstName: string;
      lastName: string;
      email: string;
      password: string;
     
    }[]
  >([]);
  useEffect(() => {
    axios.get("http://localhost:8080/users").then((response) => {
      return setData(response.data);
    });
  }, []);
  const filterEmail = data.map((item) => item.email);
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const checkError = await handleValidate();
    setError(checkError);

    if (
      !checkError.email &&
      !checkError.password &&
      !checkError.firstName &&
      !checkError.lastName &&
      !checkError.repeatPassword
    ) {
      const user = {
        id: Math.floor(Math.random() * 100),
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        
      }
      const newUser = {
        ...user,
        gender: "",
        cart: [],
        phone: "",
        address: "",
        discount: 0,
        role: "User",
        avatar: "",
        dob: "",
        status: true,
        member: "New Member",
      };
      setData((pre) => [...pre, newUser]);
      axios.post("http://localhost:8080/users", newUser);
      setFirstName(""),
        setEmail(""),
        setLastName(""),
        setPassword(""),
        setRepeatPassword("");
      alert("success");
    }
  }
  function handleValidate() {
    const newError: any = {};
    if (!email.trim()) {
      newError.email = "Email is required";
    } else if (filterEmail.find((item: string) => item === email)) {
      newError.email = "Email already exists";
    } else if (!regex.test(email)) {
      newError.email = "Invalid email";
    }
    if (!password.trim()) {
      newError.password = "Password is required";
    } else if (password.trim().length < 8) {
      newError.password = "Password must be at least 8 characters long";
    } else if (password !== repeatPassword) {
      newError.password = "Passwords do not match";
      newError.repeatPassword = "Passwords do not match";
    }
    if (!repeatPassword.trim()) {
      newError.repeatPassword = "Repeatpassword is required";
    }
    if (!firstName.trim()) {
      newError.firstName = "First Name is required";
    }
    if (!lastName.trim()) {
      newError.lastName = "Last Name is required";
    }
    return newError;
  }
  useEffect(() => {
    handleSubmit;
  }, [error]);
  return (
    <div style={{ width: "350px", display: "block", margin: "0 auto" }}>
      <form onSubmit={handleSubmit} className={styles.formRegister}>
        <h3>REGISTER</h3>
        <p>Please fill in the information below:</p>
        <input
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
          name="firstName"
          type="text"
          placeholder="First name"
          id="first-name"
        />
        <p className={styles.renderError}>{error.firstName}</p>
        <input
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
          name="lastName"
          type="text"
          placeholder="Last name"
          id="last-name"
        />
        <p className={styles.renderError}>{error.lastName}</p>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          name="email"
          type="email"
          placeholder="Email"
          id="email"
        />
        <p className={styles.renderError}>{error.email}</p>
        <label className="error" id="error-email"></label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          name="password"
          type="password"
          placeholder="Password"
          id="password"
        />
        <p className={styles.renderError}>{error.password}</p>

        <input
          onChange={(e) => setRepeatPassword(e.target.value)}
          value={repeatPassword}
          type="password"
          placeholder="Repeat password"
          id="repeat-password"
        />
        <p className={styles.renderError}>{error.repeatPassword}</p>

        <input type="submit" value="CREATE MY ACCOUNT" />
      </form>
    </div>
  );
};

export default Register;
