import React, { useEffect, useState } from "react";
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
import { getLoggedInUser, isUserLoggedIn } from "../../utils/auth-utils";
import { withDefault } from "../../utils/commons";
import { getAllNftDataByWalletAddress } from "../../api/sol";

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

export default function ImportFromPhantomWallet({ prevButton, handleSubmit }) {
	const classes = useStyles();
	const theme = useTheme();

	const [userAssets, setUserAssets] = useState(null);
	const [selectedItems, setSelectedItems] = useState([]);
	const [dataIsLoading, setDataIsLoading] = useState(true);

	useEffect(async () => {
		if (isUserLoggedIn()) {
			const user = getLoggedInUser();
			const assets = await getAllNftDataByWalletAddress(user.solAddress);
			console.log(assets);
			setUserAssets(assets);
		}
	}, []);

	useEffect(() => {
		if (userAssets) {
			setDataIsLoading(false);
		}
	}, [userAssets]);

	const addToSelectedItems = (item) => {
		setSelectedItems([...selectedItems, item]);
	};

	const removeNftFromSelectedItems = (itemToBeRemoved) => {
		const itemsWithoutTheSubject = selectedItems.filter(
			(item) => item !== itemToBeRemoved
		);
		setSelectedItems(itemsWithoutTheSubject);
	};

	const DEFAULT_IMAGE_PATH = "/images/no-image.png";

	const AssetCardsGrid = () => {
		return (
			<Grid container spacing={3}>
				{userAssets?.map((asset) => {
					return (
						<Grid key={asset.mint} item lg={3} md={4} sm={6} xs={12}>
							<NFTImportCard
								name={asset.data.name}
								image={withDefault(asset.image, DEFAULT_IMAGE_PATH)}
								addToSelected={() => addToSelectedItems(asset)}
								removeFromSelected={() => removeNftFromSelectedItems(asset)}
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
			{ marginTop: "10vh", marginBottom: "4vh", marginLeft: "48vw" }
		);
	};

	const ButtonsMenu = (
		<div className={classes.buttonsContainer}>
			{prevButton}

			<Button
				variant="contained"
				style={{
					background: "#b35bff",
					color: "#FFFFFF",
					margin: "13px 25px",
					padding: "13px 25px",
					"&:hover": {
						background: darken("#b35bff", 0.1),
					},
				}}
				size="large"
				onClick={() => handleSubmit(selectedItems)}
			>
				Create gallery with Selected Items
			</Button>
		</div>
	);

	const nftsTabIndex = 0;

	return (
		<div className={classes.root}>
			<AppBar position="static" color="inherit" elevation={0}>
				<Tabs
					value={0}
					indicatorColor="primary"
					textColor="primary"
					variant="fullWidth"
				>
					<Tab
						icon={<ImageIcon />}
						label="Assets"
						{...a11yProps(nftsTabIndex)}
					/>
				</Tabs>
			</AppBar>
			<SwipeableViews
				axis={theme.direction === "rtl" ? "x-reverse" : "x"}
				index={0}
			>
				{TabPanelWithSpinner(nftsTabIndex, AssetCardsGrid)}
			</SwipeableViews>
			{!dataIsLoading && ButtonsMenu}
		</div>
	);
}
