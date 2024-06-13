import React from 'react';
import { CgProfile } from 'react-icons/cg';
import { CiLogout } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import { Avatar, Box, Toolbar } from '@mui/material';
import { IoNotificationsSharp } from 'react-icons/io5';
import { Badge, Menu, MenuItem } from '@mui/material';
import { MdOutlineMessage } from 'react-icons/md';
import { AiOutlineMenu } from 'react-icons/ai';
import Typography from '@mui/material/Typography';
import MuiAppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';

const Header = ({ open, setOpen, drawerWidth }) => {
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const [anchorEl, setAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const menuId = 'primary-search-account-menu';

    const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== 'open',
    })(({ theme, open }) => ({
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: `${drawerWidth}px`,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }),
    }));

    return (
        <>
            <AppBar position="fixed" className="h-16">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <AiOutlineMenu />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Quản Lý Chung Cư
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                            <Badge badgeContent={4} color="error">
                                <MdOutlineMessage />
                            </Badge>
                        </IconButton>
                        <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
                            <Badge badgeContent={17} color="error">
                                <IoNotificationsSharp />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <Avatar src="https://scontent.fsgn5-9.fna.fbcdn.net/v/t39.30808-6/169147778_3000080340318830_8496454307966035293_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_ohc=TzbQ_XUUdtgQ7kNvgF-ySuc&_nc_ht=scontent.fsgn5-9.fna&oh=00_AYBrbVzxou4mPxSd8VDtsUXgpSPw7tUsjiEwBg_pdfFkFw&oe=66703F34" />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                id={menuId}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={isMenuOpen}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleMenuClose}>
                    {' '}
                    <Link
                        to="/profile"
                        className="flex items-center gap-1.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
                    >
                        <CgProfile />
                        Trang Cá Nhấn
                    </Link>
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                    <Link
                        to="/profile"
                        className="flex items-center gap-1.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
                    >
                        <CiLogout />
                        Đăng Xuất
                    </Link>
                </MenuItem>
            </Menu>
        </>
    );
};

export default Header;
