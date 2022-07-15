import BlogItem from "../../components/ts/BlogItem";
import "../scss/MainPage.scss";
import avatar from "../../static/avatar.jpeg";
import { useEffect, useState } from "react";
import { BlogBrief } from "../../types";
import { blogService } from "../../service/blogService";
export default function MainPage() {
  const [blogs, setBlogs] = useState<BlogBrief[]>([]);

  useEffect(() => {
    blogService.list().then(({ data }) => {
      setBlogs(data.data);
    });
  }, []);
  return (
    <div className="main-page">
      <aside>
        <div className="user">
          <img className="user-avatar" src={avatar} alt="" />
          <div className="user-name">DGGua</div>
          <div className="user-description">A Programmer xjb Learning</div>
        </div>
      </aside>
      <div className="blog-container">
        {blogs.map((blog) => (
          <BlogItem blog={blog} />
        ))}
      </div>
    </div>
  );
}
