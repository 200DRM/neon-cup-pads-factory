import { ChangeEvent, useContext, useEffect, useState } from "react";

import { TileContext } from "../../contexts/appContext";
import { Toast } from "../../components/Toast";

import "./styles.scss";

export const TileUploader = () => {
  const { tiles, setNumberOfPages, setTiles, setTilesLength, setTilesPerPage } =
    useContext(TileContext);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleAddNewItem = () => {
    const userTilesInLocalStorage = JSON.parse(
      localStorage.getItem("userTiles") || "[]"
    );
    const newUserTile = {
      description,
      id: tiles.length + 1,
      imagePath,
      title,
    };
    const allTiles = [...tiles, newUserTile];
    const allTilesLength = allTiles.length;
    localStorage.setItem(
      "userTiles",
      JSON.stringify([...userTilesInLocalStorage, newUserTile])
    );
    setDescription("");
    setTitle("");
    setImagePath("");
    setNumberOfPages(1);
    setTiles(allTiles);
    setTilesLength(allTilesLength);
    setTilesPerPage(allTilesLength);
    setIsSuccess(true);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      if (typeof reader?.result === "string") {
        setImagePath(reader.result);
      }
    });

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const delayedHideToast = setTimeout(() => {
      setIsSuccess(false);
    }, 1000);
    return () => clearTimeout(delayedHideToast);
  }, [isSuccess]);

  return (
    <div className="tileUploader">
      {isSuccess && (
        <Toast
          text="New cup pad added successfully!"
          onClick={() => setIsSuccess(false)}
        />
      )}
      <input
        name="title"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setTitle(e.target.value)
        }
        placeholder="type label name..."
        value={title}
        tabIndex={0}
      ></input>
      <input
        name="description"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setDescription(e.target.value)
        }
        placeholder="type description..."
        value={description}
        tabIndex={0}
      ></input>
      <div className="fileInput" tabIndex={0}>
        <label htmlFor="files">SELECT IMAGE</label>
        <input
          accept="image/*"
          id="files"
          type="file"
          onChange={handleImageChange}
        />
      </div>
      <div className="upload" onClick={handleAddNewItem} tabIndex={0}>
        <span>ADD</span>
      </div>
    </div>
  );
};
