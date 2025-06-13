import { Box, Typography, Button, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import TopNavBar from "../components/TopNavBarInterviewer"
import InterviewSidebar from "../components/InterviewSidebar"
import { useState } from 'react';

// 면접자 데이터 타입
interface Interviewee {
  id: string;
  name: string;
  department: string;
  date: string;
  time: string;
  location: string;
}

// 키워드 평가 데이터 타입
interface KeywordEvaluation {
  keyword: string;
  score: string;
  reasoning: string;
}

// 반원형 점수 그래프 컴포넌트
interface SemicircleScoreProps {
  score: number;
  maxScore: number;
}

const SemicircleScore = ({ score, maxScore }: SemicircleScoreProps) => {
  const percentage = (score / maxScore) * 100;
  const radius = 105; // 70 * 1.5
  const circumference = Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * percentage) / 100;

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      gap: 0.5,
      py: 1
    }}>
      <Typography 
        variant="h6" 
        fontWeight="600" 
        color="#333"
        sx={{ fontSize: '1.3rem', mb: 0.5 }}
      >
        Total Score
      </Typography>
      
      <Box sx={{ position: 'relative' }}>
        <svg width="210" height="120" viewBox="0 0 210 120">
          {/* 배경 반원 */}
          <path
            d="M 15 105 A 90 90 0 0 1 195 105"
            fill="none"
            stroke="#e8f4fd"
            strokeWidth="12"
            strokeLinecap="round"
          />
          {/* 점수 반원 */}
          <path
            d="M 15 105 A 90 90 0 0 1 195 105"
            fill="none"
            stroke="#2196f3"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{
              transition: 'stroke-dashoffset 1s ease-in-out'
            }}
          />
        </svg>
        
        <Box sx={{
          position: 'absolute',
          top: '70%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center'
        }}>
          <Typography 
            variant="h1" 
            fontWeight="700" 
            color="#2196f3"
            sx={{ fontSize: '3.75rem', lineHeight: 1 }}
          >
            {score}
          </Typography>
          <Typography 
            variant="body2" 
            color="#666"
            sx={{ fontSize: '1.2rem', mt: 0.25 }}
          >
            out of {maxScore}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

// 다각형 레이더 차트 컴포넌트
interface RadarChartProps {
  data: Array<{
    label: string;
    value: number;
    maxValue: number;
  }>;
}

const RadarChart = ({ data }: RadarChartProps) => {
  const size = 390; // 260 * 1.5
  const center = size / 2;
  const maxRadius = 120; // 80 * 1.5
  const levels = 5;

  const angleStep = (2 * Math.PI) / data.length;
  
  const getPoint = (index: number, value: number, maxValue: number) => {
    const angle = angleStep * index - Math.PI / 2;
    const radius = (value / maxValue) * maxRadius;
    const x = center + radius * Math.cos(angle);
    const y = center + radius * Math.sin(angle);
    return { x, y };
  };

  const getLabelPoint = (index: number) => {
    const angle = angleStep * index - Math.PI / 2;
    const radius = maxRadius + 37.5; // 25 * 1.5
    const x = center + radius * Math.cos(angle);
    const y = center + radius * Math.sin(angle);
    return { x, y };
  };

  const createBackgroundPath = (level: number) => {
    const radius = (maxRadius * level) / levels;
    const points = data.map((_, index) => {
      const angle = angleStep * index - Math.PI / 2;
      const x = center + radius * Math.cos(angle);
      const y = center + radius * Math.sin(angle);
      return `${x},${y}`;
    }).join(' ');
    return `M ${points.split(' ')[0]} L ${points.split(' ').slice(1).join(' L')} Z`;
  };

  const dataPath = data.map((item, index) => {
    const point = getPoint(index, item.value, item.maxValue);
    return `${point.x},${point.y}`;
  }).join(' ');

  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      width: '100%',
      height: '100%',
      py: 1
    }}>
      <svg width={size + 90} height={size + 90} viewBox={`0 0 ${size + 90} ${size + 90}`}>
        <g transform={`translate(45, 45)`}>
          {/* 배경 레벨 라인들 */}
          {[...Array(levels)].map((_, level) => (
            <path
              key={level}
              d={createBackgroundPath(level + 1)}
              fill="none"
              stroke={level === levels - 1 ? "#ddd" : "#f0f0f0"}
              strokeWidth={level === levels - 1 ? "2.25" : "1.5"}
            />
          ))}
          
          {/* 축 라인들 */}
          {data.map((_, index) => {
            const angle = angleStep * index - Math.PI / 2;
            const endX = center + maxRadius * Math.cos(angle);
            const endY = center + maxRadius * Math.sin(angle);
            return (
              <line
                key={index}
                x1={center}
                y1={center}
                x2={endX}
                y2={endY}
                stroke="#e0e0e0"
                strokeWidth="1.5"
              />
            );
          })}
          
          {/* 데이터 영역 */}
          <polygon
            points={dataPath}
            fill="rgba(33, 150, 243, 0.15)"
            stroke="#2196f3"
            strokeWidth="3.75"
          />
          
          {/* 데이터 포인트 */}
          {data.map((item, index) => {
            const point = getPoint(index, item.value, item.maxValue);
            return (
              <circle
                key={index}
                cx={point.x}
                cy={point.y}
                r="6"
                fill="#2196f3"
                stroke="#fff"
                strokeWidth="3"
              />
            );
          })}
          
          {/* 레이블 */}
          {data.map((item, index) => {
            const labelPoint = getLabelPoint(index);
            return (
              <text
                key={index}
                x={labelPoint.x}
                y={labelPoint.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="16.5"
                fill="#555"
                fontWeight="600"
              >
                {item.label}
              </text>
            );
          })}
        </g>
      </svg>
    </Box>
  );
};

