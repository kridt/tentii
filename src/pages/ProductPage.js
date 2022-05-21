import { Link } from "@reach/router";
import axios from "axios";
import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { db } from "../firebase-config";
import "./ProductPage.scss";
export default function ProductPage({ id }) {
  const [product, setProduct] = useState({});
  const [seller, setSeller] = useState({});

  useEffect(() => {
    db.collection("allProducts")
      .doc(`${id}`)
      .get()
      .then((product) => {
        console.log(product.data());
        setProduct(product.data());
      });
  }, [id, setProduct]);

  useEffect(() => {
    db.collection("sellers")
      .doc(`${product?.seller}`)
      .get()
      .then((seller) => {
        console.log(seller.data());
        setSeller(seller.data());
      });
  }, [product, setSeller]);

  return (
    <>
      <NavBar />
      <div className="productPage">
        <div className="productPage__info">
          <h1>{product?.title}</h1>
          <h2
            style={{
              color: "black",
              textAlign: "left",
            }}
          >
            @{seller?.displayName}
          </h2>
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
          <img src={"https://via.placeholder.com/150"} alt="product" />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "2em 1em",
        }}
      >
        <div
          style={{
            alignSelf: "center",
          }}
        >
          <Link
            style={{
              textDecoration: "none",
              color: "black",
              fontSize: "2.5em",
              fontWeight: "bold",
            }}
            to={"/sellerSite/" + seller?.sellerId}
          >
            @{seller?.displayName}
          </Link>
          <h2
            style={{
              color: "black",
              textAlign: "left",
            }}
          >
            Meet the artist
          </h2>
        </div>
        <div>
          <img
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "40%",
            }}
            src={seller?.profileImg}
            alt="placeholder"
          />
        </div>
      </div>
      <div
        style={{
          margin: "0em 1em",
          padding: "1em",
          backgroundColor: "rgba(112, 145, 118, 0.25)",
          borderTop: "2px solid rgba(112, 145, 118, 1)",
        }}
      >
        <p>{seller?.profileDescription}</p>
      </div>
      <div
        style={{
          margin: "0em 1em",
        }}
      >
        <h2
          style={{
            color: "black",
            textAlign: "left",
            fontSize: "1.5em",
          }}
        >
          Inspireret
        </h2>
      </div>
    </>
  );
}
