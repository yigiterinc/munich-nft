import React from "react";
import {
	makeStyles,
	AppBar,
	Tabs,
	Tab,
	Typography,
	Box,
	IconButton,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import HeaderLayoutPicker from "./HeaderLayoutPicker";
import ThemePicker from "./ThemePicker";

function TabPanel(props) {
	const { children, value, index } = props;

	return (
		<div>
			{value === index && (
				<Box p={3}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	appBar: {
		backgroundColor: theme.palette.common.white,
		color: theme.palette.common.black,
	},
	closeDialogPanel: {
		marginRight: "0.5vw",
		marginLeft: "auto",
		display: "block",
	},
}));

const EditGalleryTabs = (props) => {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<div className={classes.root}>
			<AppBar position="static" className={classes.appBar}>
				<Tabs
					value={value}
					onChange={handleChange}
					aria-label="simple tabs example"
					TabIndicatorProps={{ style: { background: "#000" } }}
				>
					<Tab label="Layout" />
					<Tab label="Colors" />

					<div className={classes.closeDialogPanel}>
						<IconButton
							aria-label="close-gallery-settings"
							onClick={() => {
								props.closeEditGalleryModal(true);
							}}
						>
							<CloseIcon />
						</IconButton>
					</div>
				</Tabs>
			</AppBar>
			<TabPanel value={value} index={0}>
				<HeaderLayoutPicker
					headerLayout={props.headerLayout}
					setHeaderLayout={props.setHeaderLayout}
				/>
			</TabPanel>
			<TabPanel value={value} index={1}>
				<ThemePicker
					galleryTheme={props.galleryTheme}
					setGalleryTheme={props.setGalleryTheme}
				/>
			</TabPanel>
		</div>
	);
};

export default EditGalleryTabs;
