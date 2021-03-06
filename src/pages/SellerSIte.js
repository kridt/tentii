import { Link } from "@reach/router";
import axios from "axios";
import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import SideNav from "../components/SideNav";
import { db } from "../firebase-config";
import "./SellerSite.scss";

export default function SellerSIte({ id }) {
  const [seller, setSeller] = useState({});

  useEffect(() => {
    db.collection("sellers")
      .doc(`${id}`)
      .get()
      .then((seller) => {
        setSeller(seller.data());
      });

    /* axios
      .get("/sellers.json")
      .then((response) =>
        setSeller(
          response.data.find((seller) => seller.sellerId === parseInt(id))
        )
      ); */
  }, [setSeller, id]);

  console.log(seller);

  function Product({ productId, title, price, img, str }) {
    if (str.length > 1) {
      str = "Flere Størelser";
    } else {
      str = "Str. " + str[0];
    }

    return (
      <Link
        style={{
          color: "black",
          textDecoration: "none",
          margin: "0 auto",
        }}
        to={"/product/" + productId}
      >
        <div>
          <img alt="placeholder" src={img} />
        </div>
        <p>{title}</p>
        <p>DKK {price}</p>
        <p>{str}</p>
      </Link>
    );
  }

  return (
    <>
      <NavBar />
      <SideNav />

      <div className="sellerProfile">
        <div className="profileInfo__leftImg">
          <img
            style={{
              width: "150px",
              height: "150px",
            }}
            src={seller.profileImg}
            alt="placeholder"
          />
        </div>
        <div className="sellerStats">
          <button>Følg</button>
          <div className="profileStats">
            <div className="profileStats__posts">
              <p>{seller?.products?.length}</p>
              <p>Opslag</p>
            </div>
            <div className="profileStats__followers">
              <p>{seller?.followers}</p>
              <p>Følgere</p>
            </div>
            <div className="profileStats__rating">
              <p>{seller?.ratings}</p>
              <p>rating</p>
            </div>
          </div>
        </div>
      </div>
      <div className="sellerInfo">
        <Link to={"/sellerSite/" + seller?.sellerId}>
          @{seller?.displayName}
        </Link>

        <div className="sellerDescription">
          <p>{seller?.profileDescription}</p>
        </div>
      </div>

      <div className="sellerProducts">
        <h2
          style={{
            color: "#000",
          }}
        >
          Mine produkter
        </h2>
        <div className="sellerProducts__itemList">
          {seller?.products?.map((product) => {
            return (
              <Product
                str={product.sizes}
                title={product.title}
                price={product.price}
                img={product.images[0]}
                key={product.productId}
                productId={product.productId}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
