import { useParams } from "react-router-dom";
import "../scss/BlogPage.scss";
export default function BlogPage() {
  const { blogId } = useParams<"blogId">();
  return (
    <div className="blog-page">
      <div className="blog-container">
        test
      </div>
    </div>
  );
}
