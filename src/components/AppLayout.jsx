import AccountMenu from "./AccountMenu";
import React, { useState } from "react";
/* ========== SIDEBAR ========== */
function Sidebar() {
  const baseItem = {
    padding: "10px 22px",
    cursor: "pointer",
    borderRadius: 8,
    margin: "4px 14px",
    color: "#4b4b4b",
    fontSize: 14,
    fontWeight: 500,
    transition: "0.25s",
  };

  return (
    <aside
      style={{
        width: 240,
        background: "#fff",
        borderRight: "1px solid #ececec",
        display: "flex",
        flexDirection: "column",
        boxShadow: "2px 0 14px rgba(0,0,0,0.03)",
      }}
    >
      {/* Logo */}
      <div
        style={{
          fontWeight: 700,
          fontSize: 18,
          color: "#5f3dc4",
          padding: "26px 26px 14px",
          display: "flex",
          alignItems: "center",
          gap: 10,
          borderBottom: "1px solid #f1f1f1",
          paddingBottom: 22,
        }}
      >
        <div
          style={{
            width: 34,
            height: 30,
            background: "linear-gradient(135deg, #9775fa, #7048e8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
            color: "#fff",
            fontWeight: 700,
            fontSize: 16,
          }}
        >
          AT
        </div>
        AT Render
      </div>

      <nav style={{ marginTop: 20 }}>
        {[
          "Projects",
          "Blueprints",
          "Environment Groups",
          "Observability",
          "Webhooks",
          "Notifications",
        ].map((item, i) => (
          <div
            key={i}
            style={{
              ...baseItem,
              display: "flex",
              alignItems: "center",
              padding: "12px 22px",
              margin: "6px 14px",
              borderRadius: 12,
              transition: "all 0.3s ease",
              boxShadow: "0 0 0 rgba(0,0,0,0)", // để hover bóng đẹp
            }}
            onMouseOver={(e) =>
              Object.assign(e.currentTarget.style, {
                background: "#f3f0ff",
                color: "#5f3dc4",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              })
            }
            onMouseOut={(e) =>
              Object.assign(e.currentTarget.style, {
                background: "transparent",
                color: "#4b4b4b",
                boxShadow: "0 0 0 rgba(0,0,0,0)",
              })
            }
          >
            {/* Icon nhỏ trước tên menu (tùy chọn) */}
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#5f3dc4",
                marginRight: 12,
                opacity: 0,
                transition: "opacity 0.3s",
              }}
              className="menu-dot"
            />
            {item}
          </div>
        ))}
      </nav>
      {/* Bottom section */}
      <div
        style={{
          marginTop: "auto",
          fontSize: 12,
          padding: "20px 26px",
          color: "#888",
          borderTop: "1px solid #f1f1f1",
        }}
      >
        AT Render · Duy An · Phúc Tấn
      </div>
    </aside>
  );
}

/* ========== HEADER ========== */
function Header() {
  const headerBtn = {
    padding: "8px 20px",
    borderRadius: 8,
    fontWeight: 600,
    fontSize: 14,
    cursor: "pointer",
    transition: "0.25s",
  };

  return (
    <header
      style={{
        height: 79,
        background: "#fff",
        borderBottom: "1px solid #ececec",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 38px",
        position: "sticky",
        top: 0,
        zIndex: 20,
      }}
    >
      <div style={{ fontWeight: 700, fontSize: 19, color: "#333" }}>
        Projects
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        {/* New button */}
        <button
          style={{
            ...headerBtn,
            background: "linear-gradient(135deg,#7950f2,#6741d9)",
            border: "none",
            color: "#fff",
            boxShadow: "0 4px 12px rgba(121,80,242,0.25)",
          }}
        >
          + New
        </button>

        {/* Upgrade */}
        <button
          style={{
            ...headerBtn,
            background: "#fff",
            border: "1px solid #ddd",
            color: "#333",
          }}
        >
          Upgrade
        </button>

        {/* Account Menu */}
        <AccountMenu />
      </div>
    </header>
  );
}
/* ========== LAYOUT ========== */
export default function AppLayout({ children }) {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        background: "#f4f5ff",
      }}
    >
      <Sidebar />

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Header />
        <main
          style={{
            flex: 1,
            overflowY: "auto", // scroll duy nhất
            padding: "36px 42px",
            boxSizing: "border-box",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
