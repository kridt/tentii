import React from "react";
import NavBar from "../components/NavBar";
import "./ProductPage.scss";
export default function ProductPage({ id }) {
  const testProducts = [
    {
      img: "https://via.placeholder.com/150x200",
      id: 1,
      productName: "Forgyldt ring1",
      artistName: "Aluna",
      price: 200,
    },
    {
      img: "https://via.placeholder.com/150x200",
      id: 2,
      productName: "Forgyldt ring2",
      artistName: "Aluna",
      price: 200,
    },
    {
      img: "https://via.placeholder.com/150x200",
      id: 3,
      productName: "Forgyldt ring3",
      artistName: "Aluna",
      price: 200,
    },
    {
      img: "https://via.placeholder.com/150x200",
      id: 4,
      productName: "Forgyldt ring4",
      artistName: "Aluna",
      price: 200,
    },
    {
      img: "https://via.placeholder.com/150x200",
      id: 5,
      productName: "Forgyldt ring5",
      artistName: "Aluna",
      price: 200,
    },
    {
      img: "https://via.placeholder.com/150x200",
      id: 6,
      productName: "Forgyldt ring6",
      artistName: "Aluna",
      price: 200,
    },
    {
      img: "https://via.placeholder.com/150x200",
      id: 7,
      productName: "Forgyldt ring7",
      artistName: "Aluna",
      price: 200,
    },
  ];

  const currentProduct = testProducts.find(
    (product) => product.id === parseInt(id)
  );
  console.log(currentProduct);

  return (
    <>
      <NavBar />
      <div className="productPage">
        <div className="productPage__info">
          <h1>{currentProduct.productName}</h1>
          <h2>@{currentProduct.artistName}</h2>
          <p>DKK {currentProduct.price},00</p>

          <p>
            Lorem ipsum dolor sit amet. Qui vitae dolorum qui adipisci iure ex
            odio possimus ea aliquid ullam in sunt optio aut ullam expedita ut
            voluptas blanditiis!
          </p>
          <div className="productButtons">
            <button className="buyBut">Køb nu!</button>
            <button className="favBut">Tilføj til ønskeliste</button>
          </div>
          <div className="folders">
            <div className="productInfomation">
              <h3>produktinformation</h3>
            </div>
            <div className="productInfomation">
              <h3>produktinformation</h3>
            </div>
            <div className="productInfomation">
              <h3>produktinformation</h3>
            </div>
            <div className="productInfomation">
              <h3>produktinformation</h3>
            </div>
          </div>
        </div>
        <div className="productPage__image">
          <img alt="placeholder" src={currentProduct.img} />
        </div>
      </div>
    </>
  );
}
