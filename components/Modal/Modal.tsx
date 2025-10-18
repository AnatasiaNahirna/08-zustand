import { useEffect } from "react"
import { createPortal } from "react-dom"
import css from "./Modal.module.css"

interface ModalProps {
    isOpen: boolean,
    onClose: () => void,
    children: React.ReactNode,
}

export default function Modal({onClose, isOpen, children}: ModalProps) {

    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    if (!isOpen) { return };
	  const handleKeyDown = (e: KeyboardEvent) => {
	    if (e.key === "Escape") {
	      onClose();
	    }
	  };
	
	  document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
	
	  return () => {
	    document.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "";

	  };
  }, [isOpen, onClose]);

    if (!isOpen) {return null};


    return createPortal(
        <div
            onClick={handleBackdropClick}
            className={css.backdrop}
            role="dialog"
            aria-modal="true"
        >
            <div className={css.modal}>
                {children}
            </div>
        </div>, document.body)
}