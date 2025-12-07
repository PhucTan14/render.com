import React, { useState, useEffect } from "react";
import AppLayout from "../components/AppLayout";
import NewProjectForm from "../components/NewProjectForm";
import { useNavigate } from "react-router-dom";
import { endpoints, authApis } from "../configs/Api";

function ProjectDashboard() {
  const [projects, setProjects] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("token");
        const api = authApis(token);
        const res = await api.get(endpoints.projects);
        console.log("res===>", res);
        setProjects(res.data || []);
      } catch (err) {
        console.error("Lỗi fetch projects:", err);
      }
    };

    fetchProjects();
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case "running":
        return {
          background: "#d3f9d8",
          color: "#2b8a3e",
          border: "1px solid #b2f2bb",
        };
      case "error":
        return {
          background: "#ffe3e3",
          color: "#c92a2a",
          border: "1px solid #ffc9c9",
        };
      default:
        return {
          background: "#f1f3f5",
          color: "#495057",
        };
    }
  };

  const cardStyle = {
    width: 300,
    padding: 24,
    background: "#fff",
    borderRadius: 18,
    boxShadow: "0 4px 14px rgba(0,0,0,0.06)",
    transition: "0.25s",
    cursor: "pointer",
    minHeight: 140,
  };

  const cardHover = {
    transform: "translateY(-6px)",
    boxShadow: "0 12px 26px rgba(0,0,0,0.12)",
  };

  return (
    <AppLayout>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          padding: "40px 20px",
          background: "#F4F5FF",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 40,
          }}
        >
          <h2 style={{ margin: 0, fontSize: 26, fontWeight: 700 }}>
            Tất Cả Các Dự Án Đã Deploy
          </h2>

          <button
            style={{
              padding: "14px 30px",
              background: "#5f3dc4",
              color: "#fff",
              borderRadius: 10,
              border: "none",
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(95,61,196,0.3)",
              transition: "0.25s",
            }}
            onMouseOver={(e) => (e.target.style.transform = "translateY(-4px)")}
            onMouseOut={(e) => (e.target.style.transform = "translateY(0)")}
            onClick={() => setOpenForm(true)}
          >
            Tạo dự án mới
          </button>
        </div>

        {/* Cards */}
        <div
          style={{
            display: "flex",
            gap: 28,
            flexWrap: "wrap",
          }}
        >
          {projects.map((project) => (
            <div
              key={project.id}
              style={cardStyle}
              onMouseOver={(e) =>
                Object.assign(e.currentTarget.style, cardHover)
              }
              onMouseOut={(e) =>
                Object.assign(e.currentTarget.style, cardStyle)
              }
              onClick={() => navigate(`/project/${project.id}`, { state: { project: project }, })
              }
            >
              <h3
                style={{
                  marginBottom: 14,
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#343a40",
                }}
              >
                {project.name}
              </h3>

              <div style={{ display: "flex", gap: 12, marginBottom: 14 }}>
                <div
                  style={{
                    padding: "6px 12px",
                    borderRadius: 8,
                    fontSize: 14,
                    display: "inline-block",
                    ...getStatusStyle(project.status),
                  }}
                >
                  {project.status === "running"
                    ? "Hoạt động bình thường"
                    : "Lỗi deploy"}
                </div>

                <div
                  style={{
                    padding: "6px 12px",
                    borderRadius: 8,
                    background: "#115099ff",
                    color: "#faf7f7ff",
                    fontSize: 14,
                    display: "inline-block",
                  }}
                >
                  {project.type}
                </div>
              </div>

              <div style={{ fontSize: 14, color: "#666" }}>
                Deploy gần nhất:{" "}
                <b>
                  {new Date(project.createdAt).toLocaleString("vi-VN", {
                    hour12: false,
                  })}
                </b>
              </div>
            </div>
          ))}

          {/* Card tạo mới */}
          <div
            style={{
              ...cardStyle,
              border: "2px dashed #d0bfff",
              color: "#5f3dc4",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 600,
              fontSize: 16,
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = "#f3f0ff")}
            onMouseOut={(e) => (e.currentTarget.style.background = "#fff")}
            onClick={() => setOpenForm(true)}
          >
            + Thêm dự án mới
          </div>
        </div>
      </div>

      <NewProjectForm open={openForm} onClose={() => setOpenForm(false)} />
    </AppLayout>
  );
}

export default ProjectDashboard;
