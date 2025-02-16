import apiInstance from "./axiosInstance";

// 로그인 요청
export const loginUser = async (us_id: string, us_pw: string) => {
  const response = await apiInstance.post("/login", { us_id, us_pw });
  return response.data;
};

// 회원가입 요청 (추가 가능)
export const registerUser = async (userData: {
  us_id: string;
  us_pw: string;
  us_email: string;
  us_nm: string;
}) => {
  const response = await apiInstance.post("/register", userData);
  return response.data;
};
