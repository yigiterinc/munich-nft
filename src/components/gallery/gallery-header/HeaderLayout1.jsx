import React from "react";
import { Link } from "react-router-dom";
import GalleryCoverImage from "./GalleryCoverImage";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, TextField } from "@material-ui/core";
import EditGalleryMenu from "../gallery-edit-manager/EditGalleryMenu";

const useStyles = makeStyles((theme) => ({
	galleryHeaderContainer: {
		display: "flex",
		justifyContent: "center",
		width: "96vw",
		margin: "auto",
	},
	title: {
		fontSize: "36px", // will be updated after theme variable setup
		lineHeight: "4rem",
		color: theme.palette.text.primary,
	},
	galleryOwner: {
		display: "flex",
		marginLeft: "0.2vw",
		marginTop: "0.5vh",
		marginBottom: "4vh",
		color: theme.palette.primary.main,
	},
	createdTextLabel: {
		color: theme.palette.text.primary,
		marginRight: "0.3vw",
		fontSize: "16px", // will be updated after theme variable setup
	},
	titleTextField: {
		lineHeight: "64px",
	},
	creator: {
		textDecoration: "none",
		cursor: "pointer",
		color: theme.palette.primary.main,
		"&:hover": {
			color: theme.palette.primary.contrastText,
		},
		fontSize: "16px", // will be updated after theme variable setup
	},
	descriptionContainer: {
		marginTop: "2vh",
	},
	description: {
		marginTop: "2vh",
		color: theme.palette.text.primary,
		fontSize: "18px", // will be updated after theme variable setup
	},
	editGalleryButton: {
		color: theme.palette.secondary.light,
	},
	coverImageContainer: {
		display: "flex",
		justifyContent: "center",
	},
}));

const HeaderLayout1 = (props) => {
	const classes = useStyles();
	return (
		<Grid container spacing={6} className={classes.galleryHeaderContainer}>
			<Grid item lg={1} md={1} sm={1} xs={1}>
				<EditGalleryMenu
					setOpenEditGalleryModal={props.setOpenEditGalleryModal}
					inEditMode={props.inEditMode}
					isOwner={props.isOwner}
					switchEditableMode={props.switchEditableMode}
					handleUpdateGallery={props.handleUpdateGallery}
					setShowAddAssetsView={props.setShowAddAssetsView}
					setShowRemoveAssetsView={props.setShowRemoveAssetsView}
					//updatedMetadata={updatedMetadata}
				/>			</Grid>
			<Grid item lg={1} md={1} sm={1} xs={1}/>
			<Grid item lg={5} md={5} sm={4} xs={2}>
				<div className={classes.titleContainer}>
					{props.isOwner && !props.isEditable ? (
						<>
							<Typography className={classes.title} variant="h4">
								{props.galleryName}
							</Typography>
						</>
					) : (
						<div className={classes.titleTextField}>
							<form noValidate autoComplete="off">
								<TextField
									fullWidth
									value={props.galleryName}
									inputProps={{ style: { fontSize: "36px" } }}
									onChange={(event) => props.setGalleryName(event.target.value)}
								/>
							</form>
						</div>
					)}
				</div>
				<div className={classes.galleryOwner}>
					<Typography className={classes.createdTextLabel} variant="h5">
						Created by
					</Typography>
					<Typography
						to={`/profile/${props.galleryJson?.userId}`}
						component={Link}
						className={classes.creator}
						variant="h5"
					>
						{props.galleryJson.creator}
					</Typography>
				</div>
				<div className={classes.descriptionPanel}>
					{props.isOwner && !props.isEditable ? (
						<>
							<Typography className={classes.description} variant="h5">
								{props.galleryDescription}
							</Typography>
						</>
					) : (
						<form
							noValidate
							autoComplete="off"
							className={classes.descriptionContainer}
						>
							<TextField
								multiline
								fullWidth
								value={props.galleryDescription}
								inputProps={{ style: { fontSize: "18px" } }}
								onChange={(event) =>
									props.setGalleryDescription(event.target.value)
								}
							/>
						</form>
					)}
				</div>
			</Grid>
			<Grid
				item
				lg={3}
				md={3}
				sm={4}
				xs={6}
				className={classes.coverImageContainer}
			>
				<div className={classes.coverImage}>
					<GalleryCoverImage
						coverImage={props.coverImage}
						isEditable={props.isEditable}
						isOwner={props.isOwner}
						handleDropzoneSubmit={props.handleDropzoneSubmit}
						isCoverImageUpdated={props.isCoverImageUpdated}
						setIsCoverImageUpdated={props.setIsCoverImageUpdated}
					/>
				</div>
			</Grid>
			<Grid item lg={2} md={2} sm={2} xs={2}></Grid>
		</Grid>
	);
};

export default HeaderLayout1;
