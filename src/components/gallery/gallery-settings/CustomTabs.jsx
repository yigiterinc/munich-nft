import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles, AppBar, Tabs, Tab, Box } from "@material-ui/core";
import BackgroundColorPicker from "./BackgroundColorPicker";

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`scrollable-auto-tabpanel-${index}`}
			aria-labelledby={`scrollable-auto-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box p={3}>
					<Box>{children}</Box>
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};

function a11yProps(index) {
	return {
		id: `scrollable-auto-tab-${index}`,
		"aria-controls": `scrollable-auto-tabpanel-${index}`,
	};
}

const useStyles = makeStyles((theme) => ({
	box: {
		justifyContent: "center",
	},
	tabContainer: {
		flexGrow: 1,
		boxShadow: "none",
		borderBottom: "1px solid gray",
	},
	tab: {
		textTransform: "capitalize",
	},
}));

const CustomTabs = (props) => {
	const classes = useStyles();
	const [value, setValue] = useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	return (
		<>
			<AppBar
				color="transparent"
				position="static"
				className={classes.tabContainer}
			>
				<Tabs value={value} onChange={handleChange}>
					<Tab
						className={classes.tab}
						label="Background Color"
						{...a11yProps(0)}
					/>
					<Tab className={classes.tab} label="Layout" {...a11yProps(1)} />
				</Tabs>
			</AppBar>
			<TabPanel value={value} index={0}>
				<BackgroundColorPicker
					galleryTheme={props.galleryTheme}
					setGalleryTheme={props.setGalleryTheme}
				/>
			</TabPanel>
			<TabPanel value={value} index={1}>
				GENERATED LOREM IPSUM 8 PARAGRAPHS COPY Lorem ipsum dolor sit amet,
				consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
				et dolore magna aliqua. Velit egestas dui id ornare arcu. Nibh praesent
				tristique magna sit amet purus gravida quis blandit. Ligula ullamcorper
				malesuada proin libero nunc consequat interdum. Fringilla urna porttitor
				rhoncus dolor purus non enim. Enim sed faucibus turpis in eu mi
				bibendum. Pharetra pharetra massa massa ultricies. Aenean et tortor at
				risus. Euismod quis viverra nibh cras pulvinar mattis nunc. Etiam erat
				velit scelerisque in dictum. Sed blandit libero volutpat sed cras ornare
				arcu dui. At in tellus integer feugiat scelerisque varius. Morbi non
				arcu risus quis varius quam quisque. Consectetur adipiscing elit
				pellentesque habitant morbi tristique senectus et netus.
			</TabPanel>
		</>
	);
};

export default CustomTabs;
