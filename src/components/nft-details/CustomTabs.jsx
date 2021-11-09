import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import DescriptionTab from "./tabs/DescriptionTab";
import DetailsTab from "./tabs/DetailsTab";
import ItemActivityTab from "./tabs/ItemActivityTab";
import PropertiesTab from "./tabs/PropertiesTab";

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
					<Typography>{children}</Typography>
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

const useStyles = makeStyles({
	tabContainer: {
		flexGrow: 1,
		marginTop: "2.5vw",
		boxShadow: "none",
		borderBottom: "1px solid gray",
	},
	tab: {
		textTransform: "capitalize",
	},
});

const CustomTabs = (nftJson) => {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);

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
				<Tabs
					value={value}
					onChange={handleChange}
					// variant="scrollable"
					// scrollButtons="auto"
					// aria-label="scrollable auto tabs example"
				>
					<Tab className={classes.tab} label="PROPERTIES" {...a11yProps(0)} />
					<Tab className={classes.tab} label="DESCRIPTION" {...a11yProps(1)} />
					<Tab className={classes.tab} label="DETAILS" {...a11yProps(2)} />
					{/* <Tab
						className={classes.tab}
						label="ITEM ACTIVITY"
						{...a11yProps(3)}
					/> */}
				</Tabs>
			</AppBar>
			<TabPanel value={value} index={0}>
				<PropertiesTab {...nftJson} />
			</TabPanel>
			<TabPanel value={value} index={1}>
				<DescriptionTab {...nftJson} />
			</TabPanel>
			<TabPanel value={value} index={2}>
				<DetailsTab {...nftJson} />
			</TabPanel>
			{/* <TabPanel value={value} index={3}>
				<ItemActivityTab {...nftJson} />
			</TabPanel> */}
		</>
	);
};

export default CustomTabs;
