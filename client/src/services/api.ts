import { AxiosResponse } from "axios";
import axios from "utils/axios";

export const fetchUser = async (): Promise<AxiosResponse | void> => {
  const res = await axios.get("/auth/me");
  if (res) {
    return res.data;
  }
};
