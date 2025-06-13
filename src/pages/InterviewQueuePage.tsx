import { Box, Typography, Button, Card, CardContent, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, InputAdornment, Divider } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import TopNavBar from "../components/TopNavBarInterviewer"
import InterviewSidebar from "../components/InterviewSidebar"
import InterviewQueueRow from "../components/InterviewQueueRow"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 추가

// 면접 데이터 타입 정의
interface InterviewData {
  applicationNumber: string;
  name: string;
  time: string;
  location: string;
  isStarted?: boolean;
}

// 더미 면접 데이터
const dummyInterviewData: InterviewData[] = [
  {
    applicationNumber: "001",
    name: "강성우",
    time: "14:00",
    location: "801호"
  },
  {
    applicationNumber: "002", 
    name: "김민채",
    time: "14:00",
    location: "801호"
  },
  {
    applicationNumber: "003",
    name: "홍길동",
    time: "14:00",
    location: "801호"
  },
  {
    applicationNumber: "004",
    name: "임꺽정",
    time: "14:00",
    location: "801호"
  },
  {
    applicationNumber: "005",
    name: "홍길동",
    time: "14:00",
    location: "801호"
  },
  {
    applicationNumber: "006",
    name: "임꺽정",
    time: "14:00",
    location: "801호"
  }
];



const InterviewQueuePage = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [interviews, setInterviews] = useState<InterviewData[]>(dummyInterviewData);
  const navigate = useNavigate(); // useNavigate 훅 추가

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleStartInterview = (applicationNumber: string) => {
    console.log(`면접 시작: ${applicationNumber}`);
    // InterviewQuestionListPage로 이동
    navigate('/interview-questions');
  };

  const handleStartSearch = () => {
    console.log(`검색 시작: ${searchTerm}`);
    // 면접 질문 페이지로 이동
    navigate('/interview-questions');
  };

  // 사이드바 데이터
  const sidebarData = {
    interviewDate: "2025-06-02",
    interviewRoom: "801호",
    interviewers: ["김00", "이00", "박00"],
    totalCount: 30,
    completedCount: 13,
    remainingCount: 17,
    progressPercentage: 43.3
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc', width: '100vw', overflow: 'hidden' }}>
      <TopNavBar />
      
      <Box display="flex" height="calc(100vh - 64px)" sx={{ width: '100%' }}>
        {/* 사이드바 */}
        <InterviewSidebar
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={handleToggleSidebar}
          interviewDate={sidebarData.interviewDate}
          interviewRoom={sidebarData.interviewRoom}
          interviewers={sidebarData.interviewers}
          totalCount={sidebarData.totalCount}
          completedCount={sidebarData.completedCount}
          remainingCount={sidebarData.remainingCount}
          progressPercentage={sidebarData.progressPercentage}
        />

        {/* 메인 컨텐츠 영역 */}
        <Box 
          flex={1}
          sx={{ 
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
            p: 3,
            overflow: 'auto'
          }}
        >
          {/* 헤더 */}
          <Box sx={{ textAlign: 'left' }}>
            <Typography 
              variant="h3" 
              fontWeight="700" 
              color="#000000"
              mb={3}
              sx={{ fontSize: '2.25rem' }}
            >
              면접 대기
            </Typography>
          </Box>

          {/* 지원자 검색 섹션 */}
          <Box>
            <Typography 
              variant="h5" 
              fontWeight="700" 
              color="#000000"
              mb={1}
              sx={{ fontSize: '1.5rem' }}
            >
              지원자 검색
            </Typography>
            <Typography 
              variant="body1" 
              color="#9fa1a0"
              mb={4}
              sx={{ fontSize: '0.875rem' }}
            >
              지원자를 검색하고 선택하여 새로운  면접을 시작하실 수 있습니다.
            </Typography>
            
            {/* 검색창과 시작하기 버튼 */}
            <Box sx={{ display: 'flex', gap: 2.5 }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="검색어를 입력하세요."
                value={searchTerm}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <SearchIcon sx={{ color: '#000000', fontSize: 20 }} />
                      </Box>
                    </InputAdornment>
                  ),
                  sx: {
                    borderRadius: 6,
                    bgcolor: '#f2f6fc',
                    height: 48,
                    '& fieldset': { border: 'none' },
                    '&:hover fieldset': { border: 'none' },
                    '&.Mui-focused fieldset': { border: 'none' }
                  }
                }}
                sx={{
                  '& .MuiOutlinedInput-input': {
                    fontSize: '1rem',
                    color: '#9fa1a0'
                  }
                }}
              />
              <Button
                variant="contained"
                onClick={handleStartSearch}
                sx={{
                  bgcolor: '#0b57d0',
                  color: 'white',
                  borderRadius: 6,
                  px: 4,
                  height: 48,
                  fontSize: '1rem',
                  fontWeight: 400,
                  textTransform: 'none',
                  minWidth: 80,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  '&:hover': {
                    bgcolor: '#0945a3'
                  }
                }}
              >
                시작하기
              </Button>
            </Box>
          </Box>

          {/* 면접 목록 조회 섹션 */}
          <Box>
            <Typography 
              variant="h5" 
              fontWeight="700" 
              color="#000000"
              mb={3}
              sx={{ fontSize: '1.5rem' }}
            >
              면접 목록 조회
            </Typography>

            {/* 테이블 */}
            <Card
              elevation={0}
              sx={{
                borderRadius: 2,
                bgcolor: 'white',
                border: '1px solid #e2e8f0'
              }}
            >
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: 'white' }}>
                      <TableCell 
                        sx={{ 
                          fontWeight: 700, 
                          color: '#000000', 
                          borderBottom: '1px solid #c3c4c3',
                          fontSize: '0.875rem',
                          py: 2,
                          px: 3
                        }}
                      >
                        면접자
                      </TableCell>
                      <TableCell 
                        sx={{ 
                          fontWeight: 700, 
                          color: '#000000', 
                          borderBottom: '1px solid #c3c4c3',
                          fontSize: '0.875rem',
                          py: 2,
                          px: 3,
                          width: 204
                        }}
                      >
                        면접 시간
                      </TableCell>
                      <TableCell 
                        sx={{ 
                          fontWeight: 700, 
                          color: '#000000', 
                          borderBottom: '1px solid #c3c4c3',
                          fontSize: '0.875rem',
                          py: 2,
                          px: 3,
                          width: 205
                        }}
                      >
                        면접 장소
                      </TableCell>
                      <TableCell 
                        sx={{ 
                          fontWeight: 700, 
                          color: '#000000', 
                          borderBottom: '1px solid #c3c4c3',
                          fontSize: '0.875rem',
                          py: 2,
                          px: 3,
                          width: 118
                        }}
                      />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {interviews.map((interview, index) => (
                      <InterviewQueueRow
                        key={interview.applicationNumber}
                        interview={interview}
                        onStartInterview={handleStartInterview}
                        isLast={index === interviews.length - 1}
                      />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default InterviewQueuePage;