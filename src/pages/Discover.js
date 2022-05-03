import React from "react";
import NavBar from "../components/NavBar";
import SideNav from "../components/SideNav";
import { ImageList, ImageListItem } from "@mui/material";
import "./Discover.scss";

export default function Discover() {
  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }
  const imgs = [
    `https://unsplash.it/170/170?image=1`,
    "https://unsplash.it/600/400?image=2",
    "https://unsplash.it/170/170?image=3",
    "https://unsplash.it/600/400?image=4",
    "https://unsplash.it/170/170?image=5",
    "https://unsplash.it/600/400?image=6",
    "https://unsplash.it/170/170?image=7",
    "https://unsplash.it/600/400?image=8",
    "https://unsplash.it/170/170?image=9",
    "https://unsplash.it/600/400?image=10",
    "https://unsplash.it/170/170?image=11",
    "https://unsplash.it/600/400?image=12",
    "https://unsplash.it/170/170?image=13",
    "https://unsplash.it/600/400?image=14",
    "https://unsplash.it/170/170?image=15",
    "https://unsplash.it/600/400?image=16",
    "https://unsplash.it/170/170?image=17",
    "https://unsplash.it/600/400?image=18",
  ];
  const realImg = shuffle(imgs);

  console.log(realImg);

  return (
    <div>
      <NavBar />
      <SideNav />
      <h1>Opdag</h1>
      <div className="photoGallery">
        <ImageList variant="masonry" cols={1} gap={16}>
          {imgs.map((item) => (
            <ImageListItem key={item}>
              <img src={item} />
            </ImageListItem>
          ))}
        </ImageList>
      </div>
    </div>
  );
}
