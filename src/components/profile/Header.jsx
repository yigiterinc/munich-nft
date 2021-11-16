import React, { useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import PersonIcon from "@material-ui/icons/Person";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { truncateAddress } from "../../utils";
import { useFileUpload } from "use-file-upload";
import { uploadProfileImage} from "../../api/backend";

const useStyles = makeStyles((theme) => ({
	title: {
		height: "auto",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		background:
			"linear-gradient(90deg, rgba(93,78,156,1) 0%, rgba(184,202,250,1) 100%)",
	},
	avatar: {
		marginTop: "2vh",
		width: theme.spacing(12),
		height: theme.spacing(12),
		cursor: 'pointer'
	},
	image: {
		objectFit: "cover",
		marginTop: "2vh",
		borderRadius: "50%",
		height: theme.spacing(12),
		width: theme.spacing(12),
		cursor: 'pointer'
	},
	name: {
		marginTop: theme.spacing(1),
		fontSize: '25px',
		fontWeight: "lighter",
		letterSpacing: '1px'
	},
	importButton: {
		marginTop: "2vh",
		marginBottom: "2vh",
	},
	address: {
		marginTop: '10px',
		letterSpacing: '1.5px'
	}
}));

const Header = ({ profile, openImportModal }) => {
	const classes = useStyles();
	const [profileImage, setProfileImage] = useFileUpload();

	useEffect(async () => {
		if (profileImage) {
			let response = await uploadProfileImage(profileImage.file)
			console.log(response);
		}
	}, [profileImage])

	const DefaultAvatar = () => {
		return (
			<Avatar className={classes.avatar}>
				<PersonIcon onClick={() =>
					setProfileImage(
						{ accept: "image/*", multiple: false },
						({ name, size, source, file }) => {
							console.log("File Selected", { name, size, source, file });
						},
					)
				} />
			</Avatar>
		)
	}

	const UploadedImage = () => {
		return (
			<img
			src={profileImage?.source}
			alt="preview"
			className={classes.image}
			onClick={() =>
				setProfileImage(
					{ accept: "image/*", multiple: false },
					({ name, size, source, file }) => {
						console.log("File Selected", { name, size, source, file });
					},
				)
			}
		/>)
	}

	const ProfileSummary = () => {
		return (
			<>
				<Typography className={classes.name} variant="h5" component="h2">
					{profile.name}
				</Typography>
				<Typography className={classes.address} variant="h6" component="h2" color="textSecondary">
					{truncateAddress(`${profile.address}`, 13)}
				</Typography>
			</>)
	}

	const renderProfile = () => {
		const elements = []
		elements.push(profileImage ? UploadedImage() : DefaultAvatar())
		elements.push(ProfileSummary())

		return elements;

	}

	return (
		<Paper className={classes.title}>
			{
				renderProfile()
			}
			<Button
				variant="contained"
				size="large"
				className={classes.importButton}
				onClick={() => openImportModal()}
			>
				IMPORT
			</Button>
		</Paper>
	);
};

export default Header;
