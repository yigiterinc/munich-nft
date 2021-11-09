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

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
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
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	};
}

const useStyles = makeStyles({
	customTabContainer: {
		flexGrow: 1,
		marginTop: "2.5vw",
	},
	tabContainer: {
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
		<div className={classes.customTabContainer}>
			<AppBar
				color="transparent"
				position="static"
				className={classes.tabContainer}
			>
				<Tabs
					value={value}
					onChange={handleChange}
					aria-label="simple tabs example"
				>
					<Tab className={classes.tab} label="Description" {...a11yProps(0)} />
					<Tab className={classes.tab} label="Details" {...a11yProps(1)} />
					<Tab
						className={classes.tab}
						label="Item Activity"
						{...a11yProps(2)}
					/>
				</Tabs>
			</AppBar>
			<TabPanel value={value} index={0}>
				<DescriptionTab {...nftJson} />
			</TabPanel>
			<TabPanel value={value} index={1}>
				<DetailsTab {...nftJson} />
			</TabPanel>
			<TabPanel value={value} index={2}>
				<ItemActivityTab {...nftJson} />
			</TabPanel>
		</div>
	);
};

export default CustomTabs;
