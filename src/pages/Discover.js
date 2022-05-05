import React, { useEffect } from "react";
import NavBar from "../components/NavBar";
import SideNav from "../components/SideNav";
import { ImageList, ImageListItem } from "@mui/material";
import "./Discover.scss";
import ShuffleThatShi from "../functions/ShufflesThatShi";

export default function Discover() {
  const [images, setImages] = React.useState([]);

  useEffect(() => {
    setImages([
      `https://unsplash.it/170?image=${Math.floor(Math.random() * 500)}`,
      `https://unsplash.it/170?image=${Math.floor(Math.random() * 500)}`,
      `https://unsplash.it/170?image=${Math.floor(Math.random() * 500)}`,
      `https://unsplash.it/170?image=${Math.floor(Math.random() * 500)}`,
      `https://unsplash.it/170?image=${Math.floor(Math.random() * 500)}`,
      `https://unsplash.it/170?image=${Math.floor(Math.random() * 500)}`,
      `https://unsplash.it/170?image=${Math.floor(Math.random() * 500)}`,
      `https://unsplash.it/170?image=${Math.floor(Math.random() * 500)}`,
      `https://unsplash.it/170?image=${Math.floor(Math.random() * 500)}`,
      `https://unsplash.it/170?image=${Math.floor(Math.random() * 500)}`,
      `https://unsplash.it/600/400?image=${Math.floor(Math.random() * 500)}`,
      `https://unsplash.it/600/400?image=${Math.floor(Math.random() * 500)}`,
      `https://unsplash.it/600/400?image=${Math.floor(Math.random() * 500)}`,
      `https://unsplash.it/600/400?image=${Math.floor(Math.random() * 500)}`,
      `https://unsplash.it/600/400?image=${Math.floor(Math.random() * 500)}`,
      `https://unsplash.it/600/400?image=${Math.floor(Math.random() * 500)}`,
      `https://unsplash.it/600/400?image=${Math.floor(Math.random() * 500)}`,
      `https://unsplash.it/600/400?image=${Math.floor(Math.random() * 500)}`,
      `https://unsplash.it/600/400?image=${Math.floor(Math.random() * 500)}`,
      `https://unsplash.it/600/400?image=${Math.floor(Math.random() * 500)}`,
    ]);
  }, [setImages]);

  return (
    <div>
      <NavBar />
      <SideNav />
      <h1>Opdag</h1>
      <div className="photoGallery">
        <ImageList variant="masonry" cols={3} gap={16}>
          {images.map((item) => {
            /* if (item.length === 2) {
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
            } */

            return (
              <ImageListItem key={item}>
                <img
                  alt="placeholder"
                  className="discoverImg"
                  loading="lazy"
                  src={item}
                />
              </ImageListItem>
            );
          })}
        </ImageList>
      </div>
    </div>
  );
}
