import { create } from "ipfs-http-client";

const projectId = process.env.REACT_APP_INFURA_IPFS_PROJECT_ID;
const projectSecret = process.env.REACT_APP_INFURA_IPFS_PROJECT_SECRET;

const auth =
	"Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

const client = create({
	host: "ipfs.infura.io",
	port: 5001,
	protocol: "https",
	headers: {
		authorization: auth,
	},
});

const ipfsHelper = {
	// Warning: Requires that INFURA_PROJECT_ID and INFURA_PROJECT_SECRET to be set in .env file
	// Updating the .env file requires a restart for changes to be reflected
	addFile: async (file) => {
		console.log(projectId, projectSecret, auth);
		return await client.add(file);
	},
	addNftMetadata: async (path, nftMetadata) => {
		const accounts = await window.web3.eth.requestAccounts();
		const account = accounts[0];
		console.log(nftMetadata);
		const doc = JSON.stringify({
			name: nftMetadata.name,
			description: nftMetadata.description,
			image: `https://ipfs.io/ipfs/${path}`,
			external_link: "https://munichnft.com",
			seller_fee_basis_points: 1000, // Indicates a 10% seller fee.
			fee_recipient: account,
		});

		const cid = await client.add(doc);
		console.log("IPFS cid:", cid);
		return cid.path;
	},
};

export default ipfsHelper;
