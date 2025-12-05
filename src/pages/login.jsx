import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../configs/Api";
import { endpoints } from "../configs/Api";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      let res = await axios.post(endpoints.login, {
        email: form.email,
        password: form.password,
      });
      console.log("LOGIN OK:", res.data);
      localStorage.setItem("token", res.data.token);
      navigate("/home");
    } catch (err) {
      console.error("LOGIN ERROR:", err);
      alert("Đăng nhập thất bại!");
    }
  };

  const handleRegister = async () => {
    try {
      let res = await axios.post(endpoints.register, {
        name: form.name,
        email: form.email,
        password: form.password,
      });
      console.log("REGISTER OK:", res.data);
      alert("Đăng ký thành công! Hãy đăng nhập.");
      setIsLogin(true);
    } catch (err) {
      console.error("REGISTER ERROR:", err);
      alert("Đăng ký thất bại!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      handleLogin();
    } else {
      handleRegister();
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "10px 12px",
    marginBottom: 16,
    fontSize: 15,
    borderRadius: 6,
    border: "1px solid #ccc",
    outline: "none",
    transition: "0.25s",
  };

  const inputFocus = {
    borderColor: "#6741d9",
    boxShadow: "0 0 0 3px rgba(103,65,217,0.15)",
  };

  return (
    <div
      style={{
        maxWidth: 360,
        margin: "100px auto",
        padding: 32,
        border: "1px solid #ddd",
        borderRadius: 12,
        background: "#fff",
        boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
      }}
    >
      <h2 style={{ marginBottom: 20 }}>{isLogin ? "Đăng nhập" : "Đăng ký"}</h2>

      <form onSubmit={handleSubmit}>
        {isLogin ? (
          ""
        ) : (
          <input
            required
            type="name"
            name="name"
            placeholder="Tên Người Dùng"
            value={form.name}
            onChange={handleChange}
            style={inputStyle}
            onFocus={(e) => Object.assign(e.target.style, inputFocus)}
            onBlur={(e) => Object.assign(e.target.style, inputStyle)}
          />
        )}

        <input
          required
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          style={inputStyle}
          onFocus={(e) => Object.assign(e.target.style, inputFocus)}
          onBlur={(e) => Object.assign(e.target.style, inputStyle)}
        />

        <input
          required
          type="password"
          name="password"
          placeholder="Mật khẩu"
          value={form.password}
          onChange={handleChange}
          style={inputStyle}
          onFocus={(e) => Object.assign(e.target.style, inputFocus)}
          onBlur={(e) => Object.assign(e.target.style, inputStyle)}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px 10px",
            background: "#222",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            fontSize: 16,
            cursor: "pointer",
            transition: "0.25s",
          }}
          onMouseOver={(e) => (e.target.style.opacity = "0.85")}
          onMouseOut={(e) => (e.target.style.opacity = "1")}
        >
          {isLogin ? "Đăng nhập" : "Đăng ký"}
        </button>
      </form>

      <hr style={{ margin: "22px 0", borderColor: "#eee" }} />

      <button
        onClick={() => setIsLogin(!isLogin)}
        style={{
          background: "none",
          border: "none",
          color: "#6741d9",
          cursor: "pointer",
          fontSize: 15,
          marginBottom: 12,
        }}
      >
        {isLogin ? "Chưa có tài khoản? Đăng ký" : "Đã có tài khoản? Đăng nhập"}
      </button>

      <div style={{ textAlign: "center", marginTop: 10 }}>
        <button
          disabled
          style={{
            padding: "10px 16px",
            background: "#e7e7e7",
            border: "none",
            borderRadius: 6,
            fontSize: 14,
            color: "#666",
          }}
        >
          Đăng nhập với Google (Coming soon)
        </button>
      </div>
    </div>
  );
}

export default AuthPage;
