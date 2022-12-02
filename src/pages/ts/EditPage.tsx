import { useEffect, useState } from "react";
import Vditor from "vditor";
import "vditor/dist/index.css";
import { blogService } from "../../service/blogService";
import { editService } from "../../service/editService";
import { BlogBrief } from "../../types";
import "../scss/EditPage.scss";
export default function TempPage() {
  const [id, setId] = useState<string>();
  const [secret, setSecret] = useState<string>("");
  const [blogList, setBlogList] = useState<BlogBrief[]>([]);
  // const [images, setImages] = useState<ImageItem[]>([
  // { status: "uploaded", file: new File([], ""), id: "1F1C630D" },
  // ]);

  const [vd, setVd] = useState<Vditor>();
  useEffect(() => {
    const vditor = new Vditor("vditor", {
      after: () => {
        setVd(vditor);
      },
    });
  }, []);
  useEffect(() => {
    blogService.list().then((res) => setBlogList(res.data.data));
  }, []);

  function getContent(blog_id?: number) {
    let idNum: number;
    if (blog_id) idNum = blog_id;
    else if (id) idNum = Number.parseInt(id);
    else return;
    if (isNaN(idNum)) return;
    blogService.detail(idNum).then((res) => {
      let { content, title } = res.data.data;
      while (content.startsWith("\n")) content = content.slice(1);
      vd?.setValue(["# " + title, content].join("\n"));
      setId(idNum.toString());
    });
  }
  function updateContent() {
    if (!id) return;
    const idNum = Number.parseInt(id);
    if (isNaN(idNum)) return;
    editService
      .update(idNum, vd?.getValue() || "", secret)
      .then((res) => alert(res.data.msg));
  }
  function createblog() {
    editService.create(vd?.getValue() || "", secret).then((res) => {
      alert(res.data.msg);
      setId(res.data.data.toString());
    });
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
          <button onClick={() => getContent()}>获取</button>
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
        <ul>
          {blogList.map((brief) => (
            <li onClick={() => getContent(brief.blog_id)}>{brief.title}</li>
          ))}
        </ul>
      </div>
      <div
        id="vditor"
        className="vditor"
        style={{ height: "90vh", width: "100vw" }}
      />
    </div>
  );
}
