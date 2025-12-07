import React, { useState } from "react";
import AppLayout from "../components/AppLayout";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const mockProject = {
  id: 1,
  name: "Web Thú Cưng",
  gitUrl: "https://github.com/example/webthucung",
  stack: "Node.js",
  status: "running",
  url: "https://webthucung.dev",
  lastDeploy: "2025-11-15 14:22",
  logs: [
    { time: "2025-11-15 14:22", content: "Deploy thành công ✔️" },
    { time: "2025-11-15 14:20", content: "Đang build..." },
    { time: "2025-11-15 14:18", content: "Nhận repo Git thành công" },
  ],
  envVars: [{ key: "API_URL", value: "https://api.dev" }],
};

function ProjectDetail() {
  const location = useLocation();
  const project = location.state?.project;
  console.log(project)
  //const [project, setProject] = useState(mockProject);
  const [showEnv, setShowEnv] = useState(false);
  const [redeploying, setRedeploying] = useState(false);
  const navigate = useNavigate();

  const handleRedeploy = () => {
    setRedeploying(true);
    const timeNow = new Date().toISOString().slice(0, 16).replace("T", " ");
    setProject((prev) => ({
      ...prev,
      logs: [{ time: timeNow, content: "Khởi động lại deploy..." }, ...prev.logs],
    }));
    setTimeout(() => {
      const deployTime = new Date().toISOString().slice(0, 16).replace("T", " ");
      setProject((prev) => ({
        ...prev,
        status: "running",
        lastDeploy: deployTime,
        logs: [{ time: deployTime, content: "Deploy lại thành công ✔️" }, ...prev.logs],
      }));
      setRedeploying(false);
    }, 1800);
  };

  return (
    <AppLayout>
      <div
        style={{
          width: "95%",
          maxWidth: 10000,
          margin: "20px auto",
          padding: "32px 40px",
          background: "#ffffff",
          borderRadius: 20,
          boxShadow: "0 20px 48px rgba(0,0,0,0.08)",
          fontFamily: "'Inter', sans-serif",
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        {/* Nút trở về */}
        <button
          onClick={() => navigate(-1)}
          style={{
            alignSelf: "flex-start",
            background: "#f8f9fa",
            border: "none",
            padding: "10px 20px",
            borderRadius: 12,
            cursor: "pointer",
            fontWeight: 600,
            color: "#495057",
            transition: "all 0.25s",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          }}
          onMouseOver={(e) => (e.currentTarget.style.background = "#e9ecef")}
          onMouseOut={(e) => (e.currentTarget.style.background = "#f8f9fa")}
        >
          ← Trở về
        </button>

        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #e9ecef",
            paddingBottom: 16,
          }}
        >
          <h2 style={{ color: "#343a40", fontSize: 26 }}>{project.name}</h2>
          <span
            style={{
              padding: "6px 16px",
              borderRadius: 20,
              background: project.status === "running" ? "#d3f9d8" : "#ffe3e3",
              color: project.status === "running" ? "#2b8a3e" : "#c92a2a",
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            {project.status === "running" ? "Đang hoạt động" : "Có lỗi"}
          </span>
        </div>

        {/* Project details */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
            color: "#495057",
          }}
        >
          <div>
            <strong>Link app:</strong>{" "}
            <a
              href={`https://${project.name}.yumspot.online/`}
              target="_blank"
              style={{ color: "#7950f2", textDecoration: "underline" }}
            >
              {`https://${project.name}.yumspot.online/`}
            </a>
          </div>
          <div>
            <strong>Stack:</strong>{" "}
            <span style={{ color: "#7950f2", fontWeight: 600 }}>{project.type}</span>
          </div>
          <div>
            <strong>Link Git:</strong>{" "}
            <a
              href={project.gitURL}
              target="_blank"
              style={{ color: "#7950f2", textDecoration: "underline" }}
            >
              {project.gitURL}
            </a>
          </div>
          <div>
            <strong>Lần deploy gần nhất:</strong>{new Date(project.createdAt).toLocaleString("vi-VN", {
                    hour12: false,
                  })}
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 16 }}>
          <button
            onClick={handleRedeploy}
            disabled={redeploying}
            style={{
              background: "#7950f2",
              color: "#fff",
              border: "none",
              padding: "12px 24px",
              borderRadius: 12,
              cursor: "pointer",
              fontWeight: 600,
              fontSize: 14,
              boxShadow: redeploying ? "none" : "0 6px 16px rgba(121,80,242,0.3)",
              transition: "all 0.25s",
            }}
            onMouseOver={(e) =>
              !redeploying && (e.currentTarget.style.transform = "translateY(-3px)")
            }
            onMouseOut={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >
            {redeploying ? "Đang deploy lại..." : "Redeploy"}
          </button>

          <button
            style={{
              background: "#fff",
              border: "1px solid #dee2e6",
              padding: "12px 24px",
              borderRadius: 12,
              color: "#e03131",
              cursor: "pointer",
              fontWeight: 500,
              fontSize: 14,
              transition: "all 0.25s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = "#fff5f5")}
            onMouseOut={(e) => (e.currentTarget.style.background = "#fff")}
          >
            Xóa dự án
          </button>
        </div>
      </div>
    </AppLayout>
  );
}

export default ProjectDetail;
