import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { MenuItem, Select } from "@material-ui/core";

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
	navigationButton: {
		margin: theme.spacing(2),
		padding: "13px 25px",
	},
	image: {
		width: 500,
		height: 400,
		objectFit: "cover",
		borderRadius: "5px",
		marginTop: 20,
	},
	uploadButton: {
		marginTop: 10,
	},
	createButton: {
		marginTop: 20,
	},
	coverImageText: {
		marginBottom: "20px",
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

const AddGalleryMetadata = (props) => {
	const classes = useStyles();

	const ImportOptions = () => {
		const elements = [];
		for (const [key, value] of Object.entries(props.importMethods)) {
			elements.push(<MenuItem value={key}>{value}</MenuItem>);
		}

		return elements;
	};

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
				<Typography
					variant="h5"
					component="h2"
					className={classes.coverImageText}
				>
					Cover Image
				</Typography>
				{props.coverImage ? (
					<img
						src={props.coverImage.preview}
						alt="preview"
						className={classes.image}
					/>
				) : (
					props.fileUploader
				)}
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
					value={props.galleryName}
					onChange={(event) => props.setGalleryName(event.target.value)}
				/>
			</Grid>

			<Grid item xs={12} className={classes.gridItem}>
				<Typography variant="h5" component="h2">
					Import Method
				</Typography>
				<Select
					value={props.importMethod}
					onChange={(event) => {
						props.setImportMethod(event.target.value);
					}}
				>
					{ImportOptions()}
				</Select>
			</Grid>

			{props.importMethod === "CONTRACT" ? (
				<Grid item xs={12} className={classes.gridItem}>
					<Typography variant="h5" component="h2">
						Contract address
					</Typography>
					<TextField
						className={classes.textField}
						variant="outlined"
						placeholder="0xd26330c38C756215Ed82258283fb4c36025D431E"
						fullWidth
						value={props.contractAddress}
						onChange={(event) => props.setContractAddress(event.target.value)}
					/>
				</Grid>
			) : (
				<></>
			)}

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
					value={props.galleryDescription}
					onChange={(event) => props.setGalleryDescription(event.target.value)}
				/>
			</Grid>
			<Grid item xs={12} className={classes.gridItem}>
				{props.nextButton}
			</Grid>
		</Grid>
	);
};

export default AddGalleryMetadata;
