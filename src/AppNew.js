import { useRef, useState } from "react";

const ProductItem = ({ product }) => {
  const { id, name, price, explanation } = product;

  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <div>
      <div>{id}</div>
      <div>{name}</div>
      <div>{price}</div>
      <div>{explanation}</div>

      <button type="button" onClick={() => console.log("삭제하기")}>
        삭제하기
      </button>
      <button type="button" onClick={() => console.log("수정하기")}>
        수정하기
      </button>
    </div>
  );
};

function App() {
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

  const handleCreate = newProduct => {
    fakeId.current += 1;
    setProducts([...products, { ...newProduct, id: fakeId.current }]);
  };

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
        <ProductItem key={product.id} product={product} />
      ))}
    </>
  );
}

export default App;
