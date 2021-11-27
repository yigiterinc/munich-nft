import React from "react";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	Typography,
	IconButton,
	makeStyles,
} from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";

const useStyles = makeStyles((theme) => ({
	dialogWrapper: {
		padding: theme.spacing(3),
		position: "absolute",
		top: theme.spacing(8),
	},
	dialogTitle: {
		display: "flex",
		alignItems: "center",
	},
	dialogTitleText: {
		flexGrow: 1,
		fontSize: "26px",
		fontWeight: "bold",
	},
}));

const Modal = ({ title, children, openModal, setOpenModal }) => {
	const classes = useStyles();
	return (
		<Dialog
			open={openModal}
			onClose={() => setOpenModal(false)}
			classes={{ paper: classes.dialogWrapper }}
		>
			<DialogTitle>
				<div className={classes.dialogTitle}>
					<Typography className={classes.dialogTitleText}>{title}</Typography>
					<IconButton onClick={() => setOpenModal(false)}>
						<CancelIcon fontSize="large" />
					</IconButton>
				</div>
			</DialogTitle>
			<DialogContent>{children}</DialogContent>
		</Dialog>
	);
};

export default Modal;
