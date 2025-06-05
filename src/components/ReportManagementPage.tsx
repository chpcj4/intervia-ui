import { Box, Typography, Button, Chip, Card, CardContent, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Collapse, Avatar } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import DownloadIcon from '@mui/icons-material/Download';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import TableViewIcon from '@mui/icons-material/TableView';
import ArchiveIcon from '@mui/icons-material/Archive';
import BarChartIcon from '@mui/icons-material/BarChart';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import TopNavBar from "./TopNavBar"
import { useState } from 'react';

// 직군 데이터 타입 정의
interface JobCategory {
  id: number;
  name: string;
}

// 면접 데이터 타입 정의
interface InterviewData {
  applicationNumber: string;
  name: string;
  interviewers: string;
  interviewDate: string;
  interviewTime: string;
  location: string;
  status: 'completed' | 'pending';
  totalScore: number | null;
  scores: {
    자발성: number | null;
    높은목표: number | null;
    의욕적: number | null;
    협업: number | null;
    전문성: number | null;
  };
}

// 더미 직군 데이터
const dummyJobCategories: JobCategory[] = [
  { id: 1, name: "개발" },
  { id: 2, name: "디자인" },
  { id: 3, name: "기획" },
  { id: 4, name: "영업" }
];

// 더미 면접 데이터
const dummyInterviewData: InterviewData[] = [
  {
    applicationNumber: "001",
    name: "강성우",
    interviewers: "김00, 이00, 박00",
    interviewDate: "2025-05-29",
    interviewTime: "14:00",
    location: "801호",
    status: 'completed',
    totalScore: 18,
    scores: {
      자발성: 3,
      높은목표: 5,
      의욕적: 4,
      협업: 2,
      전문성: 4
    }
  },
  {
    applicationNumber: "002",
    name: "김민채",
    interviewers: "김00, 이00, 박00",
    interviewDate: "2025-05-29",
    interviewTime: "14:00",
    location: "801호",
    status: 'completed',
    totalScore: 20,
    scores: {
      자발성: 3,
      높은목표: 5,
      의욕적: 5,
      협업: 4,
      전문성: 3
    }
  },
  {
    applicationNumber: "003",
    name: "김민혁",
    interviewers: "김00, 이00, 박00",
    interviewDate: "2025-05-29",
    interviewTime: "14:30",
    location: "801호",
    status: 'pending',
    totalScore: null,
    scores: {
      자발성: null,
      높은목표: null,
      의욕적: null,
      협업: null,
      전문성: null
    }
  },
  {
    applicationNumber: "004",
    name: "김상헌",
    interviewers: "김00, 이00, 박00",
    interviewDate: "2025-05-29",
    interviewTime: "14:30",
    location: "801호",
    status: 'pending',
    totalScore: null,
    scores: {
      자발성: null,
      높은목표: null,
      의욕적: null,
      협업: null,
      전문성: null
    }
  }
];

