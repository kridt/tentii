import React, { useEffect, useState } from "react";

export default function MakeFav({ id }) {
  const [fav, setFav] = useState(false);

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

  useEffect(() => {
    const product = testProducts.find((product) => product.id === id);

    product.fav = fav;
  }, [testProducts]);

  function makeFav(e) {
    e.preventDefault();

    if (fav === false) {
      setFav(true);
      console.log(`Product ${id} is now a favorite`);
    } else {
      setFav(false);
      console.log(`Product ${id} is no longer a favorite`);
    }
  }

  return (
    <button
      style={{
        color: fav ? "red" : "white",
        fontSize: "2em",
        backgroundColor: "transparent",
        border: "none",
      }}
      onClick={(e) => makeFav(e)}
    >
      <i className="fa-solid fa-heart"></i>
    </button>
  );
}
