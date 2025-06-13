import React, { useState } from 'react';
import { Box, Typography, Button, Avatar } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InterviewSidebar from './InterviewSidebar';

// QA 데이터 타입 정의
interface QAItem {
  question: string;
  answer: string;
}

// 면접자 데이터 타입
interface IntervieweeData {
  id: string;
  name: string;
  department: string;
  date: string;
  time: string;
  location: string;
}

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

// 면접자들 데이터
const interviewees = [
  { id: "001", name: "강성우" },
  { id: "002", name: "김민채" },
  { id: "003", name: "김민혁" },
  { id: "004", name: "김상헌" }
];

// QA 컴포넌트
interface QAComponentProps {
  qa: QAItem;
}

const QAComponent = ({ qa }: QAComponentProps) => {
  return (
    <Box
      sx={{
        backgroundColor: '#F2F6FC',
        border: 'none',
        borderRadius: 2,
        marginBottom: 1.5,
        padding: 2
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {/* 질문 */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
          <Typography 
            variant="body1" 
            sx={{ 
              fontWeight: 700, 
              color: '#0b57d0',
              fontSize: '16px',
              minWidth: '20px'
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
        
        {/* 답변 */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
          <Typography 
            variant="body1" 
            sx={{ 
              fontWeight: 700, 
              color: '#000',
              fontSize: '16px',
              minWidth: '20px'
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
    </Box>
  );
};

// 로딩 스피너 컴포넌트
const LoadingSpinner = () => {
  return (
    <Box 
      sx={{
        width: '18px',
        height: '18px',
        border: '2px solid #e0e0e0',
        borderTop: '2px solid #9fa1a0',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        '@keyframes spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        }
      }}
    />
  );
};

const QuickReviewPage = () => {
  const [selectedIntervieweeId, setSelectedIntervieweeId] = useState("001");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [currentUser] = useState("김00");

  const handleBack = () => {
    console.log("뒤로 가기");
    // window.history.back() 또는 navigate(-1) 사용
  };

  const handleLogout = () => {
    console.log("로그아웃");
  };

  const handleNextInterview = () => {
    console.log("다음 면접 진행");
  };

  const handleEndInterview = () => {
    console.log("면접 종료하기");
  };

  const handleIntervieweeSelect = (intervieweeId: string) => {
    setSelectedIntervieweeId(intervieweeId);
  };

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const selectedInterviewee = interviewees.find(i => i.id === selectedIntervieweeId);

  // 사이드바 진행률 데이터
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
    <Box sx={{ 
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: '100vw',
      height: '100vh',
      bgcolor: '#0b57d0',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      {/* Top Navigation Bar */}
      <Box sx={{
        bgcolor: 'white',
        borderBottom: '1px solid #e2e8f0',
        padding: '0 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '64px',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        {/* 좌측: 뒤로가기 + 로고 */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, padding: '0 6px' }}>
            <Button
              onClick={handleBack}
              sx={{
                color: 'white',
                bgcolor: '#0b57d0',
                width: 24,
                height: 24,
                borderRadius: 0.5,
                minWidth: 'auto',
                p: 0,
                '&:hover': {
                  bgcolor: '#0945a3'
                }
              }}
            >
              <ArrowBackIcon sx={{ fontSize: 16 }} />
            </Button>
          </Box>
          
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 700, 
              color: '#0b57d0',
              letterSpacing: '-0.025em',
              fontSize: '24px'
            }}
          >
            INTERVIA
          </Typography>
        </Box>

        {/* 우측: 사용자 영역 */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Button 
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              bgcolor: '#0b57d0',
              color: 'white',
              borderRadius: '18px',
              padding: '5px 16px 5px 3px',
              fontWeight: 700,
              fontSize: '16px',
              height: 30,
              minWidth: 'auto',
              textTransform: 'none',
              '&:hover': {
                bgcolor: '#0945a3'
              }
            }}
          >
            <Avatar 
              sx={{ 
                width: 24, 
                height: 24,
                bgcolor: '#e5e8ea'
              }}
            >
              <AccountCircleIcon sx={{ fontSize: 16, color: '#c3c4c3' }} />
            </Avatar>
            {currentUser}
          </Button>

          <Button
            onClick={handleLogout}
            sx={{
              color: '#d3e3fd',
              bgcolor: 'transparent',
              borderRadius: '18px',
              padding: '5px 16px',
              fontWeight: 700,
              fontSize: '16px',
              height: 30,
              textTransform: 'none',
              '&:hover': {
                bgcolor: 'rgba(211, 227, 253, 0.1)'
              }
            }}
          >
            로그아웃
          </Button>
        </Box>
      </Box>

      {/* Content */}
      <Box sx={{ display: 'flex', flex: 1, height: 'calc(100vh - 64px)', overflow: 'hidden' }}>
        {/* 사이드바 */}
        <Box sx={{ borderTopRightRadius: 2, overflow: 'hidden' }}>
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
        </Box>

        {/* 메인 컨텐츠 영역 */}
        <Box sx={{ 
          flex: 1,
          bgcolor: 'white',
          padding: 2.5,
          overflowY: 'auto',
          borderTopLeftRadius: 2
        }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* 헤더 */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'flex-end',
              gap: 3
            }}>
              {/* 왼쪽: 제목 */}
              <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1.25 }}>
                <Typography 
                  variant="h3" 
                  sx={{ 
                    fontSize: '36px',
                    fontWeight: 700, 
                    color: '#000000'
                  }}
                >
                  Quick Review
                </Typography>
                
                <Box sx={{
                  width: 0,
                  height: '44px',
                  borderLeft: '1px solid #c3c4c3',
                  mx: 1.25
                }} />
                
                <Typography 
                  variant="h3" 
                  sx={{ 
                    fontSize: '36px',
                    fontWeight: 700, 
                    color: '#c3c4c3'
                  }}
                >
                  개인별 최종 보고서
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.625, py: 1.25 }}>
                  <LoadingSpinner />
                  <Typography sx={{ 
                    color: '#c3c4c3',
                    fontSize: '16px'
                  }}>
                    생성중
                  </Typography>
                </Box>
              </Box>

              {/* 오른쪽: 버튼들 */}
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1.5
              }}>
                <Button
                  onClick={handleNextInterview}
                  variant="contained"
                  sx={{
                    bgcolor: '#0b57d0',
                    color: 'white',
                    borderRadius: '18px',
                    padding: '12px 16px',
                    fontSize: '16px',
                    fontWeight: 400,
                    height: 36,
                    textTransform: 'none',
                    '&:hover': {
                      bgcolor: '#0945a3'
                    }
                  }}
                >
                  다음 면접 진행
                </Button>
                <Button
                  onClick={handleEndInterview}
                  variant="contained"
                  sx={{
                    bgcolor: '#e5e8ea',
                    color: '#000000',
                    borderRadius: '18px',
                    padding: '12px 16px',
                    fontSize: '16px',
                    fontWeight: 400,
                    height: 36,
                    textTransform: 'none',
                    '&:hover': {
                      bgcolor: '#d1d5db'
                    }
                  }}
                >
                  면접 종료하기
                </Button>
              </Box>
            </Box>

            {/* 면접자 선택 탭 */}
            <Box sx={{
              bgcolor: '#e5e8ea',
              borderRadius: 3,
              padding: 0.75
            }}>
              <Box sx={{ 
                display: 'flex',
                gap: 0
              }}>
                {interviewees.map((interviewee) => (
                  <Button
                    key={interviewee.id}
                    onClick={() => handleIntervieweeSelect(interviewee.id)}
                    sx={{
                      flex: 1,
                      bgcolor: selectedIntervieweeId === interviewee.id ? 'white' : 'transparent',
                      color: '#000000',
                      fontSize: '16px',
                      fontWeight: 400,
                      padding: '12px 16px',
                      borderRadius: '18px',
                      height: 36,
                      textTransform: 'none',
                      '&:hover': {
                        bgcolor: selectedIntervieweeId === interviewee.id ? 'white' : 'rgba(255,255,255,0.5)'
                      }
                    }}
                  >
                    {interviewee.id} {interviewee.name}
                  </Button>
                ))}
              </Box>
            </Box>

            {/* 면접자 정보 및 Q&A */}
            <Box sx={{ display: 'flex', gap: 3 }}>
              {/* 면접자 정보 */}
              <Box sx={{ 
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 3.375,
                padding: '0 24px',
                width: '403px'
              }}>
                <Box>
                  <Typography variant="body1" sx={{ 
                    fontSize: '16px',
                    fontWeight: 400, 
                    color: '#000000',
                    mb: 0
                  }}>
                    개발 직군
                  </Typography>
                  <Typography variant="body1" sx={{ 
                    fontSize: '16px',
                    fontWeight: 400, 
                    color: '#000000'
                  }}>
                    강성우 #001
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ width: '90px' }}>
                      <Typography variant="body2" sx={{ 
                        fontSize: '14px',
                        fontWeight: 700, 
                        color: '#000000'
                      }}>
                        면접일시
                      </Typography>
                    </Box>
                    <Typography variant="body1" sx={{ 
                      fontSize: '16px',
                      fontWeight: 400, 
                      color: '#000000'
                    }}>
                      2025-06-02 14:00
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ width: '90px' }}>
                      <Typography variant="body2" sx={{ 
                        fontSize: '14px',
                        fontWeight: 700, 
                        color: '#000000'
                      }}>
                        면접장소
                      </Typography>
                    </Box>
                    <Typography variant="body1" sx={{ 
                      fontSize: '16px',
                      fontWeight: 400, 
                      color: '#000000'
                    }}>
                      801호
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Q&A 섹션 */}
              <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {dummyQAData.map((qa, index) => (
                  <QAComponent key={index} qa={qa} />
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default QuickReviewPage;