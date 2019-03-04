import React from "react";
import CircularProgressbar from "react-circular-progressbar";
import { MdCheckCircle, MdError } from "react-icons/md";
import { Container, FileInfo, Preview } from "../FileList/styles";

const FileList = ({ file }) => (
  <Container>
    {file && (
      <li>
        <FileInfo>
          <Preview src={file.preview} />
          <div>
            <strong>{file.name}</strong>
            <span>
              {file.readableSize}
              {file.progress > 90 && (
                <button onClick={() => {}}>Excluir</button>
              )}
            </span>
          </div>
        </FileInfo>
        <div>
          {!file.uploaded && file.error && (
            <CircularProgressbar
              styles={{
                root: { width: 24 },
                path: { stroke: "#7159c1" }
              }}
              strokeWidth={10}
              percentage={file.progress}
            />
          )}
          {file.uploaded && <MdCheckCircle size={24} color="#78e5d5" />}
          {file.error && <MdError size={24} color="#e57878" />}
        </div>
      </li>
    )}
  </Container>
);

export default FileList;
