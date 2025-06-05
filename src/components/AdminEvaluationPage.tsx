import { Box, Typography, Paper, Button, TextField, IconButton, CircularProgress, Chip, Card, CardContent, Fade, Grow } from "@mui/material"
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TopNavBar from "./TopNavBar"
import SideKeywordList from "./SideKeywordList"
import KeywordDetailCard from "./KeywordDetailCard"
import { useState, useRef, useEffect } from 'react';

const dummyKeywords = [
  {
    "keyword_id": 1,
    "keyword_name": "자발적",
    "keyword_detail": "올바른 방향을 스스로 판단하고 주도적으로 실행하는 태도",
    "keyword_criteria": [
      {
        "keyword_score": 5,
        "keyword_guideline": "복잡한 프로젝트 상황에서 스스로 문제를 정의하고 해결책을 제안하여 팀의 방향성을 크게 개선했다."
      },
      {
        "keyword_score": 4,
        "keyword_guideline": "일상적인 업무에서 자발적으로 개선점을 찾아내고 이를 실행하여 업무 효율을 높였다."
      },
      {
        "keyword_score": 3,
        "keyword_guideline": "주어진 업무를 스스로 관리하고 마감 기한을 준수하여 완료했다."
      },
      {
        "keyword_score": 2,
        "keyword_guideline": "지시된 업무를 수행하였으나 추가적인 개선이나 주도적인 행동은 보이지 않았다."
      },
      {
        "keyword_score": 1,
        "keyword_guideline": "지시된 업무를 수행하는 데에도 지속적인 관리와 지도가 필요했다."
      }
    ]
  },
  {
    "keyword_id": 2,
    "keyword_name": "의욕적",
    "keyword_detail": "행복을 추구하며 일에 몰입하는 내적 에너지 발현",
    "keyword_criteria": [
      {
        "keyword_score": 5,
        "keyword_guideline": "어려운 상황에서도 긍정적인 태도로 팀의 사기를 높이고, 높은 성과를 이끌어냈다."
      },
      {
        "keyword_score": 4,
        "keyword_guideline": "업무에 대한 열정을 보여주며, 팀원들에게 긍정적인 영향을 미쳤다."
      },
      {
        "keyword_score": 3,
        "keyword_guideline": "일상적인 업무에 몰입하여 꾸준히 성과를 유지했다."
      },
      {
        "keyword_score": 2,
        "keyword_guideline": "업무에 대한 열정이 부족하여, 성과가 일정하지 않았다."
      },
      {
        "keyword_score": 1,
        "keyword_guideline": "업무에 대한 의욕이 부족하여, 팀의 사기에 부정적인 영향을 미쳤다."
      }
    ]
  },
  {
    "keyword_id": 3,
    "keyword_name": "높은 목표 추구",
    "keyword_detail": "기존 틀을 깨고 더 나은 성과를 위해 과감히 도전함",
    "keyword_criteria": [
      {
        "keyword_score": 5,
        "keyword_guideline": "기존의 한계를 뛰어넘는 목표를 설정하고 이를 달성하여 조직의 성과를 크게 향상시켰다."
      },
      {
        "keyword_score": 4,
        "keyword_guideline": "높은 목표를 설정하고 이를 달성하기 위해 지속적으로 노력하여 성과를 개선했다."
      },
      {
        "keyword_score": 3,
        "keyword_guideline": "높은 목표를 설정하고 이를 달성하기 위해 지속적으로 노력하여 성과를 개선했다."
      },
      {
        "keyword_score": 2,
        "keyword_guideline": "기본적인 목표를 달성하였으나, 추가적인 도전은 부족했다."
      },
      {
        "keyword_score": 1,
        "keyword_guideline": "목표 달성에 대한 의지가 부족하여, 성과가 미흡했다."
      }
    ]
  }
]

