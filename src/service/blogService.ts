import axios from "axios";
import { BlogBrief } from "../types";
import { globalResponse, perfix } from "./globalService";

export const blogService = {
  list: () => {
    return axios.get<globalResponse<BlogBrief[]>>(perfix + "/blog/list");
  },
};
