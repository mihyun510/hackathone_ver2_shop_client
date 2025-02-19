import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { loginUser } from "../api/authApi";
import { User } from "../types/api-type";

interface AuthContextType {
  user?: User | undefined;
  token?: string;
  login: (
    id: string,
    password: string
  ) => Promise<{ isOk: boolean; data?: User; message?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [token, setToken] = useState<string | undefined>(undefined);

  const login = useCallback(async (usId: string, usPw: string) => {
    const response = await loginUser(usId, usPw);
    if (response.isOk) {
      setUser(response.data.user);
      setToken(response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user)); // localStorage에 user 정보 저장
      localStorage.setItem("token", response.data.token); // localStorage에 token 정보 저장
    }
    return response;
  }, []); // 빈 의존성 배열로, 처음 한 번만 생성되고 이후 재사용됨

  const logout = useCallback(() => {
    setUser(undefined);
    setToken(undefined);
    localStorage.removeItem("user"); // user 정보 삭제
    localStorage.removeItem("token"); // token 정보 삭제
  }, []); // 빈 의존성 배열로, 처음 한 번만 생성되고 이후 재사용됨

  return (
    <AuthContext.Provider value={{ user, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("AuthProvider 내부에서 사용해야 합니다.");
  }
  return context;
};
