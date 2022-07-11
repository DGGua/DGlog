import { marked } from "marked";
import { useEffect, useRef, useState } from "react";
import { blogService } from "../../service/blogService";
import { tempService } from "../../service/tempService";

export default function TempPage() {
  const [id, setId] = useState<number>();
  const [secret, setSecret] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const textelement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textelement.current) {
      textelement.current.innerHTML = marked(content);
    }
  }, [content]);

  function getContent() {
    if (!id) return;
    blogService.detail(id).then((res) => {
      setContent(
        ["# " + res.data.data.title, +res.data.data.content].join("\n")
      );
    });
  }
  function updateContent() {
    if(!id)return;
    tempService.update(id,content, secret).then(res=>console.log(res.data.msg))
  }

  function createblog() {
    tempService.create(content, secret).then(res=>console.log(res.data.msg))
  }

  return (
    <div style={{ width: "100vw", height: "100vh", display: "flex" }}>
      <div style={{ width: "45vw", height: "100vh" }}>
        <div>
          id:
          <input
            value={id}
            onChange={(e) => setId(Number.parseInt(e.target.value))}
          ></input>
          <button onClick={getContent}>获取</button>
        </div>
        <div>
          secret:
          <input
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
          ></input>
          <button onClick={updateContent}>更新</button>
          <button onClick={createblog}>创建</button>
        </div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          cols={30}
          rows={10}
        ></textarea>
      </div>
      <div ref={textelement} style={{ width: "45vw", height: "100vh" }}></div>
    </div>
  );
}
