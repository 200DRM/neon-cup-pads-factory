import { ChangeEvent, useContext } from "react";

import { apiTilesWithIDs } from "../../helpers";
import { ITileWithID } from "../../components/types";
import { TileContext } from "../../contexts/appContext";

import "./styles.scss";

export const SearchForm = () => {
  const { tilesPerPage, setActivePage, setNumberOfPages, setTiles } =
    useContext(TileContext);

  const filterTiles = (keyword: string) => {
    const userTiles = JSON.parse(localStorage.getItem("userTiles") || "[]");
    const allTiles = [...apiTilesWithIDs(), ...userTiles];
    const filteredTiles = allTiles.filter((tile: ITileWithID) =>
      tile.title.toLowerCase().includes(keyword.toLowerCase())
    );

    setActivePage(1);
    setTiles(filteredTiles);
    setNumberOfPages(
      Math.ceil(filteredTiles.length / Number(tilesPerPage)) || 1
    );
  };

  return (
    <div className="searchForm">
      <input
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          filterTiles(e.target.value)
        }
        placeholder="search for a neon cup pad..."
        role="search"
        tabIndex={0}
      ></input>
    </div>
  );
};
