import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [profile, setProfile] = useState(null);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { email, password } = user;
  const fetchProfile = async () => {
    const res = await axios.get("http://localhost:5000/api/auth/me", {
      withCredentials: true,
      crossDomain: true,
    });
    if (res) {
      setProfile(res.data);
    }
  };
  const login = async () => {
    const res = await axios.post("http://localhost:5000/api/auth/login", user);
    if (res) {
      console.log(res.data);
    }
  };
  const onChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };
  return (
    <div className="App">
      <a href="http://localhost:5000/api/auth/google">Login with google</a>
      <br />
      <input id="email" value={email} onChange={onChange} />
      <br />
      <input
        id="password"
        type="password"
        value={password}
        onChange={onChange}
      />
      <br />
      <button onClick={login}>Login</button>
      <br />
      <button onClick={fetchProfile}>Get Profile</button>
      {profile && <p>{profile}</p>}
    </div>
  );
}

export default App;
