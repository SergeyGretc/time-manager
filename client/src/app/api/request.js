import axios from "axios";

export const request = axios.create({
  baseURL:
    "https://time-manager-ddf1d-default-rtdb.europe-west1.firebasedatabase.app/",
});
