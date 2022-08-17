import { marked } from "marked";
import { useEffect, useRef } from "react";
import hljs from "highlight.js";
import "../scss/MarkdownPreview.scss";
export interface MarkdownPreviewProps {
  content: string;
}
marked.use({
  highlight: (code, lang) => {
    console.log(hljs.highlightAuto(code, [lang]).value);
    return hljs.highlightAuto(code, [lang]).value;
  },
});
export default function MarkdownPreview(props: MarkdownPreviewProps) {
  const textelement = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (textelement.current) {
      textelement.current.innerHTML = marked(props.content);
    }
  }, [props.content]);
  return <div className="markdown-preview" ref={textelement}></div>;
}
