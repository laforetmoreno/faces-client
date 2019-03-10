import React from "react";
import Upload from "../Upload/Upload";
import FileList from "../FileList/FileList";
import FormContainer from "../FormContainer/Form";
import SubscribeEmployeesContainer from "./styles";

const SubscribeEmployees = ({
  uploadedFiles,
  onUpload,
  onDelete,
  onSubmit
}) => (
  <SubscribeEmployeesContainer>
    <Upload onUpload={onUpload} />
    {!!uploadedFiles.length && (
      <FileList files={uploadedFiles} onDelete={onDelete} />
    )}
    <FormContainer onSubmit={onSubmit} />
  </SubscribeEmployeesContainer>
);

export default SubscribeEmployees;
