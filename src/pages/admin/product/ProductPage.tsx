import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Container,
  Button,
} from "@mui/material";
import { useAuth } from "../../../context/AuthContext"; // 권한 정보가 있는 Context를 가져옴
import { getProducts, Product } from "../../../api/productApi";
import ProductDetailDialog from "../../../components/modals/ProductDetailDialog";
import CartDialog from "../../../components/modals/CartDialog";

const ProductPage = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]); // 상품 데이터를 저장할 상태
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 상태
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null); // 선택한 상품
  const [openDetail, setOpenDetail] = useState<boolean>(false);

  // 상품 목록을 API에서 가져오는 함수
  const fetchProducts = async () => {
    try {
      const response = await getProducts(); // 상품 API 엔드포인트
      setProducts(response.data); // 받아온 데이터로 상태 업데이트
    } catch (err) {
      setError("상품 정보를 불러오는 데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트가 마운트될 때 상품 정보 가져오기
  useEffect(() => {
    fetchProducts();
  }, []);

  // 상품 클릭 시 상세 정보 팝업 열기
  const handleOpenDetail = (product: Product) => {
    setSelectedProduct(product);
    setOpenDetail(true);
  };

  // 상세 팝업 닫기
  const handleCloseDetail = () => {
    setOpenDetail(false);
    setSelectedProduct(null);
  };

  if (loading) {
    return <Typography variant="h6">로딩 중...</Typography>;
  }

  if (error) {
    return (
      <Typography variant="h6" color="error">
        {error}
      </Typography>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        상품 목록
      </Typography>

      <Grid container spacing={3}>
        {!products || !Array.isArray(products) ? (
          <Typography variant="h6">
            <br />
            상품 데이터가 없습니다.
          </Typography>
        ) : (
          products.map((product) => (
            <Grid item key={product.pdCd} xs={12} sm={6} md={4}>
              <Card sx={{ cursor: "pointer" }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={product.filePath}
                  alt={product.pdNm}
                  onClick={() => handleOpenDetail(product)}
                />
                <CardContent>
                  <Typography variant="h6">{product.pdNm}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    가격 : {product.pdPri} 원
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      {/* 상품 상세 팝업 */}
      <ProductDetailDialog
        open={openDetail}
        product={selectedProduct}
        onClose={handleCloseDetail}
      />
    </Container>
  );
};

export default ProductPage;
