import axios from "axios";

// Создаём экземпляр axios и пишем в нём путь до api
const request = axios.create({
  baseURL:
    "https://time-manager-ddf1d-default-rtdb.europe-west1.firebasedatabase.app/",
});

// Функция для получения всех юзеров
export const getEpisodes = async () =>
  request.get("user.json").then(({ data }) => data);
