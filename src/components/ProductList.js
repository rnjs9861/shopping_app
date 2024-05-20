import React, { useEffect, useState } from "react";
import { getProductList } from "../api/productListApi";
import { useNavigate } from "react-router-dom";
import { API_HOST } from "../api/config";

const ProductList = () => {
  const Navigate = useNavigate();

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
    return <h3>상품목록을 불러오는 중 입니다....</h3>;
  }

  return (
    <div>
      <h1>상품 목록 보여주기</h1>
      <div>
        {productList.map(item => (
          <ul key={item.id}>
            <li
              style={{ cursor: "pointer" }}
              onClick={() => Navigate(`${API_HOST}/${item.id}`)}
            >
              {item.name}
            </li>
            <li>{item.price.toLocaleString("KO-kr")}원</li>
            <li>{item.explanation}</li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
