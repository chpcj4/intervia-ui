import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

// 컴포넌트 imports
import LoginPage from './pages/LoginPage';
import InterviewerViewPage from './pages/InterviewerViewPage';
import AdminEvaluationPage from './pages/AdminEvaluationPage';
import InterviewQueuePage from './pages/InterviewQueuePage';
import InterviewQuestionListPage from './pages/InterviewQuestionListPage';
import InterviewReportPage from './pages/InterviewReportPage';
import KeywordManagementPage from './pages/KeywordManagementPage';
import ReportManagementPage from './pages/ReportManagementPage';
import QuickReviewPage from './pages/QuickReviewPage'; // 새로 추가

// Material-UI 테마 설정
const theme = createTheme({
  palette: {
    primary: {
      main: '#0b57d0',
    },
    secondary: {
      main: '#64748b',
    },
    background: {
      default: '#f8fafc',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* 기본 경로는 로그인 페이지로 리다이렉트 */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* 로그인 페이지 */}
          <Route path="/login" element={<LoginPage />} />
          
          {/* 면접관 메인 페이지 */}
          <Route path="/interviewer" element={<InterviewerViewPage />} />
          
          {/* 면접 대기 페이지 */}
          <Route path="/interview-queue" element={<InterviewQueuePage />} />
          
          {/* 면접 질문 리스트 페이지 */}
          <Route path="/interview-questions" element={<InterviewQuestionListPage />} />
          
          {/* 면접 분석 보고서 페이지 */}
          <Route path="/interview-report" element={<InterviewReportPage />} />
          
          {/* Quick Review 페이지 - 새로 추가 */}
          <Route path="/quick-review" element={<QuickReviewPage />} />
          
          {/* 관리자 페이지들 */}
          <Route path="/admin/evaluation" element={<AdminEvaluationPage />} />
          <Route path="/admin/keywords" element={<KeywordManagementPage />} />
          <Route path="/admin/reports" element={<ReportManagementPage />} />
          
          {/* 404 페이지 - 존재하지 않는 경로는 로그인으로 리다이렉트 */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;