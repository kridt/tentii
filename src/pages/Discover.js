import React from "react";
import NavBar from "../components/NavBar";
import SideNav from "../components/SideNav";
import { ImageList, ImageListItem } from "@mui/material";
import "./Discover.scss";
import ShuffleThatShi from "../functions/ShufflesThatShi";

export default function Discover() {
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
  const realImg = ShuffleThatShi(imgs);

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
