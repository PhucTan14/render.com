import React, { useState, useEffect, useRef, useCallback } from "react";
import { endpoints, authApis } from "../configs/Api";  
import socket from "../socket";

const stackOptions = [
  "Static",
  "ReactJS",
  "Node.js",
  "Python",
  "PHP",
  "Go",
];

export default function NewProjectForm({ open, onClose }) {
  const [form, setForm] = useState({
    name: "",
    gitUrl: "",
    stack: stackOptions[0],
  });
  const [submitting, setSubmitting] = useState(false);
  const [logs, setLogs] = useState([]);
  const lastDeployUrl = useRef("");

  const logContainerRef = useRef(null);

  const handleSocketIncommingMessage = useCallback((message) => {
    let logText;

    if (typeof message === "string") {
      try {
        const parsed = JSON.parse(message);
        logText = parsed.log ?? message;
      } catch (err) {
        logText = message;
      }
    } else if (typeof message === "object" && message !== null) {
      logText = message.log ?? JSON.stringify(message);
    } else {
      logText = String(message);
    }

    setLogs((prev) => [...prev, logText]);
    logContainerRef.current?.scrollIntoView({ behavior: "smooth" });

    if (logText.includes("All done!") && lastDeployUrl.current) {
      setLogs((prev) => [
        ...prev,
        `✅Deploy hoàn tất!`,
        `🔗Link deploy: ${lastDeployUrl.current}`,
      ]);
      setSubmitting(false);
    }
  }, []);

  useEffect(() => {
    socket.on("message", handleSocketIncommingMessage);
    return () => socket.off("message", handleSocketIncommingMessage);
  }, [handleSocketIncommingMessage]);

  if (!open) return null;

  function toSlug(str) {
    return str
      .toLowerCase()
      .trim()
      .normalize("NFD") // tách dấu
      .replace(/[\u0300-\u036f]/g, "") // bỏ dấu
      .replace(/\s+/g, "-") // thay space bằng -
      .replace(/[^\w\-]+/g, "") // bỏ ký tự đặc biệt
      .replace(/\-\-+/g, "-"); // bỏ double -
  }

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setLogs([]);

    const token = localStorage.getItem("token");
    const api = authApis(token);
    const projectSlug = toSlug(form.name);

    try {
      const res = await api.post(endpoints.project, {
        gitURL: form.gitUrl,
        slug: projectSlug,
      });
      lastDeployUrl.current = res.data?.data?.url || "";
      socket.emit("subscribe", `logs:${projectSlug}`);
      setLogs((prev) => [...prev, "Deploy request gửi thành công!"]);
    } catch (err) {
      console.error("Lỗi fetch project:", err);
      setLogs((prev) => [...prev, "Lỗi khi gửi request deploy!"]);
      setSubmitting(false);
    }
  };

  // Styles
  const inputStyle = {
    width: "100%",
    padding: "12px 14px",
    borderRadius: 12,
    border: "1px solid #d9d9d9",
    background: "#f8f9fa",
    fontSize: 15,
    transition: "0.25s",
    outline: "none",
  };
  const inputFocus = {
    borderColor: "#6741d9",
    background: "#fff",
    boxShadow: "0 0 0 4px rgba(103,65,217,0.12)",
  };
  const labelStyle = { display: "block", marginBottom: 8, fontWeight: 600 };
  const fieldWrapperStyle = { marginBottom: 22 };
  const selectWrapper = { position: "relative", width: "100%" };
  const selectStyle = {
    ...inputStyle,
    appearance: "none",
    WebkitAppearance: "none",
    background: "#fff",
    cursor: "pointer",
  };
  const arrowStyle = {
    position: "absolute",
    right: 14,
    top: "50%",
    transform: "translateY(-50%)",
    pointerEvents: "none",
    fontSize: 16,
    color: "#666",
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        zIndex: 9999,
      }}
    >
      <div
        style={{
          maxWidth: 520,
          width: "100%",
          background: "#fff",
          padding: 36,
          borderRadius: 18,
          boxShadow: "0 12px 36px rgba(0,0,0,0.15)",
          animation: "fadeIn 0.25s ease",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 30,
          }}
        >
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700 }}>
            Tạo dự án mới
          </h2>
          <button
            onClick={onClose}
            style={{
              border: "none",
              background: "#f1f3f5",
              width: 36,
              height: 36,
              borderRadius: "50%",
              cursor: "pointer",
              fontSize: 20,
              color: "#444",
              transition: "0.2s",
            }}
            onMouseEnter={(e) => (e.target.style.background = "#ffe3e3")}
            onMouseLeave={(e) => (e.target.style.background = "#f1f3f5")}
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={fieldWrapperStyle}>
            <label style={labelStyle}>Tên dự án</label>
            <input
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="VD: web-thu-cung"
              style={inputStyle}
              onFocus={(e) => Object.assign(e.target.style, inputFocus)}
              onBlur={(e) => Object.assign(e.target.style, inputStyle)}
            />
          </div>

          <div style={fieldWrapperStyle}>
            <label style={labelStyle}>Link Git repo</label>
            <input
              name="gitUrl"
              required
              value={form.gitUrl}
              onChange={handleChange}
              placeholder="https://github.com/username/repo"
              style={inputStyle}
              onFocus={(e) => Object.assign(e.target.style, inputFocus)}
              onBlur={(e) => Object.assign(e.target.style, inputStyle)}
            />
          </div>

          <div style={fieldWrapperStyle}>
            <label style={labelStyle}>Stack</label>
            <div style={selectWrapper}>
              <select
                name="stack"
                value={form.stack}
                onChange={handleChange}
                style={selectStyle}
                onFocus={(e) => Object.assign(e.target.style, inputFocus)}
                onBlur={(e) => Object.assign(e.target.style, selectStyle)}
              >
                {stackOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <div style={arrowStyle}>▾</div>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            style={{
              width: "100%",
              padding: "14px 0",
              background: "#6741d9",
              color: "#fff",
              fontSize: 16,
              fontWeight: 700,
              borderRadius: 12,
              border: "none",
              marginTop: 10,
              cursor: "pointer",
              opacity: submitting ? 0.6 : 1,
              transition: "0.25s",
            }}
            onMouseEnter={(e) => (e.target.style.opacity = 0.85)}
            onMouseLeave={(e) => (e.target.style.opacity = 1)}
          >
            {submitting ? "Đang tạo..." : "Tạo dự án"}
          </button>
        </form>

        {/* Log container */}
        {logs.length > 0 && (
          <div
            style={{
              marginTop: 24,
              background: "#f3f0ff",
              padding: 18,
              borderRadius: 12,
              fontSize: 14,
              whiteSpace: "pre-line",
              maxHeight: 150,
              overflowY: "auto",
              fontFamily: "monospace",
              color: "#1a1a1a",
            }}
          >
            {logs.map((log, i) => (
              <div key={i} ref={i === logs.length - 1 ? logContainerRef : null}>
                {log}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
