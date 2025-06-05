import { Box, Typography, Button, Chip, Card, CardContent, IconButton } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import TopNavBar from "./TopNavBar"
import KeywordDetailCard from "./KeywordDetailCard"
import { useState, useRef, useEffect } from 'react';

// 직군 데이터 타입 정의
interface JobCategory {
  id: number;
  name: string;
}

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

// 더미 직군 데이터
const dummyJobCategories: JobCategory[] = [
  { id: 1, name: "개발" },
  { id: 2, name: "디자인" },
  { id: 3, name: "기획" },
  { id: 4, name: "영업" }
];

// 더미 키워드 데이터
const dummyKeywords: KeywordData[] = [
  {
    keyword_id: 1,
    keyword_name: "자발적",
    keyword_detail: "올바른 방향을 스스로 판단하고 주도적으로 실행하는 태도",
    keyword_criteria: [
      {
        keyword_score: 5,
        keyword_guideline: "조직/팀의 방향성과 부합하는 행동을 스스로 판단하고 실행한 구체 사례가 있으며, 결과적으로 긍정적 영향이 확인됨"
      },
      {
        keyword_score: 4,
        keyword_guideline: "주도적으로 업무를 이끌고 개선한 사례가 있으며, 방향성은 대체로 타당했음"
      },
      {
        keyword_score: 3,
        keyword_guideline: "주어진 업무 내에서 부분적으로 능동적인 태도를 보였으나, 방향성에 대한 고민은 제한적임"
      },
      {
        keyword_score: 2,
        keyword_guideline: "기본적으로 지시를 따라 행동하며, 능동적으로 상황을 바꾸려는 시도는 드묾"
      },
      {
        keyword_score: 1,
        keyword_guideline: "수동적인 태도가 지속되며, 자율적 판단이나 실행 경험이 없음"
      }
    ]
  },
  {
    keyword_id: 2,
    keyword_name: "의욕적",
    keyword_detail: "일에 몰입하고 어려움 속에서도 지속적으로 에너지를 유지함",
    keyword_criteria: [
      {
        keyword_score: 5,
        keyword_guideline: "복합적인 문제 상황에서도 업무에 강한 열정을 유지하며, 주변에 긍정적인 영향력을 발휘함"
      },
      {
        keyword_score: 4,
        keyword_guideline: "맡은 일에 몰입하고, 성과에 대해 강한 동기와 책임감을 보임"
      },
      {
        keyword_score: 3,
        keyword_guideline: "업무에 대한 흥미와 열정을 보이긴 하나, 상황에 따라 동기 수준이 변화함"
      },
      {
        keyword_score: 2,
        keyword_guideline: "기본적인 성실성은 있으나, 몰입도나 지속적 의욕은 부족함"
      },
      {
        keyword_score: 1,
        keyword_guideline: "수동적인 태도가 지속되며, 자율적 판단이나 실행 경험이 없음"
      }
    ]
  },
  {
    keyword_id: 3,
    keyword_name: "높은 목표 추구",
    keyword_detail: "현상에 안주하지 않고 더 높은 목표를 설정하고 달성하려는 의지",
    keyword_criteria: [
      {
        keyword_score: 5,
        keyword_guideline: "도전적인 목표를 설정하고 달성한 구체적인 성과가 있으며, 지속적으로 성장하는 모습을 보임"
      },
      {
        keyword_score: 4,
        keyword_guideline: "높은 목표를 설정하고 이를 달성하기 위해 노력하는 모습이 명확함"
      },
      {
        keyword_score: 3,
        keyword_guideline: "목표 설정은 하지만 현실적인 수준에서 머무는 경향"
      },
      {
        keyword_score: 2,
        keyword_guideline: "주어진 목표를 달성하는 데 집중하며, 추가적인 목표 설정은 소극적"
      },
      {
        keyword_score: 1,
        keyword_guideline: "목표 의식이 낮고 현상 유지에 만족하는 경향"
      }
    ]
  }
];

