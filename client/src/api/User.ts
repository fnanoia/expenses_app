import axios from "axios";

const URL = "http://localhost:8080/user";

export const getUsersRequest = async () => {
  await axios.get(URL);
};

export const getUserRequest = async (id: number) => {
  await axios.get(`${URL}${id}`);
};
