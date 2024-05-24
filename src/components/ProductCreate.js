import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../api/productCreateApi";
import { API_HOST } from "../api/config";
import Button from "./common/Button";

const ProductCreate = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [explanation, setExplanation] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNameChange = e => {
    //console.log("상품이름", e.target.value);
    setName(e.target.value);
  };

  const handlePriceChange = e => {
    //console.log("상품가격", e.target.value);
    setPrice(Number(e.target.value));
  };

  const handleExplanationChange = e => {
    //console.log("상품설명", e.target.value);
    setExplanation(e.target.value);
  };

  const handleCreateProduct = async e => {
    e.preventDefault();
    setIsLoading(true); //등록 중입니다...

    const response = await createProduct({ name, price, explanation }); //createApi.js로부터 createProduct를 불러와서 객체로 보내주자

    if (response) {
      setIsLoading(false);
      setIsModalOpen(true);
    }
  };

  const handleMoveListPage = () => {
    setIsModalOpen(false);
    navigate(`${API_HOST}`);
  };

  if (isLoading) {
    return <div>상품을 등록 하는 중 입니다.</div>;
  }

  if (isModalOpen) {
    return (
      <div>
        <div>상품을 성공적으로 추가하였습니다.</div>
        <div>확인을 누르면 상품 목록 페이지로 이동합니다.</div>
        <Button type="button" onClick={handleMoveListPage}>
          확인
        </Button>
      </div>
    );
  }

  return (
    <div>
      <h1>상품 등록하기</h1>
      <form onSubmit={handleCreateProduct}>
        <input
          type="text"
          placeholder="상품 이름"
          value={name}
          onChange={handleNameChange}
        />
        <br />
        <input
          type="number"
          placeholder="상품 가격"
          value={price}
          onChange={handlePriceChange}
        />
        <br />
        <textarea
          rows={4}
          type="text"
          placeholder="상품 설명"
          value={explanation}
          onChange={handleExplanationChange}
        />
        <br />
        <Button label="상품 정보 등록하기"></Button>
      </form>
    </div>
  );
};

export default ProductCreate;
