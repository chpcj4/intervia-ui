import { Box, Typography, IconButton, TextField, Button, Chip, Card, CardContent, Grow, Checkbox } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { useState, forwardRef } from 'react';

// 키워드 데이터 타입 정의
interface KeywordCriterion {
  keyword_score: number;
  keyword_guideline: string;
}

interface KeywordData {
  keyword_id: number;
  keyword_name: string;
  keyword_detail: string;
  keyword_criteria: KeywordCriterion[];
}

interface KeywordDetailCardProps {
  keyword: KeywordData;
  index: number;
  onEdit: (keywordId: number) => void;
  onSave: (keywordId: number) => void;
  onCancel: (keywordId: number) => void;
  onDelete: (keywordId: number) => void;
  onDetailChange: (keywordId: number, value: string) => void;
  onCriterionChange: (keywordId: number, index: number, value: string) => void;
  isEditing: boolean;
  editedKeyword?: KeywordData;
  // 체크박스 관련 props 추가
  showCheckbox?: boolean;
  isChecked?: boolean;
  onCheckboxChange?: (keywordId: number) => void;
}

const KeywordDetailCard = forwardRef<HTMLDivElement, KeywordDetailCardProps>(({
  keyword,
  index,
  onEdit,
  onSave,
  onCancel,
  onDelete,
  onDetailChange,
  onCriterionChange,
  isEditing,
  editedKeyword,
  showCheckbox = false,
  isChecked = false,
  onCheckboxChange
}, ref) => {
  const currentKeyword = isEditing && editedKeyword ? editedKeyword : keyword;

  return (
    <Grow
      in={true}
      timeout={300 + index * 100}
    >
      <div ref={ref}>
        <Card
          elevation={0}
          sx={{
            mb: 3,
            border: isEditing ? '1px solid #3b82f6' : '1px solid #e2e8f0',
            borderRadius: 3,
            bgcolor: isEditing ? '#f2f6fc' : 'white',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1)',
              borderColor: '#3b82f6',
              transform: 'translateY(-2px)'
            }
          }}
        >
          <CardContent sx={{ p: 4 }}>
            {/* 키워드 헤더 */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <Box display="flex" alignItems="center" gap={2}>
                {/* 체크박스 (조건부 표시) */}
                {showCheckbox && (
                  <Checkbox
                    checked={isChecked}
                    onChange={() => onCheckboxChange?.(keyword.keyword_id)}
                    sx={{ p: 0 }}
                  />
                )}
                <Typography variant="h5" fontWeight="700" color="#334155">
                  {keyword.keyword_name}
                </Typography>
              </Box>
              <Box display="flex" gap={1}>
                {isEditing ? (
                  <>
                    <IconButton
                      size="small"
                      onClick={() => onSave(keyword.keyword_id)}
                      sx={{
                        bgcolor: '#10b981',
                        color: 'white',
                        '&:hover': { bgcolor: '#059669' }
                      }}
                    >
                      <SaveIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => onCancel(keyword.keyword_id)}
                      sx={{
                        bgcolor: '#6b7280',
                        color: 'white',
                        '&:hover': { bgcolor: '#4b5563' }
                      }}
                    >
                      <CancelIcon fontSize="small" />
                    </IconButton>
                  </>
                ) : (
                  <>
                    <IconButton
                      size="small"
                      onClick={() => onEdit(keyword.keyword_id)}
                      sx={{
                        bgcolor: '#f1f5f9',
                        '&:hover': { bgcolor: '#e2e8f0' }
                      }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => onDelete(keyword.keyword_id)}
                      sx={{
                        bgcolor: '#fef2f2',
                        color: '#dc2626',
                        '&:hover': { bgcolor: '#fee2e2' }
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </>
                )}
              </Box>
            </Box>

            {/* 구분선 */}
            <Box sx={{ height: 1, bgcolor: '#e2e8f0', mb: 3 }} />

            {/* 상세 설명 */}
            <Box mb={4}>
              <Typography 
                variant="h6" 
                fontWeight="700" 
                color="#334155" 
                mb={2}
              >
                상세 설명
              </Typography>
              {isEditing ? (
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  variant="outlined"
                  value={currentKeyword.keyword_detail}
                  onChange={(e) => onDetailChange(keyword.keyword_id, e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 3,
                      bgcolor: 'white',
                      '&:hover': {
                        bgcolor: '#f8fafc'
                      }
                    }
                  }}
                />
              ) : (
                <Box 
                  sx={{ 
                    bgcolor: '#f8fafc',
                    p: 3,
                    borderRadius: 3,
                    border: '1px solid #e2e8f0'
                  }}
                >
                  <Typography 
                    variant="body1" 
                    color="#475569"
                    lineHeight={1.6}
                  >
                    {currentKeyword.keyword_detail}
                  </Typography>
                </Box>
              )}
            </Box>

            {/* 평가 기준 */}
            <Box>
              <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
                <Typography 
                  variant="h6" 
                  fontWeight="700" 
                  color="#334155"
                >
                  평가 기준
                </Typography>
                {isEditing && (
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<SmartToyIcon />}
                    sx={{
                      bgcolor: '#3b82f6',
                      borderRadius: 2,
                      textTransform: 'none',
                      '&:hover': { bgcolor: '#2563eb' }
                    }}
                  >
                    AI 생성
                  </Button>
                )}
              </Box>
              
              <Box display="flex" flexDirection="column" gap={2}>
                {currentKeyword.keyword_criteria.map((criterion, criterionIndex) => (
                  <Box 
                    key={criterion.keyword_score}
                    display="flex" 
                    gap={2}
                    sx={{
                      p: 3,
                      bgcolor: 'white',
                      borderRadius: 3,
                      border: '1px solid #e2e8f0',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        borderColor: '#3b82f6',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                      }
                    }}
                  >
                    <Box sx={{ minWidth: 80 }}>
                      <Chip
                        label={`${criterion.keyword_score}점`}
                        sx={{
                          bgcolor: criterion.keyword_score >= 4 ? '#10b981' : 
                                   criterion.keyword_score >= 3 ? '#f59e0b' : '#ef4444',
                          color: 'white',
                          fontWeight: 700,
                          fontSize: '0.875rem'
                        }}
                      />
                    </Box>
                    {isEditing ? (
                      <TextField
                        fullWidth
                        variant="outlined"
                        value={criterion.keyword_guideline}
                        onChange={(e) => onCriterionChange(keyword.keyword_id, criterionIndex, e.target.value)}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            bgcolor: '#f8fafc',
                            '&:hover': {
                              bgcolor: 'white'
                            },
                            '&.Mui-focused': {
                              borderColor: '#3b82f6',
                              borderBottomWidth: '3px'
                            }
                          }
                        }}
                      />
                    ) : (
                      <Typography 
                        variant="body1" 
                        color="#475569"
                        lineHeight={1.5}
                        flex={1}
                      >
                        {criterion.keyword_guideline}
                      </Typography>
                    )}
                  </Box>
                ))}
              </Box>
            </Box>
          </CardContent>
        </Card>
      </div>
    </Grow>
  );
});

KeywordDetailCard.displayName = 'KeywordDetailCard';

export default KeywordDetailCard