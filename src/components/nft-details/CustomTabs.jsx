import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import DescriptionTab from "./tabs/DescriptionTab";
import DetailsTab from "./tabs/DetailsTab";
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

const useStyles = makeStyles({
	box: {
		justifyContent: "center",
	},
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
	const [value, setValue] = useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const tabLabels =
		nftJson.properties.length === 0
			? ["Description", "Details"]
			: ["Properties", "Description", "Details"];

	const tabLabelComponents =
		nftJson.properties.length === 0
			? [<DescriptionTab {...nftJson} />, <DetailsTab {...nftJson} />]
			: [
					<PropertiesTab {...nftJson} />,
					<DescriptionTab {...nftJson} />,
					<DetailsTab {...nftJson} />,
			  ];
	return (
		<>
			<AppBar
				color="transparent"
				position="static"
				className={classes.tabContainer}
			>
				<Tabs value={value} onChange={handleChange} centered>
					{tabLabels.map((tabLabel, index) => {
						return (
							<Tab
								key={index}
								className={classes.tab}
								label={tabLabel}
								{...a11yProps(index)}
							/>
						);
					})}
				</Tabs>
			</AppBar>
			<>
				{tabLabelComponents.map((Component, index) => {
					return (
						<TabPanel value={value} index={index}>
							{Component}
						</TabPanel>
					);
				})}
			</>
		</>
	);
};

export default CustomTabs;
