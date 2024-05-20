import React from "react";
import { useNavigate } from "react-router-dom";

const Layout = ({ children }) => {
  const navigate = useNavigate();

  const handleMoveHome = () => navigate("/");
  const handleMoveCreate = () => navigate("/create");

  return (
    <>
      <ul>
        <li onClick={handleMoveHome} style={{ cursor: "pointer" }}>
          홈으로
        </li>
        <li onClick={handleMoveCreate}>상품 등록하기</li>
        <li>장바구니</li>
      </ul>
      <div>{children}</div>
    </>
  );
};

export default Layout;
