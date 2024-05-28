import { Routes, Route } from "react-router-dom";
import ProductListPage from "./pages/ProductListPage";
import ProductItemPage from "./pages/ProductItemPage";
import NotFoundPage from "./pages/NotFoundPage";
import Layout from "./components/common/Layout";
import ProductCreatePage from "./pages/ProductCreatePage";
import ProductModifyPage from "./pages/ProductModifyPage";
import ProductPurchasePage from "./pages/ProductPurchasePage";
import CartList from "./components/cart/CartList";
import CartPage from "./pages/CartPage";
import Responsive from "./components/common/Responsive";
import styled from "@emotion/styled";

const ResponsiveFullWidthStyle = styled(Responsive)`
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

function App() {
  return (
    <Responsive>
      <Layout>
        <Routes>
          <Route path="/" element={<ProductListPage />} />
          <Route path="/product" element={<ProductListPage />} />
          <Route path="/create" element={<ProductCreatePage />} />

          <Route path="/cart" element={<CartPage />} />

          <Route path="/product/:productId" element={<ProductItemPage />} />
          <Route
            path="/purchase/:productId"
            element={<ProductPurchasePage />}
          />
          <Route path="/modify/:productId" element={<ProductModifyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </Responsive>
  );
}

export default App;
