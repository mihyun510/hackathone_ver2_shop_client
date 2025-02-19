import { useState, useEffect, FormEvent, useCallback } from "react";
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router";
import {
  Container,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  Checkbox,
  FormControlLabel,
  Grid,
} from "@mui/material";

import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 useNavigate
import PasswordResetDialog from "../../components/modals/PasswordResetDialog"; // PasswordResetDialog 컴포넌트 import

const LoginPage = () => {
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 훅
  const { login, token } = useAuth();
  const [usId, setUsId] = useState("");
  const [usPw, setUsPw] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false); // 아이디 저장 체크박스 상태
  const [openModal, setOpenModal] = useState(false); // 모달 열기/닫기 상태

  const [isOk, setIsOk] = useState(false); // 모달 열기/닫기 상태

  const handleLogin = useCallback(
    async (e: FormEvent) => {
      e.preventDefault(); // 기본 동작(페이지 새로고침) 방지
      setError("");

      const response = await login(usId, usPw);
      if (response.isOk) {
        console.log(response.isOk);
        setIsOk(response.isOk);
      } else setError("로그인에 실패했습니다. 아이디와 비밀번호를 확인하세요.");
    },
    [usId, usPw, login]
  );

  // 회원가입 페이지로 이동
  const navigateToRegister = () => {
    navigate("/register"); // 회원가입 페이지로 이동
  };

  // 비밀번호 초기화 모달 열기
  const handleResetPassword = () => {
    setOpenModal(true); // 모달 열기
  };

  // 아이디 텍스트 박스 값 변경시 실행
  const handleIdTextBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const i_id = e.target.value; // 텍스트 박스의 값 가져오기
    setUsId(i_id); // 아이디 값 상태 업데이트
    if (rememberMe) {
      localStorage.setItem("saveUsId", i_id);
    }
  };

  // 체크박스 상태 변경 시 로컬 스토리지에서 아이디 삭제 처리
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMe(e.target.checked);
    if (!e.target.checked) {
      localStorage.removeItem("saveUsId"); // 체크박스를 풀면 로컬 스토리지에서 아이디 삭제
    } else {
      localStorage.setItem("saveUsId", usId);
    }
  };

  useEffect(() => {
    console.log(isOk);
    if (isOk) {
      console.log(isOk);
      navigate("/home");
    }
  }, [isOk]);

  // 컴포넌트가 처음 렌더링될 때 로컬 스토리지에서 아이디 값을 가져옴
  useEffect(() => {
    const savedUsId = localStorage.getItem("saveUsId"); // 로컬 스토리지에서 아이디 가져오기
    if (savedUsId) {
      setRememberMe(true); // 체크박스 체크
    }
  }, []);

  // 비밀번호 초기화 로직
  const handleResetPasswordEmail = (email: string) => {
    // 비밀번호 초기화 이메일 발송 로직 추가 (예: 이메일 발송 API 호출)
    setOpenModal(false); // 모달 닫기
  };

  // 엔터 키로 로그인 처리
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLogin(e as any); // Enter 키를 눌렀을 때 로그인 처리
    }
  };

  return (
    <Container maxWidth="sm">
      <Card sx={{ mt: 8, p: 4, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" component="h2" align="center" gutterBottom>
            로그인
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}

          <TextField
            label="아이디"
            variant="outlined"
            fullWidth
            margin="normal"
            value={usId}
            onChange={handleIdTextBoxChange}
            required
            onKeyDown={handleKeyDown} // 엔터 키 이벤트 추가
          />
          <TextField
            label="비밀번호"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={usPw}
            onChange={(e) => setUsPw(e.target.value)}
            required
            onKeyDown={handleKeyDown} // 엔터 키 이벤트 추가
          />

          {/* 아이디 저장 체크박스와 비밀번호 초기화 버튼 나란히 배치 */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={handleCheckboxChange}
                    name="rememberMe"
                    color="primary"
                  />
                }
                label="아이디 저장"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button
                variant="outlined"
                color="secondary"
                fullWidth
                onClick={handleResetPassword}
              >
                비밀번호 초기화
              </Button>
            </Grid>
          </Grid>

          <Button
            //type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleLogin}
          >
            로그인
          </Button>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            style={{ marginTop: 10 }}
            onClick={navigateToRegister}
          >
            회원가입
          </Button>
        </CardContent>
      </Card>

      {/* 비밀번호 초기화 모달 */}
      <PasswordResetDialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        onResetPassword={handleResetPasswordEmail}
      />
    </Container>
  );
};

export default LoginPage;
