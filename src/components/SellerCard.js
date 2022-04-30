import { Link } from "@reach/router";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./SellerCard.scss";
import GetBackgroundColor from "../functions/GetBackgroundColor";
import ProductCard from "./ProductCard";

export default function SellerCard({ sellerId }) {
  const [seller, setSeller] = useState({});

  useEffect(() => {
    axios
      .get("/sellers.json")
      .then((response) => response.data)
      .then((data) => {
        setSeller(data.find((seller) => seller.sellerId === sellerId));
      });
  }, [setSeller, sellerId]);

  console.log(seller);

  return (
    <div
      className="profileCard"
      style={{
        backgroundColor: GetBackgroundColor(seller.sellerId) || "#8E936D",
      }}
    >
      <div className="profileInfo">
        <div className="profileInfo__leftImg">
          <img src="https://via.placeholder.com/130" alt="placeholder" />
          <Link to="/">@{seller?.displayName}</Link>
        </div>
        <div>
          <button>Følg</button>
          <div className="profileStats">
            <div className="profileStats__posts">
              <p>{seller.products?.length}</p>
              <p>Opslag</p>
            </div>
            <div className="profileStats__followers">
              <p>{seller?.followers}</p>
              <p>Følgere</p>
            </div>
            <div className="profileStats__rating">
              <p>4.5</p>
              <p>rating</p>
            </div>
          </div>
        </div>
      </div>

      <div className="productCollection">
        {seller.products?.map((product) => {
          return (
            <ProductCard
              img={product.images[0]}
              id={product.productId}
              productName={product.title}
              price={product.price}
              artistName={seller.displayName}
              key={product.productId}
            />
          );
        })}
      </div>
    </div>
  );
}