// 더미 면접자 데이터
const interviewees: Interviewee[] = [
  {
    id: "001",
    name: "강성우",
    department: "개발 직군",
    date: "2025-06-02",
    time: "14:00",
    location: "801호"
  },
  {
    id: "002",
    name: "김민채",
    department: "개발 직군",
    date: "2025-06-02",
    time: "14:30",
    location: "801호"
  },
  {
    id: "003",
    name: "김민혁",
    department: "개발 직군",
    date: "2025-06-02",
    time: "15:00",
    location: "801호"
  },
  {
    id: "004",
    name: "김상헌",
    department: "개발 직군",
    date: "2025-06-02",
    time: "15:30",
    location: "801호"
  }
];

// 키워드 평가 데이터를 기반으로 레이더 차트 데이터 생성하는 함수 (직접 매핑)
const generateRadarDataFromKeywords = (keywordEvaluations: KeywordEvaluation[]) => {
  return keywordEvaluations.map(evaluation => ({
    label: evaluation.keyword,
    value: parseScore(evaluation.score),
    maxValue: 5
  }));
};

// 키워드 평가 점수들의 총점과 만점 계산하는 함수
const calculateTotalScoreFromKeywords = (keywordEvaluations: KeywordEvaluation[]): { score: number, maxScore: number } => {
  const totalScore = keywordEvaluations.reduce((sum, evaluation) => {
    return sum + parseScore(evaluation.score);
  }, 0);
  const maxScore = keywordEvaluations.length * 5;
  
  return {
    score: Math.round(totalScore * 10) / 10, // 소수점 1자리까지
    maxScore: maxScore
  };
};

