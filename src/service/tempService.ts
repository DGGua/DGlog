import axios from "axios";
import { globalResponse, perfix } from "./globalService";

export const tempService = {
  create: (content: string, secret: string) => {
    return axios.post<globalResponse<number>>(perfix + "/temp/createBlog", {
      content, secret
    });
  },
  update: (id: number, content:string, secret: string) => {
    return axios.post<globalResponse<number>>(perfix + "/temp/updateBlog", {
      id, content, secret
    });
  },
};
