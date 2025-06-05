import { Box, Typography, Card, CardContent, Avatar, Chip, IconButton, Collapse, Divider } from "@mui/material"
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';

// Props 타입 정의
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

const InterviewSidebar = ({
  isCollapsed,
  onToggleCollapse,
  interviewDate,
  interviewRoom,
  interviewers,
  totalCount,
  completedCount,
  remainingCount,
  progressPercentage
}: InterviewSidebarProps) => {

  return (
    <Box
      sx={{
        width: isCollapsed ? 60 : 300,
        transition: 'width 0.3s ease-in-out',
        bgcolor: '#f8fafd',
        borderRadius: 4,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
    >
      {/* 헤더 - 햄버거 메뉴 */}
      <Box
        sx={{
          p: 2,
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: isCollapsed ? 'center' : 'flex-start'
        }}
      >
        <IconButton
          onClick={onToggleCollapse}
          sx={{
            color: '#9fa1a0',
            '&:hover': {
              bgcolor: '#f1f5f9'
            }
          }}
        >
          <MenuIcon />
        </IconButton>
      </Box>

      <Collapse in={!isCollapsed} orientation="horizontal">
        {/* 면접 기본 정보 */}
        <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* 면접일 */}
          <Card
            sx={{
              bgcolor: '#f2f6fc',
              border: 'none',
              borderRadius: 3,
              boxShadow: 'none'
            }}
          >
            <CardContent sx={{ p: 3, '&:last-child': { pb: 3 } }}>
              <Typography
                variant="body2"
                fontWeight="700"
                color="#0b57d0"
                mb={1}
              >
                면접일
              </Typography>
              <Typography
                variant="body2"
                color="#000000"
              >
                {interviewDate}
              </Typography>
            </CardContent>
          </Card>

          {/* 면접호실 */}
          <Card
            sx={{
              bgcolor: '#f2f6fc',
              border: 'none',
              borderRadius: 3,
              boxShadow: 'none'
            }}
          >
            <CardContent sx={{ p: 3, '&:last-child': { pb: 3 } }}>
              <Typography
                variant="body2"
                fontWeight="700"
                color="#0b57d0"
                mb={1}
              >
                면접호실
              </Typography>
              <Typography
                variant="body2"
                color="#000000"
              >
                {interviewRoom}
              </Typography>
            </CardContent>
          </Card>

          {/* 면접관 */}
          <Card
            sx={{
              bgcolor: '#f2f6fc',
              border: 'none',
              borderRadius: 3,
              boxShadow: 'none'
            }}
          >
            <CardContent sx={{ p: 3, '&:last-child': { pb: 3 } }}>
              <Typography
                variant="body2"
                fontWeight="700"
                color="#0b57d0"
                mb={2}
              >
                면접관
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {interviewers.map((interviewer, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Avatar
                      sx={{
                        width: 22,
                        height: 22,
                        bgcolor: '#e5e8ea',
                        fontSize: '0.75rem'
                      }}
                    >
                      <PersonIcon sx={{ fontSize: '0.8rem', color: '#c3c4c3' }} />
                    </Avatar>
                    <Typography
                      variant="body2"
                      color="#000000"
                    >
                      {interviewer}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>

          {/* 진행률 */}
          <Card
            sx={{
              bgcolor: '#f2f6fc',
              border: 'none',
              borderRadius: 3,
              boxShadow: 'none'
            }}
          >
            <CardContent sx={{ p: 3, '&:last-child': { pb: 3 } }}>
              <Typography
                variant="body2"
                fontWeight="700"
                color="#0b57d0"
                mb={2}
              >
                진행률
              </Typography>
              
              {/* 상태 버튼들 */}
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mb: 3 }}>
                {/* 전체 */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Box
                    sx={{
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      bgcolor: '#d3e3fd',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <AssignmentIcon sx={{ fontSize: 16, color: '#000000' }} />
                  </Box>
                  <Typography variant="body2" fontWeight="700" color="#000000">
                    {totalCount}
                  </Typography>
                </Box>

                {/* 완료 */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Box
                    sx={{
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      bgcolor: '#83f390',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <CheckCircleIcon sx={{ fontSize: 14, color: '#000000' }} />
                  </Box>
                  <Typography variant="body2" fontWeight="700" color="#000000">
                    {completedCount}
                  </Typography>
                </Box>

                {/* 대기 */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Box
                    sx={{
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      bgcolor: '#e5e8ea',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <HourglassEmptyIcon sx={{ fontSize: 12, color: '#000000' }} />
                  </Box>
                  <Typography variant="body2" fontWeight="700" color="#000000">
                    {remainingCount}
                  </Typography>
                </Box>
              </Box>

              {/* 원형 진행률 차트 */}
              <Box
                sx={{
                  position: 'relative',
                  width: 165,
                  height: 165,
                  margin: '0 auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {/* 배경 원 */}
                <Box
                  sx={{
                    position: 'absolute',
                    width: 165,
                    height: 165,
                    borderRadius: '50%',
                    bgcolor: '#e5e8ea'
                  }}
                />
                
                {/* 진행률 원 */}
                <Box
                  sx={{
                    position: 'absolute',
                    width: 165,
                    height: 165,
                    borderRadius: '50%',
                    background: `conic-gradient(#83f390 0deg ${progressPercentage * 3.6}deg, transparent ${progressPercentage * 3.6}deg 360deg)`
                  }}
                />

                {/* 중앙 텍스트 */}
                <Box
                  sx={{
                    position: 'absolute',
                    textAlign: 'center',
                    zIndex: 1
                  }}
                >
                  <Typography
                    variant="h6"
                    fontWeight="700"
                    color="#000000"
                    sx={{ fontSize: '1.25rem' }}
                  >
                    진행률
                  </Typography>
                  <Typography
                    variant="h5"
                    fontWeight="700"
                    color="#000000"
                    sx={{ fontSize: '1.5rem' }}
                  >
                    {progressPercentage.toFixed(1)}%
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Collapse>
    </Box>
  );
};

export default InterviewSidebar;