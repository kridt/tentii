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
    while (currentIndex !== 0) {
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
    [`https://unsplash.it/170?image=1`, `https://unsplash.it/170?image=2`],
    [`https://unsplash.it/170?image=1`, `https://unsplash.it/170?image=2`],
    [`https://unsplash.it/170?image=1`, `https://unsplash.it/170?image=2`],
    [`https://unsplash.it/170?image=1`, `https://unsplash.it/170?image=2`],
    [`https://unsplash.it/170?image=1`, `https://unsplash.it/170?image=2`],
    [`https://unsplash.it/170?image=1`, `https://unsplash.it/170?image=2`],
    [`https://unsplash.it/170?image=1`, `https://unsplash.it/170?image=2`],
    [`https://unsplash.it/170?image=1`, `https://unsplash.it/170?image=2`],
    [`https://unsplash.it/170?image=1`, `https://unsplash.it/170?image=2`],
    "https://unsplash.it/600/400?image=2",
    "https://unsplash.it/600/400?image=2",
    "https://unsplash.it/600/400?image=2",
    "https://unsplash.it/600/400?image=2",
    "https://unsplash.it/600/400?image=2",
    "https://unsplash.it/600/400?image=4",
    "https://unsplash.it/600/400?image=4",
    "https://unsplash.it/600/400?image=4",
    "https://unsplash.it/600/400?image=4",
  ];
  const realImg = shuffle(imgs);

  return (
    <div>
      <NavBar />
      <SideNav />
      <h1>Opdag</h1>
      <div className="photoGallery">
        <ImageList variant="masonry" cols={1} gap={16}>
          {realImg.map((item) => {
            console.log(item.length);

            if (item.length === 2) {
              return (
                <ImageListItem key={item}>
                  <img
                    className="smallImg first"
                    src={item[0]}
                    alt="placeholder"
                  />
                  <img
                    className="smallImg secound"
                    src={item[1]}
                    alt="placeholder"
                  />
                </ImageListItem>
              );
            }

            return (
              <ImageListItem key={item}>
                <img alt="placeholder" className="discoverImg" src={item} />
              </ImageListItem>
            );
          })}
        </ImageList>
      </div>
    </div>
  );
}