// 각 면접자별 키워드 평가 데이터
const intervieweeKeywordEvaluations = [
  // 강성우 (001)
  [
    {
      keyword: "자발적",
      score: "4.1/5",
      reasoning: "프로젝트에서 능동적으로 문제를 찾아 해결하려는 모습을 보였으며, 추가적인 학습과 개선사항을 스스로 제안하는 등 자발적인 태도가 돋보였습니다."
    },
    {
      keyword: "의욕적",
      score: "3.6/5",
      reasoning: "새로운 기술 습득에 대한 의지는 보였으나, 구체적인 실행 계획이나 열정적인 모습은 다소 아쉬웠습니다."
    },
    {
      keyword: "높은 목표 추구",
      score: "4.2/5",
      reasoning: "현재 수준에 안주하지 않고 더 높은 기술적 성취를 위해 노력하는 모습을 보였으며, 장기적인 커리어 목표도 명확했습니다."
    },
    {
      keyword: "Passionate",
      score: "5.0/5",
      reasoning: "개발에 대한 진정한 열정이 느껴졌으며, 기술적 도전에 대해 즐거워하고 몰입하는 모습이 인상적이었습니다."
    },
    {
      keyword: "Professional",
      score: "4.0/5",
      reasoning: "업무에 대한 책임감과 전문성을 갖추고 있으나, 경험 부족으로 인한 일부 한계점도 보였습니다."
    }
  ],
  // 김민채 (002)
  [
    {
      keyword: "소통 지향적",
      score: "4.1/5",
      reasoning: "팀원들과의 원활한 소통을 중시하며, 의견 차이가 있을 때도 건설적인 대화를 통해 해결하려는 자세를 보였습니다."
    },
    {
      keyword: "창의적 사고",
      score: "4.2/5",
      reasoning: "기존의 관습에 얽매이지 않고 새로운 관점에서 문제를 바라보는 능력이 뛰어나며, 독창적인 아이디어를 제시했습니다."
    },
    {
      keyword: "적응력",
      score: "3.9/5",
      reasoning: "변화하는 상황에 빠르게 적응하는 모습을 보였으나, 급격한 변화에 대해서는 약간의 부담을 느끼는 것 같았습니다."
    },
    {
      keyword: "Collaborative",
      score: "4.0/5",
      reasoning: "팀워크를 중시하고 다른 사람들과 잘 협력하는 능력을 갖추고 있으며, 갈등 상황에서도 조화를 추구합니다."
    },
    {
      keyword: "Detail-oriented",
      score: "3.7/5",
      reasoning: "세부사항에 주의를 기울이는 편이지만, 때로는 큰 그림을 놓치는 경우도 있어 보였습니다."
    }
  ],
  // 김민혁 (003)
  [
    {
      keyword: "기술적 우수성",
      score: "4.7/5",
      reasoning: "깊이 있는 기술적 지식과 실무 경험을 바탕으로 복잡한 문제도 체계적으로 분석하고 해결하는 능력이 뛰어났습니다."
    },
    {
      keyword: "문제 해결력",
      score: "4.8/5",
      reasoning: "논리적이고 체계적인 접근 방식으로 문제를 분석하며, 효과적인 해결책을 도출하는 능력이 탁월했습니다."
    },
    {
      keyword: "학습 의지",
      score: "4.3/5",
      reasoning: "새로운 기술과 트렌드에 대한 지속적인 학습 의지를 보였으며, 자기 발전을 위한 노력이 돋보였습니다."
    },
    {
      keyword: "Systematic",
      score: "4.1/5",
      reasoning: "업무를 체계적으로 접근하고 계획적으로 진행하는 모습을 보였으며, 효율성을 중시하는 태도가 인상적이었습니다."
    },
    {
      keyword: "Innovative",
      score: "3.9/5",
      reasoning: "기술적 혁신에 대한 관심은 있으나, 실제 혁신적인 아이디어 제시는 다소 아쉬웠습니다."
    }
  ],
  // 김상헌 (004)
  [
    {
      keyword: "성장 가능성",
      score: "4.1/5",
      reasoning: "현재 수준은 다소 아쉽지만 지속적인 학습 의지와 개선하려는 노력이 보여 향후 성장 가능성이 높다고 판단됩니다."
    },
    {
      keyword: "긍정적 마인드",
      score: "3.9/5",
      reasoning: "어려운 상황에서도 긍정적으로 접근하려는 자세를 보였으나, 때로는 현실적인 판단이 부족해 보였습니다."
    },
    {
      keyword: "노력 의지",
      score: "3.8/5",
      reasoning: "목표 달성을 위해 노력하려는 의지는 있으나, 구체적인 실행 계획이나 지속성 측면에서 보완이 필요해 보입니다."
    },
    {
      keyword: "Humble",
      score: "3.7/5",
      reasoning: "겸손한 자세로 피드백을 받아들이려 하지만, 자신감 부족으로 인해 적극성이 다소 아쉬웠습니다."
    },
    {
      keyword: "Potential",
      score: "3.8/5",
      reasoning: "기본기는 갖추고 있으며 올바른 방향으로 발전할 수 있는 잠재력을 보유하고 있다고 평가됩니다."
    }
  ]
];

// 점수 문자열에서 숫자 추출하는 함수
const parseScore = (scoreString: string): number => {
  const match = scoreString.match(/(\d+\.?\d*)/);
  return match ? parseFloat(match[1]) : 0;
};

// 총점 계산 함수 - 키워드 평가 기반으로 변경
const calculateTotalScore = (keywordEvaluations: KeywordEvaluation[]) => {
  return calculateTotalScoreFromKeywords(keywordEvaluations);
};

// 키워드 평가표 컴포넌트
interface KeywordEvaluationTableProps {
  evaluations: KeywordEvaluation[];
}

