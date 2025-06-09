import { Box, Typography, Button, Card, CardContent, IconButton } from "@mui/material"
import StopIcon from '@mui/icons-material/Stop';
import TopNavBar from "./TopNavBar"
import InterviewSidebar from "./InterviewSidebar"
import { useState } from 'react';

// 질문 데이터 타입 정의
interface Question {
  id: number;
  text: string;
}

// 면접자별 질문 데이터 타입 정의
interface IntervieweeQuestions {
  id: string;
  name: string;
  questions: Question[];
}

// 더미 질문 데이터
const dummyQuestionsData: IntervieweeQuestions[] = [
  {
    id: "001",
    name: "강성우",
    questions: [
      { id: 1, text: "대학시절 데이터 분석 프로젝트 위주로 수행하였는데, 생성형 AI 개발자에 지원한 이유는 무엇인가요?" },
      { id: 2, text: "DB 수업에서 무결성 유지를 위해 어떤 방법을 고안했나요?" },
      { id: 3, text: "팀 프로젝트에서 갈등이 발생했던 경험과 해결했던 방법을 말해주세요." },
      { id: 4, text: "만약 지원한 직무가 아닌 다른 직무에 배정된다면 어떻게 하실 건가요?" },
      { id: 5, text: "10년 후 지원자는 어떤 모습이 되어 있을지 상상하고 답변하세요." }
    ]
  },
  {
    id: "002",
    name: "김민채",
    questions: [
      { id: 1, text: "자동화를 위해 Kafka를 사용했다고 하셨는데, Kafka의 동작 구조를 설명해 보세요." },
      { id: 2, text: "생성형 AI를 이용한 금융 프로젝트를 하셨는데, 어떻게 AI를 사용했는지 설명해주세요." },
      { id: 3, text: "팀원 간 의견 차이가 발생한 경우, 어떻게 해결했나요?" },
      { id: 4, text: "금융데이터가 아닌 제조 데이터 분야에 배정된다면 어떻게 하실 건가요?" },
      { id: 5, text: "평소 스트레스 관리를 어떻게 하나요?" }
    ]
  },
  {
    id: "003",
    name: "김민혁",
    questions: [
      { id: 1, text: "대학시절 데이터 분석 프로젝트 위주로 수행하였는데, 생성형 AI 개발자에 지원한 이유는 무엇인가요?" },
      { id: 2, text: "DB 수업에서 무결성 유지를 위해 어떤 방법을 고안했나요?" },
      { id: 3, text: "팀 프로젝트에서 갈등이 발생했던 경험과 해결했던 방법을 말해주세요." },
      { id: 4, text: "만약 지원한 직무가 아닌 다른 직무에 배정된다면 어떻게 하실 건가요?" },
      { id: 5, text: "10년 후 지원자는 어떤 모습이 되어 있을지 상상하고 답변하세요." }
    ]
  },
  {
    id: "004",
    name: "김상헌",
    questions: [
      { id: 1, text: "대학시절 데이터 분석 프로젝트 위주로 수행하였는데, 생성형 AI 개발자에 지원한 이유는 무엇인가요?" },
      { id: 2, text: "DB 수업에서 무결성 유지를 위해 어떤 방법을 고안했나요?" },
      { id: 3, text: "팀 프로젝트에서 갈등이 발생했던 경험과 해결했던 방법을 말해주세요." },
      { id: 4, text: "만약 지원한 직무가 아닌 다른 직무에 배정된다면 어떻게 하실 건가요?" },
      { id: 5, text: "10년 후 지원자는 어떤 모습이 되어 있을지 상상하고 답변하세요." }
    ]
  }
];

// 현재 진행 중인 면접자들
const currentInterviewees = [
  { id: "001", name: "강성우" },
  { id: "002", name: "김민채" },
  { id: "003", name: "김민혁" },
  { id: "004", name: "김상헌" }
];

// 질문 카드 컴포넌트
interface QuestionCardProps {
  interviewee: IntervieweeQuestions;
}

