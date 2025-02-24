import { ResponseData } from "../types/api-type";
import { apiInstance } from "./axiosInstance";

export interface Product {
  pdCd: string; // 상품코드 (number 대신 string으로 수정, 이유는 상품 코드가 숫자만이 아니기 때문일 수 있음)
  pdNm: string; // 상품명
  pdDesc: string; // 상품 설명
  pdPri: string; // 상품 가격
  pdCategory: string; // 카테고리
  filePath: string;
  fileNm: string;
}

// 장바구니에서 사용될 타입 (quantity 속성 추가)
export interface CartProduct extends Product {
  quantity: number; // 장바구니에서 수량 추가
}

// 상품 목록 가져오는 API 함수
export async function getProducts(): Promise<ResponseData> {
  try {
    // 상품 목록 요청
    const response = await apiInstance.get("/products/get/items"); // 상품 목록을 반환하는 엔드포인트
    // 응답을 성공적으로 받았을 때
    return {
      ok: response.data.ok,
      message: response.data.message,
      data: response.data.data, // 상품 데이터 반환
    };
  } catch (error) {
    // 에러 발생 시
    return {
      ok: false,
      message: "상품 목록을 가져오는 데 실패했습니다.", // 실패 메시지
    };
  }
}

// 상품 등록 API 함수
export async function registerProduct(
  product: Omit<Product, "inDate" | "inUser" | "updDate" | "updUser">
): Promise<ResponseData> {
  try {
    // 상품 등록 API 요청
    const response = await apiInstance.post("/products/save/item", product);
    // 성공적으로 응답을 받았을 때
    return {
      ok: true,
      message: response.data.message, // 성공 메시지 또는 반환 값
    };
  } catch (error) {
    // 에러 발생 시
    return {
      ok: false,
      message: "상품 등록에 실패했습니다.", // 실패 메시지
    };
  }
}
