import axios from "axios";
import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import "./ProductPage.scss";
export default function ProductPage({ id }) {
  const [product, setProduct] = useState({});

  useEffect(() => {
    axios
      .get("/allProducts.json")
      .then((response) =>
        setProduct(
          response.data.find((product) => product.productId === parseInt(id))
        )
      );
  }, [id]);


  return (
    <>
      <NavBar />
      <div className="productPage">
        <div className="productPage__info">
          <h1>{product?.productName}</h1>
          <h2>@{product?.artistName}</h2>
          <p>DKK {product?.price},00</p>

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
          {/*  <img alt="placeholder" src={product.image[0]} /> */}
        </div>
      </div>
    </>
  );
}
