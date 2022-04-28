import { Link } from "@reach/router";
import React from "react";
import MakeFav from "./MakeFav";
import "./ProductCard.scss";

export default function ProductCard({
  img,
  id,
  productName,
  price,
  artistName,
}) {
  return (
    <div className="productCard">
      <Link to={"/product/" + id}>
        <div className="imgPart">
          <img alt="placeholder" src={img} />
          <div className="heart">
            <MakeFav id={id} />
          </div>
          <div className="productInfo">
            <p>
              <strong>{artistName}</strong>
            </p>
            <p>{productName}</p>
            <p>{price},00 kr</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
