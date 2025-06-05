import { AppBar, Box, Toolbar, Typography, Button, Avatar, Chip, IconButton, Menu, MenuItem } from "@mui/material"
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

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
        boxShadow: 'none',
        height: 64
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", py: 0, minHeight: '64px !important' }}>
        {/* 좌측 로고 및 네비게이션 */}
        <Box display="flex" alignItems="center" gap={3}>
          {/* 메뉴 버튼과 로고 */}
          <Box display="flex" alignItems="center" gap={2}>
            <IconButton
              sx={{
                color: '#9fa1a0',
                p: 1.5
              }}
            >
              <MenuIcon />
            </IconButton>
            
            {/* INTERVIA 로고 */}
            <Typography 
              variant="h5" 
              fontWeight="700" 
              sx={{
                color: '#0b57d0',
                letterSpacing: '-0.025em',
                fontSize: '1.5rem'
              }}
            >
              INTERVIA
            </Typography>
          </Box>
          
          {/* 네비게이션 메뉴 */}
          <Box display="flex" gap={0} ml={8}>
            <Button 
              sx={{ 
                color: '#9fa1a0',
                fontWeight: 700,
                fontSize: '1.125rem',
                px: 3,
                py: 2,
                textTransform: 'none',
                minHeight: 64,
                '&:hover': {
                  bgcolor: 'transparent',
                  color: '#0b57d0'
                }
              }}
            >
              인재상
            </Button>
            <Button 
              sx={{ 
                color: '#0b57d0',
                fontWeight: 700,
                fontSize: '1.125rem',
                px: 3,
                py: 2,
                textTransform: 'none',
                minHeight: 64,
                position: 'relative',
                '&:hover': {
                  bgcolor: 'transparent'
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  bgcolor: '#0b57d0',
                  borderRadius: '3px 3px 0 0'
                }
              }}
            >
              평가기준 관리
            </Button>
            <Button 
              sx={{ 
                color: '#9fa1a0',
                fontWeight: 700,
                fontSize: '1.125rem',
                px: 3,
                py: 2,
                textTransform: 'none',
                minHeight: 64,
                '&:hover': {
                  bgcolor: 'transparent',
                  color: '#0b57d0'
                }
              }}
            >
              키워드 관리
            </Button>
            <Button 
              sx={{ 
                color: '#9fa1a0',
                fontWeight: 700,
                fontSize: '1.125rem',
                px: 3,
                py: 2,
                textTransform: 'none',
                minHeight: 64,
                '&:hover': {
                  bgcolor: 'transparent',
                  color: '#0b57d0'
                }
              }}
            >
              보고서 관리
            </Button>
          </Box>
        </Box>

        {/* 우측 사용자 영역 */}
        <Box display="flex" alignItems="center" gap={2}>
          {/* Admin 태그와 로그아웃 버튼 */}
          <Button
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              bgcolor: '#0b57d0',
              color: 'white',
              borderRadius: '18px',
              px: 1,
              py: 0.5,
              textTransform: 'none',
              fontWeight: 700,
              fontSize: '1rem',
              height: 30,
              minWidth: 'auto',
              '&:hover': {
                bgcolor: '#0945a3'
              }
            }}
          >
            <Avatar 
              sx={{ 
                width: 24, 
                height: 24,
                bgcolor: '#e5e8ea',
                fontSize: '0.75rem',
                fontWeight: 600
              }}
            >
              <AccountCircleIcon sx={{ color: '#c3c4c3', fontSize: '1rem' }} />
            </Avatar>
            Admin
          </Button>

          <Button
            sx={{
              color: '#9fa1a0',
              borderRadius: '18px',
              px: 2,
              py: 0.5,
              textTransform: 'none',
              fontWeight: 700,
              fontSize: '1rem',
              height: 30,
              '&:hover': {
                bgcolor: '#f1f5f9',
                color: '#374151'
              }
            }}
          >
            로그아웃
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default TopNavBar