import React from 'react';
import makeStyles from "@material-ui/core/es/styles/makeStyles";
import useTheme from "@material-ui/core/es/styles/useTheme";
import {BrowserRouter, NavLink} from "react-router-dom";
import Divider from "@material-ui/core/es/Divider/Divider";
import List from "@material-ui/core/es/List/List";
import ListItem from "@material-ui/core/es/ListItem/ListItem";
import ListItemText from "@material-ui/core/es/ListItemText/ListItemText";
import AppBar from "@material-ui/core/es/AppBar/AppBar";
import Toolbar from "@material-ui/core/es/Toolbar/Toolbar";
import Typography from "@material-ui/core/es/Typography/Typography";
import Hidden from "@material-ui/core/es/Hidden/Hidden";
import Drawer from "@material-ui/core/es/Drawer/Drawer";
import PicturesBreed from "./picturesBreed";
import RandomDogs from "./randomDogs";
import PicturesSubBreed from "./picturesSubBreed";
import ListBreeds from "./listAllBreeds";
import KeyboardCapslockIcon from '@material-ui/icons/KeyboardCapslock';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import Tooltip from "@material-ui/core/es/Tooltip/Tooltip";
import Button from "@material-ui/core/es/Button/Button";


export default function SideBarDrawer() {

    const drawerWidth = 240;

    const useStyles = makeStyles(theme => ({
        root: {
            display: 'flex',
        },
        drawer: {
            [theme.breakpoints.up('sm')]: {
                width: drawerWidth,
                flexShrink: 0,
            },
        },
        appBar: {
            marginLeft: drawerWidth,
            [theme.breakpoints.up('sm')]: {
                width: `calc(100% - ${drawerWidth}px)`,
            },
        },
        menuButton: {
            marginRight: theme.spacing(2),
            [theme.breakpoints.up('sm')]: {
                display: 'none',
            },
        },
        toolbar: theme.mixins.toolbar,
        drawerPaper: {
            width: drawerWidth,
            background: '#d2dae2',
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
    }));

    function ResponsiveDrawer(props) {
        const {container} = props;
        const classes = useStyles();
        const theme = useTheme();
        const [currentComponent, setCurrentComponent] = React.useState("/");
        const [mobileOpen, setMobileOpen] = React.useState(false);

        const handleDrawerToggle = () => {
            setMobileOpen(!mobileOpen);
        };

        const linkMap = {
            0: "/",
            1: "/pictures-by-breed",
            2: "/pictures-by-sub-breed",
            3: "/list-all-breeds",
        };

        const componentMap = {
            "/": <RandomDogs/>,
            "/pictures-by-breed": <PicturesBreed/>,
            "/pictures-by-sub-breed": <PicturesSubBreed/>,
            "/list-all-breeds": <ListBreeds/>,
        };

        const drawer = (
            <div style={{textAlign: 'center'}}>
                <div className={classes.toolbar}/>
                <Divider/>
                <List>
                    {['Random doggos', 'Pictures by Breed', 'Pictures by Sub-breed', 'List all Breeds'].map((text, index) => (
                        <ListItem button key={text} onClick={() => {
                            setCurrentComponent(linkMap[index])
                        }} component={NavLink} to={linkMap[index]}>
                            <ListItemText primary={text}/>
                        </ListItem>
                    ))}
                </List>
                <Divider/>
                <Button href={"https://www.sanjeevrajasekaran.tk"}>Portfolio website</Button>
            </div>
        );
        return (
            <div className={classes.root}>
                <AppBar style={{background: '#1e272e'}} position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            className={classes.menuButton}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            DOGGOS
                        </Typography>
                        <Tooltip title="Scroll to top" aria-label="scroll-to-top">
                            <IconButton onClick={() => {
                                window.scrollTo(0, 0)
                            }} color="inherit">
                                <KeyboardCapslockIcon/>
                            </IconButton>
                        </Tooltip>
                    </Toolbar>

                </AppBar>
                <nav className={classes.drawer} aria-label="mailbox folders">
                    <Hidden smUp implementation="css">
                        <Drawer
                            container={container}
                            variant="temporary"
                            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            ModalProps={{
                                keepMounted: true, // Better open performance on mobile.
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                    <Hidden xsDown implementation="css">
                        <Drawer
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            variant="permanent"
                            open
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                </nav>
                <main style={{background: '#485460'}} className={classes.content}>
                    <div className={classes.toolbar}/>
                    {
                        componentMap[currentComponent]
                    }
                </main>
            </div>
        );
    }

    return (
        <BrowserRouter>
            <ResponsiveDrawer/>
        </BrowserRouter>
    )
};