import React from "react";
import { Dialog, DialogTitle, IconButton, makeStyles } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import LayoutTabs from "./LayoutTabs";

const useStyles = makeStyles((theme) => ({
	dialogWrapper: {
		position: "absolute",
		top: theme.spacing(6),
	},
	dialogTitleWrapper: {
		height: "35px",
	},
	closeDialogPanel: {
		textAlign: "right",
	},
}));
const LayoutModal = (props) => {
	const classes = useStyles();

	return (
		<Dialog
			open={props.openLayoutModal}
			classes={{ paper: classes.dialogWrapper }}
		>
			<LayoutTabs
				headerLayout={props.headerLayout}
				setHeaderLayout={props.setHeaderLayout}
				nftsLayout={props.nftsLayout}
				setNftsLayout={props.setNftsLayout}
				closeLayoutModal={props.closeLayoutModal}
			/>
		</Dialog>
	);
};

export default LayoutModal;
