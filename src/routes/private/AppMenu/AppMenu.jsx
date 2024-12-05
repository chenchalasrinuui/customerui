import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import styles from './AppMenu.module.css'
import { Link, useNavigate } from "react-router-dom";
import { AppCookies } from '../../../services/cookies';
import { useDispatch, useSelector } from 'react-redux';
import Ajax from '../../../services/ajax'
export const AppMenu = () => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const cartItemsCount = useSelector((state) => state?.appReducer?.cartItemsCount)
    const open = Boolean(anchorEl);
    const dispatch = useDispatch();

    const getCartItems = async () => {
        try {
            dispatch({ type: "LOADER", payload: true })
            const res = await Ajax.get(`users/cart?uid=${AppCookies.getCookie('uid')}`)
            dispatch({ type: "CART", payload: res?.data?.[0]?.products?.length })
        } catch (ex) {
            console.error(ex);
        } finally {
            dispatch({ type: "LOADER", payload: false })
        }
    }
    useEffect(() => {
        getCartItems()
    }, [])

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleNavigation = (path) => {
        handleClose(); // Close the menu
        navigate(path); // Navigate to the specified path
    };
    const fnLogout = () => {
        AppCookies.clear();
        dispatch({ type: 'LOGIN', payload: false })
        navigate('/')
    }
    return (
        <>
            <Link to="/cart">
                <div className={styles.cart}>
                    <img src="cart.png" />
                    <span>{cartItemsCount}</span>
                </div>
            </Link>

            <div className={styles.appMenu}>
                <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                    <Tooltip title="Account settings">
                        <IconButton
                            onClick={handleClick}
                            size="small"
                            sx={{ ml: 2 }}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        >
                            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                        </IconButton>
                    </Tooltip>
                </Box>
                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    slotProps={{
                        paper: {
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                '&::before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <MenuItem onClick={() => handleNavigation("/profile")}>
                        <Avatar /> Profile
                    </MenuItem>
                    <MenuItem onClick={() => handleNavigation("/orders")}>
                        <Avatar /> Orders
                    </MenuItem>

                    <MenuItem onClick={() => handleNavigation("/address")}>
                        <Avatar /> Address
                    </MenuItem>
                    <MenuItem onClick={fnLogout}>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                </Menu>
            </div>
        </>
    );
}
