import { Route, Routes } from "react-router-dom";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";
import SignIn from "./components/auth/SignIn";
import { Box } from "@mui/material";
import Alert from "./components/library/Alert";
import Home from "./feedback/Home";
import FeedBack from "./feedback/FeedBack";

function AppPublic(){
    return(
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100%"> 
            <Alert />
            <Routes>
                <Route path="/admin/signin" Component={SignIn} />
                <Route path="/admin/forgot-password" Component={ForgotPassword} />
                <Route path="/admin/reset-password/:resetCode" Component={ResetPassword} />
                <Route path="/" Component={Home} />
                <Route path="/employee/feedback/:employeeId" Component={FeedBack} />
            </Routes>
        </Box>
    )
}


export default AppPublic;