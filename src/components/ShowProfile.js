import { display } from "@mui/system";
import { Link } from "@reach/router";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { db } from "../firebase-config";
import MakeFav from "./MakeFav";

export default function ShowProfile({ sellerId, collection }) {
  const [seller, setSeller] = useState({});

  useEffect(() => {
    db.collection("sellers")
      .doc(`${sellerId}`)
      .get()
      .then((item) => {
        setSeller(item.data());
      });
  }, [sellerId, setSeller]);

  return (
    <div
      style={{
        backgroundColor: collection.backgroundColor,
        color: "white",
      }}
    >
      <div
        style={{
          padding: "0 2em",
        }}
      >
        <h1>{collection.title}</h1>
        <p>{collection.punchLine}</p>
      </div>
      <div
        style={{
          paddingLeft: "2em",
          maxWidth: "360px",
        }}
      >
        <img
          style={{
            width: "100%",
            height: "auto",
          }}
          src={collection.bigImg}
          alt={collection.title}
        />
      </div>

      <div
        style={{
          backgroundColor: collection.secondaryColor,
        }}
      >
        <div
          style={{
            display: "flex",
            overflowX: "scroll",
            paddingTop: "1em",
            paddingLeft: "2em",
          }}
        >
          {seller?.products?.map((product) => {
            return (
              <div
                style={{
                  paddingRight: "1em",
                }}
                key={product.productId}
              >
                <Link
                  style={{
                    textDecoration: "none",
                    color: "white",
                  }}
                  to={"/product/" + product.productId}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr",
                      gridTemplateRows: "1fr",
                    }}
                  >
                    <img
                      style={{
                        gridArea: "1/1/1/1",
                      }}
                      src={product?.images[0]}
                      alt={product.title}
                    />
                    <div
                      style={{
                        gridArea: "1/1/1/1",
                        display: "flex",
                        justifyContent: "right",
                        alignItems: "baseline",
                        padding: "0.1em",
                      }}
                    >
                      <MakeFav id={product.productId} />
                    </div>
                  </div>
                  <p>{seller.displayName}</p>
                  <p>{product.title}</p>
                  <p>{product.price},00 kr</p>
                </Link>
              </div>
            );
          })}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <h3
            style={{
              textAlign: "center",
            }}
          >
            Dagens kunstner
          </h3>
          <Link
            style={{
              textDecoration: "none",
              color: "white",
              fontSize: "1.5em",
              textAlign: "center",
              paddingBottom: "1em",
            }}
            to={"/sellerSite/" + seller.sellerId}
          >
            @{seller.displayName}
          </Link>
        </div>
      </div>
    </div>
  );
}