const ReportManagementPage = () => {
  const [selectedJobCategory, setSelectedJobCategory] = useState<number>(1);
  const [isStatisticsExpanded, setIsStatisticsExpanded] = useState<boolean>(true);
  const [interviews] = useState<InterviewData[]>(dummyInterviewData);

  const handleJobCategorySelect = (categoryId: number) => {
    setSelectedJobCategory(categoryId);
  };

  const toggleStatistics = () => {
    setIsStatisticsExpanded(!isStatisticsExpanded);
  };

  const handleZipDownload = () => {
    console.log("개별 PDF 한꺼번에 다운로드");
  };

  const handlePdfSummaryDownload = () => {
    console.log("면접결과 요약 PDF 생성 및 다운로드");
  };

  const handleExcelDownload = () => {
    console.log("면접 결과 Excel 파일 다운로드");
  };

  const handlePdfDownload = (applicationNumber: string) => {
    console.log(`${applicationNumber} PDF 다운로드`);
  };

  // 도넛 차트 데이터 (면접 진행 현황)
  const statusData = [
    { name: '진행 완료', value: 2, color: '#22c55e' },
    { name: '진행 전', value: 2, color: '#9ca3af' }
  ];

  // 히스토그램 데이터 (총점 분포)
  const scoreDistributionData = [
    { range: '0-5', count: 0 },
    { range: '6-10', count: 0 },
    { range: '11-15', count: 0 },
    { range: '16-20', count: 2 },
    { range: '21-25', count: 0 }
  ];

  // 막대 그래프 데이터 (키워드별 평균 점수)
  const keywordAverageData = [
    { keyword: '자발성', average: 3.0 },
    { keyword: '높은목표', average: 5.0 },
    { keyword: '의욕적', average: 4.5 },
    { keyword: '협업', average: 3.0 },
    { keyword: '전문성', average: 3.5 }
  ];

  const getStatusChip = (status: 'completed' | 'pending') => {
    if (status === 'completed') {
      return (
        <Chip 
          label="진행 완료"
          size="small"
          sx={{
            bgcolor: '#dcfce7',
            color: '#166534',
            fontWeight: 600,
            '& .MuiChip-avatar': {
              bgcolor: '#22c55e',
              width: 8,
              height: 8,
              ml: 1
            }
          }}
          avatar={<Box />}
        />
      );
    } else {
      return (
        <Chip 
          label="진행 전"
          size="small"
          sx={{
            bgcolor: '#f3f4f6',
            color: '#374151',
            fontWeight: 600,
            '& .MuiChip-avatar': {
              bgcolor: '#9ca3af',
              width: 8,
              height: 8,
              ml: 1
            }
          }}
          avatar={<Box />}
        />
      );
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc' }}>
      <TopNavBar />
      
      <Box display="flex" height="calc(100vh - 64px)">
        {/* 좌측 사이드바 - 직군 목록 */}
        <Box
          sx={{
            width: 280,
            bgcolor: 'white',
            borderRight: '1px solid #e2e8f0',
            p: 3
          }}
        >
          <Typography variant="h6" fontWeight="700" color="#1e293b" mb={3}>
            직군 목록
          </Typography>
          <Box>
            {dummyJobCategories.map((category) => (
              <Box
                key={category.id}
                onClick={() => handleJobCategorySelect(category.id)}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  mb: 1,
                  cursor: 'pointer',
                  bgcolor: selectedJobCategory === category.id ? '#d3e3fd' : 'transparent',
                  borderLeft: selectedJobCategory === category.id ? '3px solid #0b57d0' : '3px solid transparent',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    bgcolor: '#f1f5f9'
                  }
                }}
              >
                <Typography
                  variant="body1"
                  fontWeight={selectedJobCategory === category.id ? 700 : 400}
                  color={selectedJobCategory === category.id ? '#0b57d0' : '#64748b'}
                >
                  {category.name}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* 메인 컨텐츠 영역 */}
        <Box flex={1} sx={{ overflowY: "auto", bgcolor: '#f8fafc', p: 4 }}>
          {/* 페이지 헤더 */}
          <Box mb={4}>
            <Typography 
              variant="h4" 
              fontWeight="700" 
              color="#1e293b"
              mb={1}
            >
              보고서 관리
            </Typography>
            <Typography 
              variant="body1" 
              color="#64748b"
            >
              직군별 면접 보고서를 조회하고 다운로드할 수 있습니다.
            </Typography>
          </Box>

          {/* 직군별 헤더 카드 */}
          <Card
            elevation={0}
            sx={{
              mb: 3,
              borderRadius: 3,
              bgcolor: 'white',
              border: '1px solid #e2e8f0'
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h5" fontWeight="700" color="#0b57d0">
                  {dummyJobCategories.find(cat => cat.id === selectedJobCategory)?.name}
                </Typography>
                <Box display="flex" gap={1}>
                  {/* ZIP 다운로드 버튼 */}
                  <IconButton
                    onClick={handleZipDownload}
                    sx={{
                      bgcolor: '#fef3c7',
                      color: '#d97706',
                      '&:hover': { bgcolor: '#fde68a' }
                    }}
                    title="개별 pdf 한꺼번에 다운 받기"
                  >
                    <ArchiveIcon />
                  </IconButton>
                  
                  {/* PDF 요약 다운로드 버튼 */}
                  <IconButton
                    onClick={handlePdfSummaryDownload}
                    sx={{
                      bgcolor: '#fecaca',
                      color: '#dc2626',
                      '&:hover': { bgcolor: '#fca5a5' }
                    }}
                    title="면접결과 요약 pdf 생성 및 다운로드"
                  >
                    <PictureAsPdfIcon />
                  </IconButton>
                  
                  {/* Excel 다운로드 버튼 */}
                  <IconButton
                    onClick={handleExcelDownload}
                    sx={{
                      bgcolor: '#d1fae5',
                      color: '#059669',
                      '&:hover': { bgcolor: '#a7f3d0' }
                    }}
                    title="면접 결과 excel 파일 다운로드"
                  >
                    <TableViewIcon />
                  </IconButton>
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* 통계 섹션 */}
          <Card
            elevation={0}
            sx={{
              mb: 3,
              borderRadius: 3,
              bgcolor: 'white',
              border: '1px solid #e2e8f0'
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box 
                display="flex" 
                alignItems="center" 
                gap={2} 
                mb={2}
                sx={{ cursor: 'pointer' }}
                onClick={toggleStatistics}
              >
                <IconButton size="small">
                  {isStatisticsExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
                <Typography variant="h6" fontWeight="700" color="#334155">
                  통계
                </Typography>
              </Box>
              
              <Collapse in={isStatisticsExpanded}>
                <Box display="flex" gap={3}>
                  {/* 도넛 차트 - 면접 진행 현황 */}
                  <Card
                    sx={{
                      flex: 1,
                      bgcolor: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: 2
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Typography variant="h6" fontWeight="600" color="#374151" mb={2} textAlign="center">
                        면접 진행 현황
                      </Typography>
                      <Box sx={{ height: 200 }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={statusData}
                              cx="50%"
                              cy="50%"
                              innerRadius={40}
                              outerRadius={70}
                              paddingAngle={5}
                              dataKey="value"
                            >
                              {statusData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </Box>
                    </CardContent>
                  </Card>
                  
                  {/* 히스토그램 - 총점 분포 */}
                  <Card
                    sx={{
                      flex: 1,
                      bgcolor: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: 2
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Typography variant="h6" fontWeight="600" color="#374151" mb={2} textAlign="center">
                        총점 분포
                      </Typography>
                      <Box sx={{ height: 200 }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={scoreDistributionData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="range" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="count" fill="#3b82f6" />
                          </BarChart>
                        </ResponsiveContainer>
                      </Box>
                    </CardContent>
                  </Card>
                  
                  {/* 막대 그래프 - 키워드별 평균 점수 */}
                  <Card
                    sx={{
                      flex: 1,
                      bgcolor: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: 2
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Typography variant="h6" fontWeight="600" color="#374151" mb={2} textAlign="center">
                        키워드별 평균 점수
                      </Typography>
                      <Box sx={{ height: 200 }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart 
                            data={keywordAverageData}
                            margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis 
                              dataKey="keyword" 
                              tick={{ fontSize: 11 }}
                              angle={-45}
                              textAnchor="end"
                              height={60}
                            />
                            <YAxis 
                              domain={[0, 5]}
                              tick={{ fontSize: 12 }}
                            />
                            <Tooltip 
                              formatter={(value) => [`${value}점`, '평균 점수']}
                              labelFormatter={(label) => `키워드: ${label}`}
                            />
                            <Bar dataKey="average" fill="#10b981" />
                          </BarChart>
                        </ResponsiveContainer>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              </Collapse>
            </CardContent>
          </Card>

          {/* 보고서 조회 테이블 */}
          <Card
            elevation={0}
            sx={{
              borderRadius: 3,
              bgcolor: 'white',
              border: '1px solid #e2e8f0'
            }}
          >
            <CardContent sx={{ p: 0 }}>
              <TableContainer>
                <Table sx={{ minWidth: 1200 }}>
                  <TableHead>
                    <TableRow sx={{ bgcolor: '#f8fafc' }}>
                      <TableCell sx={{ fontWeight: 700, color: '#374151', borderBottom: '1px solid #e2e8f0' }}>
                        지원 번호
                      </TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#374151', borderBottom: '1px solid #e2e8f0' }}>
                        이름
                      </TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#374151', borderBottom: '1px solid #e2e8f0', minWidth: 150 }}>
                        면접관
                      </TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#374151', borderBottom: '1px solid #e2e8f0' }}>
                        면접 일자
                      </TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#374151', borderBottom: '1px solid #e2e8f0' }}>
                        면접 시간
                      </TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#374151', borderBottom: '1px solid #e2e8f0' }}>
                        면접 장소
                      </TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#374151', borderBottom: '1px solid #e2e8f0' }}>
                        진행 상태
                      </TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#374151', borderBottom: '1px solid #e2e8f0' }}>
                        총점
                        <IconButton size="small" sx={{ ml: 1 }}>
                          <ExpandMoreIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#374151', borderBottom: '1px solid #e2e8f0' }}>
                        자발성
                      </TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#374151', borderBottom: '1px solid #e2e8f0' }}>
                        높은 목표
                      </TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#374151', borderBottom: '1px solid #e2e8f0' }}>
                        의욕적
                      </TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#374151', borderBottom: '1px solid #e2e8f0' }}>
                        협업
                      </TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#374151', borderBottom: '1px solid #e2e8f0' }}>
                        전문성
                      </TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#374151', borderBottom: '1px solid #e2e8f0' }}>
                        PDF 파일
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {interviews.map((interview, index) => (
                      <TableRow 
                        key={interview.applicationNumber}
                        sx={{ 
                          '&:hover': { bgcolor: '#f8fafc' },
                          borderBottom: index === interviews.length - 1 ? 'none' : '1px solid #f1f5f9'
                        }}
                      >
                        <TableCell sx={{ color: '#374151' }}>
                          {interview.applicationNumber}
                        </TableCell>
                        <TableCell sx={{ color: '#374151', fontWeight: 600 }}>
                          {interview.name}
                        </TableCell>
                        <TableCell sx={{ color: '#374151' }}>
                          {interview.interviewers}
                        </TableCell>
                        <TableCell sx={{ color: '#374151' }}>
                          {interview.interviewDate}
                        </TableCell>
                        <TableCell sx={{ color: '#374151' }}>
                          {interview.interviewTime}
                        </TableCell>
                        <TableCell sx={{ color: '#374151' }}>
                          {interview.location}
                        </TableCell>
                        <TableCell>
                          {getStatusChip(interview.status)}
                        </TableCell>
                        <TableCell sx={{ color: '#374151', fontWeight: 600 }}>
                          {interview.totalScore || '-'}
                        </TableCell>
                        <TableCell sx={{ color: '#374151' }}>
                          {interview.scores.자발성 || '-'}
                        </TableCell>
                        <TableCell sx={{ color: '#374151' }}>
                          {interview.scores.높은목표 || '-'}
                        </TableCell>
                        <TableCell sx={{ color: '#374151' }}>
                          {interview.scores.의욕적 || '-'}
                        </TableCell>
                        <TableCell sx={{ color: '#374151' }}>
                          {interview.scores.협업 || '-'}
                        </TableCell>
                        <TableCell sx={{ color: '#374151' }}>
                          {interview.scores.전문성 || '-'}
                        </TableCell>
                        <TableCell>
                          {interview.status === 'completed' ? (
                            <IconButton
                              size="small"
                              onClick={() => handlePdfDownload(interview.applicationNumber)}
                              sx={{
                                color: '#dc2626',
                                '&:hover': { bgcolor: '#fef2f2' }
                              }}
                            >
                              <DownloadIcon fontSize="small" />
                            </IconButton>
                          ) : (
                            '-'
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default ReportManagementPage;