const QuestionCard = ({ interviewee }: QuestionCardProps) => {
  return (
    <Card
      elevation={0}
      sx={{
        bgcolor: 'white',
        borderRadius: 4,
        border: 'none',
        minWidth: 0,
        flex: 1
      }}
    >
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        {/* 면접자 헤더 */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center',
          alignItems: 'flex-end',
          gap: 1.5,
          mb: 4.25
        }}>
          <Typography 
            variant="h5" 
            fontWeight="700" 
            color="#9fa1a0"
            sx={{ fontSize: '1.5rem' }}
          >
            {interviewee.id}
          </Typography>
          <Typography 
            variant="h4" 
            fontWeight="700" 
            color="#000000"
            sx={{ fontSize: '2rem' }}
          >
            {interviewee.name}
          </Typography>
        </Box>

        {/* 질문 리스트 */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {interviewee.questions.map((question) => (
            <Box
              key={question.id}
              sx={{
                display: 'flex',
                gap: 1.5,
                bgcolor: '#eceff1',
                borderRadius: 3,
                p: '17px 12px',
                alignItems: 'flex-start'
              }}
            >
              {/* 질문 번호 */}
              <Box sx={{ 
                minWidth: 'auto',
                display: 'flex',
                alignItems: 'center'
              }}>
                <Typography 
                  variant="body2" 
                  fontWeight="700" 
                  color="#000000"
                  sx={{ fontSize: '1rem' }}
                >
                  {question.id}
                </Typography>
              </Box>

              {/* 질문 내용 */}
              <Box sx={{ flex: 1 }}>
                <Typography 
                  variant="body1" 
                  fontWeight="400" 
                  color="#000000"
                  sx={{ 
                    fontSize: '1rem',
                    lineHeight: 1.21,
                    wordBreak: 'keep-all'
                  }}
                >
                  {question.text}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

const InterviewQuestionListPage = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleStopRecording = () => {
    console.log("녹음 종료");
    // 실제로는 녹음 종료 로직
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
            p: 5,
            overflow: 'auto'
          }}
        >
          {/* 상단 헤더 섹션 */}
          <Box>
            {/* 면접 중 + 면접자 목록 + 녹음 버튼 */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'flex-end',
              gap: 6,
              mb: 6
            }}>
              {/* 왼쪽: 제목 + 면접자 목록 */}
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'flex-end', 
                gap: 2.5,
                flex: 1
              }}>
                {/* 면접 중 제목 */}
                <Typography 
                  variant="h2" 
                  fontWeight="700" 
                  color="#000000"
                  sx={{ fontSize: '2.25rem' }}
                >
                  면접 중
                </Typography>

                {/* 면접자 목록 */}
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 2,
                  flexWrap: 'wrap'
                }}>
                  {currentInterviewees.map((interviewee, index) => (
                    <Box 
                      key={interviewee.id}
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 0.5
                      }}
                    >
                      <Typography 
                        variant="body2" 
                        color="#9fa1a0"
                        sx={{ fontSize: '0.875rem' }}
                      >
                        {interviewee.id}
                      </Typography>
                      <Typography 
                        variant="body1" 
                        fontWeight="400" 
                        color="#000000"
                        sx={{ fontSize: '1rem' }}
                      >
                        {interviewee.name}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>

              {/* 오른쪽: 녹음 종료 버튼 */}
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 2
              }}>
                <IconButton
                  onClick={handleStopRecording}
                  sx={{
                    bgcolor: '#f36855',
                    width: 47,
                    height: 47,
                    borderRadius: '50px',
                    '&:hover': {
                      bgcolor: '#e55a47'
                    }
                  }}
                >
                  <StopIcon sx={{ color: 'white', fontSize: 23 }} />
                </IconButton>
                <Typography 
                  variant="body1" 
                  fontWeight="700" 
                  color="#f36855"
                  sx={{ fontSize: '1rem' }}
                >
                  녹음 종료
                </Typography>
              </Box>
            </Box>

            {/* 구분선 */}
            <Box
              sx={{
                width: '100%',
                height: '1px',
                bgcolor: '#c3c4c3',
                mb: 6
              }}
            />
          </Box>

          {/* 질문 리스트 그리드 */}
          <Box>
            <Box sx={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 2.5,
              p: 2.5
            }}>
              {dummyQuestionsData.map((interviewee) => (
                <QuestionCard 
                  key={interviewee.id} 
                  interviewee={interviewee} 
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default InterviewQuestionListPage;