const KeywordManagementPage = () => {
  const [selectedJobCategory, setSelectedJobCategory] = useState<number>(1);
  const [keywords, setKeywords] = useState<KeywordData[]>(dummyKeywords);
  // 직군별 선택된 키워드들 관리: { 직군id: [키워드id 배열] }
  const [selectedKeywordsByJob, setSelectedKeywordsByJob] = useState<{[jobId: number]: number[]}>({
    1: [1, 3], // 개발 직군: 자발적, 높은 목표 추구
    2: [2], // 디자인 직군: 의욕적
    3: [1, 2], // 기획 직군: 자발적, 의욕적
    4: [3] // 영업 직군: 높은 목표 추구
  });
  const [editingKeywordId, setEditingKeywordId] = useState<number | null>(null);
  const [editedKeywords, setEditedKeywords] = useState<{[key: number]: KeywordData}>({});

  // 현재 선택된 직군의 키워드들
  const currentSelectedKeywords = selectedKeywordsByJob[selectedJobCategory] || [];

  // KeywordDetailCard ref들 관리
  const keywordRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const mainContentRef = useRef<HTMLDivElement>(null);
  const [selectedKeywordForScroll, setSelectedKeywordForScroll] = useState<number>(1); // 스크롤용 선택된 키워드

  // 스크롤 시 현재 보이는 키워드 감지
  useEffect(() => {
    const handleScroll = () => {
      if (!mainContentRef.current) return;

      const containerRect = mainContentRef.current.getBoundingClientRect();
      const containerHeight = mainContentRef.current.clientHeight;
      
      // 현재 화면 중앙에 가장 가까운 키워드 찾기
      let closestKeywordId = selectedKeywordForScroll;
      let minDistance = Infinity;

      keywords.forEach((keyword) => {
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
      if (closestKeywordId !== selectedKeywordForScroll) {
        setSelectedKeywordForScroll(closestKeywordId);
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
  }, [selectedKeywordForScroll, keywords]);

  // 키워드 카드로 스크롤하는 함수
  const scrollToKeyword = (keywordId: number) => {
    setSelectedKeywordForScroll(keywordId);
    const element = keywordRefs.current[keywordId];
    if (element && mainContentRef.current) {
      const mainContent = mainContentRef.current;
      const elementRect = element.getBoundingClientRect();
      const containerRect = mainContent.getBoundingClientRect();
      
      const scrollTop = mainContent.scrollTop + elementRect.top - containerRect.top - 20; // 20px 여백
      
      mainContent.scrollTo({
        top: scrollTop,
        behavior: 'smooth'
      });
    }
  };

  // 키워드 선택/해제 핸들러 (체크박스용)
  const handleKeywordToggle = (keywordId: number) => {
    setSelectedKeywordsByJob(prev => {
      const currentKeywords = prev[selectedJobCategory] || [];
      const newKeywords = currentKeywords.includes(keywordId)
        ? currentKeywords.filter(id => id !== keywordId)
        : [...currentKeywords, keywordId];
      
      return {
        ...prev,
        [selectedJobCategory]: newKeywords
      };
    });
  };

  // 키워드 수정 시작
  const handleEditKeyword = (keywordId: number) => {
    const keyword = keywords.find(k => k.keyword_id === keywordId);
    if (keyword) {
      setEditedKeywords(prev => ({
        ...prev,
        [keywordId]: { ...keyword }
      }));
      setEditingKeywordId(keywordId);
    }
  };

  // 키워드 수정 저장
  const handleSaveKeyword = (keywordId: number) => {
    console.log("키워드 저장:", editedKeywords[keywordId]);
    // TODO: API 호출로 실제 저장
    if (editedKeywords[keywordId]) {
      setKeywords(prev => prev.map(keyword => 
        keyword.keyword_id === keywordId ? editedKeywords[keywordId] : keyword
      ));
    }
    setEditingKeywordId(null);
  };

  // 키워드 수정 취소
  const handleCancelEdit = (keywordId: number) => {
    setEditedKeywords(prev => {
      const newState = { ...prev };
      delete newState[keywordId];
      return newState;
    });
    setEditingKeywordId(null);
  };

  // 키워드 삭제
  const handleDeleteKeyword = (keywordId: number) => {
    if (confirm('정말로 이 키워드를 삭제하시겠습니까?')) {
      setKeywords(prev => prev.filter(keyword => keyword.keyword_id !== keywordId));
      // 모든 직군에서 해당 키워드 제거
      setSelectedKeywordsByJob(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(jobId => {
          updated[Number(jobId)] = updated[Number(jobId)].filter(id => id !== keywordId);
        });
        return updated;
      });
    }
  };

  // 상세 설명 변경
  const handleDetailChange = (keywordId: number, value: string) => {
    setEditedKeywords(prev => ({
      ...prev,
      [keywordId]: {
        ...prev[keywordId],
        keyword_detail: value
      }
    }));
  };

  // 평가 기준 변경
  const handleCriterionChange = (keywordId: number, index: number, value: string) => {
    setEditedKeywords(prev => {
      const keyword = prev[keywordId];
      if (!keyword) return prev;
      
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

  // 선택된 키워드에서 X 제거
  const handleRemoveSelectedKeyword = (keywordId: number) => {
    setSelectedKeywordsByJob(prev => ({
      ...prev,
      [selectedJobCategory]: (prev[selectedJobCategory] || []).filter(id => id !== keywordId)
    }));
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc' }}>
      <TopNavBar />
      
      <Box display="flex" height="calc(100vh - 64px)">
        {/* 좌측 사이드바 */}
        <Box
          sx={{
            width: 280,
            bgcolor: 'white',
            borderRight: '1px solid #e2e8f0',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* 직군 목록 */}
          <Box sx={{ borderBottom: '1px solid #e2e8f0', p: 3 }}>
            <Typography variant="h6" fontWeight="700" color="#1e293b" mb={2}>
              직군 목록
            </Typography>
            <Box>
              {dummyJobCategories.map((category) => (
                <Box
                  key={category.id}
                  onClick={() => setSelectedJobCategory(category.id)}
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    mb: 0.5,
                    cursor: 'pointer',
                    bgcolor: selectedJobCategory === category.id ? '#d3e3fd' : 'transparent',
                    borderLeft: selectedJobCategory === category.id ? '3px solid #0b57d0' : '3px solid transparent',
                    '&:hover': {
                      bgcolor: '#f1f5f9'
                    }
                  }}
                >
                  <Typography
                    variant="body2"
                    fontWeight={selectedJobCategory === category.id ? 700 : 400}
                    color={selectedJobCategory === category.id ? '#0b57d0' : '#64748b'}
                  >
                    {category.name}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

          {/* 키워드 목록 */}
          <Box sx={{ flex: 1, p: 3 }}>
            <Typography variant="h6" fontWeight="700" color="#1e293b" mb={2}>
              키워드 목록
            </Typography>
            <Box sx={{ mb: 3 }}>
              {keywords.map((keyword) => (
                <Box
                  key={keyword.keyword_id}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    mb: 1,
                    border: selectedKeywordForScroll === keyword.keyword_id ? '1px solid #0b57d0' : '1px solid #e2e8f0',
                    bgcolor: selectedKeywordForScroll === keyword.keyword_id ? '#eff6ff' : 'white',
                    cursor: 'pointer',
                    '&:hover': {
                      borderColor: '#0b57d0',
                      bgcolor: '#f8fafc'
                    }
                  }}
                  onClick={() => scrollToKeyword(keyword.keyword_id)}
                >
                  <Typography
                    variant="body2"
                    fontWeight={selectedKeywordForScroll === keyword.keyword_id ? 700 : 400}
                    color={selectedKeywordForScroll === keyword.keyword_id ? '#0b57d0' : '#64748b'}
                  >
                    {keyword.keyword_name}
                  </Typography>
                  <Typography 
                    variant="caption" 
                    color="#94a3b8"
                    sx={{ mt: 0.5, display: 'block' }}
                  >
                    #{keyword.keyword_id}
                  </Typography>
                </Box>
              ))}
            </Box>
            
            <Button 
              variant="contained" 
              fullWidth 
              startIcon={<AddIcon />}
              sx={{
                bgcolor: '#0b57d0',
                borderRadius: 2,
                py: 1.5,
                fontWeight: 600,
                textTransform: 'none',
                '&:hover': {
                  bgcolor: '#0945a3'
                }
              }}
            >
              키워드 추가
            </Button>
          </Box>
        </Box>

        {/* 메인 컨텐츠 영역 */}
        <Box 
          ref={mainContentRef}
          flex={1} 
          sx={{ 
            overflowY: "auto", 
            bgcolor: '#f8fafc', 
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* 헤더 섹션 (고정) */}
          <Box
            sx={{
              position: 'sticky',
              top: 0,
              zIndex: 10,
              bgcolor: '#f8fafc',
              pt: 4,
              px: 4,
              pb: 2
            }}
          >
            <Card
              elevation={0}
              sx={{
                borderRadius: 3,
                bgcolor: 'white',
                border: '1px solid #e2e8f0',
                boxShadow: '0 2px 4px -1px rgb(0 0 0 / 0.1)'
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="h5" fontWeight="700" color="#0b57d0" mb={1}>
                      {dummyJobCategories.find(cat => cat.id === selectedJobCategory)?.name}
                    </Typography>
                    <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
                      {currentSelectedKeywords.map((keywordId) => {
                        const keyword = keywords.find(k => k.keyword_id === keywordId);
                        return keyword ? (
                          <Chip
                            key={keywordId}
                            label={keyword.keyword_name}
                            onDelete={() => handleRemoveSelectedKeyword(keywordId)}
                            deleteIcon={<CloseIcon />}
                            sx={{
                              bgcolor: '#d3e3fd',
                              color: '#334155',
                              '& .MuiChip-deleteIcon': {
                                color: '#64748b'
                              }
                            }}
                          />
                        ) : null;
                      })}
                      <Typography variant="body2" color="#0b57d0" fontWeight={600}>
                        {currentSelectedKeywords.length}개 선택됨
                      </Typography>
                    </Box>
                  </Box>
                  <IconButton
                    sx={{
                      bgcolor: '#f1f5f9',
                      '&:hover': { bgcolor: '#e2e8f0' }
                    }}
                  >
                    <SaveIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Box>

          {/* 키워드 상세 카드들 */}
          <Box sx={{ px: 4, pb: 4 }}>
            <Typography variant="h6" fontWeight="700" color="#334155" mb={3}>
              키워드 목록 ({keywords.length}개)
            </Typography>
            {keywords.map((keyword, index) => {
              const isEditing = editingKeywordId === keyword.keyword_id;
              const currentKeyword = isEditing && editedKeywords[keyword.keyword_id] 
                ? editedKeywords[keyword.keyword_id] 
                : keyword;
              const isSelected = currentSelectedKeywords.includes(keyword.keyword_id);
              
              return (
                <Box 
                  key={keyword.keyword_id}
                  sx={{ 
                    opacity: isSelected ? 1 : 0.7,
                    '&:hover': { opacity: 1 },
                    transition: 'opacity 0.2s ease'
                  }}
                >
                  <KeywordDetailCard
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
                    onDetailChange={handleDetailChange}
                    onCriterionChange={handleCriterionChange}
                    showCheckbox={true}
                    isChecked={isSelected}
                    onCheckboxChange={handleKeywordToggle}
                  />
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default KeywordManagementPage;