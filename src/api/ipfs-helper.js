import { create, add } from "ipfs-http-client";

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
	addFile: async (file) => {
		const res = await client.add(file);
		return res;
	},
};

export default ipfsHelper;
