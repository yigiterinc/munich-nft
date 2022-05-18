import React, { useEffect, useState } from "react";
import EditGalleryMenu from "./gallery-edit-manager/EditGalleryMenu";
import { Grid, TextField, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import GalleryCoverImage from "./gallery-header/GalleryCoverImage";
import { truncateString } from "../../utils/commons";
import ImageContainer from "../common/ImageContainer";
import GalleryMenu from "../common/GalleryMenu";

const useStyles = makeStyles((theme) => ({
  galleryHeaderContainer: {
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    },
    [theme.breakpoints.up("md")]: {
      paddingRight: "15vw"
    }
  },
  galleryMetadata: {
    marginLeft: "3vw",
    [theme.breakpoints.down("xs")]: {
      marginLeft: "0vw"
    }
  },
  title: {
    fontSize: "48px", // will be updated after theme variable setup
    lineHeight: "4rem",
    fontWeight: "500",
    letterSpacing: "0.8px",
    color: theme.palette.text.primary
  },
  creatorContainer: {
    display: "flex",
    marginTop: "1.5vh",
    marginBottom: "4vh",
    textAlign: "center"
  },
  galleryText: {
    textTransform: "uppercase",
    fontWeight: "lighter"
  },
  titleTextField: {
    lineHeight: "64px"
  },
  creator: {
    textDecoration: "none",
    cursor: "pointer",
    color: theme.palette.primary.main,
    marginLeft: "5px",
    fontSize: "15px", // will be updated after theme variable setup,
		fontWeight: "normal",
    marginTop: "3px"
  },
  description: {
    marginTop: "2vh",
    color: theme.palette.text.primary,
    fontSize: "18px" // will be updated after theme variable setup
  },
  coverImageContainer: {
    display: "flex",
    justifyContent: "flex-end"
  }
}));

const GalleryHeader = (props) => {
  const classes = useStyles();

  const [updatedMetadata, setUpdatedMetadata] = useState();

  useEffect(() => {
    let { galleryName, coverImage, galleryDescription } = props.gallery;

    setUpdatedMetadata({
      galleryName,
      coverImage,
      galleryDescription
    });

    console.log(props);
  }, []);

  const CoverImage = () => {
    return (
      <Grid
        className={classes.coverImageContainer}
        item
        lg={3}
        md={2}
        sm={4}
        xs={6}
      >
        <GalleryCoverImage
          coverImage={props.gallery.coverImage}
          isEditable={props.isOwner}
          isOwner={props.isOwner}
          handleDropzoneSubmit={props.handleDropzoneSubmit}
          isCoverImageUpdated={props.isCoverImageUpdated}
          setIsCoverImageUpdated={props.setIsCoverImageUpdated}
        />
      </Grid>
    );
  };

  const GalleryName = () => {
    return (
      <Typography className={classes.title}>
        {props.gallery.galleryName}
      </Typography>
    );
  };

  const EditGalleryName = () => {
    return (
      <div className={classes.titleTextField}>
        <form noValidate autoComplete="off">
          <TextField
            fullWidth
            value={updatedMetadata.galleryName}
            inputProps={{ style: { fontSize: "36px" } }}
            onChange={(event) =>
              setUpdatedMetadata({
                ...updatedMetadata,
                galleryName: event.target.value
              })
            }
          />
        </form>
      </div>
    );
  };

  const CreatedBy = () => {
    return (
      <div className={classes.creatorContainer}>
        <ImageContainer
          isCircle
          height={30}
          width={30}
          image={props.user?.profilePicture}
        />
					<Typography
						to={`/profile/${props.gallery?.userId}`}
						component={Link}
						className={classes.creator}
						variant="h5"
					>
            @{props.user.username || truncateString(props.gallery?.userId, 8)}
					</Typography>
      </div>
    );
  };

  const Description = () => {
    return (
      <Typography className={classes.description} variant="h5">
        {props.gallery?.description}
      </Typography>
    );
  };

  const EditDescription = () => {
    return (
      <form noValidate autoComplete="off">
        <TextField
          multiline
          fullWidth
          value={updatedMetadata.description}
          inputProps={{ style: { fontSize: "18px" } }}
          onChange={(event) =>
            setUpdatedMetadata({
              ...updatedMetadata,
              description: event.target.value
            })
          }
        />
      </form>
    );
  };

  const HeaderDefaultLayout = () => {
    return (
      <>
        <CoverImage />
        <Grid item lg={6} md={6} sm={4} xs={2} className={classes.galleryMetadata}>
          <Typography className={classes.galleryText}>Gallery</Typography>
          <GalleryName />
          <CreatedBy />
          <Description />
        </Grid>
        <Grid item xs={1}>
          {
            props.isOwner &&
            <GalleryMenu
              setShowRemoveAssetsView={props.setShowRemoveAssetsView}
              setShowAddAssetsView={props.setShowAddAssetsView}
              handleUpdateGallery={props.handleUpdateGallery}
            />
          }
        </Grid>
      </>
    );
  };

  const LAYOUT_PROP_TO_COMPONENT = {
    default: <HeaderDefaultLayout {...props} />
  };

  return (
    <Grid container className={classes.galleryHeaderContainer}>
      {<HeaderDefaultLayout {...props} />}
    </Grid>
  );
};

export default GalleryHeader;
