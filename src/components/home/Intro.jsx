import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { isUserLoggedIn } from "../../utils/auth-utils";

const useStyles = makeStyles((theme) => ({
	box: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-around",
		alignItems: "center",
		width: "auto",
		height: "50vh",
		borderRadius: "10px",
		boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
	},
	text: {
		textAlign: "center",
		fontWeight: "lighter",
		letterSpacing: "2px",
		lineHeight: 1.5,
		padding: 30,
		[theme.breakpoints.up("xs")]: {
			fontSize: "24px",
		},
		[theme.breakpoints.up("sm")]: {
			fontSize: "26px",
		},
		[theme.breakpoints.up("md")]: {
			fontSize: "30px",
		},
		[theme.breakpoints.up("lg")]: {
			fontSize: "36px",
		},
	},
	buttonGroup: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		"& > *": {
			margin: theme.spacing(3),
		},
	},
	button: {
		padding: "10px 20px",
		[theme.breakpoints.up("xs")]: {
			width: "70px",
			fontSize: "0.8rem",
		},
		[theme.breakpoints.up("sm")]: {
			width: "90px",
			fontSize: "1.0rem",
		},
		[theme.breakpoints.up("md")]: {
			width: "110px",
			fontSize: "1.2rem",
		},
		[theme.breakpoints.up("lg")]: {
			width: "120px",
			fontSize: "1.3rem",
		},
	},
}));

export default function Intro() {
	const classes = useStyles();

	return (
		<Box className={classes.box}>
			<Typography className={classes.text}>
				MunichNFT is the de-facto platform to create your outstanding art
				gallery that reveals your virtuosity
			</Typography>
			<div className={classes.buttonGroup}>
				<Button
					variant="contained"
					color="primary"
					size="large"
					className={classes.button}
				>
					Explore
				</Button>
				<Button
					variant="contained"
					color="primary"
					className={classes.button}
					component={Link}
					to="/create-gallery"
					onClick={() => {
						if (!isUserLoggedIn()) {
							Swal.fire({
								title: "You must login to create a gallery!",
								icon: "info",
								timer: 3500,
							});
						}
					}}
				>
					Create
				</Button>
			</div>
		</Box>
	);
}
