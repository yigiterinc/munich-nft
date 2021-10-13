// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MunichNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    mapping (address => uint256) private _tokensMinted;
    mapping (address => uint256) private _allowance;

    constructor() ERC721("MunichNFT", "MUC") {} // First arg is contract name, second is its symbol

    modifier canMint {
        require(
            _tokensMinted[msg.sender] < _allowance[msg.sender],
            "Not whitelisted or allowance too low."
        );
        _;
    }

    function mint(address owner, string memory tokenURI) public canMint
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(owner, newItemId);
        _setTokenURI(newItemId, tokenURI);

        _tokensMinted[owner] += 1;
    }

    function setMinter(address minter, uint256 maxToken) public onlyOwner
    {
        _allowance[minter] = maxToken;
    }
}
