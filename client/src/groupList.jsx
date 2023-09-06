import { useState } from "react";
import React from "react";

const GroupList = ({ items, filter, onChangeFilter }) => {
  const [load, setLoad] = useState(false);

  const handleClick = () => {
    setLoad((prev) => !prev);
  };
  return (
    <>
      <button onClick={handleClick}>Фильтрация</button>
      {load === true && (
        <>
          <div className="list-group">
            {items.map((item) => (
              <button
                className={
                  "list-group-item list-group-item-action" +
                  (item === filter ? " active" : "")
                }
                key={item}
                onClick={() => onChangeFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default GroupList;
