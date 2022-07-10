import BlogItem from "../../components/ts/BlogItem";
import "../scss/MainPage.scss";
import avatar from "../../static/avatar.jpeg";
export default function MainPage() {
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
        <BlogItem />
        <BlogItem />
        <BlogItem />
        <BlogItem />
        <BlogItem />
        <BlogItem />
        <BlogItem />
        <BlogItem />
        <BlogItem />
        <BlogItem />
      </div>
    </div>
  );
}
