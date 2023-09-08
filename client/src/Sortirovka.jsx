import React, { useState, useEffect } from "react";
import { useAnaliseProjects } from "./useAnaliseProject";
import Product from "./product";
import SortSelect from "./sortSelect";

const sortOptions = [{ value: "time", label: "Время на проект" }];

const ProductList = () => {
  const { getAllAnaliProjects } = useAnaliseProjects();
  const [data, setData] = useState([]);
  useEffect(() => {
    getAllAnaliProjects().then((res) => setData(res));
  }, []);

  const [sortSign, setSortSign] = useState("time");

  const handleChangeSortSign = (e) => {
    setSortSign(e.target.value);
  };

  return (
    <div className="container mt-t">
      <div>
        <SortSelect
          value={sortSign}
          options={sortOptions}
          onSort={handleChangeSortSign}
        />
      </div>
      <div className="row mt-4">
        {data.map((product) => (
          <Product key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
