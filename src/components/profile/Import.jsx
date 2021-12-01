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
		width: "100vw",
	},
	importButton: {
		display: "flex",
		justifyContent: "center",
		marginBottom: "10vh",
		marginTop: "2vh",
	},
	tabPanel: {
		overflow: "scroll",
		height: "auto",
	},
}));

export default function Import({
																 collections,
																 onImportCollections,
																 onImportNfts,
																 prevButton,
																 handleSubmit
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
		setSelectedNfts(selectedNfts.filter((item) => item.nft !== nft));
	};

	const removeFromSelectedCollections = (collection) => {
		setSelectedCollections(
			selectedCollections.filter((item) => item !== collection),
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
			<AppBar position="static" color="inherit" elevation={0}>
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
					<Grid container spacing={1}>
						{collections?.map((item) => {
							return (
								<Grid key={item.slug} item lg={3} md={4} sm={6} xs={12}>
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
					<Grid container
								spacing={3}
								direction="row"
								alignItems="center">
						{collections?.map((collection) =>
							collection?.assets.map((item) => {
								return (
									<Grid key={item?.id} item lg={3} md={4} sm={6} xs={12}>
										<ImportCard
											nft={item}
											addToSelected={(nft) => addToSelectedNfts({ collection, nft })}
											removeFromSelected={(nft) => removeFromSelectedNfts(nft)}
										/>
									</Grid>
								);
							}),
						)}
					</Grid>
				</TabPanel>
			</SwipeableViews>
			<div className={classes.importButton}>
				{
					prevButton
				}

				<Button
					variant="contained"
					style={{
						background: "#FF6700",
						color: "#FFFFFF",
						margin: "10px 20px",
						padding: "10px 20px",
					}}
					size="large"
					onClick={() => {
						if (selectedCollections.length !== 0) {
							console.log(selectedCollections);
							onImportCollections(selectedCollections);
							handleSubmit(selectedCollections, null);
						} else if (selectedNfts.length !== 0) {
							console.log(selectedNfts);
							onImportNfts(selectedNfts)
							handleSubmit(null, selectedNfts)
						}
					}}
				>
					Create collection with Selected Items
				</Button>
			</div>
		</div>
	);
}
