import React, { Component } from "react";
import { uniqueId } from "lodash";
import filesize from "filesize";
import GlobalStyle from "./styles/global";
import Container from "./components/Container/styles";
import Content from "./components/Content/syles";
import Upload from "./components/Upload/Upload";
import FileList from "./components/FileList/FileList";
import api from "./services/api";

class App extends Component {
  state = {
    uploadFile: null
  };

  handleUpload = file => {
    const { name, size } = file[0];

    const newfile = {
      id: uniqueId(),
      name: name,
      readableSize: filesize(size),
      preview: URL.createObjectURL(file[0]),
      progress: 100,
      uploaded: false,
      error: false
    };

    this.setState({ uploadFile: newfile });

    newfile.forEach(this.processUpload);
  };

  // updateFile = (id, data) => {
  //   this.setState({
  //     uploadFile:
  //       this.updateFile.id === id ? { ...uploadFile, ...data } : uploadFile
  //   });
  // };

  processUpload = file => {
    const data = new FormData();

    data.append("file", file[0], file[0].name);

    api.post("/images", data, {
      onUploadProgress: e => {
        const progress = parseInt(Math.round((e.loaded * 100) / e.total));

        this.updateFile(file[0].id, {
          progress
        });
      }
    });
  };

  render() {
    const { uploadFile } = this.state;
    return (
      <div className="App">
        <Container>
          <Content>
            <Upload onUpload={this.handleUpload} />
            <FileList file={uploadFile} />
          </Content>
          <GlobalStyle />
        </Container>
      </div>
    );
  }
}

export default App;
