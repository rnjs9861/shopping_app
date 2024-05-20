import { Route, Routes } from "react-router-dom";
import ProductListPage from "./pages/ProductListPage";
import ProductItemPage from "./pages/ProductItemPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProductModifyPage from "./pages/ProductModifyPage";
import ProductCreatePage from "./pages/ProductCreatePage";
import ProductPurchasePage from "./pages/ProductPurchasePage";
import Layout from "./components/common/Layout";

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<ProductListPage />} />
        <Route path="/product" element={<ProductListPage />} />

        <Route path="/product/:productId" element={<ProductItemPage />} />
        <Route path="/purchase/:productId" element={<ProductPurchasePage />} />
        <Route path="/create" element={<ProductCreatePage />} />
        <Route path="/modify/:productId" element={<ProductModifyPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
};

export default App;
