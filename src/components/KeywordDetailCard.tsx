import { Box, Typography, IconButton, Paper, Divider, TextField, Button } from "@mui/material"
import { Delete, Edit, Save, Cancel } from "@mui/icons-material"
import { useState } from 'react';

// 더미 데이터 구조에 맞는 타입을 정의합니다. 실제 API 모델과 일치시킬 수 있습니다.
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

// props 타입을 변경하여 KeywordData 객체를 받도록 합니다.
const KeywordDetailCard = ({ keywordData }: { keywordData: KeywordData }) => {
  // keywordData 객체에서 필요한 정보를 구조분해 할당하여 사용합니다.
  const { keyword_name, keyword_detail, keyword_criteria } = keywordData;

  // 수정 모드 상태 관리
  const [isEditing, setIsEditing] = useState(false);
  // 수정 중인 상세 설명 상태 관리
  const [editedDetail, setEditedDetail] = useState(keyword_detail);
  // 수정 중인 평가 기준 배열 상태 관리
  const [editedCriteria, setEditedCriteria] = useState<KeywordCriterion[]>([]);

  // 편집 버튼 클릭 핸들러
  const handleEditClick = () => {
    setIsEditing(true);
    setEditedDetail(keyword_detail); // 수정 시작 시 현재 상세 설명으로 초기화
    setEditedCriteria(keyword_criteria); // 수정 시작 시 현재 평가 기준으로 초기화
  };

  // 저장 버튼 클릭 핸들러 (API 연동 부분은 나중에 구현)
  const handleSaveClick = () => {
    console.log("Saving Detail: ", editedDetail);
    console.log("Saving Criteria: ", editedCriteria);
    // TODO: 여기에 API 호출 로직 또는 부모 컴포넌트로 데이터 전달 로직 추가
    setIsEditing(false); // 저장 후 수정 모드 종료
  };

  // 취소 버튼 클릭 핸들러
  const handleCancelClick = () => {
    setEditedDetail(keyword_detail); // 변경사항 취소 시 원래 상세 설명으로 되돌림
    setEditedCriteria(keyword_criteria); // 변경사항 취소 시 원래 평가 기준으로 되돌림
    setIsEditing(false); // 수정 모드 종료
  };

  // 평가 기준 텍스트 변경 핸들러
  const handleCriterionChange = (index: number, value: string) => {
    const newEditedCriteria = [...editedCriteria];
    newEditedCriteria[index].keyword_guideline = value;
    setEditedCriteria(newEditedCriteria);
  };

  return (
    <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
        {/* title 대신 keyword_name을 사용합니다. */}
        <Typography variant="h6" fontWeight="bold">{keyword_name}</Typography>
        <Box>
          {isEditing ? (
            // 수정 모드일 때 저장/취소 버튼 표시
            <>
              <IconButton onClick={handleSaveClick}><Save /></IconButton>
              <IconButton onClick={handleCancelClick}><Cancel /></IconButton>
            </>
          ) : (
            // 보기 모드일 때 수정/삭제 버튼 표시
            <>
              <IconButton onClick={handleEditClick}><Edit /></IconButton>
              <IconButton><Delete /></IconButton>
            </>
          )}
        </Box>
      </Box>

      <Box display="flex" alignItems="center" mb={1}>
        <Typography fontWeight="bold">상세 설명</Typography>
        {/* AI 생성 버튼은 수정 모드에서만 표시됩니다. */}
      </Box>
      {isEditing ? (
        <Box display="flex" alignItems="center" mb={2}>
          {/* 수정 모드일 때 TextField로 상세 설명 수정 가능하게 함 */}
          <TextField
            fullWidth
            multiline
            value={editedDetail}
            onChange={(e) => setEditedDetail(e.target.value)}
            variant="outlined"
            size="small"
            sx={{ mr: 1 }} // TextField와 버튼 사이 간격 추가
          />
          <Button variant="outlined" size="small">AI 생성</Button>
        </Box>
      ) : (
        // 보기 모드일 때 Typography로 상세 설명 표시
        <Typography color="text.secondary" mb={2}>
          {keyword_detail}
        </Typography>
      )}

      <Typography fontWeight="bold" mb={1}>평가 기준</Typography>
      {/* 평가 기준 목록을 수정 모드에 따라 TextField 또는 Typography로 표시합니다. */}
      {isEditing ? (
        // 수정 모드일 때
        editedCriteria.map((criterion, index) => (
          <Box key={criterion.keyword_score} display="flex" alignItems="center" mb={1}>
            <Typography fontWeight="bold" sx={{ width: 40, flexShrink: 0 }}>{criterion.keyword_score}점</Typography>
            <TextField
              fullWidth
              multiline
              value={criterion.keyword_guideline}
              onChange={(e) => handleCriterionChange(index, e.target.value)}
              variant="outlined"
              size="small"
              sx={{ ml: 2 }}
            />
          </Box>
        ))
      ) : (
        // 보기 모드일 때
        keyword_criteria.map((criterion) => (
          <Box key={criterion.keyword_score} display="flex" mb={1}>
            <Typography fontWeight="bold" sx={{ width: 40, flexShrink: 0 }}>{criterion.keyword_score}점</Typography>
            <Typography sx={{ ml: 2 }}>{criterion.keyword_guideline}</Typography>
          </Box>
        ))
      )}
    </Paper>
  )
}

export default KeywordDetailCard
