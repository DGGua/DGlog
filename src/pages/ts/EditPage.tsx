import Editor from "@monaco-editor/react";
import { useState } from "react";
import ImageList, { ImageItem } from "../../components/ts/ImageList";
import MarkdownPreview from "../../components/ts/MarkdownPreview";
import { blogService } from "../../service/blogService";
import { editService } from "../../service/editService";
import { AnalyzeInfo, analyzeMarkdown } from "../../utils/MarkdownAnalyzor";
import "../scss/EditPage.scss";
export default function TempPage() {
  const [id, setId] = useState<string>();
  const [secret, setSecret] = useState<string>("");
  const [analyzeInfo, setAnalyzeInfo] = useState<AnalyzeInfo>();
  const [images, setImages] = useState<ImageItem[]>([
    // { status: "uploaded", file: new File([], ""), id: "1F1C630D" },
  ]);
  function getContent() {
    if (!id) return;
    const idNum = Number.parseInt(id);
    if (isNaN(idNum)) return;
    blogService.detail(idNum).then((res) => {
      setAnalyzeInfo(analyzeMarkdown(res.data.data.content));
      alert(res.data.data.content);
    });
  }
  function updateContent() {
    if (!id) return;
    const idNum = Number.parseInt(id);
    if (isNaN(idNum)) return;
    editService
      .update(idNum, analyzeInfo?.raw || "", secret)
      .then((res) => alert(res.data.msg));
  }
  function createblog() {
    editService
      .create(analyzeInfo?.raw || "", secret)
      .then((res) => alert(res.data.msg));
  }
  function uploadImages() {
    Promise.all(
      images
        .filter((image) => image.status === "notUploaded")
        .map((image) => editService.uploadImage(image.file))
    ).then((res) => {
      // refresh list
      let index = 0;
      setImages(
        images.map((image) =>
          image.status === "uploaded"
            ? image
            : {
                status: "uploaded",
                file: image.file,
                id: res[index++].data.data,
              }
        )
      );
    });
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
          value={analyzeInfo?.raw}
          options={{ wordWrap: "on" }}
          onChange={(value) => {
            setAnalyzeInfo(analyzeMarkdown(value || ""));
          }}
        ></Editor>
        <div className="image-panel">
          <ImageList images={images} onImagesChange={setImages} />
          <button onClick={uploadImages}>upload</button>
        </div>
      </div>
      <div className="preview-panel">
        <MarkdownPreview content={analyzeInfo?.text || ""} />
      </div>
    </div>
  );
}
