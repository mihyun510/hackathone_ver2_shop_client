import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  TextField,
} from "@mui/material";

interface PasswordResetDialogProps {
  open: boolean;
  onClose: () => void;
  onResetPassword: (usId: string) => void;
}

const PasswordResetDialog: React.FC<PasswordResetDialogProps> = ({
  open,
  onClose,
  onResetPassword,
}) => {
  const [email, setEmail] = useState(""); // 이메일 상태 관리
  const [error, setError] = useState(""); // 이메일 입력 에러 상태
  const [usId, setUsId] = useState(""); // 이메일 상태 관리

  // 이메일 입력 변경 핸들러
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError(""); // 에러 상태 초기화
  };

  // 아이디 입력 변경 핸들러
  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsId(e.target.value);
    setError(""); // 에러 상태 초기화
  };

  // 이메일 유효성 검사
  const handleSubmit = () => {
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!emailRegex.test(email)) {
    //   setError("유효한 이메일 주소를 입력해주세요.");
    //   return;
    // }

    // 비밀번호 초기화 이메일 발송
    onResetPassword(usId); // 부모 컴포넌트로 이메일 전달
  };

  // 엔터 키로 로그인 처리
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit(); // Enter 키를 눌렀을 때 로그인 처리
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>비밀번호 초기화</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          {/* 비밀번호 초기화 링크가 이메일로 발송됩니다. 아래에 이메일을
          입력해주세요. */}
          비밀번호가 초기화 됩니다. 아래에 아이디를 입력해주세요.
        </Typography>
        <TextField
          label="아이디"
          variant="outlined"
          fullWidth
          value={usId}
          onChange={handleIdChange}
          error={!!error} // 에러 발생 시 오류 스타일 적용
          helperText={error} // 오류 메시지 출력
          onKeyDown={handleKeyDown} // 엔터 키 이벤트 추가
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          닫기
        </Button>
        <Button onClick={handleSubmit} color="primary">
          초기화
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PasswordResetDialog;
