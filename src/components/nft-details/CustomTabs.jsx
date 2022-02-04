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

const useStyles = makeStyles((theme) => ({
	tabContainer: {
		background: theme.palette.text.primary,
		color: theme.palette.primary.contrastText,
		flexGrow: 1,
		marginTop: "2vh",
		boxShadow: "none",
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

	const tabLabels = props.nftJson.properties
		? ["Properties", "Description", "Details"]
		: ["Description", "Details"];

	const tabLabelComponents = props.nftJson.properties
		? [
				<PropertiesTab {...props.nftJson} />,
				<DescriptionTab {...props.nftJson} />,
				<DetailsTab {...props.nftJson} />,
		  ]
		: [
				<DescriptionTab {...props.nftJson} />,
				<DetailsTab {...props.nftJson} />,
		  ];
	return (
		<>
			<AppBar
				color="transparent"
				position="static"
				className={classes.tabContainer}
			>
				<Tabs value={value} onChange={handleChange} variant="fullWidth">
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
						<TabPanel value={value} key={index} index={index}>
							{Component}
						</TabPanel>
					);
				})}
			</>
		</>
	);
};

export default CustomTabs;
