import React, { useEffect, useState } from "react";
import { darken, makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import ImportCard from "../common/ImportCard";
import CollectionsIcon from "@material-ui/icons/Collections";
import ImageIcon from "@material-ui/icons/Image";
import withSpinner from "../common/WithSpinner";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import SwipeableViews from "react-swipeable-views";
import { getLoggedInUser, isUserLoggedIn } from "../../utils/auth-utils";
import { fetchCollectionsOfUser, filterAssetsInCollectionByOwner, getAssetsAddedCollections } from "../../api/opensea";
import { withDefault } from "../../utils/commons";

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
}));

export default function ImportFromOpensea({
																						collections,
																						prevButton,
																						handleSubmit,
																					}) {

	const classes = useStyles();
	const theme = useTheme();
	const [activeTab, setActiveTab] = useState(0);

	// Structure: [{collectionData, assets: [{asset1}, {asset2}]}, ...]
	const [userCollections, setUserCollections] = useState(null);

	// Each item is either {nft, collection} or {collection}
	const [selectedItems, setSelectedItems] = useState([]);
	const [dataIsLoading, setDataIsLoading] = useState(true);

	useEffect(async () => {
		if (isUserLoggedIn()) {
			let collectionsData = await fetchCollectionsOfUser(getLoggedInUser().walletAddress);
			let collectionsWithAssets = [];
			collectionsWithAssets.push(
				await getAssetsAddedCollections(collectionsData),
			);

			let filtered = await filterAssetsInCollectionByOwner(
				collectionsWithAssets,
			);

			setUserCollections(filtered);
		}
	}, []);

	useEffect(() => {
		if (userCollections) {
			setDataIsLoading(false);
		}
	}, [userCollections]);

	const addToSelectedItems = (item) => {
		setSelectedItems([...selectedItems, item]);
	};

	const removeCollectionFromSelectedItems = (itemToBeRemoved) => {
		const itemsWithoutTheSubject = selectedItems.filter((item) => item !== itemToBeRemoved);
		setSelectedItems(itemsWithoutTheSubject);
	};

	const removeNftFromSelectedItems = (itemToBeRemoved) => {
		const itemsWithoutTheSubject = selectedItems.filter((item) => item.nft !== itemToBeRemoved);
		setSelectedItems(itemsWithoutTheSubject);
	};

	const handleChangeIndex = (index) => {
		setActiveTab(index);
	};

	const DEFAULT_IMAGE_PATH = "/images/no-image.png";

	const CollectionCardsGrid = () => {
		return (<Grid container spacing={3}>
			{userCollections?.map((collection) => {
				return (
					<Grid key={collection.slug} item lg={3} md={4} sm={6} xs={12}>
						<ImportCard
							name={collection.name}
							image={withDefault(collection.image_url, DEFAULT_IMAGE_PATH)}
							addToSelected={(coll) => addToSelectedItems(coll)}
							removeFromSelected={(coll) => removeCollectionFromSelectedItems(coll)}
						/>
					</Grid>
				);
			})}
		</Grid>);
	};

	const handleTabSwitch = (event, newValue) => {
		setSelectedItems([]);
		setActiveTab(newValue);
	};

	const AssetCardsGrid = () => {
		return (
			<Grid container
						spacing={3}
						direction="row"
						alignItems="center">
				{userCollections?.map((collection) =>
					collection?.assets.map((item) => {
						return (
							<Grid key={item?.id} item lg={3} md={4} sm={6} xs={12}>
								<ImportCard
									name={item.name}
									image={item.image_url}
									addToSelected={() => addToSelectedItems({ collection, item })}
									removeFromSelected={() => removeNftFromSelectedItems({ collection, item })}
								/>
							</Grid>
						);
					}),
				)}
			</Grid>
		);
	};

	const TabPanelWithSpinner = (index, data) => {
		return withSpinner(<TabPanel
				value={activeTab}
				index={index}
				dir={theme.direction}
				className={classes.tabPanel}
			>
				{data}
			</TabPanel>, dataIsLoading,
			{ marginTop: "10vh", marginBottom: "4vh", marginLeft: "48vw" }
			,
		);
	};

	const ButtonsMenu = (
		<div className={classes.buttonsContainer}>
			{
				prevButton
			}

			<Button
				variant="contained"
				style={{
					background: "#FF6700",
					color: "#FFFFFF",
					margin: "13px 25px",
					padding: "13px 25px",
					"&:hover": {
						background: darken("#FF6700", 0.1),
					},
				}}
				size="large"
				onClick={() => handleSubmit(selectedItems)}
			>
				Create gallery with Selected Items
			</Button>
		</div>);


	const collectionsTabIndex = 0, nftsTabIndex = 1;

	return (
		<div className={classes.root}>
			<AppBar position="static" color="inherit" elevation={0}>
				<Tabs
					value={activeTab}
					onChange={handleTabSwitch}
					indicatorColor="primary"
					textColor="primary"
					variant="fullWidth"
				>
					<Tab
						icon={<CollectionsIcon />}
						label="Collections"
						{...a11yProps(collectionsTabIndex)}
					/>
					<Tab icon={<ImageIcon />} label="Assets" {...a11yProps(nftsTabIndex)} />
				</Tabs>
			</AppBar>
			<SwipeableViews
				axis={theme.direction === "rtl" ? "x-reverse" : "x"}
				index={activeTab}
				onChangeIndex={handleChangeIndex}
			>
				{TabPanelWithSpinner(collectionsTabIndex, CollectionCardsGrid)}
				{TabPanelWithSpinner(nftsTabIndex, AssetCardsGrid)}
			</SwipeableViews>;
			{
				!dataIsLoading &&
				ButtonsMenu
			}
		</div>
	)
		;
}
