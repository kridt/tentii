import { Link } from "@reach/router";
import React from "react";
import NavBar from "../components/NavBar";
import ProductCard from "../components/ProductCard";
import SideNav from "../components/SideNav";
import "./Landingpage.scss";

export default function Landingpage() {
  const testProducts = [
    {
      img: "https://via.placeholder.com/150x200",
      id: 1,
      productName: "Forgyldt ring1",
      artistName: "Aluna",
      price: 2000,
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

  return (
    <>
      <NavBar />
      <SideNav />

      <div className="goldenDesigns">
        <div className="headOfGoldenDesigns">
          <h1>Gyldne designs</h1>
          <p>Skil dig ud i din hverdag</p>

          <img alt="placeholder" src="https://via.placeholder.com/363x302" />
        </div>
        <div className="goldenDesignsProductSelection">
          <div className="goldenDesignsProductSelection__selection">
            {testProducts.map((product) => {
              return (
                <ProductCard
                  img={product.img}
                  id={product.id}
                  productName={product.productName}
                  price={product.price}
                  artistName={product.artistName}
                />
              );
            })}
          </div>

          <div className="artistOfTheDay">
            <h2>Dagens Kunstner</h2>
            <h3>@Aluna</h3>
          </div>
        </div>
      </div>

      <div className="goldenDesigns spring">
        <div className="headOfGoldenDesigns">
          <h1>Forårsdesigns</h1>
          <p>Gå en lysere tid i møde</p>

          <img alt="placeholder" src="https://via.placeholder.com/363x302" />
        </div>
        <div className="goldenDesignsProductSelection">
          <div className="goldenDesignsProductSelection__selection">
            {testProducts.map((product) => {
              return (
                <ProductCard
                  img={product.img}
                  id={product.id}
                  productName={product.productName}
                  price={product.price}
                  artistName={product.artistName}
                />
              );
            })}
          </div>

          <div className="artistOfTheDay">
            <h2>Ringe til hende</h2>
            <h3>Unikke håndlavet designs</h3>
          </div>
        </div>
      </div>
      <div className="goldenDesigns pearls">
        <div className="headOfGoldenDesigns">
          <h1>Forårsdesigns</h1>
          <p>Gå en lysere tid i møde</p>

          <img alt="placeholder" src="https://via.placeholder.com/363x302" />
        </div>
        <div className="goldenDesignsProductSelection">
          <div className="goldenDesignsProductSelection__selection">
            {testProducts.map((product) => {
              return (
                <ProductCard
                  img={product.img}
                  id={product.id}
                  productName={product.productName}
                  price={product.price}
                  artistName={product.artistName}
                />
              );
            })}
          </div>

          <div className="artistOfTheDay">
            <h2>Rav og perler</h2>
            <h3>udforsk havets skønheder</h3>
          </div>
        </div>
      </div>

      <div className="joinTentii">
        <div className="joinTentii__text">
          <p>Er du klar til at starte din rejse?</p>
          <Link to="/">Bliv en del af Tentii</Link>
        </div>
        <img alt="placeholder" src="https://via.placeholder.com/390x322" />
      </div>
    </>
  );
}
