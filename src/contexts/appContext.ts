import { createContext } from "react";

import { ITileWithID } from "../components/types";

interface IProps {
  activePage: number;
  numberOfPages: number;
  setActivePage: (v: number) => void;
  setNumberOfPages: (v: number) => void;
  setTiles: (t: ITileWithID[]) => void;
  setTilesLength: (v: number) => void;
  setTilesPerPage: (v: number) => void;
  tiles: ITileWithID[];
  tilesLength: number;
  tilesPerPage: number | "";
}

export const TileContext = createContext({} as IProps);
