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
import { findOwnedTokensOnERC721Contract } from "../../api/chainHelper";
import axios from "axios";

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

export default function ImportFromContract({ contractAddress, prevButton, handleSubmit }) {

	const classes = useStyles();
	const theme = useTheme();

	// Structure: [{collectionData, assets: [{asset1}, {asset2}]}, ...]
	const [ownedAssetsOnContract, setOwnedAssetsOnContract] = useState(null);

	// Each item is either {nft, collection} or {collection}
	const [selectedItems, setSelectedItems] = useState([]);
	const [dataIsLoading, setDataIsLoading] = useState(true);

	useEffect(async () => {
		const user = getLoggedInUser();
		const ipfsMetadataUris = await findOwnedTokensOnERC721Contract(contractAddress, user.walletAddress);
		const nftDetailPromises = [];
		let nftDetails = [];
		ipfsMetadataUris.forEach((uri) => {
			nftDetailPromises.push(
				axios.get(uri).then((response) => {
					nftDetails.push(response.data);
				}));
		});

		await Promise.all(nftDetailPromises);
		setOwnedAssetsOnContract(nftDetails);
		console.log(nftDetails);
	}, []);

	useEffect(() => {
		if (ownedAssetsOnContract) {
			setDataIsLoading(false);
		}
	}, [ownedAssetsOnContract]);

	const addToSelectedItems = (item) => {
		setSelectedItems([...selectedItems, item]);
	};

	const removeFromSelectedItems = (itemToBeRemoved) => {
		const itemsWithoutTheSubject = selectedItems.filter((item) => item !== itemToBeRemoved);
		setSelectedItems(itemsWithoutTheSubject);
	};

	const nftData = () => {
		return (<Grid container spacing={3}>
			{ownedAssetsOnContract?.map((asset, i) => {
				return (
					<Grid key={i} item lg={3} md={4} sm={6} xs={12}>
						<ImportCard
							ipfsImage
							collection={asset}  // TODO: this should be nft
							addToSelected={(asset) => addToSelectedItems(asset)}
							removeFromSelected={(asset) => removeFromSelectedItems(asset)}
						/>
					</Grid>
				);
			})}
		</Grid>);
	};

	const TabPanelWithSpinner = (index, data) => {
		return withSpinner(<TabPanel
				value={0}
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
				{TabPanelWithSpinner(0, nftData)}
			</SwipeableViews>;
			{
				!dataIsLoading &&
				ButtonsMenu
			}
		</div>
	)
		;
};
