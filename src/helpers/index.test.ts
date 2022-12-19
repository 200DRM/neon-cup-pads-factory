import React from "react";
import {
  apiTilesWithIDs,
  filterTilesByTitle,
  handleManualInput,
} from "./index";
import { mockedShorterTiles } from "../mockups/forTests";

describe("Add ID to mocked API data", () => {
  test("Test if ID prop is added", () => {
    expect(apiTilesWithIDs()?.[0]).toStrictEqual({
      description: "Level up",
      id: 0,
      imagePath:
        "https://images.unsplash.com/photo-1568659358810-bdbdb4decb5c?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8bmVvbnxlbnwwfHwwfA%3D%3D&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=60",
      title: "Level up",
    });
  });
});

describe("Filter tile by keyword", () => {
  test("Check if function filters tiless' titles by keyword", () => {
    const keyword = "title 321";

    expect(
      filterTilesByTitle({ dataToFilter: mockedShorterTiles, keyword })
    ).toStrictEqual([mockedShorterTiles[1]]);
  });
});

describe("Check if a value passed manually is correct", () => {
  test("Test if while passing negative value it is converted to the positive one", () => {
    const event = {
      target: { value: "-2" },
    } as React.ChangeEvent<HTMLInputElement>;
    expect(handleManualInput(event)).toBe("2");
  });
  test("Test if while passing some symbol it is converted to 0", () => {
    const event = {
      target: { value: "-" },
    } as React.ChangeEvent<HTMLInputElement>;
    expect(handleManualInput(event)).toBe("0");
  });
});
