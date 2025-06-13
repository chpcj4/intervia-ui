import { Box, Typography, Button, Chip, Card, CardContent, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Collapse, Avatar, Menu, MenuItem } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import DownloadIcon from '@mui/icons-material/Download';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import TableViewIcon from '@mui/icons-material/TableView';
import ArchiveIcon from '@mui/icons-material/Archive';
import BarChartIcon from '@mui/icons-material/BarChart';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import CancelIcon from '@mui/icons-material/Cancel';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts"
import * as XLSX from 'xlsx';
import TopNavBar from "../components/TopNavBarAdmin"
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
  status: 'completed' | 'pending' | 'absent';
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
  const [interviews, setInterviews] = useState<InterviewData[]>(dummyInterviewData);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [statusMenuAnchor, setStatusMenuAnchor] = useState<{ [key: string]: HTMLElement | null }>({});
  const [selectedInterview, setSelectedInterview] = useState<string | null>(null);

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

  // Excel 다운로드 함수
  const handleExcelDownload = () => {
    try {
      // 현재 선택된 직군 이름 가져오기
      const selectedJobName = dummyJobCategories.find(cat => cat.id === selectedJobCategory)?.name || '전체';
      
      // 상태를 한글로 변환하는 함수
      const getStatusText = (status: 'completed' | 'pending' | 'absent') => {
        switch (status) {
          case 'completed': return '진행 완료';
          case 'pending': return '진행 전';
          case 'absent': return '불참';
          default: return status;
        }
      };

      // Excel 데이터 형식으로 변환
      const excelData = interviews.map((interview) => ({
        '지원번호': interview.applicationNumber,
        '이름': interview.name,
        '면접관': interview.interviewers,
        '면접일자': interview.interviewDate,
        '면접시간': interview.interviewTime,
        '면접장소': interview.location,
        '진행상태': getStatusText(interview.status),
        '총점': interview.totalScore ?? '-',
        '자발성': interview.scores.자발성 ?? '-',
        '높은목표': interview.scores.높은목표 ?? '-',
        '의욕적': interview.scores.의욕적 ?? '-',
        '협업': interview.scores.협업 ?? '-',
        '전문성': interview.scores.전문성 ?? '-'
      }));

      // 워크북 생성
      const wb = XLSX.utils.book_new();
      
      // 워크시트 생성
      const ws = XLSX.utils.json_to_sheet(excelData);

      // 컬럼 너비 설정
      const columnWidths = [
        { wch: 10 }, // 지원번호
        { wch: 15 }, // 이름
        { wch: 20 }, // 면접관
        { wch: 12 }, // 면접일자
        { wch: 10 }, // 면접시간
        { wch: 10 }, // 면접장소
        { wch: 12 }, // 진행상태
        { wch: 8 },  // 총점
        { wch: 8 },  // 자발성
        { wch: 10 }, // 높은목표
        { wch: 8 },  // 의욕적
        { wch: 8 },  // 협업
        { wch: 8 }   // 전문성
      ];
      ws['!cols'] = columnWidths;

      // 헤더 스타일 설정
      const headerCells = ['A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1', 'H1', 'I1', 'J1', 'K1', 'L1', 'M1'];
      headerCells.forEach(cell => {
        if (ws[cell]) {
          ws[cell].s = {
            font: { bold: true, color: { rgb: "FFFFFF" } },
            fill: { fgColor: { rgb: "0B57D0" } },
            alignment: { horizontal: "center", vertical: "center" }
          };
        }
      });

      // 워크시트를 워크북에 추가
      XLSX.utils.book_append_sheet(wb, ws, `${selectedJobName}_면접결과`);

      // 통계 시트 추가
      const statsData = [
        { '구분': '전체 면접자 수', '값': interviews.length },
        { '구분': '진행 완료', '값': interviews.filter(i => i.status === 'completed').length },
        { '구분': '진행 전', '값': interviews.filter(i => i.status === 'pending').length },
        { '구분': '불참', '값': interviews.filter(i => i.status === 'absent').length },
        { '구분': '', '값': '' },
        { '구분': '평균 총점', '값': interviews
          .filter(i => i.totalScore !== null)
          .reduce((sum, i) => sum + (i.totalScore || 0), 0) / 
          interviews.filter(i => i.totalScore !== null).length || 0 },
        { '구분': '최고 점수', '값': Math.max(...interviews.map(i => i.totalScore || 0)) },
        { '구분': '최저 점수', '값': Math.min(...interviews.filter(i => i.totalScore !== null).map(i => i.totalScore || 0)) }
      ];

      const statsWs = XLSX.utils.json_to_sheet(statsData);
      statsWs['!cols'] = [{ wch: 15 }, { wch: 10 }];
      
      // 통계 시트 헤더 스타일
      if (statsWs['A1']) {
        statsWs['A1'].s = {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "10B981" } },
          alignment: { horizontal: "center" }
        };
      }
      if (statsWs['B1']) {
        statsWs['B1'].s = {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "10B981" } },
          alignment: { horizontal: "center" }
        };
      }

      XLSX.utils.book_append_sheet(wb, statsWs, '통계');

      // 파일명 생성 (현재 날짜 포함)
      const currentDate = new Date().toISOString().split('T')[0];
      const fileName = `${selectedJobName}_면접결과_${currentDate}.xlsx`;

      // 파일 다운로드
      XLSX.writeFile(wb, fileName);

      console.log(`Excel 파일 다운로드 완료: ${fileName}`);
      
    } catch (error) {
      console.error('Excel 파일 생성 중 오류:', error);
      alert('Excel 파일 생성 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const handlePdfDownload = (applicationNumber: string) => {
    console.log(`${applicationNumber} PDF 다운로드`);
  };

  // 상태 변경 관련 함수들
  const handleStatusClick = (event: React.MouseEvent<HTMLElement>, applicationNumber: string) => {
    setStatusMenuAnchor(prev => ({
      ...prev,
      [applicationNumber]: event.currentTarget
    }));
    setSelectedInterview(applicationNumber);
  };

  const handleStatusMenuClose = (applicationNumber: string) => {
    setStatusMenuAnchor(prev => ({
      ...prev,
      [applicationNumber]: null
    }));
    setSelectedInterview(null);
  };

  const handleStatusChange = async (applicationNumber: string, newStatus: 'completed' | 'pending' | 'absent') => {
    try {
      // API 호출 시뮬레이션
      console.log(`API 호출: 지원번호 ${applicationNumber}의 상태를 ${newStatus}로 변경`);
      
      // 상태 업데이트
      setInterviews(prev => prev.map(interview => 
        interview.applicationNumber === applicationNumber 
          ? { ...interview, status: newStatus }
          : interview
      ));
      
      // 메뉴 닫기
      handleStatusMenuClose(applicationNumber);
      
    } catch (error) {
      console.error('상태 변경 실패:', error);
      alert('상태 변경에 실패했습니다. 다시 시도해주세요.');
    }
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

  // 레이더 차트 데이터 (키워드별 평균 점수)
  const keywordRadarData = [
    { keyword: '자발성', average: 3.0, fullMark: 5 },
    { keyword: '높은목표', average: 5.0, fullMark: 5 },
    { keyword: '의욕적', average: 4.5, fullMark: 5 },
    { keyword: '협업', average: 3.0, fullMark: 5 },
    { keyword: '전문성', average: 3.5, fullMark: 5 }
  ];

  const getStatusChip = (status: 'completed' | 'pending' | 'absent', applicationNumber: string) => {
    const statusConfig = {
      completed: {
        label: '진행 완료',
        icon: <CheckCircleIcon sx={{ fontSize: 16 }} />,
        bgcolor: '#dcfce7',
        color: '#166534'
      },
      pending: {
        label: '진행 전',
        icon: <HourglassEmptyIcon sx={{ fontSize: 16 }} />,
        bgcolor: '#f3f4f6',
        color: '#374151'
      },
      absent: {
        label: '불참',
        icon: <CancelIcon sx={{ fontSize: 16 }} />,
        bgcolor: '#fee2e2',
        color: '#dc2626'
      }
    };

    const config = statusConfig[status];

    return (
      <>
        <Chip 
          label={config.label}
          icon={config.icon}
          size="small"
          onClick={(e) => handleStatusClick(e, applicationNumber)}
          sx={{
            bgcolor: config.bgcolor,
            color: config.color,
            fontWeight: 600,
            cursor: 'pointer',
            '&:hover': {
              bgcolor: config.bgcolor,
              opacity: 0.8,
              transform: 'scale(1.02)'
            },
            transition: 'all 0.2s ease'
          }}
        />
        
        {/* 상태 변경 메뉴 */}
        <Menu
          anchorEl={statusMenuAnchor[applicationNumber]}
          open={Boolean(statusMenuAnchor[applicationNumber])}
          onClose={() => handleStatusMenuClose(applicationNumber)}
          transformOrigin={{ horizontal: 'center', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
          PaperProps={{
            sx: {
              mt: 1,
              borderRadius: 2,
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              minWidth: 120
            }
          }}
        >
          <MenuItem 
            onClick={() => handleStatusChange(applicationNumber, 'completed')}
            sx={{ 
              display: 'flex', 
              gap: 1, 
              color: '#166534',
              '&:hover': { bgcolor: '#dcfce7' }
            }}
          >
            <CheckCircleIcon sx={{ fontSize: 18 }} />
            진행 완료
          </MenuItem>
          <MenuItem 
            onClick={() => handleStatusChange(applicationNumber, 'pending')}
            sx={{ 
              display: 'flex', 
              gap: 1, 
              color: '#374151',
              '&:hover': { bgcolor: '#f3f4f6' }
            }}
          >
            <HourglassEmptyIcon sx={{ fontSize: 18 }} />
            진행 전
          </MenuItem>
          <MenuItem 
            onClick={() => handleStatusChange(applicationNumber, 'absent')}
            sx={{ 
              display: 'flex', 
              gap: 1, 
              color: '#dc2626',
              '&:hover': { bgcolor: '#fee2e2' }
            }}
          >
            <CancelIcon sx={{ fontSize: 18 }} />
            불참
          </MenuItem>
        </Menu>
      </>
    );
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
      bgcolor: '#f8fafc',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      <TopNavBar />
      
      <Box display="flex" flex={1} sx={{ height: 'calc(100vh - 64px)', overflow: 'hidden' }}>
        {/* 좌측 사이드바 - 직군 목록 */}
        <Box
          sx={{
            width: 280,
            bgcolor: 'white',
            borderRight: '1px solid #e2e8f0',
            p: 3,
            flexShrink: 0
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

          {/* 직군별 헤더 카드 - 스크롤 시 고정 */}
          <Card
            elevation={0}
            sx={{
              position: 'sticky',
              top: 0,
              zIndex: 100,
              mb: 3,
              borderRadius: 3,
              bgcolor: 'white',
              border: '1px solid #e2e8f0',
              overflow: 'visible',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
          >
            <CardContent sx={{ p: 3, overflow: 'visible' }}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h5" fontWeight="700" color="#0b57d0">
                  {dummyJobCategories.find(cat => cat.id === selectedJobCategory)?.name}
                </Typography>
                
                {/* 다운로드 버튼들 with 툴팁 */}
                <Box display="flex" gap={1} sx={{ position: 'relative', zIndex: 10 }}>
                  {/* ZIP 다운로드 버튼 */}
                  <Box sx={{ position: 'relative' }}>
                    <IconButton
                      onClick={handleZipDownload}
                      onMouseEnter={() => setHoveredButton('zip')}
                      onMouseLeave={() => setHoveredButton(null)}
                      sx={{
                        bgcolor: '#fef3c7',
                        color: '#d97706',
                        width: 44,
                        height: 44,
                        border: '2px solid #f59e0b',
                        '&:hover': { 
                          bgcolor: '#fde68a',
                          borderColor: '#d97706',
                          transform: 'scale(1.05)'
                        },
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <ArchiveIcon fontSize="small" />
                    </IconButton>
                    
                    {/* ZIP 툴팁 */}
                    {hoveredButton === 'zip' && (
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 55,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          backgroundColor: '#1f2937',
                          color: 'white',
                          padding: '8px 12px',
                          borderRadius: 2,
                          fontSize: '0.75rem',
                          fontWeight: 500,
                          whiteSpace: 'nowrap',
                          zIndex: 1000,
                          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                          '&::before': {
                            content: '""',
                            position: 'absolute',
                            bottom: '100%',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: 0,
                            height: 0,
                            borderLeft: '5px solid transparent',
                            borderRight: '5px solid transparent',
                            borderBottom: '5px solid #1f2937'
                          }
                        }}
                      >
                        개별 pdf 한꺼번에 다운 받기
                      </Box>
                    )}
                  </Box>
                  
                  {/* PDF 요약 다운로드 버튼 */}
                  <Box sx={{ position: 'relative' }}>
                    <IconButton
                      onClick={handlePdfSummaryDownload}
                      onMouseEnter={() => setHoveredButton('pdf')}
                      onMouseLeave={() => setHoveredButton(null)}
                      sx={{
                        bgcolor: '#fecaca',
                        color: '#dc2626',
                        width: 44,
                        height: 44,
                        border: '2px solid #ef4444',
                        '&:hover': { 
                          bgcolor: '#fca5a5',
                          borderColor: '#dc2626',
                          transform: 'scale(1.05)'
                        },
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <PictureAsPdfIcon fontSize="small" />
                    </IconButton>
                    
                    {/* PDF 툴팁 */}
                    {hoveredButton === 'pdf' && (
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 55,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          backgroundColor: '#1f2937',
                          color: 'white',
                          padding: '8px 12px',
                          borderRadius: 2,
                          fontSize: '0.75rem',
                          fontWeight: 500,
                          whiteSpace: 'nowrap',
                          zIndex: 1000,
                          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                          '&::before': {
                            content: '""',
                            position: 'absolute',
                            bottom: '100%',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: 0,
                            height: 0,
                            borderLeft: '5px solid transparent',
                            borderRight: '5px solid transparent',
                            borderBottom: '5px solid #1f2937'
                          }
                        }}
                      >
                        면접결과 요약 pdf 생성 및 다운로드
                      </Box>
                    )}
                  </Box>
                  
                  {/* Excel 다운로드 버튼 */}
                  <Box sx={{ position: 'relative' }}>
                    <IconButton
                      onClick={handleExcelDownload}
                      onMouseEnter={() => setHoveredButton('excel')}
                      onMouseLeave={() => setHoveredButton(null)}
                      sx={{
                        bgcolor: '#d1fae5',
                        color: '#059669',
                        width: 44,
                        height: 44,
                        border: '2px solid #10b981',
                        '&:hover': { 
                          bgcolor: '#a7f3d0',
                          borderColor: '#059669',
                          transform: 'scale(1.05)'
                        },
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <TableViewIcon fontSize="small" />
                    </IconButton>
                    
                    {/* Excel 툴팁 */}
                    {hoveredButton === 'excel' && (
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 55,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          backgroundColor: '#1f2937',
                          color: 'white',
                          padding: '8px 12px',
                          borderRadius: 2,
                          fontSize: '0.75rem',
                          fontWeight: 500,
                          whiteSpace: 'nowrap',
                          zIndex: 1000,
                          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                          '&::before': {
                            content: '""',
                            position: 'absolute',
                            bottom: '100%',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: 0,
                            height: 0,
                            borderLeft: '5px solid transparent',
                            borderRight: '5px solid transparent',
                            borderBottom: '5px solid #1f2937'
                          }
                        }}
                      >
                        면접 결과 excel 파일 다운로드
                      </Box>
                    )}
                  </Box>
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
                  
                  {/* 레이더 차트 - 키워드별 평균 점수 */}
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
                          <RadarChart data={keywordRadarData}>
                            <PolarGrid />
                            <PolarAngleAxis 
                              dataKey="keyword" 
                              tick={{ fontSize: 12, fill: '#374151' }}
                            />
                            <PolarRadiusAxis 
                              angle={90}
                              domain={[0, 5]}
                              tick={{ fontSize: 10, fill: '#64748b' }}
                              tickCount={6}
                            />
                            <Radar
                              name="평균 점수"
                              dataKey="average"
                              stroke="#10b981"
                              fill="#10b981"
                              fillOpacity={0.3}
                              strokeWidth={2}
                            />
                            <Tooltip 
                              formatter={(value) => [`${value}점`, '평균 점수']}
                              labelFormatter={(label) => `키워드: ${label}`}
                            />
                          </RadarChart>
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
                          {getStatusChip(interview.status, interview.applicationNumber)}
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