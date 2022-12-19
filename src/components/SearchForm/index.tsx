import { ChangeEvent, useContext } from "react";

import { apiTilesWithIDs, filterTilesByTitle } from "../../helpers";
import { TileContext } from "../../contexts/appContext";

import "./styles.scss";

export const SearchForm = () => {
  const { tilesPerPage, setActivePage, setNumberOfPages, setTiles } =
    useContext(TileContext);

  const filterTiles = (keyword: string) => {
    const userTiles = JSON.parse(localStorage.getItem("userTiles") || "[]");
    const allTiles = [...apiTilesWithIDs(), ...userTiles];
    const filteredTiles = filterTilesByTitle({
      dataToFilter: allTiles,
      keyword,
    });

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
