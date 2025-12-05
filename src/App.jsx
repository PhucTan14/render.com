import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/login";
import ProjectDashboard from "./pages/home";
import ProjectDetail from "./pages/ProjectDetail";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    overflow: hidden;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle /> {/* <- phải render component này */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/home" element={<ProjectDashboard />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
