import React from "react";
import Carousel from "react-multi-carousel";
import { Typography } from "@material-ui/core";
import "react-multi-carousel/lib/styles.css";
import { makeStyles } from "@material-ui/core/styles";
import NFTSummary from "./NFTSummary";

const useStyles = makeStyles({
	title: {
		textAlign: "center",
	},
	carouselItem: {
		padding: "20px 0 20px 20px",
	},
});

const responsive = {
	desktop: {
		breakpoint: { max: 3000, min: 1024 },
		items: 4,
		slidesToSlide: 3,
		partialVisibilityGutter: 60,
	},
	tablet: {
		breakpoint: { max: 1024, min: 464 },
		items: 3,
		slidesToSlide: 2,
		partialVisibilityGutter: 50,
	},
	mobile: {
		breakpoint: { max: 464, min: 0 },
		items: 1,
		slidesToSlide: 1,
		partialVisibilityGutter: 30,
	},
};

const nfts = [
	{
		image:
			"https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
	},
	{
		image:
			"https://images.unsplash.com/photo-1550133730-695473e544be?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
	},
	{
		image:
			"https://images.unsplash.com/photo-1550167164-1b67c2be3973?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
	},
	{
		image:
			"https://images.unsplash.com/photo-1550338861-b7cfeaf8ffd8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
	},
	{
		image:
			"https://images.unsplash.com/photo-1550223640-23097fc71cb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
	},
	{
		image:
			"https://images.unsplash.com/photo-1550353175-a3611868086b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
	},
	{
		image:
			"https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
	},
	{
		image:
			"https://images.unsplash.com/photo-1550133730-695473e544be?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
	},
	{
		image:
			"https://images.unsplash.com/photo-1550167164-1b67c2be3973?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
	},
	{
		image:
			"https://images.unsplash.com/photo-1550338861-b7cfeaf8ffd8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
	},
	{
		image:
			"https://images.unsplash.com/photo-1550223640-23097fc71cb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
	},
	{
		image:
			"https://images.unsplash.com/photo-1550353175-a3611868086b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
	},
];

const TopNFTs = ({ deviceType }) => {
	const classes = useStyles();

	return (
		<div>
			<Typography className={classes.title} variant="h4">
				Top NFTs
			</Typography>
			<Carousel
				ssr
				partialVisible
				deviceType={deviceType}
				itemClass={classes.carouselItem}
				responsive={responsive}
			>
				{nfts.map((nft) => {
					return <NFTSummary nft={nft} />;
				})}
			</Carousel>
		</div>
	);
};

export default TopNFTs;
