import React, { useEffect, useState } from "react";

import { paginate } from "../../../utils/paginate";
import Pagination from "../../Pagination";
import _ from "lodash";
import GroupList from "../../GroupList";
import { ResponsiveContainer, PieChart, Pie } from "recharts";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserId } from "../../../store/users";

import {
  getAnaliseById,
  loadAnaliseList,
  removeAnalise,
} from "../../../store/analise";

import iconUp from "../../../assets/icons/iconUp.svg";
import iconDown from "../../../assets/icons/iconDown.svg";
const sortOptions = [
  {
    value: "secASC",
    label: "Время по возрастанию",
    sort: (products) => _.orderBy(products, ["sec"], ["asc"]),
  },
  {
    value: "secDECS",
    label: "Время по убыванию",
    sort: (products) => _.orderBy(products, ["sec"], ["desc"]),
  },
];
const AnaliseList = () => {
  const [filteredData, setFilteredData] = useState(null);
  const [filter, setFilter] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortSign, setSortSign] = useState("secDECS");

  const [sortProjects, setSortProjects] = useState(null);
  const pageSize = 2;

  const userId = useSelector(getCurrentUserId());
  const dispatch = useDispatch();
  const allAnaliseProjects = useSelector(getAnaliseById(userId));

  useEffect(() => {
    dispatch(loadAnaliseList(userId));
  }, []);
  useEffect(() => {
    const findOption = sortOptions.find(({ value }) => value === sortSign);
    setSortProjects(findOption.sort(allAnaliseProjects));
    if (filteredData) {
      handleReset();
    }
  }, [allAnaliseProjects.length]);
  useEffect(() => {
    const findOption = sortOptions.find(({ value }) => value === sortSign);
    setSortProjects(findOption.sort(allAnaliseProjects));
  }, [sortSign]);

  const handleFilterChange = (filter) => {
    setFilter(filter);
    const newData = allAnaliseProjects.filter(
      (el) => el.projectName === filter
    );
    console.log(newData);
    setFilteredData(newData);
    setCurrentPage(1);
  };
  const handleReset = () => {
    setFilter([]);
    setFilteredData(null);
  };

  const handlePageChange = (currentPage) => {
    setCurrentPage(currentPage);
  };

  const handleChangeSortSign2 = () => {
    if (sortSign === "secDECS") {
      setSortSign("secASC");
    } else {
      setSortSign("secDECS");
    }
  };
  const typeOfIcon = () => {
    if (sortSign === "secDECS") {
      return iconDown;
    } else {
      return iconUp;
    }
  };
  const handleRemoveAnalise = (id) => {
    dispatch(removeAnalise(id));
  };

  if (allAnaliseProjects.length) {
    console.log(sortSign);
    const count = filteredData
      ? filteredData.length
      : allAnaliseProjects.length;
    const pageLists = filteredData
      ? paginate(filteredData, currentPage, pageSize)
      : sortProjects
      ? paginate(sortProjects, currentPage, pageSize)
      : paginate(allAnaliseProjects, currentPage, pageSize);

    const items = allAnaliseProjects.map((el) => el.projectName);
    const uniqItems = [...new Set(items)];

    return (
      <div className="container ">
        <div className="d-flex">
          <div className=" flex-column flex-shrink-0 p-3 ">
            <GroupList
              items={uniqItems}
              filter={filter}
              onChangeFilter={handleFilterChange}
            />
            <hr />
            <div className="d-grid">
              <button onClick={handleReset} className="btn btn-m btn-primary">
                Очистить
              </button>
            </div>
          </div>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  dataKey="sec"
                  data={allAnaliseProjects}
                  fill="#8884d8"
                  label
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="container mt-t">
            <div></div>
          </div>
        </div>
        <div>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Название</th>
                <th scope="col">Минуты</th>
                <th scope="col">
                  {"Секунды"}
                  <img
                    src={typeOfIcon()}
                    onClick={handleChangeSortSign2}
                    className=" p-1 "
                    alt="сортировка"
                  />
                </th>
                <th scope="col">Общее время</th>
              </tr>
            </thead>
            <tbody>
              {pageLists.map((el, i) => (
                <tr className="align-middle" key={i}>
                  <th scope="row">{i + 1}</th>
                  <td>{el.projectName}</td>
                  <td>{el.min}</td>
                  <td>{el.sec}</td>
                  <td className="text-end">
                    {" "}
                    <button
                      className=" btn btn-outline-danger"
                      onClick={() => handleRemoveAnalise(el._id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-trash"
                        viewBox="0 0 16 16"
                      >
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"></path>
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"></path>
                      </svg>
                      Удалить
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          currentPage={currentPage}
          count={count}
          pageSize={pageSize}
          onPageChange={handlePageChange}
        />
      </div>
    );
  }
  return "Loading...";
};
export default AnaliseList;
