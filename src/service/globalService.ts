export const perfix =
  "http://dglogb.dggua.top"
//   process.env.NODE_ENV === "development"
//       "https://mock.apifox.cn/m1/1262251-0-default"
//     : "http://dglogb.dggua.top";

export interface globalResponse<R> {
  code: number;
  data: R;
  msg: string;
}
