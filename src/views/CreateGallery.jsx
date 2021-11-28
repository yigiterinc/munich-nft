import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { useFileUpload } from "use-file-upload";
import { makeStyles } from "@material-ui/core/styles";
import FileDropzone from "../components/common/FileDropzone";
import AddGalleryMetadata from "../components/create-gallery/AddGalleryMetadata";
import SelectGalleryNfts from "../components/create-gallery/SelectGalleryNfts";
import { uploadImageToMediaGallery } from "../api/strapi";

const CreateGallery = () => {
  const [collectionName, setCollectionName] = useState();
  const [collectionDescription, setCollectionDescription] = useState();
  const [coverImage, setCoverImage] = useFileUpload();

  const [activeStep, setActiveStep] = useState(0);

  const nextButton = (
    <Button
      style={{
        background: "#FF6700",
        color: "#FFFFFF",
        margin: "13px 25px",
        padding: "13px 25px",
      }}
      size="large"
      onClick={() => setActiveStep((prevActiveStep) => prevActiveStep + 1)}
      variant="contained"
    >
      Next
    </Button>
  );

  const prevButton = (
    <Button
      style={{
        background: "#FF6700",
        color: "#FFFFFF",
        margin: "13px 25px",
        padding: "13px 25px",
      }}
      color="primary"
      size="large"
      onClick={() => setActiveStep((prevActiveStep) => prevActiveStep - 1)}
      variant="outlined"
    >
      Previous
    </Button>
  );

  const submitButton = (
    <Button
      style={{
        background: "#FF6700",
        color: "#FFFFFF",
        margin: "13px 25px",
        padding: "13px 25px",
      }}
      color="primary"
      size="large"
      onClick={() => handleSubmit()}
      variant="outlined"
    >
      Previous
    </Button>
  );

  const handleDropzoneSubmit = async (file) => {
    const uploadResult = await uploadImageToMediaGallery(file);
    console.log(uploadResult);
  }

  const dropzone = (
    <FileDropzone dropzoneStyles={{ minWidth: "35vw", minHeight: "30vh", textAlign: "center" }}
                  text="Click or drag to upload a cover image"
                  handleSubmit={handleDropzoneSubmit} // TODO
                  handleChangeStatus={() => console.log("status changed")}/>
  )


  let stepComponents = [
    <AddGalleryMetadata nextButton={nextButton}
                        fileUploader={dropzone}
                        coverImage={coverImage}
                        setCoverImage={setCoverImage}
                        collectionName={collectionName}
                        setCollectionName={setCollectionName}
                        collectionDescription={collectionDescription}
                        setCollectionDescription={setCollectionDescription}/>,
    <SelectGalleryNfts nextButton={nextButton}
                       prevButton={prevButton}
                       submitButton={submitButton}/>
  ]

  const handleSubmit = () => {
  }

  return (
    stepComponents[activeStep]
  );
};

export default CreateGallery;
