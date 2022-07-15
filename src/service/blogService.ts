import axios from "axios";
import { BlogBrief, BlogDetail } from "../types";
import { globalResponse, perfix } from "./globalService";

export const blogService = {
  list: () => {
    return axios.get<globalResponse<BlogBrief[]>>(perfix + "/blog/list");
  },
  detail: (id: number) => {
    return axios.get<globalResponse<BlogDetail>>(perfix + "/blog/detail", {
      params: { id },
    });
  },
};
