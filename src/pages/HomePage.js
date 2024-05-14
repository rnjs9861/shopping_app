import { useEffect, useRef, useState } from "react";

const ProductItem = ({ product, onDelete, onUpdate }) => {
  const { id, name, price, explanation } = product;

  const [isEditMode, setIsEditMode] = useState(false);

  const [editName, setEditName] = useState(product.name); //product밖에 안받아오니 product 생략해도 됨

  const [editExplanation, setEditExplanation] = useState(product.explanation);

  const [editPirce, setEditPrice] = useState(product.price);

  return (
    <div>
      <div>{id}</div>
      <div>{name}</div>
      <div>{price}</div>
      <div>{explanation}</div>

      <button type="button" onClick={() => onDelete(id)}>
        삭제하기
      </button>
      <button
        type="button"
        onClick={() => setIsEditMode(isEditMode => !isEditMode)}
      >
        수정하기
      </button>
      {/* 수정하기 폼 */}
      {isEditMode && (
        <form
          onSubmit={e => {
            e.preventDefault();
            onUpdate({
              id,
              name: editName,
              explanation: editExplanation,
              price: editPirce,
            });
          }}
        >
          <input
            type="text"
            placeholder="상품 이름"
            value={editName}
            onChange={e => setEditName(e.target.value)}
          ></input>
          <input
            type="text"
            placeholder="상품 설명"
            value={editExplanation}
            onChange={e => setEditExplanation(e.target.value)}
          ></input>
          <input
            type="number"
            placeholder="상품 가격"
            value={editPirce}
            onChange={e => setEditPrice(parseInt(e.target.value, 10))}
          ></input>
          <input type="submit" value="상품 수정하기"></input>
        </form>
      )}
    </div>
  );
};

const HomePage = () => {
  //상태관리
  const [products, setProducts] = useState([
    {
      id: 0,
      name: "스타벅스 기프티콘",
      explanation:
        "교환유효기간은 93일 입니다. (시즌성 상품, 기업경품(B2B), 할인상품의 경우 유효기간이 상이 할 수 있습니다.)",
      price: 10000,
    },
  ]);
  const [name, setName] = useState("");
  const [explanation, setExplanation] = useState("");
  const [price, setPrice] = useState(0);

  const fakeId = useRef(0);

  //이벤트 핸들러 함수
  const handleCreate = newProduct => {
    fakeId.current += 1;
    setProducts([...products, { ...newProduct, id: fakeId.current }]);
  };

  const handleDelete = id => {
    setProducts(products.filter(product => product.id !== id));
  };

  const handleUpdate = updatedProduct => {
    setProducts(
      products.map(product =>
        product.id === updatedProduct.id ? updatedProduct : product,
      ),
    );
  };

  useEffect(() => {
    //proxy(localhost:3090)는 이미 package.json에 설정했기에 생략해도된다
    fetch("/product")
      .then(response => response.json())
      .then(data => setProducts(data.products));
  }, []);

  return (
    <>
      <form
        onSubmit={e => {
          e.preventDefault();
          handleCreate({ name, explanation, price });
        }}
      >
        <input
          type="text"
          placeholder="상품 이름"
          onChange={e => {
            setName(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="상품 설명"
          onChange={e => {
            setExplanation(e.target.value);
          }}
        />
        <input
          type="number"
          placeholder="상품 가격"
          onChange={e => {
            setPrice(parseInt(e.target.value, 10));
          }}
        />
        <input type="submit" value="상품 등록하기" />
      </form>

      {products.map(product => (
        <ProductItem
          key={product.id}
          product={product}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      ))}
    </>
  );
};

export default HomePage;