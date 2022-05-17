import React, { useEffect, useState } from "react";
import AccountCircleTwoToneIcon from "@material-ui/icons/AccountCircleTwoTone";
import AddCircleOutlineTwoToneIcon from "@material-ui/icons/AddCircleOutlineTwoTone";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Link, useHistory } from "react-router-dom";

import {
  getLoggedInUser,
  isUserLoggedIn,
  logout
} from "../../../utils/auth-utils";
import { MeetingRoomTwoTone } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import { GiHamburgerMenu } from "react-icons/all";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { createTheme, useMediaQuery, useTheme } from "@material-ui/core";
import { ThemeProvider } from "styled-components";

const useStyles = makeStyles({
  navMenu: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
    marginLeft: "auto",
    marginRight: 0
  },
  menuLink: {
    marginRight: "1.5vw",
    marginLeft: "4px",
    cursor: "pointer",
    color: "black",
    "&:focus, &:hover, &:visited, &:link, &:active": {
      textDecoration: "none",
      color: "black"
    },
    fontSize: "18px",
    letterSpacing: "1.3px",
    fontWeight: "500"
  },
  flex: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  }
});

const NavbarItems = (props) => {
  const classes = useStyles();

  const theme = useTheme();

  const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const history = useHistory();

  const menu = [
    {
      requiresLogin: true,
      to: "/mint-nft",
      component: (
        <>
          <AddCircleOutlineTwoToneIcon size={30} style={{ fill: "black" }} />
          <Link className={classes.menuLink} to={"/mint-nft"}>
            Mint NFT
          </Link>
        </>
      )
    },
    {
      requiresLogin: true,
      to: `/profile/${getLoggedInUser()?.id}`,
      component: (
        <>
          <AccountCircleTwoToneIcon size={30} style={{ fill: "black" }} />
          <Link
            className={classes.menuLink}
            to={`/profile/${getLoggedInUser()?.id}`}
          >
            Profile
          </Link>
        </>
      )
    },
    {
      requiresLogin: true,
      logout: true,
      component: (
        <>
          <MeetingRoomTwoTone size={30} style={{ fill: "black" }} />
          <p
            className={classes.menuLink}
            onClick={() => logout()}
          >
            Log out
          </p>
        </>
      )
    }
  ];

  const StyledMenu = withStyles({
    paper: {
      border: "1px solid #d3d4d5"
    }
  })((props) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center"
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center"
      }}
      {...props}
    />
  ));

  const HamburgerMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <div style={{ marginLeft: "auto" }}>
        <IconButton
          aria-label="more"
          aria-controls="burger-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <GiHamburgerMenu />
        </IconButton>
        <StyledMenu
          id="burger-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {
            menu.map(item => (<MenuItem onClick={() => {
              item.logout ? logout() : history.push(item.to);
              setAnchorEl(null);
            }}>
              {
                item.component
              }
            </MenuItem>))
          }
        </StyledMenu>
      </div>
    );
  };

  return (
    props.userLoggedIn &&
    smallScreen ?
      <HamburgerMenu />
      :
      (<div className={classes.navMenu}>
        {menu
          .filter((item) => (item.requiresLogin ? props.userLoggedIn : true))
          .map((menuItem, i) => <div className={classes.flex}>{menuItem.component}</div>)}
      </div>)

  );
};

export default NavbarItems;
