import { marked } from "marked";
import { useEffect, useRef } from "react";
import hljs from "highlight.js";
import "../scss/MarkdownPreview.scss";
export interface MarkdownPreviewProps {
  content: string;
}
// Options from https://marked.js.org/using_advanced#options
marked.use({
  highlight: (code, lang) => {
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
