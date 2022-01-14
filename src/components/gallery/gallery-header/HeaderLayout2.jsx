import React from "react";
import { Link } from "react-router-dom";
import GalleryCoverImage from "./GalleryCoverImage";
import { makeStyles, darken } from "@material-ui/core/styles";
import { Grid, Typography, TextField, IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme) => ({
	galleryHeaderContainer: {
		display: "flex",
		flexDirection: "column",
		width: "80vw",
	},
	centeredContainers: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	titleContainer: {
		marginTop: "4vh",
		display: "flex",
		alignItems: "center",
	},
	title: {
		color: theme.palette.text.primary,
	},
	coverImageContainer: {
		marginTop: "2vh",
		marginBottom: "2vh",
	},
	galleryOwner: {
		marginTop: "2vh",
		marginBottom: "2vh",
		color: theme.palette.primary.main,
	},
	creator: {
		textDecoration: "none",
		border: `solid 8px ${theme.palette.primary.main}`,
		borderRadius: 10,
		background: theme.palette.primary.main,
		cursor: "pointer",
		"&:hover": {
			color: theme.palette.primary.contrastText,
			background: darken(theme.palette.primary.main, 0.05),
			border: `solid 8px ${darken(theme.palette.primary.main, 0.05)}`,
		},
		"&:visited": {
			color: theme.palette.primary.contrastText,
		},
		"&:active": {
			color: theme.palette.primary.contrastText,
		},
	},
	descriptionContainer: {
		marginTop: "2vh",
	},
	description: {
		marginTop: "2vh",
		color: theme.palette.text.primary,
	},
	editGalleryButton: {
		color: theme.palette.secondary.light,
	},
}));

const HeaderLayout2 = (props) => {
	const classes = useStyles();
	return (
		<>
			<Grid container spacing={6} className={classes.galleryHeaderContainer}>
				<div className={classes.centeredContainers}>
					<div className={classes.titleContainer}>
						{props.isOwner && !props.isEditable ? (
							<>
								<IconButton
									className={classes.editGalleryButton}
									aria-label="edit-gallery"
									onClick={() => {
										props.switchEditableMode();
									}}
								>
									<EditIcon />
								</IconButton>
								<Typography className={classes.title} variant="h4">
									{props.galleryName}
								</Typography>
							</>
						) : (
							<form noValidate autoComplete="off">
								<TextField
									value={props.galleryName}
									inputProps={{ style: { fontSize: "2.125rem" } }}
									size="medium"
									onChange={(event) => props.setGalleryName(event.target.value)}
								/>
							</form>
						)}
					</div>
					<div className={classes.coverImageContainer}>
						<GalleryCoverImage
							coverImage={props.coverImage}
							isEditable={props.isEditable}
							isOwner={props.isOwner}
							handleDropzoneSubmit={props.handleDropzoneSubmit}
							isCoverImageUpdated={props.isCoverImageUpdated}
							setIsCoverImageUpdated={props.setIsCoverImageUpdated}
						/>
					</div>
					<div className={classes.galleryOwner}>
						<Typography
							to={`/profile/${props.galleryJson?.userId}`}
							component={Link}
							className={classes.creator}
							variant="h5"
						>
							{props.galleryJson.creator}
						</Typography>
					</div>
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
								inputProps={{ style: { fontSize: "1.5rem" } }}
								size="medium"
								onChange={(event) =>
									props.setGalleryDescription(event.target.value)
								}
							/>
						</form>
					)}
				</div>
			</Grid>
		</>
	);
};

export default HeaderLayout2;
