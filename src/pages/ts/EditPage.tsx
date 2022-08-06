import Editor from "@monaco-editor/react";
import { useState } from "react";
import MarkdownPreview from "../../components/ts/MarkdownPreview";
import { blogService } from "../../service/blogService";
import { editService } from "../../service/editService";
import "../scss/EditPage.scss";
export default function TempPage() {
  const [id, setId] = useState<string>();
  const [secret, setSecret] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [images, setImages] = useState<File[]>([]);
  function getContent() {
    if (!id) return;
    const idNum = Number.parseInt(id);
    if (isNaN(idNum)) return;
    blogService.detail(idNum).then((res) => {
      setContent(res.data.data.content);
      alert(res.data.data.content);
    });
  }
  function updateContent() {
    if (!id) return;
    const idNum = Number.parseInt(id);
    if (isNaN(idNum)) return;
    editService
      .update(idNum, content, secret)
      .then((res) => alert(res.data.msg));
  }

  function createblog() {
    editService.create(content, secret).then((res) => alert(res.data.msg));
  }

  return (
    <div className="edit-page">
      <div className="edit-panel">
        <div>
          id:
          <input value={id} onChange={(e) => setId(e.target.value)}></input>
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
        <Editor
          defaultLanguage="markdown"
          value={content}
          options={{ wordWrap: "on" }}
          onChange={(value) => {
            setContent(value || "");
          }}
        ></Editor>
        {images.map((image) => (
          <img src={URL.createObjectURL(image)} alt="" />
        ))}
        <input
          type="file"
          accept="image/jpeg,image/jpg,image/png"
          multiple
          onChange={(event) => {
            setImages(Array.from(event.target.files ?? []));
          }}
        />
      </div>
      <div className="preview-panel">
        <MarkdownPreview content={content} />
      </div>
    </div>
  );
}
