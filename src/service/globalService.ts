// export const perfix = "http://127.0.0.1:4523/m1/1262251-0-default";
export const perfix = "http://localhost";
// export const perfix = "http://dglogb.dggua.top";

export interface globalResponse<R> {
  code: number;
  data: R;
  msg: string;
}
