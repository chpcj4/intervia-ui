import { Box, List, ListItemButton, Typography, Button, Chip, Avatar } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import TagIcon from '@mui/icons-material/Tag';

// 부모 컴포넌트로부터 받을 키워드 데이터의 타입을 정의합니다.
interface SideKeyword {
  keyword_id: number;
  keyword_name: string;
}

interface SideKeywordListProps {
  keywords: SideKeyword[];
  onAddKeywordClick: () => void;
  onKeywordClick: (keywordId: number) => void;
  selectedKeywordId?: number; // 선택된 키워드 ID 추가
}

const SideKeywordList = ({ keywords, onAddKeywordClick, onKeywordClick, selectedKeywordId }: SideKeywordListProps) => {
  
  // 키워드 클릭 핸들러
  const handleKeywordClick = (keywordId: number) => {
    onKeywordClick(keywordId);
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* 헤더 */}
      <Box sx={{ p: 3, borderBottom: '1px solid #e2e8f0' }}>
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <Avatar sx={{ bgcolor: '#3b82f6', width: 32, height: 32 }}>
            <TagIcon fontSize="small" />
          </Avatar>
          <Box>
            <Typography variant="h6" fontWeight="700" color="#1e293b">
              키워드 목록
            </Typography>
            <Typography variant="caption" color="#64748b">
              총 {keywords.length}개
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* 키워드 리스트 */}
      <Box sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
        <List sx={{ p: 0 }}>
          {keywords.map((keyword, index) => {
            const isSelected = selectedKeywordId === keyword.keyword_id;
            
            return (
              <ListItemButton 
                key={keyword.keyword_id}
                onClick={() => handleKeywordClick(keyword.keyword_id)}
                sx={{
                  borderRadius: 2,
                  mb: 1,
                  p: 2,
                  transition: 'all 0.2s ease-in-out',
                  border: isSelected ? '1px solid #3b82f6' : '1px solid transparent',
                  borderLeft: isSelected ? '3px solid #3b82f6' : '3px solid transparent',
                  bgcolor: isSelected ? '#eff6ff' : 'transparent',
                  '&:hover': {
                    bgcolor: isSelected ? '#dbeafe' : '#f1f5f9',
                    borderColor: '#3b82f6',
                    transform: 'translateX(4px)',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  },
                  '&:active': {
                    transform: 'translateX(2px)'
                  }
                }}
              >
                <Box display="flex" alignItems="center" gap={2} width="100%">
                  <Chip
                    label={index + 1}
                    size="small"
                    sx={{
                      bgcolor: isSelected ? '#3b82f6' : '#f1f5f9',
                      color: isSelected ? 'white' : '#64748b',
                      fontWeight: 600,
                      width: 24,
                      height: 24,
                      fontSize: '0.75rem'
                    }}
                  />
                  <Box flex={1}>
                    <Typography 
                      variant="body2" 
                      fontWeight={isSelected ? "700" : "600"}
                      color={isSelected ? "#3b82f6" : "#334155"}
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {keyword.keyword_name}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      color={isSelected ? "#3b82f6" : "#94a3b8"}
                      fontWeight={isSelected ? "600" : "400"}
                    >
                      평가 키워드
                    </Typography>
                  </Box>
                </Box>
              </ListItemButton>
            );
          })}
        </List>
      </Box>

      {/* 추가 버튼 */}
      <Box sx={{ p: 3, borderTop: '1px solid #e2e8f0' }}>
        <Button 
          variant="contained" 
          fullWidth 
          onClick={onAddKeywordClick}
          startIcon={<AddIcon />}
          sx={{
            bgcolor: '#3b82f6',
            borderRadius: 2,
            py: 1.5,
            fontWeight: 600,
            textTransform: 'none',
            boxShadow: '0 4px 6px -1px rgb(59 130 246 / 0.25)',
            '&:hover': {
              bgcolor: '#2563eb',
              transform: 'translateY(-1px)',
              boxShadow: '0 8px 15px -3px rgb(59 130 246 / 0.3)'
            },
            '&:active': {
              transform: 'translateY(0px)'
            }
          }}
        >
          키워드 추가
        </Button>
      </Box>
    </Box>
  )
}

export default SideKeywordList