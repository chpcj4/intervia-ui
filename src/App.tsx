import { Box, Typography, Button, Card, CardContent, Avatar, CircularProgress, CssBaseline } from "@mui/material"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import { useState, useEffect } from 'react';

// API 응답 타입 정의
interface Interviewer {
  id: string;
  name: string;
}

interface RoomData {
  interviewers: Interviewer[];
  totalCount: number;
  remainingCount: number;
}

interface ApiResponse {
  roomList: RoomData[];
}

// 더미 데이터 (실제로는 API에서 받아올 데이터)
const dummyApiResponse: ApiResponse = {
  "roomList": [
    {
      "interviewers": [
        {
          "id": "01",
          "name": "김길동"
        },
        {
          "id": "02",
          "name": "이길동"
        }
      ],
      "totalCount": 5,
      "remainingCount": 3
    },
    {
      "interviewers": [
        {
          "id": "01",
          "name": "김길동"
        },
        {
          "id": "04",
          "name": "유길동"
        }
      ],
      "totalCount": 4,
      "remainingCount": 2
    }
  ]
};

const InterviewerViewPage = () => {
  const [apiData, setApiData] = useState<ApiResponse | null>(null);
  const [currentUser, setCurrentUser] = useState<string>("김00");

  // API 데이터 로드 시뮬레이션
  useEffect(() => {
    const loadData = async () => {
      // 실제로는 API 호출
      setTimeout(() => {
        setApiData(dummyApiResponse);
      }, 1000);
    };

    loadData();
  }, []);

  const handleStartInterview = (roomIndex: number) => {
    console.log(`면접 시작 - Room ${roomIndex + 1}`);
    // 실제로는 면접 시작 로직
  };

  const handleLogout = () => {
    console.log("로그아웃");
    // 실제로는 로그아웃 로직
  };

  // 진행률 계산
  const calculateProgress = (total: number, remaining: number) => {
    const completed = total - remaining;
    return (completed / total) * 100;
  };

  if (!apiData) {
    return (
      <>
        <CssBaseline />
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            bgcolor: '#f8fafc',
            margin: 0,
            padding: 0
          }}
        >
          <CircularProgress size={60} sx={{ color: '#0b57d0' }} />
        </Box>
      </>
    );
  }

  const totalInterviews = apiData.roomList.reduce((sum, room) => sum + room.remainingCount, 0);

  return (
    <>
      <CssBaseline />
      <Box sx={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        bgcolor: '#f8fafc',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Top Navigation Bar */}
        <Box
          sx={{
            bgcolor: 'white',
            borderBottom: '1px solid #e2e8f0',
            px: 3,
            py: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 64,
            width: '100%',
            flexShrink: 0
          }}
        >
          {/* 좌측 로고 */}
          <Box display="flex" alignItems="center" gap={2}>
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

          {/* 우측 사용자 영역 */}
          <Box display="flex" alignItems="center" gap={2}>
            {/* Admin 태그 */}
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
              {currentUser}
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
        </Box>

        {/* Main Content */}
        <Box sx={{ 
          flex: 1,
          width: '100%',
          overflow: 'auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          p: 3
        }}>
          <Box sx={{ 
            width: '100%',
            maxWidth: 800,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            {/* 인사말 섹션 */}
            <Box sx={{ textAlign: 'center', mb: 4, mt: 8 }}>
              <Typography 
                variant="h3" 
                fontWeight="700" 
                color="#000000"
                mb={3.75}
                sx={{ fontSize: '2.25rem' }}
              >
                {currentUser} 면접관님, 안녕하세요.
              </Typography>
              <Typography 
                variant="h5" 
                fontWeight="700" 
                color="#000000"
                sx={{ fontSize: '1.5rem' }}
              >
                오늘 진행하실 면접은 {totalInterviews}건 입니다.
              </Typography>
            </Box>

            {/* 면접 카드들 컨테이너 */}
            <Box
              sx={{
                bgcolor: '#eceff1',
                borderRadius: 3.5,
                p: 1.5,
                width: '100%',
                maxWidth: 614,
                maxHeight: '60vh', // 최대 높이 설정
                display: 'flex',
                flexDirection: 'column',
                gap: 1.5,
                overflowY: 'auto', // 세로 스크롤 활성화
                '&::-webkit-scrollbar': {
                  width: '8px',
                },
                '&::-webkit-scrollbar-track': {
                  backgroundColor: '#f1f1f1',
                  borderRadius: '4px',
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: '#c1c1c1',
                  borderRadius: '4px',
                  '&:hover': {
                    backgroundColor: '#a8a8a8',
                  },
                },
              }}
            >
              {apiData.roomList.map((room, index) => {
                const progress = calculateProgress(room.totalCount, room.remainingCount);
                const completedCount = room.totalCount - room.remainingCount;
                
                return (
                  <Card
                    key={index}
                    elevation={0}
                    sx={{
                      bgcolor: 'white',
                      borderRadius: 3,
                      overflow: 'visible'
                    }}
                  >
                    <CardContent sx={{ p: 0 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          p: '24px 32px 24px 0px',
                          gap: '20px'
                        }}
                      >
                        {/* 왼쪽 정보 영역 */}
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, pl: 3.25, flex: 1 }}>
                          {/* 면접관 명단 */}
                          <Typography 
                            variant="h5" 
                            fontWeight="700" 
                            color="#000000"
                            sx={{ 
                              fontSize: '2rem',
                              width: '100%'
                            }}
                          >
                            {room.interviewers.map(interviewer => interviewer.name).join(', ')}
                          </Typography>
                          
                          {/* 상태 표시 영역 */}
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            {/* 전체 개수 */}
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                              <Box
                                sx={{
                                  width: 20,
                                  height: 20,
                                  borderRadius: '50%',
                                  bgcolor: '#d3e3fd',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  position: 'relative'
                                }}
                              >
                                <AssignmentIcon 
                                  sx={{ 
                                    fontSize: 16, 
                                    color: '#000000',
                                    width: 16,
                                    height: 16
                                  }} 
                                />
                              </Box>
                              <Typography 
                                variant="body2" 
                                fontWeight="700" 
                                color="#000000"
                                sx={{ fontSize: '0.875rem' }}
                              >
                                {room.totalCount}
                              </Typography>
                            </Box>

                            {/* 완료된 개수 */}
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
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
                                <CheckCircleIcon 
                                  sx={{ 
                                    fontSize: 14, 
                                    color: '#000000',
                                    width: 14,
                                    height: 11
                                  }} 
                                />
                              </Box>
                              <Typography 
                                variant="body2" 
                                fontWeight="700" 
                                color="#000000"
                                sx={{ fontSize: '0.875rem' }}
                              >
                                {completedCount}
                              </Typography>
                            </Box>

                            {/* 남은 개수 */}
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
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
                                <HourglassEmptyIcon 
                                  sx={{ 
                                    fontSize: 12, 
                                    color: '#000000',
                                    width: 10,
                                    height: 12
                                  }} 
                                />
                              </Box>
                              <Typography 
                                variant="body2" 
                                fontWeight="700" 
                                color="#000000"
                                sx={{ fontSize: '0.875rem' }}
                              >
                                {room.remainingCount}
                              </Typography>
                            </Box>
                          </Box>

                          {/* 면접 시작 버튼 */}
                          <Button
                            variant="contained"
                            onClick={() => handleStartInterview(index)}
                            sx={{
                              bgcolor: '#0b57d0',
                              color: 'white',
                              borderRadius: 2.25,
                              px: 2,
                              py: 1.5,
                              fontSize: '1rem',
                              fontWeight: 400,
                              textTransform: 'none',
                              width: 'fit-content',
                              height: 36,
                              '&:hover': {
                                bgcolor: '#0945a3'
                              }
                            }}
                          >
                            면접 시작하기
                          </Button>
                        </Box>

                        {/* 오른쪽 진행률 차트 */}
                        <Box 
                          sx={{ 
                            width: 165, 
                            height: 165, 
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
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
                              background: `conic-gradient(#83f390 0deg ${progress * 3.6}deg, transparent ${progress * 3.6}deg 360deg)`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
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
                              {progress.toFixed(1)}%
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                );
              })}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default InterviewerViewPage;