// 새 키워드 초기 데이터 정의
const initialNewKeywordData = {
  keyword_name: "",
  keyword_detail: "",
  keyword_criteria: [
    { keyword_score: 5, keyword_guideline: "" },
    { keyword_score: 4, keyword_guideline: "" },
    { keyword_score: 3, keyword_guideline: "" },
    { keyword_score: 2, keyword_guideline: "" },
    { keyword_score: 1, keyword_guideline: "" }
  ]
};

const AdminEvaluationPage = () => {
  const [isAddingKeyword, setIsAddingKeyword] = useState(false);
  const [newKeywordData, setNewKeywordData] = useState(initialNewKeywordData);
  const [isGeneratingDetail, setIsGeneratingDetail] = useState(false);

  // 스크롤을 위한 ref들
  const keywordRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const newKeywordFormRef = useRef<HTMLDivElement>(null);

  // 키워드 카드로 스크롤하는 함수
  const scrollToKeyword = (keywordId: number) => {
    const element = keywordRefs.current[keywordId];
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start',
        inline: 'nearest' 
      });
    }
  };

  // 새 키워드 폼으로 스크롤하는 함수
  const scrollToNewKeywordForm = () => {
    if (newKeywordFormRef.current) {
      newKeywordFormRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start',
        inline: 'nearest' 
      });
    }
  };

  // AI 상세설명 생성 함수
  const generateDetailWithAI = async () => {
    if (!newKeywordData.keyword_name.trim()) {
      alert('키워드명을 먼저 입력해주세요.');
      return;
    }

    setIsGeneratingDetail(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const generatedDetail = `${newKeywordData.keyword_name}은(는) 업무 수행 시 중요한 역량 중 하나로, 개인의 성장과 조직의 발전에 핵심적인 요소입니다. 이는 지속적인 학습과 개선을 통해 발전시킬 수 있는 능력입니다.`;
      
      setNewKeywordData(prevData => ({
        ...prevData,
        keyword_detail: generatedDetail
      }));
    } catch (error) {
      console.error('AI 생성 중 오류:', error);
      alert('AI 생성 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsGeneratingDetail(false);
    }
  };

  const handleAddKeywordClick = () => {
    setIsAddingKeyword(true);
    setNewKeywordData(initialNewKeywordData);
    
    setTimeout(() => {
      scrollToNewKeywordForm();
    }, 100);
  };

  const handleNewInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewKeywordData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNewCriterionChange = (index: number, value: string) => {
    setNewKeywordData(prevData => {
      const newCriteria = [...prevData.keyword_criteria];
      newCriteria[index].keyword_guideline = value;
      return {
        ...prevData,
        keyword_criteria: newCriteria,
      };
    });
  };

  const handleSaveNewKeyword = () => {
    console.log("새 키워드 저장: ", newKeywordData);
    setIsAddingKeyword(false);
    setNewKeywordData(initialNewKeywordData);
  };

  const handleCancelNewKeyword = () => {
    setIsAddingKeyword(false);
    setNewKeywordData(initialNewKeywordData);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc' }}>
      <TopNavBar />
      
      <Box display="flex" height="calc(100vh - 64px)">
        {/* 개선된 사이드바 */}
        <Box
          sx={{
            width: 280,
            bgcolor: 'white',
            borderRight: '1px solid #e2e8f0',
            boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
          }}
        >
          <SideKeywordList 
            keywords={dummyKeywords} 
            onAddKeywordClick={handleAddKeywordClick}
            onKeywordClick={scrollToKeyword}
          />
        </Box>

        {/* 메인 컨텐츠 영역 */}
        <Box 
          flex={1} 
          sx={{ 
            overflowY: "auto",
            bgcolor: '#f8fafc',
            p: 4
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
              키워드 관리
            </Typography>
            <Typography 
              variant="body1" 
              color="#64748b"
            >
              평가 키워드를 생성하고 관리할 수 있습니다.
            </Typography>
          </Box>

          {/* 키워드 카드들 */}
          <Box sx={{ maxWidth: 1000 }}>
            {dummyKeywords.map((keyword, index) => (
              <Grow
                key={keyword.keyword_id}
                in={true}
                timeout={300 + index * 100}
              >
                <div
                  ref={(el) => {
                    keywordRefs.current[keyword.keyword_id] = el;
                  }}
                >
                  <Card
                    elevation={0}
                    sx={{
                      mb: 3,
                      border: '1px solid #e2e8f0',
                      borderRadius: 3,
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
                          <Chip
                            label={keyword.keyword_name}
                            sx={{
                              bgcolor: '#3b82f6',
                              color: 'white',
                              fontWeight: 600,
                              fontSize: '0.875rem',
                              px: 2,
                              py: 1,
                              height: 'auto'
                            }}
                          />
                          <Typography variant="h6" fontWeight="600" color="#334155">
                            {keyword.keyword_name}
                          </Typography>
                        </Box>
                        <Box display="flex" gap={1}>
                          <IconButton
                            size="small"
                            sx={{
                              bgcolor: '#f1f5f9',
                              '&:hover': { bgcolor: '#e2e8f0' }
                            }}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            sx={{
                              bgcolor: '#fef2f2',
                              color: '#dc2626',
                              '&:hover': { bgcolor: '#fee2e2' }
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </Box>

                      {/* 상세 설명 */}
                      <Box mb={4}>
                        <Typography 
                          variant="body2" 
                          fontWeight="600" 
                          color="#64748b" 
                          mb={1}
                          textTransform="uppercase"
                          letterSpacing={0.5}
                        >
                          상세 설명
                        </Typography>
                        <Typography 
                          variant="body1" 
                          color="#475569"
                          lineHeight={1.6}
                          sx={{ 
                            bgcolor: '#f8fafc',
                            p: 2,
                            borderRadius: 2,
                            border: '1px solid #e2e8f0'
                          }}
                        >
                          {keyword.keyword_detail}
                        </Typography>
                      </Box>

                      {/* 평가 기준 */}
                      <Box>
                        <Typography 
                          variant="body2" 
                          fontWeight="600" 
                          color="#64748b" 
                          mb={2}
                          textTransform="uppercase"
                          letterSpacing={0.5}
                        >
                          평가 기준
                        </Typography>
                        <Box display="flex" flexDirection="column" gap={2}>
                          {keyword.keyword_criteria.map((criterion) => (
                            <Box 
                              key={criterion.keyword_score}
                              display="flex" 
                              gap={3}
                              sx={{
                                p: 3,
                                bgcolor: 'white',
                                borderRadius: 2,
                                border: '1px solid #e2e8f0',
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                  borderColor: '#3b82f6',
                                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                                }
                              }}
                            >
                              <Chip
                                label={`${criterion.keyword_score}점`}
                                size="small"
                                sx={{
                                  bgcolor: criterion.keyword_score >= 4 ? '#10b981' : 
                                           criterion.keyword_score >= 3 ? '#f59e0b' : '#ef4444',
                                  color: 'white',
                                  fontWeight: 600,
                                  minWidth: 50
                                }}
                              />
                              <Typography 
                                variant="body2" 
                                color="#475569"
                                lineHeight={1.5}
                                flex={1}
                              >
                                {criterion.keyword_guideline}
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </div>
              </Grow>
            ))}

            {/* 새 키워드 추가 폼 */}
            {isAddingKeyword && (
              <Fade in={isAddingKeyword} timeout={300}>
                <Card
                  ref={newKeywordFormRef}
                  elevation={0}
                  sx={{
                    mb: 3,
                    border: '2px solid #3b82f6',
                    borderRadius: 3,
                    boxShadow: '0 10px 25px -5px rgb(59 130 246 / 0.25)'
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Box display="flex" alignItems="center" gap={2} mb={4}>
                      <AddIcon sx={{ color: '#3b82f6' }} />
                      <Typography variant="h6" fontWeight="700" color="#1e293b">
                        새 키워드 추가
                      </Typography>
                    </Box>

                    {/* 키워드명 입력 */}
                    <Box mb={3}>
                      <Typography 
                        variant="body2" 
                        fontWeight="600" 
                        color="#374151" 
                        mb={1}
                      >
                        키워드명
                      </Typography>
                      <TextField
                        fullWidth
                        variant="outlined"
                        name="keyword_name"
                        value={newKeywordData.keyword_name}
                        onChange={handleNewInputChange}
                        placeholder="예: 창의적, 협력적, 리더십 등"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            bgcolor: '#f8fafc',
                            '&:hover': {
                              bgcolor: 'white'
                            }
                          }
                        }}
                      />
                    </Box>

                    {/* 상세 설명 입력 */}
                    <Box mb={3}>
                      <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                        <Typography 
                          variant="body2" 
                          fontWeight="600" 
                          color="#374151"
                        >
                          상세 설명
                        </Typography>
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={isGeneratingDetail ? <CircularProgress size={16} /> : <SmartToyIcon />}
                          onClick={generateDetailWithAI}
                          disabled={isGeneratingDetail || !newKeywordData.keyword_name.trim()}
                          sx={{ 
                            borderRadius: 2,
                            borderColor: '#3b82f6',
                            color: '#3b82f6',
                            '&:hover': {
                              bgcolor: '#eff6ff',
                              borderColor: '#2563eb'
                            }
                          }}
                        >
                          {isGeneratingDetail ? 'AI 생성중...' : 'AI 생성'}
                        </Button>
                      </Box>
                      <TextField
                        fullWidth
                        multiline
                        rows={3}
                        variant="outlined"
                        name="keyword_detail"
                        value={newKeywordData.keyword_detail}
                        onChange={handleNewInputChange}
                        disabled={isGeneratingDetail}
                        placeholder="키워드의 상세한 설명을 입력하거나 AI 생성 버튼을 클릭하세요"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            bgcolor: '#f8fafc',
                            '&:hover': {
                              bgcolor: 'white'
                            }
                          }
                        }}
                      />
                    </Box>

                    {/* 평가 기준 입력 */}
                    <Box mb={4}>
                      <Typography 
                        variant="body2" 
                        fontWeight="600" 
                        color="#374151" 
                        mb={2}
                      >
                        평가 기준
                      </Typography>
                      {newKeywordData.keyword_criteria.map((criterion, index) => (
                        <Box key={criterion.keyword_score} display="flex" alignItems="center" gap={2} mb={2}>
                          <Chip
                            label={`${criterion.keyword_score}점`}
                            size="small"
                            sx={{
                              bgcolor: criterion.keyword_score >= 4 ? '#10b981' : 
                                       criterion.keyword_score >= 3 ? '#f59e0b' : '#ef4444',
                              color: 'white',
                              fontWeight: 600,
                              minWidth: 50
                            }}
                          />
                          <TextField
                            fullWidth
                            variant="outlined"
                            value={criterion.keyword_guideline}
                            onChange={(e) => handleNewCriterionChange(index, e.target.value)}
                            placeholder={`${criterion.keyword_score}점에 해당하는 평가 기준을 입력하세요`}
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                                bgcolor: '#f8fafc',
                                '&:hover': {
                                  bgcolor: 'white'
                                }
                              }
                            }}
                          />
                        </Box>
                      ))}
                    </Box>

                    {/* 액션 버튼들 */}
                    <Box display="flex" justifyContent="flex-end" gap={2}>
                      <Button 
                        variant="outlined" 
                        onClick={handleCancelNewKeyword}
                        sx={{
                          borderRadius: 2,
                          px: 3,
                          borderColor: '#d1d5db',
                          color: '#6b7280',
                          '&:hover': {
                            borderColor: '#9ca3af',
                            bgcolor: '#f9fafb'
                          }
                        }}
                      >
                        취소
                      </Button>
                      <Button 
                        variant="contained" 
                        onClick={handleSaveNewKeyword}
                        sx={{
                          borderRadius: 2,
                          px: 3,
                          bgcolor: '#3b82f6',
                          '&:hover': {
                            bgcolor: '#2563eb'
                          }
                        }}
                      >
                        저장
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Fade>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default AdminEvaluationPage