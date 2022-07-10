export const perfix = "http://127.0.0.1:4523/m1/1262251-0-default";

export interface globalResponse<R> {
  code: number;
  data: R;
  msg: string;
}
