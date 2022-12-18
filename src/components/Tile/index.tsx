import DOMPurify from "isomorphic-dompurify";
import { FC } from "react";
import { ITile } from "../types";

import "./styles.scss";

interface IProps {
  data: ITile;
}

export const Tile: FC<IProps> = ({ data }) => {
  const { description, imagePath, title } = data;

  return (
    <div className="tile">
      <img
        alt={`${title} cup pad`}
        height="100px"
        loading="lazy"
        width="100px"
        src={imagePath}
      />
      <div className="text">
        <h2
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(title) }}
          role="presentation"
        />
        <p
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description) }}
        />
      </div>
    </div>
  );
};
