import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { darken, makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import CollectionsIcon from "@material-ui/icons/Collections";
import ImageIcon from "@material-ui/icons/Image";
import ImportCard from "./ImportCard";
import withSpinner from "../common/WithSpinner";

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

export default function Import({
																 collections,
																 prevButton,
																 handleSubmit,
																 fromContract,
															 }) {

	const classes = useStyles();
	const theme = useTheme();
	const [activeTab, setActiveTab] = useState(0);
	const [selectedNfts, setSelectedNfts] = useState([]);
	const [selectedCollections, setSelectedCollections] = useState([]);
	const [dataIsLoading, setDataIsLoading] = useState(true);

	useEffect(() => {
		if (collections) {
			setDataIsLoading(false);
		}
	}, [collections]);


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
		setActiveTab(newValue);
	};

	const handleChangeIndex = (index) => {
		setActiveTab(index);
	};

	const collectionsTabContent = () => {
		return (<Grid container spacing={3}>
			{collections?.map((item) => {
				return (
					<Grid key={item.slug} item lg={3} md={4} sm={6} xs={12}>
						<ImportCard
							collection={item}
							ipfsImage={fromContract}
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
		</Grid>);
	};

	const nftsTabContent = () => {
		return (
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
									ipfsImage={fromContract}
									addToSelected={(nft) => addToSelectedNfts({ collection, nft })}
									removeFromSelected={(nft) => removeFromSelectedNfts(nft)}
								/>
							</Grid>
						);
					}),
				)}
			</Grid>
		);
	};

	const Tabs = () => {
		if (fromContract) {
			return <Tab icon={<ImageIcon />} label="NFTs" {...a11yProps(1)} />;
		} else {
			return (
				<>
					<Tab
						icon={<CollectionsIcon />}
						label="Collections"
						{...a11yProps(0)}
					/>
					<Tab icon={<ImageIcon />} label="NFTs" {...a11yProps(1)} />)
				</>);
		}
	};

	const ButtonsMenu = (<div className={classes.buttonsContainer}>
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
				"&:hover": {
					background: darken("#FF6700", 0.1),
				},
			}
			}
			size="large"
			onClick={() => {
				if (selectedCollections.length !== 0) {
					console.log(selectedCollections);
					handleSubmit(selectedCollections, null);
				} else if (selectedNfts.length !== 0) {
					console.log(selectedNfts);
					handleSubmit(null, selectedNfts);
				}
			}}
		>
			Create gallery with Selected Items
		</Button>
	</div>);

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

	return (
		<div className={classes.root}>
			<AppBar position="static" color="inherit" elevation={0}>
				<Tabs
					value={activeTab}
					onChange={handleChange}
					indicatorColor="primary"
					textColor="primary"
					variant="fullWidth"
				>
					{Tabs()}
				</Tabs>

			</AppBar>
			<SwipeableViews
				axis={theme.direction === "rtl" ? "x-reverse" : "x"}
				index={activeTab}
				onChangeIndex={handleChangeIndex}
			>
				{TabPanelWithSpinner(0, collectionsTabContent)}
				{TabPanelWithSpinner(1, nftsTabContent)}

			</SwipeableViews>
			{
				!dataIsLoading &&
				ButtonsMenu
			}
		</div>
	);
}
