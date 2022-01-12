import React from "react";
import { makeStyles, darken } from "@material-ui/core/styles";
import { Typography, TextField, Button, IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme) => ({
	titleContainer: {
		display: "flex",
		alignItems: "center",
	},
	title: {
		color: theme.palette.text.primary,
	},
	galleryOwner: {
		marginTop: "2vh",
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

const GalleryHeaderPanel = (props) => {
	const galleryJson = props.json;
	const classes = useStyles();
	return (
		<div className={classes.galleryHeaderpanel}>
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
			<div className={classes.galleryOwner}>
				<Typography
					to={`/profile/${galleryJson?.userId}`}
					component={Link}
					className={classes.creator}
					variant="h5"
				>
					{galleryJson.creator}
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
							inputProps={{ style: { fontSize: "1.5rem" } }}
							size="medium"
							onChange={(event) =>
								props.setGalleryDescription(event.target.value)
							}
						/>
					</form>
				)}
			</div>
		</div>
	);
};

export default GalleryHeaderPanel;
