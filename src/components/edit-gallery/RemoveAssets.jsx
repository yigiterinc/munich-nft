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
import { useParams } from "react-router";

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
		width: "100vw",
	},
	buttonsContainer: {
		display: "flex",
		justifyContent: "center",
		marginBottom: "10vh",
		marginTop: "2vh",
	},
	tabPanel: {
		paddingLeft: "5vw",
		paddingRight: "5vw",
		paddingTop: "5vh",
		overflow: "scroll",
		height: "auto",
	},
	button: {
		background: "#b35bff",
		color: "white",
		margin: "13px 25px",
		padding: "13px 25px",
		"&:hover": {
			background: darken("#b35bff", 0.1),
		},
	},
	buttonDisabled: {
		background: "gray",
		color: "white",
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
			(selectedItem) => selectedItem.item !== itemToBeRemoved.item
		);
		setSelectedItems(itemsWithoutTheSubject);
	};

	const DEFAULT_IMAGE_PATH = "/images/no-image.png";

	const galleryAssetIds = galleryAssets.map((asset) => asset.id);

	const AssetCardsGrid = () => {
		return (
			<Grid container spacing={3} direction="row" alignItems="center">
				{galleryAssets
					.map((item) => {
						return (
							<Grid key={item?.id} item lg={3} md={4} sm={6} xs={12}>
								<NFTImportCard
									name={item.name}
									image={item.image_url}
									addToSelected={() =>
										addToSelectedItems({ item })
									}
									removeFromSelected={() =>
										removeNftFromSelectedItems({ item })
									}
								/>
							</Grid>
						);
					})
				}
				)}
			</Grid>)
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
			{ marginTop: "10vh", marginBottom: "4vh", marginLeft: "48vw" }
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
				Back
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
			;{!dataIsLoading && ButtonsMenu()}
		</div>
	);
};

export default RemoveAssets;
