import React, { useEffect, useState } from "react";
import { getProductList } from "../api/productListApi";

const ProductList = () => {
  const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getProductList() //getProductList를 가보면 아무것도 넘기지 않는다 고로 공백
      .then(response => {
        const data = response?.data.products;
        setProductList(data);
      })
      .catch(error => console.log(error))
      .finally(() => setIsLoading(false)); //무조건 한 번  실행한다.
  }, []);

  if (isLoading) {
    return <div>로딩중입니다...</div>;
  }

  return (
    <div>
      <h1>상품 목록 보여주기</h1>
      <div>
        {productList.map(item => (
          <ul key={item.id}>
            <li>{item.name}</li>
            <li>{item.price}</li>
            <li>{item.explanation}</li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
