import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  Paper,
  Avatar
} from '@mui/material';
import {
  Stop as StopIcon,
  Menu as MenuIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import TopNavBar from './TopNavBar';

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

// Q&A 데이터 타입 정의
interface QAItem {
  question: string;
  answer: string;
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

// 더미 QA 데이터
const dummyQAData: QAItem[] = [
  {
    question: "자기소개와 이 직무에 지원하는 계기, 그리고 본인의 핵심 경험",
    answer: "대학시절 데이터 분석 프로젝트를 대학교에서는 추천 시스템을 개발했고, 최근엔 금융 데이터를 활용한 사기 탐지 모델 프로젝트를 주도적으로 수행함. 그 과정에서 실무와 학문의 연결 체감"
  },
  {
    question: "최근 진행한 머신 러닝 프로젝트 구체적으로 설명",
    answer: "쇼핑몰 이탈 고객 예측 프로젝트 진행함. 단순히 방문 횟수와 체류시간 분석이 아닌 주요 전환 경로에 따른 행동 패턴 분석 진행. 이벤트 기반 파싱으로 피쳐 재설계. XG Boost 모델 사용"
  },
  {
    question: "클래스 불균형 대응 방안",
    answer: "비즈니스 관점에서 클래스 불균형 분석함. 스모트나 보더라인 스모트와 같은 오버 샘플링 기법을 적용. 클래스 웨이트 조정을 통해 실제 비용과 예측 비용의 균형 맞춤"
  },
  {
    question: "팀 프로젝트에서 역할 분담 및 갈등 해결 과정",
    answer: "팀 구성원의 장단점 파악, 기술 이해도에 따른 역할 분배. 데이터 정합성 이슈로 인한 갈등 경험을 데이터 시각화와 기준 문서화를 통해 해결함"
  },
  {
    question: "시각화와 기준 문서화에 대한 추가 질문",
    answer: "처음에는 그래프의 기준이 명확하지 않았음. 기준값을 표로 정리해서 팀원들과 공유함. 시각화에서도 주석을 다는 방식으로 소통의 오류를 방지함"
  }
];

// 현재 진행 중인 면접자들
const currentInterviewees = [
  { id: "001", name: "강성우" },
  { id: "002", name: "김민채" },
  { id: "003", name: "김민혁" },
  { id: "004", name: "김상헌" }
];

// 사이드바 컴포넌트
interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const InterviewSidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggleCollapse }) => {
  return (
    <Box
      sx={{
        width: isCollapsed ? 60 : 280,
        bgcolor: '#f8fafd',
        borderRight: '1px solid #e2e8f0',
        flexShrink: 0,
        transition: 'width 0.3s ease',
        overflow: 'hidden'
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
              2025-06-02
            </Typography>
          </Paper>

          {/* 면접호실 */}
          <Paper sx={{ bgcolor: '#f2f6fc', borderRadius: 1.5, p: 1.5 }} elevation={0}>
            <Typography variant="body2" sx={{ fontWeight: 700, color: '#0b57d0', mb: 0.75 }}>
              면접호실
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 700, color: '#000' }}>
              801호
            </Typography>
          </Paper>

          {/* 면접관 */}
          <Paper sx={{ bgcolor: '#f2f6fc', borderRadius: 1.5, p: 1.5 }} elevation={0}>
            <Typography variant="body2" sx={{ fontWeight: 700, color: '#0b57d0', mb: 0.75 }}>
              면접관
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              {['김00', '이00', '박00'].map((name, index) => (
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
                      30
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
                      13
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
                      17
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ 
                width: 120, 
                height: 120, 
                borderRadius: '50%',
                background: 'conic-gradient(#83f390 0deg 156deg, #e5e8ea 156deg 360deg)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Typography variant="body2" sx={{ fontWeight: 700, color: '#000' }}>
                  진행률
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#000' }}>
                  43.3%
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Box>
      )}
    </Box>
  );
};

// 질문 항목 컴포넌트
interface QuestionItemProps {
  question: Question;
}

const QuestionItem: React.FC<QuestionItemProps> = ({ question }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 0.75,
        alignItems: 'flex-start',
        mb: 2,
        px: 1.5
      }}
    >
      <Box sx={{ 
        minWidth: 30,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        py: 4.375
      }}>
        <Typography 
          variant="body1" 
          sx={{ 
            fontWeight: 700, 
            color: '#000',
            fontSize: '16px'
          }}
        >
          {question.id}
        </Typography>
      </Box>

      <Box sx={{ flex: 1, py: 2 }}>
        <Typography 
          variant="body1" 
          sx={{ 
            fontSize: '16px',
            lineHeight: 1.21,
            color: '#000',
            wordBreak: 'keep-all'
          }}
        >
          {question.text}
        </Typography>
      </Box>
    </Box>
  );
};

// QA 컴포넌트
interface QAItemComponentProps {
  qa: QAItem;
}

const QAItemComponent: React.FC<QAItemComponentProps> = ({ qa }) => {
  return (
    <Paper
      sx={{
        bgcolor: '#f2f6fc',
        border: '1px solid #d3e3fd',
        borderRadius: 2,
        p: 2,
        mb: 1.5
      }}
      elevation={0}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
          <Typography 
            variant="body1" 
            sx={{ 
              fontWeight: 700, 
              color: '#0b57d0',
              fontSize: '16px',
              minWidth: 20
            }}
          >
            Q
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              fontSize: '16px',
              flex: 1,
              lineHeight: 1.21,
              color: '#0b57d0'
            }}
          >
            {qa.question}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
          <Typography 
            variant="body1" 
            sx={{ 
              fontWeight: 700, 
              color: '#000',
              fontSize: '16px',
              minWidth: 20
            }}
          >
            A
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              fontSize: '16px',
              flex: 1,
              lineHeight: 1.21,
              color: '#000'
            }}
          >
            {qa.answer}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

