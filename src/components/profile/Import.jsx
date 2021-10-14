import React, { useState } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import CollectionsIcon from "@material-ui/icons/Collections";
import ImageIcon from "@material-ui/icons/Image";
import ImportCard from "./ImportCard";

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`tabpanel-${index}`}
			aria-labelledby={`tab-${index}`}
			{...other}
		>
			{value === index && <Box p={3}>{children}</Box>}
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
		id: `tab-${index}`,
		"aria-controls": `tabpanel-${index}`,
	};
}

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.paper,
		width: 500,
	},
	importButton: {
		display: "flex",
		justifyContent: "center",
	},
	tabPanel: {
		overflow: "scroll",
		height: "50vh",
	},
}));

export default function Import({
	collections,
	onImportCollections,
	onImportNfts,
}) {
	const classes = useStyles();
	const theme = useTheme();
	const [value, setValue] = useState(0);
	const [selectedNfts, setSelectedNfts] = useState([]);
	const [selectedCollections, setSelectedCollections] = useState([]);

	const addToSelectedNfts = (nft) => {
		setSelectedNfts([...selectedNfts, nft]);
	};

	const addToSelectedCollections = (collection) => {
		setSelectedCollections([...selectedCollections, collection]);
	};

	const removeFromSelectedNfts = (nft) => {
		setSelectedNfts(selectedNfts.filter((item) => item !== nft));
	};

	const removeFromSelectedCollections = (collection) => {
		setSelectedCollections(
			selectedCollections.filter((item) => item !== collection)
		);
	};

	const handleChange = (event, newValue) => {
		setSelectedNfts([]);
		setSelectedCollections([]);
		setValue(newValue);
	};

	const handleChangeIndex = (index) => {
		setValue(index);
	};

	return (
		<div className={classes.root}>
			<AppBar position="static" color="default">
				<Tabs
					value={value}
					onChange={handleChange}
					indicatorColor="primary"
					textColor="primary"
					variant="fullWidth"
				>
					<Tab
						icon={<CollectionsIcon />}
						label="Collections"
						{...a11yProps(0)}
					/>
					<Tab icon={<ImageIcon />} label="NFTs" {...a11yProps(1)} />
				</Tabs>
			</AppBar>
			<SwipeableViews
				axis={theme.direction === "rtl" ? "x-reverse" : "x"}
				index={value}
				onChangeIndex={handleChangeIndex}
			>
				<TabPanel
					value={value}
					index={0}
					dir={theme.direction}
					className={classes.tabPanel}
				>
					<Grid container spacing={2}>
						{collections?.map((item) => {
							return (
								<Grid key={item.slug} item xs={4}>
									<ImportCard
										collection={item}
										addToSelected={(collection) =>
											addToSelectedCollections(collection)
										}
										removeFromSelected={(collection) =>
											removeFromSelectedCollections(collection)
										}
									/>
								</Grid>
							);
						})}
					</Grid>
				</TabPanel>
				<TabPanel
					value={value}
					index={1}
					dir={theme.direction}
					className={classes.tabPanel}
				>
					<Grid container spacing={2}>
						{collections?.map((collection) =>
							collection.assets.map((item) => {
								return (
									<Grid key={item.id} item xs={4}>
										<ImportCard
											nft={item}
											addToSelected={(nft) => addToSelectedNfts(nft)}
											removeFromSelected={(nft) => removeFromSelectedNfts(nft)}
										/>
									</Grid>
								);
							})
						)}
					</Grid>
				</TabPanel>
			</SwipeableViews>
			<div className={classes.importButton}>
				<Button
					variant="contained"
					size="large"
					onClick={() => {
						if (selectedCollections.length !== 0) {
							onImportCollections(selectedCollections);
						} else if (selectedNfts.length !== 0) {
							onImportNfts(selectedNfts);
						}
					}}
				>
					IMPORT
				</Button>
			</div>
		</div>
	);
}
