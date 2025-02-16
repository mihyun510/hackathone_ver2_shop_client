import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Card,
  CardContent,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 useNavigate

const RegisterPage = () => {
  const [us_nm, setUsNm] = useState(""); // 이름 상태 추가
  const [us_id, setUsId] = useState("");
  const [us_email, setUsEmail] = useState("");
  const [us_pw, setUsPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 훅

  // 회원가입 처리 함수
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault(); // 기본 동작 방지 (페이지 새로고침 방지)

    // 비밀번호 확인
    if (us_pw !== confirmPw) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 회원가입 API 호출 (예시: 실제 API와 연동)
    try {
      // 예: await registerUser(us_id, us_email, us_pw);
      console.log("회원가입 성공:", { us_id, us_email, us_pw });
      // 성공 시 로그인 페이지로 이동
      navigate("/login");
    } catch (err) {
      setError("회원가입에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Card sx={{ mt: 8, p: 4, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" component="h2" align="center" gutterBottom>
            회원가입
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}

          <TextField
            label="아이디"
            variant="outlined"
            fullWidth
            margin="normal"
            value={us_id}
            onChange={(e) => setUsId(e.target.value)}
            required
          />
          <TextField
            label="이름"
            variant="outlined"
            fullWidth
            margin="normal"
            value={us_nm}
            onChange={(e) => setUsNm(e.target.value)}
            required
          />

          <TextField
            label="이메일"
            variant="outlined"
            fullWidth
            margin="normal"
            value={us_email}
            onChange={(e) => setUsEmail(e.target.value)}
            required
          />
          <TextField
            label="비밀번호"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={us_pw}
            onChange={(e) => setUsPw(e.target.value)}
            required
          />
          <TextField
            label="비밀번호 확인"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={confirmPw}
            onChange={(e) => setConfirmPw(e.target.value)}
            required
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleRegister}
          >
            회원가입
          </Button>

          <Button
            variant="text"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={() => navigate("/login")}
          >
            이미 계정이 있으신가요? 로그인
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default RegisterPage;