// 메인 컴포넌트
const InterviewQuestionListPage: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedIntervieweeId, setSelectedIntervieweeId] = useState("001");

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleStopRecording = () => {
    console.log("녹음 종료");
    alert("녹음이 종료되었습니다.");
  };

  const handleIntervieweeSelect = (intervieweeId: string) => {
    setSelectedIntervieweeId(intervieweeId);
  };

  // 선택된 면접자의 질문 데이터 찾기
  const selectedInterviewee = dummyQuestionsData.find(
    item => item.id === selectedIntervieweeId
  );

  return (
    <Box sx={{ 
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: '100vw',
      height: '100vh',
      bgcolor: '#f8fafc',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      <TopNavBar />
      
      <Box display="flex" flex={1} sx={{ height: 'calc(100vh - 64px)', overflow: 'hidden' }}>
        <InterviewSidebar 
          isCollapsed={isSidebarCollapsed} 
          onToggleCollapse={handleToggleSidebar} 
        />

        {/* 메인 컨텐츠 영역 */}
        <Box 
          flex={1} 
          sx={{ 
            overflowY: "auto",
            bgcolor: '#f8fafc',
            p: 4,
            width: 0 // flex item이 최소 너비를 갖지 않도록 함
          }}
        >
          {/* 페이지 헤더 */}
          <Box mb={4}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'flex-end',
              gap: 3
            }}>
              {/* 왼쪽: 제목 + 면접자 목록 */}
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'flex-end', 
                gap: 1.25,
                flex: 1,
                minWidth: 0
              }}>
                <Typography 
                  variant="h4" 
                  fontWeight="700" 
                  color="#1e293b"
                  sx={{ fontSize: '2.25rem', flexShrink: 0 }}
                >
                  면접 중
                </Typography>

                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1,
                  flexWrap: 'wrap'
                }}>
                  {currentInterviewees.map((interviewee) => (
                    <Box 
                      key={interviewee.id}
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 0.25,
                        flexShrink: 0
                      }}
                    >
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: '#0b57d0',
                          fontSize: '14px'
                        }}
                      >
                        {interviewee.id}
                      </Typography>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          fontWeight: 400, 
                          color: '#000',
                          fontSize: '16px'
                        }}
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
                gap: 0.75,
                flexShrink: 0
              }}>
                <IconButton
                  onClick={handleStopRecording}
                  sx={{
                    bgcolor: '#f36855',
                    width: 47,
                    height: 47,
                    '&:hover': {
                      bgcolor: '#e55a47'
                    }
                  }}
                >
                  <StopIcon sx={{ color: 'white', fontSize: 23 }} />
                </IconButton>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    fontWeight: 700, 
                    color: '#f36855',
                    fontSize: '16px'
                  }}
                >
                  녹음 종료
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* 면접자 탭 버튼들 */}
          <Paper
            elevation={0}
            sx={{
              bgcolor: '#e5e8ea',
              borderRadius: 3,
              p: 0.75,
              mb: 4
            }}
          >
            <Box sx={{ 
              display: 'flex',
              gap: 0
            }}>
              {currentInterviewees.map((interviewee) => (
                <Button
                  key={interviewee.id}
                  onClick={() => handleIntervieweeSelect(interviewee.id)}
                  sx={{
                    flex: 1,
                    bgcolor: selectedIntervieweeId === interviewee.id ? 'white' : 'transparent',
                    color: '#000',
                    fontSize: '16px',
                    fontWeight: 400,
                    textTransform: 'none',
                    py: 1.5,
                    px: 2,
                    borderRadius: 2.25,
                    '&:hover': {
                      bgcolor: selectedIntervieweeId === interviewee.id ? 'white' : 'rgba(255,255,255,0.5)'
                    }
                  }}
                >
                  {interviewee.id} {interviewee.name}
                </Button>
              ))}
            </Box>
          </Paper>

          {/* 질문 리스트 섹션 */}
          <Paper
            elevation={0}
            sx={{
              bgcolor: '#eceff1',
              borderRadius: 2,
              py: 2.5,
              mb: 4,
              border: '1px solid #e2e8f0'
            }}
          >
            {selectedInterviewee && selectedInterviewee.questions.map((question) => (
              <QuestionItem key={question.id} question={question} />
            ))}
          </Paper>

          {/* 이전 대화 내용 섹션 */}
          <Paper
            elevation={0}
            sx={{
              bgcolor: '#f8fafd',
              borderRadius: 2,
              p: 1.25,
              border: '1px solid #e2e8f0'
            }}
          >
            <Box sx={{ 
              display: 'flex',
              alignItems: 'center',
              gap: 1.25,
              px: 1.875,
              mb: 1.5
            }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 700, 
                  color: '#1e293b',
                  fontSize: '20px'
                }}
              >
                이전 대화 내용 보기
              </Typography>
            </Box>

            <Box>
              {dummyQAData.map((qa, index) => (
                <QAItemComponent key={index} qa={qa} />
              ))}
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default InterviewQuestionListPage;