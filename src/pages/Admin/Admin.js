import React, { Component } from "react";
import { uniqueId } from "lodash";
import filesize from "filesize";
import api from "../../services/api";
import GlobalStyle from "../../styles/global";
import Container from "../../components/Container/styles";
import Content from "../../components/Content/syles";
import Header from "../../components/Header/Header";
import FeedbackSuccess from "../../components/FeedbackSuccess/FeedbackSuccess";
import SubscribeEmployees from "../../components/SubscribeEmployees/SubscribeEmployees";

class Admin extends Component {
  state = {
    uploadedFiles: [],
    user: {},
    success: false
  };

  hideFeedback = () => this.setState({ success: false });
  showFeedback = () => this.setState({ success: true });

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

    // if (image.includes(uploadedFile.name)) {
    //   this.updateFile(uploadedFile.id, {
    //     uploaded: false,
    //     error: true
    //   });
    // } else {
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
    // }
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

  handleSubmit = async user => {
    const { uploadedFiles } = this.state;

    if (!user.name) return;

    user.avatar = uploadedFiles.map(file => file.url);
    const req = await api.post("/users", user);

    if (req.status === 200) {
      this.setState({ uploadedFiles: [] });
      this.showFeedback();
    }
  };

  render() {
    const { uploadedFiles, success } = this.state;
    return (
      <Container>
        <Header />
        <Content>
          {success ? (
            <FeedbackSuccess onClick={this.hideFeedback} />
          ) : (
            <SubscribeEmployees
              onUpload={this.handleUpload}
              uploadedFiles={uploadedFiles}
              onDelete={this.handleDelete}
              onSubmit={this.handleSubmit}
            />
          )}
        </Content>
        <GlobalStyle />
      </Container>
    );
  }
}

export default Admin;
