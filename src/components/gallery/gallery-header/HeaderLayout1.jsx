import React from "react";
import { Link } from "react-router-dom";
import GalleryCoverImage from "./GalleryCoverImage";
import { makeStyles, darken } from "@material-ui/core/styles";
import { Grid, Typography, TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	galleryHeaderContainer: {
		display: "flex",
		justifyContent: "center",
		width: "80vw",
	},
	title: {
		fontSize: "36px", // will be updated after theme variable setup
		lineHeight: "4rem",
		color: theme.palette.text.primary,
	},
	galleryOwner: {
		display: "flex",
		marginTop: "3vh",
		marginBottom: "4vh",
		color: theme.palette.primary.main,
	},
	createdTextLabel: {
		color: theme.palette.text.primary,
		marginRight: "0.5vw",
		fontSize: "16px", // will be updated after theme variable setup
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
	coverImage: {
		alignItems: "center",
		width: "400px",
		height: "400px",
	},
}));

const HeaderLayout1 = (props) => {
	const classes = useStyles();
	return (
		<Grid container spacing={6} className={classes.galleryHeaderContainer}>
			<Grid item lg={7} md={7} sm={6} xs={4}>
				<div className={classes.galleryHeader}>
					<div className={classes.titleContainer}>
						{props.isOwner && !props.isEditable ? (
							<>
								<Typography className={classes.title} variant="h4">
									{props.galleryName}
								</Typography>
							</>
						) : (
							<form noValidate autoComplete="off">
								<TextField
									fullWidth
									value={props.galleryName}
									inputProps={{ style: { fontSize: "36px" } }}
									onChange={(event) => props.setGalleryName(event.target.value)}
								/>
							</form>
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
				</div>
			</Grid>
			<Grid
				item
				lg={5}
				md={5}
				sm={6}
				xs={8}
				container
				spacing={0}
				direction="column"
				alignItems="center"
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
		</Grid>
	);
};

export default HeaderLayout1;
