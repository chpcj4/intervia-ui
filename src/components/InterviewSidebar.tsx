import React from 'react';
import { Box, Typography, Paper, Avatar, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';

interface InterviewSidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  interviewDate: string;
  interviewRoom: string;
  interviewers: string[];
  totalCount: number;
  completedCount: number;
  remainingCount: number;
  progressPercentage: number;
}

const InterviewSidebar: React.FC<InterviewSidebarProps> = ({
  isCollapsed,
  onToggleCollapse,
  interviewDate,
  interviewRoom,
  interviewers,
  totalCount,
  completedCount,
  remainingCount,
  progressPercentage
}) => {
  return (
    <Box
      sx={{
        width: isCollapsed ? 60 : 280,
        bgcolor: '#f8fafd',
        borderRight: '1px solid #e2e8f0',
        flexShrink: 0,
        transition: 'width 0.3s ease',
        overflow: 'hidden',
        height: '100%'
      }}
    >
      {/* 메뉴 토글 버튼 */}
      <Box sx={{ p: 1.25, borderBottom: '1px solid #e2e8f0' }}>
        <IconButton onClick={onToggleCollapse} sx={{ p: 0 }}>
          <MenuIcon />
        </IconButton>
      </Box>

      {!isCollapsed && (
        <Box sx={{ p: 1.25, display: 'flex', flexDirection: 'column', gap: 1 }}>
          {/* 면접일 */}
          <Paper sx={{ bgcolor: '#f2f6fc', borderRadius: 1.5, p: 1.5 }} elevation={0}>
            <Typography variant="body2" sx={{ fontWeight: 700, color: '#0b57d0', mb: 0.75 }}>
              면접일
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 700, color: '#000' }}>
              {interviewDate}
            </Typography>
          </Paper>

          {/* 면접호실 */}
          <Paper sx={{ bgcolor: '#f2f6fc', borderRadius: 1.5, p: 1.5 }} elevation={0}>
            <Typography variant="body2" sx={{ fontWeight: 700, color: '#0b57d0', mb: 0.75 }}>
              면접호실
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 700, color: '#000' }}>
              {interviewRoom}
            </Typography>
          </Paper>

          {/* 면접관 */}
          <Paper sx={{ bgcolor: '#f2f6fc', borderRadius: 1.5, p: 1.5 }} elevation={0}>
            <Typography variant="body2" sx={{ fontWeight: 700, color: '#0b57d0', mb: 0.75 }}>
              면접관
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              {interviewers.map((name, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                  <Avatar sx={{ width: 22, height: 22, bgcolor: '#e5e8ea' }}>
                    <PersonIcon sx={{ fontSize: 14, color: '#c3c4c3' }} />
                  </Avatar>
                  <Typography variant="body2" sx={{ fontWeight: 700, color: '#000' }}>
                    {name}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>

          {/* 진행률 */}
          <Paper sx={{ bgcolor: '#f2f6fc', borderRadius: 1.5, p: 1.5 }} elevation={0}>
            <Typography variant="body2" sx={{ fontWeight: 700, color: '#0b57d0', mb: 1.5 }}>
              진행률
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                  <Box sx={{ 
                    width: 20, 
                    height: 20, 
                    borderRadius: '50%', 
                    bgcolor: '#d3e3fd',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Typography variant="caption" sx={{ fontWeight: 700, fontSize: '10px' }}>
                      {totalCount}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                  <Box sx={{ 
                    width: 20, 
                    height: 20, 
                    borderRadius: '50%', 
                    bgcolor: '#83f390',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Typography variant="caption" sx={{ fontWeight: 700, fontSize: '10px' }}>
                      {completedCount}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                  <Box sx={{ 
                    width: 20, 
                    height: 20, 
                    borderRadius: '50%', 
                    bgcolor: '#e5e8ea',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Typography variant="caption" sx={{ fontWeight: 700, fontSize: '10px' }}>
                      {remainingCount}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ 
                width: 120, 
                height: 120, 
                borderRadius: '50%',
                background: `conic-gradient(#83f390 0deg ${progressPercentage * 3.6}deg, #e5e8ea ${progressPercentage * 3.6}deg 360deg)`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Typography variant="body2" sx={{ fontWeight: 700, color: '#000' }}>
                  진행률
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#000' }}>
                  {progressPercentage}%
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Box>
      )}
    </Box>
  );
};

export default InterviewSidebar;