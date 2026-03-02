import { forwardRef } from "react";

interface DropzoneProps {
  isOver: boolean;
}

export const DropZone = forwardRef<HTMLDivElement, DropzoneProps>(
  ({ isOver }, ref) => {
    return (
      <div
        ref={ref}
        className={`drop-zone ${isOver ? "drop-zone--active" : ""}`}
        style={{
          height: isOver ? "66px" : "8px",
          margin: isOver ? "4px 0" : "2px 0",
          background: isOver ? "var(--primary-color-alpha)" : "transparent",
          border: isOver ? "2px dashed var(--primary-color)" : "none",
          borderRadius: isOver ? "6px" : "2px",
          display: isOver ? "flex" : "block",
          alignItems: "center",
          justifyContent: "center",
          color: isOver ? "var(--primary-color)" : "transparent",
          fontSize: "12px",
          fontWeight: "500",
        }}
      >
        {isOver && "Drop here"}
      </div>
    );
  }
);

DropZone.displayName = "Dropzone";

export default DropZone;
