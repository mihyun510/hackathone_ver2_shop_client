import { useState, useRef } from "react";
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
import { registerUser } from "../../api/authApi";
import { User } from "../../types/api-type";

const RegisterPage = () => {
  const [usNm, setUsNm] = useState(""); // 이름 상태 추가
  const [usId, setUsId] = useState("");
  const [usEmail, setUsEmail] = useState("");
  const [usPw, setUsPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 훅

  const formData = useRef<Omit<User, "usRole" | "token">>({
    usId: "",
    usNm: "",
    usPw: "",
    usEmail: "",
  });

  const handleChange = (
    field: keyof typeof formData.current,
    value: string
  ) => {
    formData.current[field] = value; // formData.current 업데이트
  };

  // 회원가입 처리 함수
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault(); // 기본 동작 방지 (페이지 새로고침 방지)

    // 비밀번호 확인
    if (usPw !== confirmPw) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 회원가입 API 호출 (예시: 실제 API와 연동)
    try {
      const response = await registerUser(formData.current);
      if (response.ok) navigate("/login");
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
            value={usId}
            onChange={(e) => {
              setUsId(e.target.value);
              handleChange("usId", e.target.value);
            }}
            required
          />
          <TextField
            label="이름"
            variant="outlined"
            fullWidth
            margin="normal"
            value={usNm}
            onChange={(e) => {
              setUsNm(e.target.value);
              handleChange("usNm", e.target.value);
            }}
            required
          />

          <TextField
            label="이메일"
            variant="outlined"
            fullWidth
            margin="normal"
            value={usEmail}
            onChange={(e) => {
              setUsEmail(e.target.value);
              handleChange("usEmail", e.target.value);
            }}
            required
          />
          <TextField
            label="비밀번호"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={usPw}
            onChange={(e) => {
              setUsPw(e.target.value);
              handleChange("usPw", e.target.value);
            }}
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
