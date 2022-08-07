import { perfix } from "../service/globalService";

export const imageUtil = {
  convertImageUrl: (id: string) => perfix + "/image/get/" + id,
};
