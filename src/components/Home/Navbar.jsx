import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import {
  Nav,
  Logo,
  Title,
  SearchBar,
  CustomInputBase,
  NavMenu,
  NavMobileMenu,
  MenuLink,
  ConnectButton,
} from "./NavbarElements";
import logoImage from "../../assets/images/dummy-logo.png";

const Navbar = () => {
  const { width } = useCurrentWidthOfTheScreen();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Nav>
        <Logo href="">
          <img src={logoImage} alt="logo" />
          <Title class="nav-title">Dummy</Title>
        </Logo>
        {width > 780 ? (
          <SearchBar>
            <CustomInputBase
              placeholder="Search galleries, items and accounts..."
              inputProps={{ "aria-label": "search" }}
            />
          </SearchBar>
        ) : (
          <div />
        )}
        {width > 1330 ? (
          <NavMenu>
            <MenuLink href="/market">Marketplace</MenuLink>
            <MenuLink href="/create">Create</MenuLink>
            <MenuLink href="/import">Import</MenuLink>
            <MenuLink href="/my-profile">My Profile</MenuLink>
            <ConnectButton onClick={() => ""}>Connect Wallet</ConnectButton>
          </NavMenu>
        ) : (
          <div>
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              Menu
            </Button>
            <NavMobileMenu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem href="/market" onClick={handleClose}>
                Marketplace
              </MenuItem>
              <MenuItem href="/create" onClick={handleClose}>
                Create
              </MenuItem>
              <MenuItem href="/import" onClick={handleClose}>
                Import
              </MenuItem>
              <MenuItem href="/my-profile" onClick={handleClose}>
                My Profile
              </MenuItem>
              <ConnectButton onClick={() => ""}>Connect Wallet</ConnectButton>
            </NavMobileMenu>
          </div>
        )}
      </Nav>
    </>
  );
};

function useCurrentWidthOfTheScreen() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}

function getWindowDimensions() {
  const { innerWidth: width } = window;
  return {
    width,
  };
}

export default Navbar;
