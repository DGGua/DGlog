import { ReactNode } from "react";
import "../scss/Modal.scss";

interface ModalProps {
  show?: boolean;
  children?: ReactNode;
}
export default function Modal(props: ModalProps) {
  const { show = true, children } = props;
  return (
    <div className="modal-background" style={{ display: show ? "" : "none" }}>
      <div className="modal-panel">{children}</div>
    </div>
  );
}
