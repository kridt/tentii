import React from "react";

export default function MakeFav({ id }) {
  function makeFav(e) {
    e.preventDefault();
    console.log(`Product ${id} is now a favorite`);
  }

  return (
    <button
      style={{
        backgroundColor: "red",
      }}
      onClick={(e) => makeFav(e)}
    >
      <p>&lt;3</p>
    </button>
  );
}
