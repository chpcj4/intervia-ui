import { AppBar, Box, Toolbar, Typography, Button, Avatar, Chip, IconButton, Menu, MenuItem } from "@mui/material"
import { useState } from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';

const TopNavBar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  
  const handleUserMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar 
      position="static" 
      elevation={0}
      sx={{
        bgcolor: 'white',
        borderBottom: '1px solid #e2e8f0',
        boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)'
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
        {/* 로고 및 네비게이션 */}
        <Box display="flex" alignItems="center" gap={4}>
          {/* 로고 */}
          <Box display="flex" alignItems="center" gap={2}>
            <Box
              sx={{
                width: 40,
                height: 40,
                bgcolor: '#3b82f6',
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Typography variant="h6" fontWeight="700" color="white">
                I
              </Typography>
            </Box>
            <Typography 
              variant="h5" 
              fontWeight="800" 
              sx={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.025em'
              }}
            >
              INTERVIA
            </Typography>
          </Box>
          
          {/* 네비게이션 메뉴 */}
          <Box display="flex" gap={1}>
            <Button 
              sx={{ 
                color: '#64748b',
                fontWeight: 500,
                px: 3,
                py: 1,
                borderRadius: 2,
                textTransform: 'none',
                '&:hover': {
                  bgcolor: '#f1f5f9',
                  color: '#334155'
                }
              }}
            >
              인재상
            </Button>
            <Button 
              sx={{ 
                color: 'white',
                bgcolor: '#3b82f6',
                fontWeight: 600,
                px: 3,
                py: 1,
                borderRadius: 2,
                textTransform: 'none',
                boxShadow: '0 4px 6px -1px rgb(59 130 246 / 0.25)',
                '&:hover': {
                  bgcolor: '#2563eb',
                  transform: 'translateY(-1px)',
                  boxShadow: '0 8px 15px -3px rgb(59 130 246 / 0.3)'
                }
              }}
            >
              평가기준 관리
            </Button>
            <Button 
              sx={{ 
                color: '#64748b',
                fontWeight: 500,
                px: 3,
                py: 1,
                borderRadius: 2,
                textTransform: 'none',
                '&:hover': {
                  bgcolor: '#f1f5f9',
                  color: '#334155'
                }
              }}
            >
              키워드 관리
            </Button>
            <Button 
              sx={{ 
                color: '#64748b',
                fontWeight: 500,
                px: 3,
                py: 1,
                borderRadius: 2,
                textTransform: 'none',
                '&:hover': {
                  bgcolor: '#f1f5f9',
                  color: '#334155'
                }
              }}
            >
              보고서 관리
            </Button>
          </Box>
        </Box>

        {/* 우측 사용자 영역 */}
        <Box display="flex" alignItems="center" gap={2}>
          {/* 알림 버튼 */}
          <IconButton
            sx={{
              bgcolor: '#f8fafc',
              border: '1px solid #e2e8f0',
              '&:hover': {
                bgcolor: '#f1f5f9',
                borderColor: '#cbd5e1'
              }
            }}
          >
            <NotificationsIcon fontSize="small" sx={{ color: '#64748b' }} />
          </IconButton>

          {/* 설정 버튼 */}
          <IconButton
            sx={{
              bgcolor: '#f8fafc',
              border: '1px solid #e2e8f0',
              '&:hover': {
                bgcolor: '#f1f5f9',
                borderColor: '#cbd5e1'
              }
            }}
          >
            <SettingsIcon fontSize="small" sx={{ color: '#64748b' }} />
          </IconButton>

          {/* 구분선 */}
          <Box sx={{ width: 1, height: 32, bgcolor: '#e2e8f0', mx: 1 }} />

          {/* 사용자 정보 */}
          <Box display="flex" alignItems="center" gap={2}>
            <Chip
              label="Admin"
              size="small"
              sx={{
                bgcolor: '#dcfce7',
                color: '#166534',
                fontWeight: 600,
                border: '1px solid #bbf7d0'
              }}
            />
            
            <Button
              onClick={handleUserMenuClick}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                color: '#334155',
                textTransform: 'none',
                fontWeight: 500,
                px: 2,
                py: 1,
                borderRadius: 2,
                border: '1px solid #e2e8f0',
                '&:hover': {
                  bgcolor: '#f8fafc',
                  borderColor: '#cbd5e1'
                }
              }}
            >
              <Avatar 
                sx={{ 
                  width: 32, 
                  height: 32,
                  bgcolor: '#3b82f6',
                  fontSize: '0.875rem',
                  fontWeight: 600
                }}
              >
                A
              </Avatar>
              <Box textAlign="left">
                <Typography variant="body2" fontWeight="600" color="#334155">
                  관리자
                </Typography>
                <Typography variant="caption" color="#64748b">
                  admin@intervia.com
                </Typography>
              </Box>
            </Button>

            {/* 사용자 메뉴 */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleUserMenuClose}
              PaperProps={{
                sx: {
                  mt: 1,
                  minWidth: 200,
                  borderRadius: 2,
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1)'
                }
              }}
            >
              <MenuItem
                onClick={handleUserMenuClose}
                sx={{
                  gap: 2,
                  py: 1.5,
                  '&:hover': {
                    bgcolor: '#f8fafc'
                  }
                }}
              >
                <AccountCircleIcon fontSize="small" sx={{ color: '#64748b' }} />
                <Typography variant="body2">프로필 설정</Typography>
              </MenuItem>
              
              <MenuItem
                onClick={handleUserMenuClose}
                sx={{
                  gap: 2,
                  py: 1.5,
                  '&:hover': {
                    bgcolor: '#fef2f2'
                  }
                }}
              >
                <LogoutIcon fontSize="small" sx={{ color: '#dc2626' }} />
                <Typography variant="body2" color="#dc2626">
                  로그아웃
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default TopNavBar