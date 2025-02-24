import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  TextField,
  Alert,
} from "@mui/material";
import { useAuth } from "../../context/AuthContext"; // 인증 관련 Context를 가져옵니다
import { User } from "../../types/api-type";

const MyPage: React.FC = () => {
  const { user } = useAuth();
  const [userInfo, setUserInfo] = useState<User | undefined>(undefined);
  const [usNm, setUsNm] = useState<string | undefined>("");
  const [usEmail, setUsEmail] = useState<string | undefined>("");
  const [usPw, setUsPw] = useState<string | undefined>(""); // 비밀번호 상태 추가
  const [newPw, setNewPw] = useState<string | undefined>(""); // 새 비밀번호 상태 추가
  const [confirmPw, setConfirmPw] = useState<string | undefined>(""); // 비밀번호 확인 상태 추가
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false); // 수정 모드 상태 추가
  const [isPasswordEditing, setIsPasswordEditing] = useState(false);

  // 마이페이지 로딩 시 사용자 정보 불러오기
  useEffect(() => {
    if (user) {
      setUserInfo(user);
      setUsNm(user.usNm); // 사용자 이름 초기화
      setUsEmail(user.usEmail); // 사용자 이메일 초기화
    } else {
      // user가 없을 경우 처리 (예: 에러 메시지 설정)
      setError("로그인된 사용자 정보가 없습니다.");
    }
  }, [user]);

  // 사용자 정보 수정 시 입력 값 처리
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "usNm") {
      setUsNm(value);
    } else if (name === "usEmail") {
      setUsEmail(value);
    } else if (name === "usPw") {
      setUsPw(value);
    } else if (name === "newPw") {
      setNewPw(value);
    } else if (name === "confirmPw") {
      setConfirmPw(value);
    }
  };

  // 사용자 정보 업데이트 처리
  const handleUpdateUser = async () => {
    if (!userInfo) return;

    const updatedUser = {
      ...userInfo,
      usNm, // 이름 수정
      usEmail, // 이메일 수정
    };

    // try {
    //   const response = await updateUserInfo(updatedUser); // 사용자 정보 업데이트 API 호출
    //   if (response.ok) {
    //     alert("정보가 성공적으로 업데이트되었습니다.");
    //     setUserInfo(updatedUser); // 업데이트된 사용자 정보 저장
    //     setIsEditing(false); // 수정 모드 종료
    //   } else {
    //     setError("정보 업데이트에 실패했습니다.");
    //   }
    // } catch (err) {
    //   setError("정보 업데이트에 실패했습니다.");
    // }
  };

  // 비밀번호 업데이트 처리
  const handleUpdatePassword = async () => {
    if (newPw !== confirmPw) {
      setError("새 비밀번호와 확인 비밀번호가 일치하지 않습니다.");
      return;
    }

    // try {
    //   const response = await updatePassword({
    //     oldPassword: usPw,
    //     newPassword: newPw,
    //   });
    //   if (response.ok) {
    //     alert("비밀번호가 성공적으로 변경되었습니다.");
    //     setIsPasswordEditing(false); // 비밀번호 수정 모드 종료
    //     setUsPw(""); // 비밀번호 초기화
    //     setNewPw(""); // 새 비밀번호 초기화
    //     setConfirmPw(""); // 비밀번호 확인 초기화
    //   } else {
    //     setError("비밀번호 변경에 실패했습니다.");
    //   }
    // } catch (err) {
    //   setError("비밀번호 변경에 실패했습니다.");
    // }
  };

  // 수정/취소 버튼 처리
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handlePasswordEditToggle = () => {
    setIsPasswordEditing(!isPasswordEditing);
  };
  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        마이페이지
      </Typography>

      {/* 사용자 정보 */}
      {user ? (
        <>
          <Typography variant="h6">이름: {user.usNm}</Typography>
          <Typography variant="body1">이메일: {user.usEmail}</Typography>
        </>
      ) : (
        <Typography variant="body1" color="textSecondary">
          로그인된 사용자가 없습니다.
        </Typography>
      )}

      {/* 사용자 정보 수정 폼 */}
      {isEditing ? (
        <Card sx={{ marginTop: 4 }}>
          <CardContent>
            <Typography variant="h6">정보 수정</Typography>
            <TextField
              label="이름"
              name="usNm"
              value={usNm}
              onChange={handleInputChange}
              fullWidth
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="이메일"
              name="usEmail"
              value={usEmail}
              onChange={handleInputChange}
              fullWidth
              sx={{ marginBottom: 2 }}
            />
            <Button
              color="success"
              variant="contained"
              onClick={handleUpdateUser}
              sx={{ marginTop: 2 }}
            >
              저장
            </Button>
            <Button
              color="secondary"
              variant="outlined"
              onClick={handleEditToggle}
              sx={{ marginTop: 2, marginLeft: 2 }}
            >
              취소
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Button
          color="primary"
          variant="text"
          onClick={handleEditToggle}
          sx={{ marginTop: 4, marginRight: 2 }}
        >
          정보 수정
        </Button>
      )}

      {/* 비밀번호 수정 폼 */}
      {isPasswordEditing ? (
        <Card sx={{ marginTop: 4 }}>
          <CardContent>
            <Typography variant="h6">비밀번호 변경</Typography>
            <TextField
              label="현재 비밀번호"
              name="usPw"
              type="password"
              value={usPw}
              onChange={handleInputChange}
              fullWidth
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="새 비밀번호"
              name="newPw"
              type="password"
              value={newPw}
              onChange={handleInputChange}
              fullWidth
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="새 비밀번호 확인"
              name="confirmPw"
              type="password"
              value={confirmPw}
              onChange={handleInputChange}
              fullWidth
              sx={{ marginBottom: 2 }}
            />
            <Button
              color="success"
              variant="contained"
              onClick={handleUpdatePassword}
              sx={{ marginTop: 2 }}
            >
              저장
            </Button>
            <Button
              color="secondary"
              variant="outlined"
              onClick={handlePasswordEditToggle}
              sx={{ marginTop: 2, marginLeft: 2 }}
            >
              취소
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Button
          color="primary"
          variant="text"
          onClick={handlePasswordEditToggle}
          sx={{ marginTop: 4 }}
        >
          비밀번호 변경
        </Button>
      )}

      {/* 에러 메시지 */}
      {error && <Alert severity="error">{error}</Alert>}

      <Grid container spacing={2} sx={{ marginTop: 4 }}>
        {/* 장바구니, 주문 내역 등 */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">장바구니</Typography>
              <Typography variant="body2" color="textSecondary">
                장바구니에 담긴 상품을 확인하고 결제할 수 있습니다.
              </Typography>
              <Button
                color="primary"
                variant="contained"
                sx={{ marginTop: 2 }}
                href="/cart"
              >
                장바구니 보기
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">주문 내역</Typography>
              <Typography variant="body2" color="textSecondary">
                이전 주문 내역을 확인하고 관리할 수 있습니다.
              </Typography>
              <Button
                color="primary"
                variant="contained"
                sx={{ marginTop: 2 }}
                href="/orders"
              >
                주문 내역 보기
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* 로그아웃 버튼 */}
      <Button
        variant="outlined"
        color="secondary"
        sx={{ marginTop: 4 }}
        href="/login"
      >
        로그아웃
      </Button>
    </Container>
  );
};

export default MyPage;
