import React, { useEffect, useState, useRef } from "react";
import { darken, makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import NFTImportCard from "../common/NFTImportCard";
import ImageIcon from "@material-ui/icons/Image";
import withSpinner from "../common/WithSpinner";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import SwipeableViews from "react-swipeable-views";
import { useParams } from "react-router-dom";
import { withDefault } from "../../utils/commons";
import { Typography } from "@material-ui/core";

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

function a11yProps(index) {
	return {
		id: `tab-${index}`,
		"aria-controls": `tabpanel-${index}`,
	};
}

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.paper,
		width: "auto",
		height: "auto",
	},
	buttonsContainer: {
		display: "flex",
		justifyContent: "center",
	},
	tabPanel: {
		paddingTop: "5vh",
		paddingLeft: "1vw",
		paddingRight: "1vw",
		paddingBottom: "3vh",
		overflow: "hidden",
	},
	button: {
		background: "#b35bff",
		color: "#FFFFFF",
		margin: "13px 25px",
		padding: "13px 25px",
		"&:hover": {
			background: darken("#b35bff", 0.1),
		},
	},
	buttonDisabled: {
		border: "#e0e0e0",
		background: "#e0e0e0",
		color: "#a6a6a6",
		margin: "13px 25px",
		padding: "13px 25px",
	},
}));

const RemoveAssets = ({
	galleryAssets,
	handleChangeGalleryAssets,
	setShowSelectedView,
}) => {
	const classes = useStyles();
	const theme = useTheme();
	let { slug } = useParams();

	// Each item is either {nft, collection} or {collection}
	const [selectedItems, setSelectedItems] = useState([]);
	const [dataIsLoading, setDataIsLoading] = useState(true);
	const isInitialMount = useRef(true);

	useEffect(() => {
		console.log("Selected ", selectedItems);
	}, [selectedItems]);

	useEffect(() => {
		if (isInitialMount.current) {
			isInitialMount.current = false;
		} else {
			setShowSelectedView(false);
		}
	}, [slug]);

	useEffect(() => {
		if (galleryAssets) {
			setDataIsLoading(false);
		}
	}, [galleryAssets]);

	const addToSelectedItems = (item) => {
		setSelectedItems([...selectedItems, item]);
	};

	const removeNftFromSelectedItems = (itemToBeRemoved) => {
		const itemsWithoutTheSubject = selectedItems.filter(
			(selectedItem) => selectedItem.asset !== itemToBeRemoved.asset
		);
		setSelectedItems(itemsWithoutTheSubject);
	};

	const DEFAULT_IMAGE_PATH = "/images/no-image.png";
	const DEFAULT_NAME = "Nameless";

	const AssetCardsGrid = () => {
		return (
			<Grid
				container
				spacing={2}
				direction="row"
				alignItems="center"
				justifyContent="center"
			>
				{galleryAssets.length === 0 && (
					<Typography>
						There are no assets to remove in your gallery!
					</Typography>
				)}
				{galleryAssets.map((asset) => {
					let importedAsAsset = Object.keys(asset).includes("item");

					return (
						<Grid key={asset.item?.id} item xs={4}>
							<NFTImportCard
								name={withDefault(
									importedAsAsset ? asset?.item.name : asset.name,
									DEFAULT_NAME
								)}
								image={withDefault(
									importedAsAsset ? asset?.item.image_url : asset.image_url,
									DEFAULT_IMAGE_PATH
								)}
								addToSelected={() => addToSelectedItems({ asset })}
								removeFromSelected={() => removeNftFromSelectedItems({ asset })}
							/>
						</Grid>
					);
				})}
			</Grid>
		);
	};

	const TabPanelWithSpinner = (index, data) => {
		return withSpinner(
			<TabPanel
				value={0}
				index={index}
				dir={theme.direction}
				className={classes.tabPanel}
			>
				{data}
			</TabPanel>,
			dataIsLoading,
			{ marginLeft: 300, marginTop: "10vh", marginBottom: "10vh" }
		);
	};

	const ButtonsMenu = () => (
		<div className={classes.buttonsContainer}>
			<Button
				className={classes.button}
				variant="contained"
				size="large"
				onClick={() => setShowSelectedView(false)}
			>
				Close
			</Button>
			<Button
				variant="contained"
				size="large"
				classes={{ root: classes.button, disabled: classes.buttonDisabled }}
				onClick={() => handleChangeGalleryAssets(selectedItems)}
				disabled={selectedItems.length === 0}
			>
				{"Remove Selected Item(s)"}
			</Button>
		</div>
	);

	return (
		<div className={classes.root}>
			<AppBar position="static" color="inherit" elevation={0}>
				<Tabs
					value={0}
					indicatorColor="primary"
					textColor="primary"
					variant="fullWidth"
				>
					<Tab icon={<ImageIcon />} label="Assets" {...a11yProps(0)} />
				</Tabs>
			</AppBar>
			<SwipeableViews
				axis={theme.direction === "rtl" ? "x-reverse" : "x"}
				index={0}
			>
				{TabPanelWithSpinner(0, AssetCardsGrid())}
			</SwipeableViews>
			{!dataIsLoading && ButtonsMenu()}
		</div>
	);
};

export default RemoveAssets;
