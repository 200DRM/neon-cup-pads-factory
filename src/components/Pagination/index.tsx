import { ChangeEvent, useContext } from "react";

import { TileContext } from "../../contexts/appContext";
import { handleManualInput } from "../../helpers";

import "./styles.scss";

export const Pagination = () => {
  const {
    activePage,
    numberOfPages,
    tilesLength,
    tilesPerPage,
    setActivePage,
    setNumberOfPages,
    setTilesPerPage,
  } = useContext(TileContext);
  const isBackActive = activePage > 1;
  const isNextActive = activePage < numberOfPages;

  const handleChangeTilesPerPage = (e: ChangeEvent<HTMLInputElement>) => {
    const updatedTilesPerPage = Number(e.target.value);
    const updatedNumberOfPages = Math.ceil(tilesLength / updatedTilesPerPage);

    setActivePage(1);

    if (tilesPerPage !== "" && updatedNumberOfPages !== Infinity) {
      setNumberOfPages(updatedNumberOfPages);
      setTilesPerPage(updatedTilesPerPage);
    } else {
      setNumberOfPages(1);
      setTilesPerPage(tilesLength);
    }
  };

  const handleGoToPrevious = () => {
    if (activePage !== 1) {
      setActivePage(activePage - 1);
    }
  };
  const handleGoToNext = () => {
    if (activePage !== numberOfPages) {
      setActivePage(activePage + 1);
    }
  };

  return (
    <div className="pagination">
      <div>
        <span
          className={`arrow${isBackActive ? " active" : ""}`}
          key={`backArrow${isBackActive}`}
          onClick={handleGoToPrevious}
          role="navigation"
          tabIndex={0}
        >
          ⬸
        </span>
        <span className="pageCounter">
          page {activePage} of {numberOfPages}
        </span>
        <span
          className={`arrow${isNextActive ? " active" : ""}`}
          key={`nextArrow${isNextActive}`}
          onClick={handleGoToNext}
          role="navigation"
          tabIndex={0}
        >
          ⤑
        </span>
      </div>
      <div className="tilesPerPage">
        <label htmlFor="tilesPerPageInput">tiles per page: </label>
        <input
          className="tilesPerPageInput"
          name="tilesPerPageInput"
          defaultValue={tilesPerPage}
          key={`${tilesLength}-tiles-per-page`}
          type="number"
          min="0"
          max={tilesLength}
          onChange={handleChangeTilesPerPage}
          onInput={handleManualInput}
          role="navigation"
          tabIndex={0}
        />
      </div>
    </div>
  );
};
