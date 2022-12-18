import { FC } from "react";

import "./styles.scss";

interface IProps {
  onClick: () => void;
  text: string;
}

export const Toast: FC<IProps> = ({ onClick, text }) => {
  return (
    <div className="toast" onClick={onClick}>
      {text}
    </div>
  );
};
