import { marked } from "marked";
import { useEffect, useRef } from "react";
import "../scss/MarkdownPreview.scss";
export interface MarkdownPreviewProps {
  content: string;
}
export default function MarkdownPreview(props: MarkdownPreviewProps) {
  const textelement = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (textelement.current) {
      textelement.current.innerHTML = marked(props.content);
    }
  }, [props.content]);
  return <div className="markdown-preview" ref={textelement}></div>;
}
