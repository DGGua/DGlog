import "../scss/Image.scss";

interface ImageProps {
  src: string;
  url?: string;
  size?: string;
}
export default function Image(props: ImageProps) {
  const { src, url, size = "150px" } = props;
  function copyUrl() {
    if (!url) return;
    navigator.clipboard.writeText(url);
  }
  return (
    <div
      className="image-div"
      style={{
        minWidth: size,
        minHeight: size,
        maxWidth: size,
        maxHeight: size,
      }}
    >
      <img src={src} alt="" />
      {url ? (
        <i className="iconfont" onClick={copyUrl}>
          &#xeb70;
        </i>
      ) : (
        <i className="iconfont">&#xe651;</i>
      )}
    </div>
  );
}
