import React from 'react';
import { Box, Typography, Button, TableRow, TableCell } from "@mui/material";

// 면접 데이터 타입 정의
interface InterviewData {
  applicationNumber: string;
  name: string;
  time: string;
  location: string;
  isStarted?: boolean;
}

// 면접 테이블 행 컴포넌트 Props
interface InterviewQueueRowProps {
  interview: InterviewData;
  onStartInterview: (applicationNumber: string) => void;
  isLast: boolean;
}

const InterviewQueueRow: React.FC<InterviewQueueRowProps> = ({ 
  interview, 
  onStartInterview, 
  isLast 
}) => {
  return (
    <TableRow 
      sx={{ 
        '&:hover': { bgcolor: '#f8fafc' },
        borderBottom: isLast ? 'none' : '1px solid #f1f5f9'
      }}
    >
      <TableCell sx={{ py: 2, px: 3, border: 'none' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Typography 
              variant="body2" 
              color="#9fa1a0"
              sx={{ fontSize: '0.875rem' }}
            >
              {interview.applicationNumber}
            </Typography>
            <Typography 
              variant="body1" 
              fontWeight="400" 
              color="#000000"
              sx={{ fontSize: '1rem' }}
            >
              {interview.name}
            </Typography>
          </Box>
        </Box>
      </TableCell>
      <TableCell sx={{ py: 2, px: 3, border: 'none' }}>
        <Typography 
          variant="body2" 
          color="#000000"
          sx={{ fontSize: '0.875rem' }}
        >
          {interview.time}
        </Typography>
      </TableCell>
      <TableCell sx={{ py: 2, px: 3, border: 'none' }}>
        <Typography 
          variant="body2" 
          color="#000000"
          sx={{ fontSize: '0.875rem' }}
        >
          {interview.location}
        </Typography>
      </TableCell>
      <TableCell sx={{ py: 2, px: 3, border: 'none' }}>
        <Button
          variant="contained"
          onClick={() => onStartInterview(interview.applicationNumber)}
          sx={{
            bgcolor: '#0b57d0',
            color: 'white',
            borderRadius: 4.5,
            px: 3,
            height: 36,
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
      </TableCell>
    </TableRow>
  );
};

export default InterviewQueueRow;