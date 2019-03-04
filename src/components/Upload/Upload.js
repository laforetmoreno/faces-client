import React from "react";
import Dropzone from "react-dropzone";
import { DropContainer, UploadMessage } from "../DropContainer/styles";

const Upload = ({ onUpload }) => {
  const renderDragMessage = (isDragActive, isDragReject) => {
    if (!isDragActive) {
      return (
        <UploadMessage>Arraste o arquivo ou clique aqui ...</UploadMessage>
      );
    }

    if (isDragReject) {
      return (
        <UploadMessage type="error">
          Apenas aquivos .png são aceitos
        </UploadMessage>
      );
    }

    return <UploadMessage type="success">Solte os arquivos aqui</UploadMessage>;
  };

  return (
    <Dropzone accept="image/png" onDropAccepted={onUpload}>
      {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
        <DropContainer
          {...getRootProps()}
          isDragActive={isDragActive}
          isDragReject={isDragReject}
        >
          <input {...getInputProps()} />
          {renderDragMessage(isDragActive, isDragReject)}
        </DropContainer>
      )}
    </Dropzone>
  );
};

export default Upload;
