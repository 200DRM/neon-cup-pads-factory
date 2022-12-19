import { ChangeEvent } from "react";

import { ITileWithID } from "../components/types";
import { api } from "../mockups/api";

interface IFilterTileByTitle {
  dataToFilter: ITileWithID[];
  keyword: string;
}

export const addItem = ({
  description,
  imagePath,
  setActivePage,
  setDescription,
  setImagePath,
  setIsSuccess,
  setNumberOfPages,
  setTiles,
  setTilesLength,
  setTilesPerPage,
  setTitle,
  tiles,
  title,
}: any) => {
  const userTilesInLocalStorage = JSON.parse(
    localStorage.getItem("userTiles") || "[]"
  );
  const newUserTile = {
    description,
    id: tiles.length + 1,
    imagePath,
    title,
  };
  const allTiles = [...tiles, newUserTile];
  const allTilesLength = allTiles.length;
  localStorage.setItem(
    "userTiles",
    JSON.stringify([...userTilesInLocalStorage, newUserTile])
  );
  setActivePage(1);
  setDescription("");
  setTitle("");
  setImagePath("");
  setNumberOfPages(1);
  setTiles(allTiles);
  setTilesLength(allTilesLength);
  setTilesPerPage(allTilesLength);
  setIsSuccess(true);
};

export const addUserTilesToInitialTiles = ({ setTiles, tiles }: any) => {
  const userTiles = JSON.parse(localStorage.getItem("userTiles") || "[]");
  if (!!userTiles.length) {
    const allTiles = [...tiles, ...userTiles];
    setTiles(allTiles);
    return tiles;
  }
};

export const apiTilesWithIDs = () =>
  api.map((tile, index) => ({ ...tile, id: index }));

export const filterTilesByTitle = ({
  dataToFilter,
  keyword,
}: IFilterTileByTitle) =>
  dataToFilter.filter((item: ITileWithID) =>
    item.title.toLowerCase().includes(keyword.toLowerCase())
  );

export const handleManualInput = (e: ChangeEvent<HTMLInputElement>) => {
  const valueToPositive = Math.abs(Number(e.target.value) || 0);

  return (e.target.value = String(valueToPositive));
};
