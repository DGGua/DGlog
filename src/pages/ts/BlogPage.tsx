import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { blogService } from "../../service/blogService";
import { BlogDetail } from "../../types";
import "../scss/BlogPage.scss";
import { sanitize } from "dompurify";
import { marked } from "marked";
export default function BlogPage() {
  const { blogId } = useParams<"blogId">();
  const [blogDetail, setBlogDetail] = useState<BlogDetail>();
  const [contentHTML, setContentHTML] = useState("");
  const text = useRef<HTMLDivElement>(null);
  useEffect(() => {
    blogService.detail(Number.parseInt(blogId || "")).then(({ data }) => {
      setBlogDetail(data.data);
    });
  }, []);
  useEffect(() => {
    if (!blogDetail) return;
    setContentHTML(sanitize(marked(blogDetail.content)));
  }, [blogDetail]);

  useEffect(() => {
    if (!text.current) return;
    text.current.innerHTML = contentHTML;
  }, [contentHTML]);
  return (
    <div className="blog-page">
      <div className="blog-container">
        <div className="blog-text" ref={text}></div>
      </div>
    </div>
  );
}
