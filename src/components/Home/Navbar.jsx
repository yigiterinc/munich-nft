import React from "react";
import { alpha, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";

import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    margin: "0px",
  },
  appBar: {
    backgroundColor: "#000",
  },
  homeLogo: {
    marginRight: theme.spacing(10),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(10),
      marginRight: theme.spacing(20),
      width: 300,
    },
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
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  pageLinksSection: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  navLink: {
    textDecoration: "none",
    color: "#fff",
    marginLeft: "50px",
    fontSize: "16px",
    "&:hover": {
      textDecoration: "none",
    },
  },
}));

const NavBar = () => {
  const classes = useStyles();
  const navList = ["Market", "Stats", "Create"];

  return (
    <AppBar className={classes.appBar}>
      <Toolbar>
        <IconButton
          className={classes.homeLogo}
          onClick={() => {
            window.location.reload(false);
          }}
        >
          <img src="/images/logo.png" height={32} />
        </IconButton>

        {renderSearchInputField(classes)}

        {/* <div className={classes.grow} /> */}

        <div className={classes.pageLinksSection}>
          {navList.map((obj) => (
            <Link href={obj.toLowerCase()} className={classes.navLink}>
              {obj}
            </Link>
          ))}
          <IconButton
            edge="end"
            aria-label="account of current user"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

const renderSearchInputField = (classes) => (
  <div className={classes.search}>
    <div className={classes.searchIcon}>
      <SearchIcon />
    </div>
    <InputBase
      placeholder="Search…"
      classes={{
        root: classes.inputRoot,
        input: classes.inputInput,
      }}
      inputProps={{ "aria-label": "search" }}
    />
  </div>
);

export default NavBar;
