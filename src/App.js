import React, { Component } from "react";
import { uniqueId } from "lodash";
import filesize from "filesize";
import api from "./services/api";
import GlobalStyle from "./styles/global";
import Container from "./components/Container/styles";
import Content from "./components/Content/syles";
import FormContainer from "./components/Form/FormContainer";
import Upload from "./components/Upload/Upload";
import FileList from "./components/FileList/FileList";

class App extends Component {
  state = {
    uploadedFiles: []
  };

  // async componentDidMount() {
  //   const response = await api.get("posts");
  //   this.setState({
  //     uploadedFiles: response.data.map(file => ({
  //       id: file._id,
  //       name: file.name,
  //       readableSize: filesize(file.size),
  //       preview: file.url,
  //       uploaded: true,
  //       url: file.url
  //     }))
  //   });
  // }

  handleUpload = files => {
    const uploadedFiles = files.map(file => ({
      file,
      id: uniqueId(),
      name: file.name,
      readableSize: filesize(file.size),
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
      url: null
    }));

    this.setState({
      uploadedFiles: this.state.uploadedFiles.concat(uploadedFiles)
    });

    uploadedFiles.forEach(this.processUpload);
  };

  updateFile = (id, data) => {
    this.setState({
      uploadedFiles: this.state.uploadedFiles.map(uploadedFile => {
        return id === uploadedFile.id
          ? { ...uploadedFile, ...data }
          : uploadedFile;
      })
    });
  };

  processUpload = async uploadedFile => {
    const images = await api.get("images");
    const image = images.data.map(image => image.name);

    const data = new FormData();

    data.append("file", uploadedFile.file, uploadedFile.name);

    if (image.includes(uploadedFile.name)) {
      this.updateFile(uploadedFile.id, {
        uploaded: false,
        error: true
      });
    } else {
      api
        .post("images", data, {
          onUploadProgress: e => {
            const progress = parseInt(Math.round((e.loaded * 100) / e.total));

            this.updateFile(uploadedFile.id, {
              progress
            });
          }
        })
        .then(response => {
          this.updateFile(uploadedFile.id, {
            uploaded: true,
            id: response.data._id,
            url: response.data.url
          });
        });
    }
  };

  handleDelete = async id => {
    await api.delete(`images/${id}`);

    this.setState({
      uploadedFiles: this.state.uploadedFiles.filter(file => file.id !== id)
    });
  };

  // componentWillUnmount() {
  //   this.state.uploadedFiles.forEach(file => URL.revokeObjectURL(file.preview));
  // }

  render() {
    const { uploadedFiles } = this.state;

    return (
      <Container>
        <Content>
          {/* <FormContainer
            onUpload={this.handleUpload}
            files={uploadedFiles}
            onDelete={this.handleDelete}
          /> */}
          <Upload onUpload={this.handleUpload} />
          {!!uploadedFiles.length && (
            <FileList files={uploadedFiles} onDelete={this.handleDelete} />
          )}
        </Content>
        <GlobalStyle />
      </Container>
    );
  }
}

export default App;
