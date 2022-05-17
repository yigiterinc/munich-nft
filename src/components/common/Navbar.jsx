import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import Logo from "./nav/Logo";
import AutocompleteSearchBar from "./AutocompleteSearchBar";
import NavbarItems from "./nav/NavbarItems";
import LoginMenu from "./nav/login/LoginMenu";
import { fetchGalleries } from "../../api/strapi";
import { useMediaQuery, useTheme } from "@material-ui/core";
import { isUserLoggedIn } from "../../utils/auth-utils";

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  },
  navbar: {
    background: "white"
  },
  searchBarContainer: {
    width: "400px",

  }
});

const Navbar = (props) => {
  const [options, setOptions] = useState();
  const classes = useStyles();

  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    setUserLoggedIn(isUserLoggedIn());
    window.addEventListener("user-storage", () =>
      setUserLoggedIn(isUserLoggedIn())
    );

    return () => {
      window.removeEventListener("user-storage", () =>
        setUserLoggedIn(isUserLoggedIn())
      );
    };
  }, [userLoggedIn]);

  useEffect(async () => {
    const galleries = await fetchGalleries();
    setOptions(
      galleries.map((gallery) => {
        return {
          name: gallery.galleryName,
          slug: gallery.slug
        };
      })
    );
  }, []);

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.navbar}>
        <Toolbar>
          <Logo />
          {
            !smallScreen &&
            <div className={classes.searchBarContainer}>
              <AutocompleteSearchBar
                placeholder="Search galleries"
                options={options}
              />
            </div>
          }
          <NavbarItems userLoggedIn={userLoggedIn} {...props} />
          <LoginMenu userLoggedIn={userLoggedIn} />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
