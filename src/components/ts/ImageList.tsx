import Image from "./Image";
import "../scss/ImageList.scss";
import { imageUtil } from "../../utils/utils";
export type ImageItem =
  | {
      status: "notUploaded";
      file: File;
    }
  | { status: "uploaded"; file: File; id: string };
interface ImageListProps {
  images: ImageItem[];
  onImagesChange: (images: ImageItem[]) => void;
}
export default function ImageList(props: ImageListProps) {
  const { images, onImagesChange } = props;
  return (
    <div className="image-list">
      {images.map((image, index) => (
        <Image
          src={
            image.status === "notUploaded"
              ? URL.createObjectURL(image.file)
              : imageUtil.convertImageUrl(image.id)
          }
          url={
            image.status === "uploaded"
              ? imageUtil.convertImageUrl(image.id)
              : undefined
          }
          key={index}
        />
      ))}
      <label>
        +
        <input
          type="file"
          accept="image/jpeg,image/jpg,image/png"
          multiple
          onChange={(event) => {
            onImagesChange([
              ...images,
              ...Array.from(event.target.files ?? []).map<ImageItem>((file) => {
                return {
                  status: "notUploaded",
                  file,
                };
              }),
            ]);
          }}
        />
      </label>
    </div>
  );
}
