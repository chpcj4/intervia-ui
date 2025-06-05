// src/App.tsx
import React from "react"
import LoginPage from "./components/LoginPage"
import AdminEvaluationPage from "./components/AdminEvaluationPage"
import KeywordManagementPage from "./components/KeywordManagementPage"
import ReportManagementPage from "./components/ReportManagementPage"

function App() {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        margin: 0,
        padding: 0,
        overflow: "hidden",
        backgroundColor: "#0052CC", // 파란 배경 고정
      }}
    >
      <ReportManagementPage />
    </div>
  )
}

export default App
