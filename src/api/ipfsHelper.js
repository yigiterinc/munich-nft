import { create } from "ipfs-http-client";

const projectId = "1zT0xCj5T5RHmnXNqquZpj9w9SD";
const projectSecret = "f935b030029e0fa41d8c66c9cf46f869";

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
	addFile: async (file) => {
		console.log(auth);
		const address = await client.add(file);
		return address;
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
