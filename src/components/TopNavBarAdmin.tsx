import { AppBar, Box, Toolbar, Typography, Button, Avatar, Chip, IconButton, Menu, MenuItem } from "@mui/material"
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

const TopNavBar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleUserMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  // 네비게이션 핸들러들
  const handleNavigateToTalents = () => {
    console.log("인재상 페이지로 이동"); // 아직 구현되지 않은 페이지
    // navigate('/talents'); // 실제 라우트가 있을 때 주석 해제
  };

  const handleNavigateToEvaluation = () => {
    navigate('/admin/evaluation');
  };

  const handleNavigateToKeywords = () => {
    navigate('/admin/keywords');
  };

  const handleNavigateToReports = () => {
    navigate('/admin/reports');
  };

  // 로그아웃 핸들러 수정
  const handleLogout = () => {
    console.log("로그아웃");
    navigate('/login');
  };

  // 현재 경로에 따른 활성 상태 확인 함수
  const isActive = (path: string) => {
    return location.pathname === path;
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
            {/* INTERVIA 로고 */}
            <Typography 
              variant="h5" 
              fontWeight="700" 
              sx={{
                color: '#0b57d0',
                letterSpacing: '-0.025em',
                fontSize: '1.5rem',
                cursor: 'pointer'
              }}
              onClick={() => navigate('/')}
            >
              INTERVIA
            </Typography>
          </Box>
          
          {/* 네비게이션 메뉴 */}
          <Box display="flex" gap={0} ml={8}>
            <Button 
              onClick={handleNavigateToTalents}
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
              onClick={handleNavigateToEvaluation}
              sx={{ 
                color: isActive('/admin/evaluation') ? '#0b57d0' : '#9fa1a0',
                fontWeight: 700,
                fontSize: '1.125rem',
                px: 3,
                py: 2,
                textTransform: 'none',
                minHeight: 64,
                position: 'relative',
                '&:hover': {
                  bgcolor: 'transparent',
                  color: '#0b57d0'
                },
                '&::after': isActive('/admin/evaluation') ? {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  bgcolor: '#0b57d0',
                  borderRadius: '3px 3px 0 0'
                } : {}
              }}
            >
              평가기준 관리
            </Button>
            <Button 
              onClick={handleNavigateToKeywords}
              sx={{ 
                color: isActive('/admin/keywords') ? '#0b57d0' : '#9fa1a0',
                fontWeight: 700,
                fontSize: '1.125rem',
                px: 3,
                py: 2,
                textTransform: 'none',
                minHeight: 64,
                position: 'relative',
                '&:hover': {
                  bgcolor: 'transparent',
                  color: '#0b57d0'
                },
                '&::after': isActive('/admin/keywords') ? {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  bgcolor: '#0b57d0',
                  borderRadius: '3px 3px 0 0'
                } : {}
              }}
            >
              키워드 관리
            </Button>
            <Button 
              onClick={handleNavigateToReports}
              sx={{ 
                color: isActive('/admin/reports') ? '#0b57d0' : '#9fa1a0',
                fontWeight: 700,
                fontSize: '1.125rem',
                px: 3,
                py: 2,
                textTransform: 'none',
                minHeight: 64,
                position: 'relative',
                '&:hover': {
                  bgcolor: 'transparent',
                  color: '#0b57d0'
                },
                '&::after': isActive('/admin/reports') ? {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  bgcolor: '#0b57d0',
                  borderRadius: '3px 3px 0 0'
                } : {}
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
            onClick={handleLogout}
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