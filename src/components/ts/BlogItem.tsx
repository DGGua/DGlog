import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { BlogBrief } from "../../types";
import "../scss/BlogItem.scss";

export interface BlogItemProps {
  blog: BlogBrief;
}

export default function BlogItem(props: BlogItemProps) {
  const { blog } = props;
  const navigate = useNavigate();
  return (
    <div className="blog-item" onClick={() => navigate(`/${blog.blog_id}`)}>
      <div className="blog-item-header">
        <span className="blog-item-title">{blog.title}</span>
        <span className="blog-item-date">
          {dayjs(blog.last_modify).format("MM/DD hh:mm:ss")}
        </span>
      </div>
      <hr />
      <div className="blog-item-content">{blog.brief} </div>
    </div>
  );
}
