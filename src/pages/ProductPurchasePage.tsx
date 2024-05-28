import React from "react";
import styled from "@emotion/styled";

import ProductPurchase from "../components/ProductPurchase";
import { colorSystem } from "../styles/color";

const ProductPurchasePage = () => {
  return (
    <div>
      <div>상품 구매 페이지 입니다.</div>
      <ProductPurchase></ProductPurchase>
    </div>
  );
};

export default ProductPurchasePage;
