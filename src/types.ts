export interface BlogBrief {
  blog_id: number;
  title: string;
  create_time: string;
  last_modify: string;
  brief: string;
}

export interface BlogDetail extends BlogBrief {
  content: string;
}
