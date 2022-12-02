import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { blogService } from "../../service/blogService";
import { BlogDetail } from "../../types";
import "../scss/BlogPage.scss";
import "github-markdown-css/github-markdown-light.css";
import { sanitize } from "dompurify";
import { marked } from "marked";
import * as HighLight from "highlight.js";
import "highlight.js/scss/github.scss";
marked.setOptions({
  highlight: (code, lang) =>
    HighLight.default.highlight(code, { language: lang }).value,
});

export default function BlogPage() {
  const { blogId } = useParams<"blogId">();
  const [blogDetail, setBlogDetail] = useState<BlogDetail>();
  const [contentHTML, setContentHTML] = useState("");
  const text = useRef<HTMLDivElement>(null);
  useEffect(() => {
    blogService.detail(Number.parseInt(blogId || "")).then(({ data }) => {
      setBlogDetail(data.data);
    });
  }, [blogId]);
  useEffect(() => {
    if (!blogDetail) return;
    setContentHTML(sanitize(marked(blogDetail.content || "")));
  }, [blogDetail]);

  useEffect(() => {
    if (!text.current) return;
    text.current.innerHTML = contentHTML;
  }, [contentHTML]);
  return (
    <div className="blog-page">
      <div className="blog-container">
        <div className="blog-text markdown-body" ref={text}></div>
      </div>
    </div>
  );
}
