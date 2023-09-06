import React, { useState, useEffect } from "react";
import Pagination from "./pagination";
import { paginate } from "./utils/paginate";
import GroupList from "./groupList";

function FakeData() {
  const [data, setData] = useState([]);
  const [defaultUserId, setdefaultUserId] = useState([]); //Это юзер id которые предоставляет плейсхолдерю Это нужно для проверки фильтрации
  const [filtered, setFiltered] = useState();
  const [sortedData, setSortedData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos/")
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  useEffect(() => {
    const filtereeddefaultUserId = data.map((el) => el.userId);
    const newFiltered = [...new Set(filtereeddefaultUserId)];
    setdefaultUserId([...newFiltered]);
    setSortedData(data);
  }, [data]);
  const handleFilterChange = (filter) => {
    setFiltered(filter);
  };
  const handleReset = () => {
    setSortedData(data); // Ничего не устанавливаем (undefined)
  };
  useEffect(() => {
    const sortedElem = data.filter((el) => el.userId === filtered);
    setSortedData(sortedElem);
    setCurrentPage(1);
  }, [filtered]);

  if (sortedData) {
    const count = data.length; // количество записей
    const pageSize = 10;

    const pageLists = paginate(sortedData, currentPage, pageSize);
    // количество записей на странице, которое хотим выводить
    const handlePageChange = (currentPage) => {
      setCurrentPage(currentPage);
    };
    return (
      <>
        <div className="row">
          <div className="col-4">
            <GroupList
              items={defaultUserId}
              filter={filtered}
              onChangeFilter={handleFilterChange}
            />
            <hr />
            <div className="d-grid">
              <button onClick={handleReset} className="btn btn-m btn-primary">
                Очистить
              </button>
            </div>
          </div>
        </div>
        <div className="container text-center">
          {pageLists.map((el, i) => (
            <p key={i} className="text-white bg-dark">
              {el.title}
            </p>
          ))}{" "}
        </div>
        <div>
          <Pagination
            currentPage={currentPage}
            count={count}
            pageSize={pageSize}
            onPageChange={handlePageChange}
          />
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="container text-center">
          <p className="text-white bg-dark">{"Loading..."}</p>
        </div>
      </>
    );
  }
}

export default FakeData;
