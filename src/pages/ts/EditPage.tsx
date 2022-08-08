import Editor from "@monaco-editor/react";
import { useState } from "react";
import ImageList, { ImageItem } from "../../components/ts/ImageList";
import MarkdownPreview from "../../components/ts/MarkdownPreview";
import Modal from "../../components/ts/Modal";
import { blogService } from "../../service/blogService";
import { editService } from "../../service/editService";
import "../scss/EditPage.scss";
export default function TempPage() {
  const [id, setId] = useState<string>();
  const [secret, setSecret] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [images, setImages] = useState<ImageItem[]>([]);
  const [showConfig, setShowConfig] = useState<boolean>(false);
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
  function configBlog() {
    setShowConfig(true);
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
          <button onClick={configBlog}>配置</button>
        </div>
        <Editor
          defaultLanguage="markdown"
          value={content}
          options={{ wordWrap: "on" }}
          onChange={(value) => {
            setContent(value || "");
          }}
        ></Editor>
        <div className="image-panel">
          <ImageList images={images} onImagesChange={setImages} />
          <button onClick={uploadImages}>upload</button>
        </div>
      </div>
      <div className="preview-panel">
        <MarkdownPreview content={content} />
      </div>
      <Modal show={showConfig}>
        <button onClick={() => setShowConfig(false)}>关闭</button>
      </Modal>
    </div>
  );
}
