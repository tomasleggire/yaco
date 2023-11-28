import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import "./Facturacion.scss";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function Facturacion() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [fileContents, setFileContents] = useState<string[]>([]);

  const handleFileEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    const chosenFiles = Array.from(e.target.files || []);
    handleUploadFiles(chosenFiles);
  };

  const handleUploadFiles = (files: File[]) => {
    const uploaded = [...uploadedFiles];
    files.some((file) => {
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        uploaded.push(file);
        const reader = new FileReader();
        reader.onload = (event) => {
          const fileContent = event.target?.result;
          if (typeof fileContent === "string") {
            setFileContents((prev) => [...prev, fileContent]);
          }
        };
        reader.readAsText(file);
      }
    });
    setUploadedFiles(uploaded);
  };
  return (
    <div className="main-facturacion">
      <h2>Seleccione los documentos de texto:</h2>
      <div>
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
        >
          Upload file
          <VisuallyHiddenInput
            type="file"
            multiple
            accept="text/plain"
            onChange={handleFileEvent}
          />
        </Button>
      </div>

      <div className="uploaded-files-list">
        {uploadedFiles.map((file, index) => (
          <div key={file.name}>
            <h3>{file.name}</h3>
            <p>{fileContents[index]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
