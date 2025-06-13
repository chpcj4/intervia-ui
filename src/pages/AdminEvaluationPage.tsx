import { Box, Typography, Button, TextField, CircularProgress, Chip, Card, CardContent, Fade } from "@mui/material"
import SmartToyIcon from '@mui/icons-material/SmartToy';
import AddIcon from '@mui/icons-material/Add';
import TopNavBar from "../components/TopNavBarAdmin"
import SideKeywordList from "../components/SideKeywordList"
import KeywordDetailCard from "../components/KeywordDetailCard"
import { useState, useRef, useEffect } from 'react';

const dummyKeywords = [
  {
    "keyword_id": 1,
    "keyword_name": "자발적",
    "keyword_detail": "올바른 방향을 스스로 판단하고 주도적으로 실행하는 태도",
    "keyword_criteria": [
      {
        "keyword_score": 5,
        "keyword_guideline": "조직/팀의 방향성과 부합하는 행동을 스스로 판단하고 실행한 구체 사례가 있으며, 결과적으로 긍정적 영향이 확인됨"
      },
      {
        "keyword_score": 4,
        "keyword_guideline": "주도적으로 업무를 이끌고 개선한 사례가 있으며, 방향성은 대체로 타당했음"
      },
      {
        "keyword_score": 3,
        "keyword_guideline": "주어진 업무 내에서 부분적으로 능동적인 태도를 보였으나, 방향성에 대한 고민은 제한적임"
      },
      {
        "keyword_score": 2,
        "keyword_guideline": "기본적으로 지시를 따라 행동하며, 능동적으로 상황을 바꾸려는 시도는 드묾"
      },
      {
        "keyword_score": 1,
        "keyword_guideline": "수동적인 태도가 지속되며, 자율적 판단이나 실행 경험이 없음"
      }
    ]
  },
  {
    "keyword_id": 2,
    "keyword_name": "의욕적",
    "keyword_detail": "일에 몰입하고 어려움 속에서도 지속적으로 에너지를 유지함",
    "keyword_criteria": [
      {
        "keyword_score": 5,
        "keyword_guideline": "복합적인 문제 상황에서도 업무에 강한 열정을 유지하며, 주변에 긍정적인 영향력을 발휘함"
      },
      {
        "keyword_score": 4,
        "keyword_guideline": "맡은 일에 몰입하고, 성과에 대해 강한 동기와 책임감을 보임"
      },
      {
        "keyword_score": 3,
        "keyword_guideline": "업무에 대한 흥미와 열정을 보이긴 하나, 상황에 따라 동기 수준이 변화함"
      },
      {
        "keyword_score": 2,
        "keyword_guideline": "기본적인 성실성은 있으나, 몰입도나 지속적 의욕은 부족함"
      },
      {
        "keyword_score": 1,
        "keyword_guideline": "수동적인 태도가 지속되며, 자율적 판단이나 실행 경험이 없음"
      }
    ]
  },
  {
    "keyword_id": 3,
    "keyword_name": "Proactive",
    "keyword_detail": "선제적 실행력",
    "keyword_criteria": [
      {
        "keyword_score": 5,
        "keyword_guideline": "지시 없이 문제를 인식하고 해결까지 이끈 경험을 설명"
      },
      {
        "keyword_score": 4,
        "keyword_guideline": "자율적으로 업무를 개선하거나 아이디어를 제시한 경험"
      },
      {
        "keyword_score": 3,
        "keyword_guideline": "주어진 업무 내에서 수동적이지는 않으나 개선 노력은 미약"
      },
      {
        "keyword_score": 2,
        "keyword_guideline": "지시받은 일만 수행, 주도성 결여"
      },
      {
        "keyword_score": 1,
        "keyword_guideline": "문제 해결 시도 없음, 태도 수동적"
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
  const [editingKeywordId, setEditingKeywordId] = useState<number | null>(null);
  const [editedKeywords, setEditedKeywords] = useState<{[key: number]: typeof dummyKeywords[0]}>({});
  const [selectedKeywordId, setSelectedKeywordId] = useState<number>(1); // 첫 번째 키워드 선택

  // 스크롤을 위한 ref들
  const keywordRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const newKeywordFormRef = useRef<HTMLDivElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);

  // 스크롤 시 현재 보이는 키워드 감지
  useEffect(() => {
    const handleScroll = () => {
      if (!mainContentRef.current) return;

      const scrollTop = mainContentRef.current.scrollTop;
      const containerHeight = mainContentRef.current.clientHeight;
      const containerRect = mainContentRef.current.getBoundingClientRect();
      
      // 현재 화면 중앙에 가장 가까운 키워드 찾기
      let closestKeywordId = selectedKeywordId;
      let minDistance = Infinity;

      dummyKeywords.forEach((keyword) => {
        const element = keywordRefs.current[keyword.keyword_id];
        if (element) {
          const rect = element.getBoundingClientRect();
          
          // 요소가 화면에 보이는지 확인
          const isVisible = rect.top < containerRect.bottom && rect.bottom > containerRect.top;
          
          if (isVisible) {
            // 요소의 중심점과 화면 중심점 사이의 거리 계산
            const elementCenter = rect.top + rect.height / 2;
            const viewportCenter = containerRect.top + containerHeight / 2;
            const distance = Math.abs(elementCenter - viewportCenter);
            
            if (distance < minDistance) {
              minDistance = distance;
              closestKeywordId = keyword.keyword_id;
            }
          }
        }
      });

      // 현재 선택된 키워드와 다르면 업데이트
      if (closestKeywordId !== selectedKeywordId) {
        setSelectedKeywordId(closestKeywordId);
      }
    };

    const mainContent = mainContentRef.current;
    if (mainContent) {
      mainContent.addEventListener('scroll', handleScroll);
      // 초기 로드 시에도 한 번 실행
      handleScroll();
      
      return () => {
        if (mainContent) {
          mainContent.removeEventListener('scroll', handleScroll);
        }
      };
    }
  }, [selectedKeywordId]);

  // 키워드 카드로 스크롤하는 함수
  const scrollToKeyword = (keywordId: number) => {
    setSelectedKeywordId(keywordId);
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

  // 키워드 수정 관련 함수들
  const handleEditKeyword = (keywordId: number) => {
    const keyword = dummyKeywords.find(k => k.keyword_id === keywordId);
    if (keyword) {
      setEditedKeywords(prev => ({
        ...prev,
        [keywordId]: { ...keyword }
      }));
      setEditingKeywordId(keywordId);
    }
  };

  const handleSaveKeyword = (keywordId: number) => {
    console.log("키워드 저장:", editedKeywords[keywordId]);
    // TODO: API 호출로 실제 저장
    setEditingKeywordId(null);
  };

  const handleCancelEdit = (keywordId: number) => {
    setEditedKeywords(prev => {
      const newState = { ...prev };
      delete newState[keywordId];
      return newState;
    });
    setEditingKeywordId(null);
  };

  const handleEditedDetailChange = (keywordId: number, value: string) => {
    setEditedKeywords(prev => ({
      ...prev,
      [keywordId]: {
        ...prev[keywordId],
        keyword_detail: value
      }
    }));
  };

  const handleEditedCriterionChange = (keywordId: number, index: number, value: string) => {
    setEditedKeywords(prev => {
      const keyword = prev[keywordId];
      const newCriteria = [...keyword.keyword_criteria];
      newCriteria[index].keyword_guideline = value;
      return {
        ...prev,
        [keywordId]: {
          ...keyword,
          keyword_criteria: newCriteria
        }
      };
    });
  };

  const handleDeleteKeyword = (keywordId: number) => {
    if (confirm('정말로 이 키워드를 삭제하시겠습니까?')) {
      console.log("키워드 삭제:", keywordId);
      // TODO: API 호출로 실제 삭제
    }
  };

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
        {/* 사이드바 */}
        <Box
          sx={{
            width: 280,
            bgcolor: 'white',
            borderRight: '1px solid #e2e8f0',
            boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
            flexShrink: 0
          }}
        >
          <SideKeywordList 
            keywords={dummyKeywords} 
            onAddKeywordClick={handleAddKeywordClick}
            onKeywordClick={scrollToKeyword}
            selectedKeywordId={selectedKeywordId}
          />
        </Box>

        {/* 메인 컨텐츠 영역 */}
        <Box 
          ref={mainContentRef}
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
              평가 기준 관리
            </Typography>
            <Typography 
              variant="body1" 
              color="#64748b"
            >
              평가 키워드의 상세 설명과 채점 기준을 설정할 수 있습니다.
            </Typography>
          </Box>

          {/* 키워드 카드들 */}
          <Box sx={{ width: '100%' }}>
            {dummyKeywords.map((keyword, index) => {
              const isEditing = editingKeywordId === keyword.keyword_id;
              const currentKeyword = isEditing ? editedKeywords[keyword.keyword_id] : keyword;
              
              return (
                <KeywordDetailCard
                  key={keyword.keyword_id}
                  keyword={keyword}
                  index={index}
                  ref={(el) => {
                    keywordRefs.current[keyword.keyword_id] = el;
                  }}
                  isEditing={isEditing}
                  editedKeyword={currentKeyword}
                  onEdit={handleEditKeyword}
                  onSave={handleSaveKeyword}
                  onCancel={handleCancelEdit}
                  onDelete={handleDeleteKeyword}
                  onDetailChange={handleEditedDetailChange}
                  onCriterionChange={handleEditedCriterionChange}
                />
              );
            })}

            {/* 새 키워드 추가 폼 */}
            {isAddingKeyword && (
              <Fade in={isAddingKeyword} timeout={300}>
                <Card
                  ref={newKeywordFormRef}
                  elevation={0}
                  sx={{
                    mb: 3,
                    border: '1px solid #3b82f6',
                    borderRadius: 3,
                    bgcolor: '#f2f6fc',
                    boxShadow: '0 10px 25px -5px rgb(59 130 246 / 0.25)'
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Box display="flex" alignItems="center" gap={2} mb={4}>
                      <AddIcon sx={{ color: '#3b82f6' }} />
                      <Typography variant="h5" fontWeight="700" color="#1e293b">
                        새 키워드 추가
                      </Typography>
                    </Box>

                    {/* 구분선 */}
                    <Box sx={{ height: 1, bgcolor: '#e2e8f0', mb: 4 }} />

                    {/* 키워드명 입력 */}
                    <Box mb={4}>
                      <Typography 
                        variant="h6" 
                        fontWeight="700" 
                        color="#374151" 
                        mb={2}
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
                            borderRadius: 3,
                            bgcolor: 'white',
                            '&:hover': {
                              bgcolor: '#f8fafc'
                            }
                          }
                        }}
                      />
                    </Box>

                    {/* 상세 설명 입력 */}
                    <Box mb={4}>
                      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                        <Typography 
                          variant="h6" 
                          fontWeight="700" 
                          color="#374151"
                        >
                          상세 설명
                        </Typography>
                        <Button
                          variant="contained"
                          size="small"
                          startIcon={isGeneratingDetail ? <CircularProgress size={16} color="inherit" /> : <SmartToyIcon />}
                          onClick={generateDetailWithAI}
                          disabled={isGeneratingDetail || !newKeywordData.keyword_name.trim()}
                          sx={{ 
                            borderRadius: 2,
                            bgcolor: '#3b82f6',
                            textTransform: 'none',
                            '&:hover': {
                              bgcolor: '#2563eb'
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
                            borderRadius: 3,
                            bgcolor: 'white',
                            '&:hover': {
                              bgcolor: '#f8fafc'
                            }
                          }
                        }}
                      />
                    </Box>

                    {/* 평가 기준 입력 */}
                    <Box mb={4}>
                      <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
                        <Typography 
                          variant="h6" 
                          fontWeight="700" 
                          color="#374151"
                        >
                          평가 기준
                        </Typography>
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
                      </Box>
                      <Typography 
                        variant="body2" 
                        color="#6b7280" 
                        mb={2}
                        sx={{ fontStyle: 'italic' }}
                      >
                        키워드와 상세 설명을 입력 후, AI 생성을 통해 평가 기준을 자동으로 생성하실 수 있습니다.
                      </Typography>
                      
                      {newKeywordData.keyword_criteria.map((criterion, index) => (
                        <Box key={criterion.keyword_score} display="flex" alignItems="center" gap={2} mb={2}>
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
                          <TextField
                            fullWidth
                            variant="outlined"
                            value={criterion.keyword_guideline}
                            onChange={(e) => handleNewCriterionChange(index, e.target.value)}
                            placeholder={criterion.keyword_guideline || "텍스트를 입력하세요."}
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                borderRadius: 3,
                                bgcolor: 'white',
                                '&:hover': {
                                  bgcolor: '#f8fafc'
                                },
                                '&.Mui-focused': {
                                  borderColor: '#3b82f6',
                                  borderBottomWidth: index === 0 ? '3px' : '1px'
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
                          textTransform: 'none',
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
                          textTransform: 'none',
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