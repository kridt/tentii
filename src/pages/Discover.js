import React from "react";
import NavBar from "../components/NavBar";
import SideNav from "../components/SideNav";
import { ImageList, ImageListItem } from "@mui/material";
import "./Discover.scss";
import ShuffleThatShi from "../functions/ShufflesThatShi";

export default function Discover() {
  const img1 = [
    `https://unsplash.it/170?image=1`,
    `https://unsplash.it/170?image=2`,
  ];
  const imgs = [
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
  let realImg = ShuffleThatShi(imgs);
  realImg = [img1].concat(realImg);

  return (
    <>
      <h1>discover</h1>
    </>
  );
}
