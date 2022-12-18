export interface ITile {
  description: string;
  imagePath: string;
  title: string;
}

export interface ITileWithID extends ITile {
  id: number;
}
