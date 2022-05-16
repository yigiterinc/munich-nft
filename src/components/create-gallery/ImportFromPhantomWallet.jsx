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
import { getNftTokenDetails } from "../../api/sol";

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
		"&:disabled": {
			border: "#e0e0e0",
			background: "#e0e0e0",
			color: "#a6a6a6",
			margin: "13px 25px",
			padding: "13px 25px",
		},
	},
}));

export default function ImportFromPhantomWallet({ prevButton, handleSubmit }) {
	const classes = useStyles();
	const theme = useTheme();
	const [activeTab, setActiveTab] = useState(0);

	const [userAssets, setUserAssets] = useState(null);
	const [selectedItems, setSelectedItems] = useState([]);
	const [dataIsLoading, setDataIsLoading] = useState(true);

	useEffect(async () => {
		if (isUserLoggedIn()) {
			const user = getLoggedInUser();
			const assets = await getNftTokenDetails(user.solAddress);
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

	const handleChangeIndex = (index) => {
		setActiveTab(index);
	};

	const DEFAULT_IMAGE_PATH = "/images/no-image.png";

	const AssetCardsGrid = () => {
		return (
			<Grid container spacing={2}>
				{userAssets?.map((asset) => {
					return (
						<Grid key={asset.image_url} item xs={4}>
							<NFTImportCard
								name={asset.name}
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

	const handleTabSwitch = (event, newValue) => {
		setSelectedItems([]);
		setActiveTab(newValue);
	};

	const TabPanelWithSpinner = (index, data) => {
		return withSpinner(
			<TabPanel
				value={activeTab}
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

	const ButtonsMenu = (
		<div className={classes.buttonsContainer}>
			{prevButton}

			<Button
				className={classes.button}
				variant="contained"
				size="large"
				disabled={selectedItems.length === 0}
				onClick={() => handleSubmit(selectedItems)}
			>
				Add Selected Items to the Gallery
			</Button>
		</div>
	);

	const nftsTabIndex = 0;

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
						icon={<ImageIcon />}
						label="Assets"
						{...a11yProps(nftsTabIndex)}
					/>
				</Tabs>
			</AppBar>
			<SwipeableViews
				axis={theme.direction === "rtl" ? "x-reverse" : "x"}
				index={activeTab}
				onChangeIndex={handleChangeIndex}
			>
				{TabPanelWithSpinner(nftsTabIndex, AssetCardsGrid)}
			</SwipeableViews>
			{!dataIsLoading && ButtonsMenu}
		</div>
	);
}
