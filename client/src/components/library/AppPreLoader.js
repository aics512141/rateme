import { Box, CircularProgress } from "@mui/material";

function AppPreLoader({message}) {


    return(
        <Box borderRadius="5px" display='flex' flexDirection='column' justifyContent='center' boxShadow="0px 0px 3px 5px  #dbdada" p={3} bgcolor="#fff" height='100%' textAlign="center" minWidth="350px" alignItems='center'>

            <CircularProgress />

            <h2>{ message }</h2>

        </Box>
    )
}


export default AppPreLoader;