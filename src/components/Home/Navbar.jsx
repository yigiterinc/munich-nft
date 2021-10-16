import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Nav,
  Logo,
  Hamburger,
  Menu,
  MenuLink,
  ConnectButton,
} from "./NavbarElements";
import logoImage from "../../assets/images/dummy-logo.png";

import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#f5f5f5",
    marginLeft: "auto",
    marginRight: "2rem",
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    width: "350px",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    width: "100%",
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Nav>
        <Logo href="">
          <img src={logoImage} alt="logo" />
        </Logo>
        <Hamburger onClick={() => setIsOpen(!isOpen)}>
          <span />
          <span />
        </Hamburger>
        {renderSearchBar(classes)}
        <Menu isOpen={isOpen}>
          <MenuLink href="/about">About Us</MenuLink>
          <MenuLink href="/market">Marketplace</MenuLink>
          <MenuLink href="/create">Create</MenuLink>
          <MenuLink href="/my-profile">My Profile</MenuLink>
          <ConnectButton onClick={() => ""}>Connect Wallet</ConnectButton>
        </Menu>
      </Nav>
    </>
  );
};

const renderSearchBar = (classes) => {
  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search galleries, items and accounts..."
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ "aria-label": "search" }}
      />
    </div>
  );
};

export default Navbar;
