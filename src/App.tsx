import { useEffect, useMemo, useState } from "react";
import "./App.scss";
import { apiTilesWithIDs } from "./helpers";
import { Pagination } from "./components/Pagination";
import { SearchForm } from "./components/SearchForm";
import { TileUploader } from "./components/TileUploader";
import { Tile } from "./components/Tile";
import { ITileWithID } from "./components/types";
import { TileContext } from "./contexts/appContext";

const App = () => {
  const [activePage, setActivePage] = useState(1);
  const [tiles, setTiles] = useState<ITileWithID[]>(apiTilesWithIDs());
  const [tilesLength, setTilesLength] = useState(tiles.length);
  const [tilesPerPage, setTilesPerPage] = useState<number | "">(tilesLength);
  const [numberOfPages, setNumberOfPages] = useState(1);

  const numberOfTilesOnPrevPages = (activePage - 1) * Number(tilesPerPage);

  const tilesGrid = useMemo(() => {
    const limitedTiles = tiles
      .map((a) => ({ ...a }))
      .splice(numberOfTilesOnPrevPages, tilesLength - numberOfTilesOnPrevPages);

    return (
      <div className="tilesGrid" key={`${tilesLength}-tilesGrid`}>
        {limitedTiles.length > 0 ? (
          limitedTiles.map((tile: ITileWithID, index) => {
            if (index < Number(tilesPerPage)) {
              return <Tile data={tile} key={tile.id} />;
            } else return null;
          })
        ) : (
          <p className="noTiles">
            Unfortunately we have no cup pads matching your criteria.
          </p>
        )}
      </div>
    );
  }, [numberOfTilesOnPrevPages, tiles, tilesLength, tilesPerPage]);

  const pagination = useMemo(() => <Pagination />, []);

  useEffect(() => {
    const userTiles = JSON.parse(localStorage.getItem("userTiles") || "[]");
    if (!!userTiles.length) {
      const allTiles = [...tiles, ...userTiles];
      setTiles(allTiles);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setTilesLength(tiles.length);
    setTilesPerPage(tiles.length);
  }, [tiles.length]);

  return (
    <div className="App">
      <h2 role="presentation">Neon Cup Pads</h2>
      <TileContext.Provider
        value={{
          activePage,
          numberOfPages,
          setActivePage,
          setNumberOfPages,
          setTiles,
          setTilesLength,
          setTilesPerPage,
          tiles,
          tilesLength,
          tilesPerPage,
        }}
      >
        <SearchForm />
        <p className="addCustomTile">...or add your custom one: </p>
        <TileUploader />
        {pagination}
        {tilesGrid}
      </TileContext.Provider>
    </div>
  );
};

export default App;
