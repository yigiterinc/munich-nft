import React, { useEffect, useState } from "react";
import Import from "../profile/Import";
import { fetchCollectionsOfUser, getAssetsAddedCollections } from "../../api/opensea";
import { makeStyles } from "@material-ui/core/styles";
import { getLoggedInUser, isUserLoggedIn } from "../../utils/auth-utils";

const useStyles = makeStyles((theme) => ({
  baseContainer: {
  }
}));

const SelectGalleryNfts = (props) => {
  const [collections, setCollections] = useState(null);
  const classes = useStyles()

  useEffect(async () => {
    if (isUserLoggedIn()) {
      let collectionsData = await fetchCollectionsOfUser(getLoggedInUser().walletAddress);
      let collectionsWithAssets = [];
      collectionsWithAssets.push(
        await getAssetsAddedCollections(collectionsData),
      );
      console.log(collectionsWithAssets);

      let filtered = await filterAssetsInCollectionByOwner(
        collectionsWithAssets,
      );
      console.log(filtered);
      setCollections(filtered);
    }
  }, []);

  const userSoldTheAsset = (asset, tx, walletAddress) => {
    if (!asset.last_sale.event_type === "successful") return false;

    if (tx.from !== walletAddress && tx.logs[0]?.data.indexOf(walletAddress) >= 0) {
      return true;
    } else if (tx.from === walletAddress && tx.logs[0]?.data.indexOf(walletAddress) < 0) {
      return tx.logs.length > 2;
    } else if (tx.from === tx.logs[0]?.data.substring(0, 42)) {
      return true;
    }

    return false;
  };

  const assetBelongsToCurrentUser = async (asset, walletAddress) => {
    if (asset.owner.address === walletAddress) {
      return true;
    }

    if (!asset.last_sale) {
      return asset.creator.address === walletAddress;
    }

    window.web3.defaultChain = "rinkeby";
    const txHash = asset.last_sale.transaction.transaction_hash;
    console.log(txHash);
    const tx = await window.web3.eth.getTransactionReceipt(txHash);

    if (!tx || userSoldTheAsset(asset, tx, walletAddress)) {
      return false;
    }

    return tx.logs[0].topics.join().indexOf(walletAddress.substring(3)) >= 0;
  };

  const filterAssetsInCollectionByOwner = async (collectionWithAssets) => {
    let filteredCollections = collectionWithAssets[0];
    let currCollection;
    for (let i = 0; i < filteredCollections.length; i++) {
      let assetsOfUserInCurrCollection = [];
      currCollection = filteredCollections[i];

      let asset;
      for (let i = 0; i < currCollection.assets.length; i++) {
        asset = currCollection.assets[i];

        if (await assetBelongsToCurrentUser(asset, getLoggedInUser().walletAddress)) {
          assetsOfUserInCurrCollection.push(asset);
        }
      }

      filteredCollections[i].assets = assetsOfUserInCurrCollection;
    }

    return filteredCollections;
  };

  return (
      <div className={classes.baseContainer}>
        <Import collections={collections}
                prevButton={props.prevButton}
                handleSubmit={props.handleSubmit}
        />
      </div>
  );
};

export default SelectGalleryNfts;