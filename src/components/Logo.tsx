import React from "react"
import logoSrc from "../assets/intervia-logo.svg" // 상대 경로는 환경에 따라 조정

const Logo = () => {
  return (
    <img
      src={logoSrc}
      alt="Intervia Logo"
      style={{ maxWidth: 180, width: "100%", height: "auto" }}
    />
  )
}

export default Logo
