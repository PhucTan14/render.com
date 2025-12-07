import React, { useState, useRef, useEffect } from "react";

function AccountMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");
  const name = localStorage.getItem("name");

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div style={{ position: "relative" }} ref={menuRef}>
      {/* Avatar nút bấm */}
      <div
        onClick={() => setOpen(!open)}
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          background: "#845ef7",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          fontWeight: 700,
          cursor: "pointer",
          userSelect: "none",
        }}
      >
        N
      </div>

      {/* Menu */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: 50,
            right: 0,
            width: 240,
            background: "#fff",
            borderRadius: 12,
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
            padding: "16px 0",
            animation: "fadeIn 0.2s",
            fontFamily: "Inter",
            zIndex: 9999,
          }}
        >
          {/* User Info */}
          <div
            style={{
              padding: "0 16px 16px 16px",
              borderBottom: "1px solid #f1f3f5",
            }}
          >
            <div style={{ fontWeight: 600, fontSize: 15 }}>{name}</div>
            <div style={{ color: "#666", fontSize: 13 }}>{email}</div>
          </div>

          {/* Menu items */}
          <div
            style={itemStyle}
            onMouseOver={(e) => (e.currentTarget.style.background = "#fff5f5")}
            onMouseOut={(e) => (e.currentTarget.style.background = "#fff")}
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("email"); 
              window.location.href = "/";
            }}
          >
            <span style={{ color: "#c92a2a", fontWeight: 500 }}>Sign out</span>
          </div>
        </div>
      )}
    </div>
  );
}

const itemStyle = {
  padding: "12px 16px",
  cursor: "pointer",
  fontSize: 14,
  transition: "0.2s",
};

export default AccountMenu;
