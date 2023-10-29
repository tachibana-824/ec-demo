import React, { useState, useCallback } from "react";
import {makeStyles} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import logo from "../../assets/img/icons/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import { getSignedIn } from "../../reducks/users/selectors";
import { HeaderMenus, ClosableDrawer } from "./index";

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    menuBar: {
        backgroundColor: "#fff",
        color: "#444",
    },
    toolbar: {
        margin: "0 auto",
        maxWidth: 1024,
        width: "100%",
    },
    iconButtons: {
        margin: "0 0 0 auto",
    },
});


const Header = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const isSignedIn = getSignedIn(selector);

    const [sideBarOpen, setSideBarOpen] = useState(false);

    const handleDrawerToggle = useCallback((event, isOpen) => {
        if (event.type === "keydown" && 
            (event.key === "Tab" || event.key === "Shift")) {
            return;
        }
        setSideBarOpen(isOpen);
    }, [setSideBarOpen]);

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.menuBar}>
                <Toolbar className={classes.toolbar}>
                    <img 
                    src={logo} alt="Penguin Logo" width="90px" 
                    onClick={() => dispatch(push("/"))} 
                    />
                    {isSignedIn && (
                        <div className={classes.iconButtons}>
                            <HeaderMenus handleDrawerToggle={handleDrawerToggle}/>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
            <ClosableDrawer open={sideBarOpen} onClose={handleDrawerToggle} />
        </div>
    );
}

export default Header;