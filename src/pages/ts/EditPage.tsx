import { useEffect, useState } from "react";
import Vditor from "vditor";
import "vditor/dist/index.css";
import { blogService } from "../../service/blogService";
import { editService } from "../../service/editService";
import "../scss/EditPage.scss";
export default function TempPage() {
  const [id, setId] = useState<string>();
  const [secret, setSecret] = useState<string>("");
  const [analyzeInfo, setAnalyzeInfo] = useState<string>(
    localStorage.getItem("buf") || ""
  );
  // const [images, setImages] = useState<ImageItem[]>([
  // { status: "uploaded", file: new File([], ""), id: "1F1C630D" },
  // ]);
  const [vd, setVd] = useState<Vditor>();
  const [timeoutt, settimeoutt] = useState<NodeJS.Timeout>();
  useEffect(() => {
    const vditor = new Vditor("vditor", {
      after: () => {
        vditor.setValue(analyzeInfo);
        setVd(vditor);
      },
      input: () => {
        if (timeoutt) {
          clearTimeout(timeoutt);
        }
        settimeoutt(
          setTimeout(() => {
            localStorage.setItem("buf", vditor.getValue());
            setAnalyzeInfo(vditor.getValue());
          }, 1000)
        );
      },
    });
  }, []);
  useEffect(() => {
    vd?.setValue(analyzeInfo);
  }, [analyzeInfo, vd]);
  function getContent() {
    if (!id) return;
    const idNum = Number.parseInt(id);
    if (isNaN(idNum)) return;
    blogService.detail(idNum).then((res) => {
      let { content, title } = res.data.data;
      while (content.startsWith("\n")) content = content.slice(1);
      setAnalyzeInfo(["# " + content, title].join("\n"));
    });
  }
  function updateContent() {
    if (!id) return;
    const idNum = Number.parseInt(id);
    if (isNaN(idNum)) return;
    editService
      .update(idNum, analyzeInfo, secret)
      .then((res) => alert(res.data.msg));
  }
  function createblog() {
    editService.create(analyzeInfo, secret).then((res) => alert(res.data.msg));
  }
  // function uploadImages() {
  //   Promise.all(
  //     images
  //       .filter((image) => image.status === "notUploaded")
  //       .map((image) => editService.uploadImage(image.file))
  //   ).then((res) => {
  //     // refresh list
  //     let index = 0;
  //     setImages(
  //       images.map((image) =>
  //         image.status === "uploaded"
  //           ? image
  //           : {
  //               status: "uploaded",
  //               file: image.file,
  //               id: res[index++].data.data,
  //             }
  //       )
  //     );
  //   });
  // }
  // function configBlog() {
  //   setShowConfig(true);
  // }
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
          {/* <button onClick={configBlog}>文章参数</button> */}
        </div>
        ;
      </div>
      <div
        id="vditor"
        className="vditor"
        style={{ height: "90vh", width: "100vw" }}
      />
    </div>
  );
}
