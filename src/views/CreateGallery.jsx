import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { useFileUpload } from "use-file-upload";
import { makeStyles } from "@material-ui/core/styles";
import FileDropzone from "../components/common/FileDropzone";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    paddingTop: "3vw",
    paddingLeft: "10vw",
    paddingRight: "10vw",
  },
  gridItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: "50%",
    marginTop: 20,
  },
  uploadButton: {
    marginTop: 10,
  },
  createButton: {
    marginTop: 20,
  },
  coverImageText: {
    marginBottom: "20px"
  },
  textField: {
    marginTop: 20,
    [theme.breakpoints.up("xs")]: {
      width: "70vw",
    },
    [theme.breakpoints.up("sm")]: {
      width: "60vw",
    },
    [theme.breakpoints.up("md")]: {
      width: "45vw",
    },
    [theme.breakpoints.up("lg")]: {
      width: "30vw",
    },
  },
}));

const CreateGallery = () => {
  const [collectionName, setCollectionName] = useState();
  const [collectionDescription, setCollectionDescription] = useState();
  const classes = useStyles();

  const defaultSrc = "./images/add-photo.png";
  const [coverImage, setCoverImage] = useFileUpload();

  const handleSubmit = () => {
  }

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={4}
      className={classes.gridContainer}
    >
      <Grid item xs={12} className={classes.gridItem}>
        <Typography variant="h5" component="h2" className={classes.coverImageText}>
          Cover Image
        </Typography>
        {
          coverImage ?
          <img
            src={coverImage?.source || defaultSrc}
            alt="preview"
            className={classes.image}
          />
            :

          <FileDropzone dropzoneStyles={{ minWidth: "35vw", minHeight: "30vh", textAlign: "center" }}
                        text="Click to upload a cover image"
                        handleSubmit={() => console.log("submitted")} // TODO
                        handleChangeStatus={() => console.log("status changed")}/>
        }
      </Grid>

      <Grid item xs={12} className={classes.gridItem}>
        <Typography variant="h5" component="h2">
          Gallery Name
        </Typography>
        <TextField
          className={classes.textField}
          variant="outlined"
          placeholder="Example: Kitty Cats"
          fullWidth
          value={collectionName}
          onChange={(event) => setCollectionName(event.target.value)}
        />
      </Grid>
      <Grid item xs={12} className={classes.gridItem}>
        <Typography variant="h5" component="h2">
          Description
        </Typography>
        <TextField
          className={classes.textField}
          variant="outlined"
          placeholder="Description"
          fullWidth
          multiline
          rows={7}
          value={collectionDescription}
          onChange={(event) => setCollectionDescription(event.target.value)}
        />
      </Grid>
      <Grid item xs={12} className={classes.gridItem}>
        <Button
          variant="contained"
          size="large"
          color="primary"
          className={classes.createButton}
          onClick={() => handleSubmit()}
        >
          Create
        </Button>
      </Grid>
    </Grid>
  );
};

export default CreateGallery;
