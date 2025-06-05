// src/pages/LoginPage.tsx
"use client"

import React, { useState } from "react"
import {
  Box,
  Button,
  Paper,
  TextField,
  InputAdornment,
} from "@mui/material"
import { Mail, Lock } from "lucide-react"
import Logo from "./Logo"

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Login attempt:", { email, password })
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "#0052CC",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: "100%",
          maxWidth: 480,
          p: 4,
          borderRadius: 3,
        }}
      >
        <Box textAlign="center" mb={3}>
          <Logo />
        </Box>

        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              variant="outlined"
              placeholder="이메일을 입력하세요."
              fullWidth
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Mail size={18} color="#777" />
                  </InputAdornment>
                ),
                disableUnderline: true,
                sx: {
                  borderRadius: "25px",
                  backgroundColor: "#f5f9ff",
                  alignItems: "center",
                },
              }}
            />

            <TextField
              variant="outlined"
              placeholder="비밀번호를 입력하세요."
              fullWidth
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock size={18} color="#777" />
                  </InputAdornment>
                ),
                disableUnderline: true,
                sx: {
                  borderRadius: "25px",
                  backgroundColor: "#f5f9ff",
                  alignItems: "center",
                },
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 1,
                height: 48,
                borderRadius: "25px",
                backgroundColor: "#0052cc",
                fontWeight: 600,
                "&:hover": {
                  backgroundColor: "#003f99",
                },
              }}
            >
              로그인
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  )
}

export default LoginPage
