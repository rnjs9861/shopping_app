import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductOne } from "../api/productItemApi";
import { deleteProduct, modifyProduct } from "../api/productModifyApi";
import axios from "axios";
import Modal from "./common/Modal";
import useModal from "../hooks/useModal";
import Button from "./common/Button";
import styled from "@emotion/styled";

const initState = {
  id: "",
  name: "",
  price: 0,
  explanation: "",
};

const ProductModify = () => {
  const navigate = useNavigate();
  const { productId } = useParams();

  // useModal 커스텀 훅을 사용하여 모달 상태와 제어 함수 가져오기
  const { isModalOpen, modalMessage, confirmAction, openModal, closeModal } =
    useModal();

  const [product, setProduct] = useState(initState);

  const [isLoading, setIsLoading] = useState(false);

  // 입력값이 변경될 때 상태를 업데이트 하는 함수
  const handleChange = e => {
    const updateProduct = { ...product, [e.target.name]: e.target.value };
    setProduct(updateProduct);
  };

  // 상품 정보를 수정하는 함수
  const handlePatchProduct = async product => {
    try {
      await modifyProduct(product);

      console.log("수정완료");
      //수정 완료 후 모달을 띄움
      openModal({
        message: "수정이 완료 되었습니다!",
        onConfirm: () => {
          closeModal();
          navigate(`/product/${productId}`);
        },
      });
    } catch (error) {
      console.log("수정 중 에러 발생", error);
    }
  };

  // 폼 제출시 호출되는 함수
  const handleSubmit = async e => {
    e.preventDefault();

    await handlePatchProduct(product);
  };

  // 상품 삭제 확인 모달을 여는 함수
  const handleDelete = async id => {
    openModal({
      message: "정말 삭제하시겠습니까?",
      onConfirm: async () => {
        try {
          await deleteProduct(productId);
          closeModal();
          navigate(`/product/`);
        } catch (error) {
          console.log("삭제 중 오류 발생", error);
        }
      },
    });
  };

  //상품 정보를 가져오는 함수
  const fetchProduct = async id => {
    setIsLoading(true);

    try {
      const response = await getProductOne(id);
      const data = response.data;
      if (data && data.product) {
        setProduct(data.product);
      } else {
        console.log("상품 불러오는데 실패");
        return;
      }
    } catch (error) {
      console.log("상품 조회 중 오류 발생", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct(productId);
  }, [productId]);

  console.log(product.id);

  if (isLoading) {
    return <h3>상품 정보를 불러오는 중입니다.</h3>;
  }

  return (
    <div>
      <h2>상품 수정하기</h2>
      <Button label="상품 수정하기" onSubmit={handleSubmit} autoComplete="off">
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={e => handleChange(e)}
        />
        <br />
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={e => handleChange(e)}
        />
        <br />
        <textarea
          type="text"
          rows={4}
          name="explanation"
          value={product.explanation}
          onChange={e => handleChange(e)}
        />
        <br />
        <Button label="상품 수정하기" />
      </Button>
      <Button
        label="상품 삭제하기"
        onClick={() => {
          handleDelete();
          console.log("삭제완료");
        }}
      >
        상품 삭제하기
      </Button>

      <Modal
        isOpen={isModalOpen}
        message={modalMessage}
        onClose={closeModal}
        onConfirm={confirmAction}
      />
    </div>
  );
};

export default ProductModify;
