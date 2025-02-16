import React, { Component } from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import FileUploader from "react-firebase-file-uploader";
import { CircularProgress } from "@material-ui/core";

class Fileuploader extends Component {
  state = {
    name: "", // name of the file.png
    isUploading: false,
    fileURL: "", // http://firebase/hosting.../name
  };

  handleUploadStart = () => {
    this.setState({
      isUploading: true,
    });
  };

  handleUploadError = (e) => {
    console.log(e);
    this.setState({
      isUploading: false,
    });
  };

  handleUploadSuccess = (filename) => {
    this.setState({
      name: filename,
      isUploading: false,
    });

    getDownloadURL(ref(getStorage(), this.props.dir)).then((url) => {
      this.setState({ fileURL: url });
    });

    this.props.filename(filename);
  };

  // this checks the props we received before render and if they are ok render them else returns null
  static getDerivedStateFromProps(props, state) {
    if (props.defaultImg) {
      return (state = {
        name: props.defaultImgName,
        fileUrl: props.defaultImg,
      });
    }
    return null;
  }

  uploadAgain = () => {
    this.setState({
      name: "",
      isUploading: false,
      fileURL: "",
    });
    this.props.resetImage();
  };

  render() {
    console.log(this.props);
    return (
      <div>
        {!this.state.fileURL ? (
          <div>
            <FileUploader
              accept="image/*"
              name="image"
              randomizeFilename
              storageRef={ref(getStorage(), this.props.dir)}
              onUploadStart={this.handleUploadStart}
              onUploadError={this.handleUploadError}
              onUploadSuccess={this.handleUploadSuccess}
            />
          </div>
        ) : null}

        {this.state.isUploading ? (
          <div
            className="progress"
            style={{ textAlign: "center", margin: "30px 0" }}
          >
            <CircularProgress style={{ color: "#98c6e9" }} thickness={7} />
          </div>
        ) : null}

        {this.state.fileURL ? (
          <div className="image_upload_container">
            <img
              style={{ width: "100%" }}
              src={this.state.fileURL}
              alt={this.props.name}
            />

            <div className="remove" onClick={() => this.uploadAgain()}>
              Remove
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Fileuploader;
