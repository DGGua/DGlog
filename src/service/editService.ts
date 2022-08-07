import axios from "axios";
import { globalResponse, perfix } from "./globalService";

export const editService = {
  create: (content: string, secret: string) => {
    return axios.post<globalResponse<number>>(perfix + "/temp/createBlog", {
      content, secret
    });
  },
  update: (id: number, content: string, secret: string) => {
    return axios.post<globalResponse<number>>(perfix + "/temp/updateBlog", {
      id, content, secret
    });
  },
  uploadImage: (image: File) => {
    const form = new FormData();
    form.append("image", image)
    return axios.post<globalResponse<string>>(perfix + "/image/uploadImage", form)
  }
};
