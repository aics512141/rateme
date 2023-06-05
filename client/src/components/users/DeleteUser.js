import { Box, Button, IconButton, Popover, Typography } from '@mui/material'
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteUser as deleteUserAction } from '../../store/actions/userActions';
import { useDispatch } from 'react-redux';

export default function DeleteUser({ userId, name }) {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const dispatch = useDispatch();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    
    const deleteUser = () => {
        dispatch(deleteUserAction(userId))
    }

    return (
        <>
            <IconButton onClick={handleClick}><DeleteIcon  /> </IconButton>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <Typography sx={{ p: 2 }}> Do you want to delete this <b>{name}</b>?</Typography>
                <Box textAlign="center" pb={2}>
                    <Button onClose={handleClose}>Close</Button>
                    <Button onClick={deleteUser} sx={{ ml: 2 }} variant="contained" color="error">Delete</Button>
                </Box>
            </Popover>
        </>
    )
}