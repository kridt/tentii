import axios from "axios";
import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import SellerCard from "../components/SellerCard";
import "./Sellers.scss";

export default function Sellers() {
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    axios.get("/sellers.json").then((response) => setSellers(response.data));
  }, [setSellers]);

  return (
    <>
      <NavBar sideNav={true} />
      <div className="sellers_topImg">
        <img alt="topImg" src="https://via.placeholder.com/390x290" />
      </div>

      <div className="sellersList">
        {sellers.map((seller) => {
          return (
            <SellerCard key={seller.sellerId} sellerId={seller.sellerId} />
          );
        })}
      </div>
    </>
  );
}