const KeywordEvaluationTable = ({ evaluations }: KeywordEvaluationTableProps) => {
  return (
    <Box sx={{ px: 4, py: 3 }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell 
                sx={{ 
                  fontWeight: 700, 
                  color: '#333', 
                  borderBottom: '2px solid #f0f0f0',
                  fontSize: '1.1rem',
                  py: 2,
                  px: 0,
                  width: 180,
                  bgcolor: 'transparent'
                }}
              >
                Keyword
              </TableCell>
              <TableCell 
                sx={{ 
                  fontWeight: 700, 
                  color: '#333', 
                  borderBottom: '2px solid #f0f0f0',
                  fontSize: '1.1rem',
                  py: 2,
                  px: 0,
                  width: 140,
                  textAlign: 'center',
                  bgcolor: 'transparent'
                }}
              >
                점수
              </TableCell>
              <TableCell 
                sx={{ 
                  fontWeight: 700, 
                  color: '#333', 
                  borderBottom: '2px solid #f0f0f0',
                  fontSize: '1.1rem',
                  py: 2,
                  px: 0,
                  bgcolor: 'transparent'
                }}
              >
                판단근거
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {evaluations.map((evaluation, index) => (
              <TableRow 
                key={index}
                sx={{ 
                  borderBottom: index === evaluations.length - 1 ? 'none' : '1px solid #f5f5f5',
                  '&:hover': {
                    bgcolor: '#fafbfc'
                  }
                }}
              >
                <TableCell 
                  sx={{ 
                    py: 3, 
                    px: 0, 
                    border: 'none',
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: '#333'
                  }}
                >
                  {evaluation.keyword}
                </TableCell>
                <TableCell 
                  sx={{ 
                    py: 3, 
                    px: 0, 
                    border: 'none',
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: '#2196f3',
                    textAlign: 'center'
                  }}
                >
                  {evaluation.score}
                </TableCell>
                <TableCell 
                  sx={{ 
                    py: 3, 
                    px: 0, 
                    border: 'none',
                    fontSize: '0.95rem',
                    fontWeight: 400,
                    color: '#555',
                    lineHeight: 1.6
                  }}
                >
                  {evaluation.reasoning}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

// 보고서 정보 패널 컴포넌트
interface ReportInfoPanelProps {
  interviewee: Interviewee;
}

const ReportInfoPanel = ({ interviewee }: ReportInfoPanelProps) => {
  return (
    <Box sx={{ 
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      height: '100%',
      px: 4,
      py: 3
    }}>
      {/* 제목 */}
      <Typography 
        variant="body2" 
        fontWeight="600" 
        color="#666"
        sx={{ fontSize: '0.85rem', mb: 1.5 }}
      >
        개발 직군
      </Typography>
      
      {/* 면접자 이름 */}
      <Typography 
        variant="h4" 
        fontWeight="700" 
        color="#333"
        sx={{ fontSize: '1.5rem', mb: 2.5 }}
      >
        {interviewee.name} #{interviewee.id}
      </Typography>

      {/* 상세 정보 */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        <Box>
          <Typography 
            variant="body2" 
            fontWeight="600" 
            color="#666"
            sx={{ fontSize: '0.8rem', mb: 0.3 }}
          >
            면접일시
          </Typography>
          <Typography 
            variant="body1" 
            fontWeight="500" 
            color="#333"
            sx={{ fontSize: '0.9rem' }}
          >
            {interviewee.date} {interviewee.time}
          </Typography>
        </Box>
        
        <Box>
          <Typography 
            variant="body2" 
            fontWeight="600" 
            color="#666"
            sx={{ fontSize: '0.8rem', mb: 0.3 }}
          >
            면접장소
          </Typography>
          <Typography 
            variant="body1" 
            fontWeight="500" 
            color="#333"
            sx={{ fontSize: '0.9rem' }}
          >
            {interviewee.location}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

const InterviewAnalysisReportPage = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedIntervieweeIndex, setSelectedIntervieweeIndex] = useState(0);

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleNextInterview = () => {
    console.log("다음 면접 진행");
    // 실제로는 다음 면접 진행 로직
  };

  const handleEndInterview = () => {
    console.log("면접 종료하기");
    // 실제로는 면접 종료 로직
  };

  const handleIntervieweeSelect = (index: number) => {
    setSelectedIntervieweeIndex(index);
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

  const selectedInterviewee = interviewees[selectedIntervieweeIndex];
  const selectedKeywordEvaluations = intervieweeKeywordEvaluations[selectedIntervieweeIndex];
  const selectedRadarData = generateRadarDataFromKeywords(selectedKeywordEvaluations);
  const scoreData = calculateTotalScore(selectedKeywordEvaluations);

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
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-end',
            gap: 6
          }}>
            {/* 왼쪽: 보고서 제목 */}
            <Box>
              <Typography 
                variant="h2" 
                fontWeight="700" 
                color="#000000"
                sx={{ fontSize: '2.25rem' }}
              >
                보고서
              </Typography>
            </Box>

            {/* 오른쪽: 버튼들 */}
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1.5
            }}>
              <Button
                variant="contained"
                onClick={handleNextInterview}
                sx={{
                  bgcolor: 'white',
                  color: '#000000',
                  borderRadius: '18px',
                  px: 4,
                  py: 3,
                  fontSize: '1rem',
                  fontWeight: 400,
                  textTransform: 'none',
                  height: 36,
                  boxShadow: 'none',
                  border: '1px solid #e2e8f0',
                  '&:hover': {
                    bgcolor: '#f8fafc',
                    boxShadow: 'none'
                  }
                }}
              >
                다음 면접 진행
              </Button>
              <Button
                variant="contained"
                onClick={handleEndInterview}
                sx={{
                  bgcolor: '#e5e8ea',
                  color: '#000000',
                  borderRadius: '18px',
                  px: 4,
                  py: 3,
                  fontSize: '1rem',
                  fontWeight: 400,
                  textTransform: 'none',
                  height: 36,
                  boxShadow: 'none',
                  '&:hover': {
                    bgcolor: '#d1d5db',
                    boxShadow: 'none'
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
            borderRadius: 6,
            p: 1.5,
            display: 'flex'
          }}>
            {interviewees.map((interviewee, index) => (
              <Button
                key={interviewee.id}
                onClick={() => handleIntervieweeSelect(index)}
                sx={{
                  flex: 1,
                  bgcolor: selectedIntervieweeIndex === index ? 'white' : 'transparent',
                  color: '#000000',
                  borderRadius: '18px',
                  px: 4,
                  py: 3,
                  fontSize: '1rem',
                  fontWeight: 400,
                  textTransform: 'none',
                  height: 36,
                  boxShadow: 'none',
                  '&:hover': {
                    bgcolor: selectedIntervieweeIndex === index ? 'white' : 'rgba(255, 255, 255, 0.5)',
                    boxShadow: 'none'
                  }
                }}
              >
                {interviewee.id} {interviewee.name}
              </Button>
            ))}
          </Box>

          {/* 보고서 컨텐츠 */}
          <Box>
            {/* 차트 영역 */}
            <Box sx={{ 
              display: 'flex',
              gap: 0,
              bgcolor: 'white',
              borderRadius: 3,
              overflow: 'hidden',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              border: '1px solid #f0f0f0'
            }}>
              {/* 왼쪽: 면접자 정보 */}
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                flex: 1,
                borderRight: '1px solid #f0f0f0'
              }}>
                <ReportInfoPanel interviewee={selectedInterviewee} />
              </Box>

              {/* 오른쪽: 차트 영역 */}
              <Box sx={{
                display: 'flex',
                minWidth: 750, // 500 * 1.5
                width: 750
              }}>
                {/* 토탈 스코어 */}
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 330, // 220 * 1.5
                  borderRight: '1px solid #f0f0f0',
                  bgcolor: 'white'
                }}>
                  <SemicircleScore score={scoreData.score} maxScore={scoreData.maxScore} />
                </Box>

                {/* 레이더 차트 */}
                <Box sx={{ 
                  width: 420, // 280 * 1.5
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: 300, // 높이 줄임
                  bgcolor: 'white'
                }}>
                  <RadarChart data={selectedRadarData} />
                </Box>
              </Box>
            </Box>
          </Box>

          {/* 키워드 평가표 */}
          <Box sx={{ mt: 4 }}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 3,
                bgcolor: 'white',
                border: '1px solid #f0f0f0',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                overflow: 'hidden'
              }}
            >
              <CardContent sx={{ p: 0 }}>
                <KeywordEvaluationTable evaluations={selectedKeywordEvaluations} />
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default InterviewAnalysisReportPage;