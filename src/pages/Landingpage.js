import { Link } from "@reach/router";
import axios from "axios";
import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import ProductCard from "../components/ProductCard";
import ShowProfile from "../components/ShowProfile";
import SideNav from "../components/SideNav";
import { auth, db } from "../firebase-config";
import "./Landingpage.scss";

export default function Landingpage() {
  const [currentUser, setCurrentUser] = useState({});
  const [allProducts, setAllProducts] = useState([]);

  const forårsdesigns = {
    backgroundColor: "rgba(112, 145, 118, 0.75)",
    secondaryColor: "rgba(112, 145, 118, 1)",
    title: "Forårsdesigns",
    punchLine: "Gå en lysere fremtid i møde",
    bigImg: "https://via.placeholder.com/363x300",
  };
  const gyldneDesigns = {
    backgroundColor: "rgba(255, 153, 0, 0.75)",
    secondaryColor: "rgba(255, 153, 0, 1)",
    title: "Gyldne Designs",
    punchLine: "Skil dig ud i din hverdag",
    bigImg: "https://via.placeholder.com/363x300",
  };
  const perlerOgSten = {
    backgroundColor: "rgba(41, 59, 102, 0.75)",
    secondaryColor: "rgba(41, 59, 102, 1)",
    title: "Naturligt til dig",
    punchLine: "Skil dig ud i din hverdag",
    bigImg: "https://via.placeholder.com/363x300",
  };

  const sellers = [456789, 852852, 123456, 321123, 321123, 123123];

  useEffect(() => {
    db.collection("allProducts")
      .get()
      .then((product) => setAllProducts(product.docs));
  }, [setAllProducts]);

  function test2() {
    const yes = allProducts.filter(
      (product) => product.data().seller === 123123
    );
    console.log(yes.map((product) => product.data()));
  }

  useEffect(() => {
    axios
      .get("https://api.dataforsyningen.dk/postnumre")
      .then((res) => console.log(res.data));
  }, []);

  function test(e) {
    sellers.map((id) => {
      const sellersProducts = allProducts.filter(
        (product) => product.data().seller === id
      );
      db.collection("sellers")
        .doc(`${id}`)
        .set({
          backgroundImg: "https://via.placeholder.com/150x200",
          displayName: "Aluna",
          email: null,
          followers: 25,
          personalTags: ["tag1", "tag2", "tag3"],
          primaryColor: "red",
          products: sellersProducts.map((product) => product.data()),
          profileDescription: "Lorem ipsum dolor sit amet",
          profileImg: "https://via.placeholder.com/150x200",
          ratings: 2.5,
          secondaryColor: "blue",
          sellerId: id,
        });
    });
  }

  auth.onAuthStateChanged((user) =>
    user ? setCurrentUser(user) : setCurrentUser(null)
  );
  return (
    <>
      <NavBar />
      <SideNav />
      {/* <button onClick={() => test()}>set database</button> */}

      <ShowProfile sellerId={123123} collection={gyldneDesigns} />
      <ShowProfile sellerId={456789} collection={forårsdesigns} />
      <ShowProfile sellerId={123456} collection={perlerOgSten} />

      {/* <div className="goldenDesigns">
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
      </div> */}
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
