import {Avatar, Box, Button, Container, IconButton, Menu, MenuItem, AppBar as MuiAppBar, Toolbar, Tooltip, Typography} from '@mui/material'
import AdbIcon from '@mui/icons-material/Adb'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../store/actions/authActions';
import { useState } from 'react';
import { Star } from '@mui/icons-material';
import ProgressBar from './library/ProgressBar';
import { userTypes } from './utils/constants';
function AppBar(){
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const userType = user.type
    const [ anchorEl, setAnchorEI] = useState(null);
    const openMenu = (event) => {
        setAnchorEI(event.currentTarget);
    }
    
    const closeMenu = () => {
        setAnchorEI(null);
    }
    const logout = () => {
        dispatch( signout() );
        closeMenu();
    }

    return(
        <MuiAppBar>
            <Container maxWidth='xl'>
                <Toolbar>
                    <Star sx={{display: { xs: 'none', md: 'flex' }, mr: 1}} />
                    <Typography
                      variant="h6"
                      component={Link}
                      to="/admin/dashboard"
                      sx={{
                         mr: 2,
                         display: 'flex',
                         fontFamily: 'monospace',
                         letterSpacing: '.3rem',
                         color: 'inherit',
                         textDecoration: 'none',
                        }}
                    > RateMe</Typography>
                    <Box textAlign="right" flexGrow={1}>
                        {
                            userType === userTypes.USER_TYPE_SUPER &&
                            <Button
                          component={Link}
                          to="/admin/departments"
                          sx={{ color: '#fff', my:2}}
                            >
                            DEPARTMENTS
                            </Button>
                        }
                        <Button
                          component={Link}
                          to="/admin/users"
                          sx={{ color: '#fff', my:2}}
                        >
                        USERS
                        </Button>
                        {
                        userType === userTypes.USER_TYPE_STANDARD &&
                        <Button LinkComponent={Link} to={`/admin/departments/${user.departmentId}`} sx={{ color: 'white' }}>Employees</Button>
                        }

                    </Box>
                    <Box>
                        <Tooltip title="Open Settings">
                            <IconButton onClick={openMenu}>
                                <Avatar alt="Profile Picture" src={ process.env.REACT_APP_BASE_URL + `content/${user._id}/${user.profilePicture}`} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                         anchorEl={anchorEl}
                         anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right'
                         }}
                         transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right'
                         }}
                         open={Boolean(anchorEl)}
                         onClose={closeMenu}
                        >
                            <MenuItem component={Link} to="/admin/account-settings" onClick={closeMenu}>
                              <Typography textAlign="center"> Account Setting</Typography>
                            </MenuItem>
                            <MenuItem onClick={logout}>
                              <Typography textAlign="center">Sign Out</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>




                </Toolbar>
            </Container>
            <ProgressBar />
        </MuiAppBar>
    )


}

export default AppBar;