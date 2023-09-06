import React, { useState, useEffect } from "react";
import { useAnaliseProjects } from "./useAnaliseProject";
import Product from "./product";
import SortSelect from "./sortSelect";

// Варинты выбора признака сортировки
const sortOptions = [{ value: "time", label: "Время на проект" }];

const ProductList = () => {
  const { getAllAnaliProjects } = useAnaliseProjects();
  const [data, setData] = useState([]);
  useEffect(() => {
    const allAnaliseProjects = getAllAnaliProjects().then((res) =>
      setData(res)
    );
  }, []);

  // Хранение признака сортировки
  const [sortSign, setSortSign] = useState("time");

  // Метод для изменения признака сортировки
  const handleChangeSortSign = (e) => {
    setSortSign(e.target.value);
  };

  return (
    <div className="container mt-t">
      <div>
        {/* Компонент выбора признака сортировки */}
        <SortSelect
          value={sortSign}
          options={sortOptions}
          onSort={handleChangeSortSign}
        />
      </div>
      <div className="row mt-4">
        {data.map((product) => (
          // Список товаров
          <Product key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
