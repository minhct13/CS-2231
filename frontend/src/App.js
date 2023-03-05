import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { styled, useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import React, { useEffect } from 'react';
import { connect } from "react-redux";
import SearchBar from './SearchBar';

const drawerWidth = 300;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

function App(props) {
    const { lesson, dispatch } = props
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);

    useEffect(() => {
        console.log(lesson);
        if (!lesson.data.length) {
            dispatch({ type: "lesson/getLesson" });
        }
    }, []);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <SearchBar />
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open} hidden={!open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {lesson.data.map((l, index) => (
                        <ListItem key={index} disablePadding sx={{ display: 'block' }}
                            onClick={() => {
                                dispatch({ type: "lesson/saveState", payload: { current: index } })
                            }}>
                            <ListItemButton
                                sx={{
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemText primary={<div dangerouslySetInnerHTML={{ __html: l.title }}
                                    style={{ fontSize: 8, whiteSpace: "break-spaces" }} />} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                <div dangerouslySetInnerHTML={{ __html: lesson.data[lesson.current] && lesson.data[lesson.current].topic }} />
                <div dangerouslySetInnerHTML={{ __html: lesson.data[lesson.current] && lesson.data[lesson.current].title }} />
                <div dangerouslySetInnerHTML={{ __html: lesson.data[lesson.current] && lesson.data[lesson.current].introduction.title }} />
                <div dangerouslySetInnerHTML={{ __html: lesson.data[lesson.current] && lesson.data[lesson.current].introduction.content }} />
                <div dangerouslySetInnerHTML={{ __html: lesson.data[lesson.current] && lesson.data[lesson.current].formulas.title }} />
                <div dangerouslySetInnerHTML={{ __html: lesson.data[lesson.current] && lesson.data[lesson.current].formulas.content }} />
                <div dangerouslySetInnerHTML={{ __html: lesson.data[lesson.current] && lesson.data[lesson.current].examples.title }} />
                <div dangerouslySetInnerHTML={{ __html: lesson.data[lesson.current] && lesson.data[lesson.current].examples.content }} />
            </Box>
        </Box >
    );
}

const mapStateToProps = (state) => ({
    lesson: state.lesson,
});

export default connect(mapStateToProps)(App);
