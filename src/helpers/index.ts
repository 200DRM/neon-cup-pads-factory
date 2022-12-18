import { api } from "../mockups/api";

export const apiTilesWithIDs = () =>
  api.map((tile, index) => ({ ...tile, id: index }));
