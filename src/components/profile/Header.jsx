import React from "react";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import PersonIcon from "@material-ui/icons/Person";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	title: {
		height: "25vh",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		background:
			"linear-gradient(90deg, rgba(93,78,156,1) 0%, rgba(184,202,250,1) 100%)",
	},
	avatar: {
		width: theme.spacing(8),
		height: theme.spacing(8),
	},
	importButton: {
		marginTop: "2vh",
	},
}));

const Header = ({ profile, openImportModal }) => {
	const classes = useStyles();

	const truncate = (str, strLen) => {
		if (str.length <= strLen) return str;

		const separator = "...";

		const sepLen = separator.length;
		const charsToShow = strLen - sepLen;
		const frontChars = Math.ceil(charsToShow / 2);
		const backChars = Math.floor(charsToShow / 2);

		return (
			str.substr(0, frontChars) + separator + str.substr(str.length - backChars)
		);
	};

	return (
		<Paper className={classes.title}>
			<Avatar className={classes.avatar}>
				<PersonIcon />
			</Avatar>
			<Typography variant="h5" component="h2">
				{profile.name}
			</Typography>
			<Typography variant="h6" component="h2" color="textSecondary">
				{truncate(`${profile.address}`, 13)}
			</Typography>
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
