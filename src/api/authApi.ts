import { authInstance } from "./axiosInstance";
import { ResponseData, AuthResponse, User } from "../types/api-type";

//로그인
export async function loginUser(
  usId: string,
  usPw: string
): Promise<ResponseData> {
  try {
    const response = await authInstance.post<AuthResponse>("/login", {
      usId,
      usPw,
    });

    if (response.data.token && response.data.user) {
      // 로그인 성공 시, 사용자 정보와 토큰을 반환
      return {
        ok: true,
        data: response.data,
        message: response.data.message,
      };
    } else {
      // 인증 실패 시
      return {
        ok: false,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.error("SignIn Error:", error);
    return {
      ok: false,
      message: "Authentication failed",
    };
  }
}

//회원가입
export async function registerUser(
  user: Omit<User, "usRole" | "token">
): Promise<ResponseData> {
  try {
    // Send request
    const response = await authInstance.post("/save/user", user);
    return {
      ok: true,
      message: response.data,
    };
  } catch {
    return {
      ok: false,
      message: "Failed to create account",
    };
  }
}

// export async function getUser(): Promise<ResponseData> {
//   try {
//     // Send request
//     const response = await apiInstance.get<User>("/get/user/profile");

//     console.log("getUser repsonse:", response);

//     return {
//       isOk: true,
//       data: response.data,
//     };
//   } catch {
//     return {
//       isOk: false,
//     };
//   }
// }

export async function resetPassword(usId: string): Promise<ResponseData> {
  try {
    // Send request
    const response = await authInstance.put("/modify/user/password", {
      usId: usId,
    });
    return {
      ok: true,
      message: response.data,
    };
  } catch {
    return {
      ok: false,
      message: "Failed to reset password",
    };
  }
}
