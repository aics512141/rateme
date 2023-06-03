import { Box, Button, CircularProgress } from "@mui/material";
import { Field, Form } from "react-final-form";
import { Link } from "react-router-dom";
import axios from "axios";
import { connect, useDispatch } from "react-redux";
import TextInput from "./library/form/TextInput";
import { showError, showSuccess } from "../store/actions/alertActions";
import { hideProgressBar, showProgressBar } from "../store/actions/progressBarAction";
import FileInput from "./library/form/FileInput";
import { updateUser } from "../store/actions/authActions";

function AccountSettings({user, loading}){
    const dispatch = useDispatch();
    return(
        <Box textAlign="center"  sx={ {width: { sm: "100%", md: "50%" }, mx: "auto"}}>
            <h3>Account Settings</h3>
            <Form
              onSubmit={(data) => {
                dispatch( showProgressBar())
                return axios.postForm('api/users/profile-update', data).then(({data}) => {
                    if(data.user)
                    {
                        dispatch( updateUser(data.user))
                        dispatch( showSuccess('Account Settings updated successfully') );
                    }
                    dispatch( hideProgressBar() );
                }).catch(err => {
                    let message = err && err.response && err.response.data ? err.response.data.error : err.message;
                    dispatch( showError(message) );
                    dispatch( hideProgressBar() );
                })
            }}
              validate={(data) => {
                const errors = {};
                if (!data.name)
                   errors.name = "Name is required";
                
                if (data.newPassword)
                {
                    if (!data.currentPassword)
                      errors.currentPassword = 'Current Password is required';
                    
                    if (data.newPassword.length < 6)
                      errors.newPassword = 'password should have atleast 6 characters';
                    if (!data.confirmPassword)
                      errors.confirmPassword = 'Confirm Password is required'
                    else if (data.newPassword !== data.confirmPassword)
                      errors.confirmPassword = 'passwords are not same'
                }

                return errors;
            }}

            initialValues={{
                name: user.name,
                email: user.email,
                phoneNumber: user.phoneNumber,
            }}
            >
                {
                    (props) => {
                        const { invalid} = props
                        return (
                            <form onSubmit={props.handleSubmit}>
                                <Field name="name" type="text" component={TextInput} placeholder='Enter your Name ' />
                                <Field name="email" type="email" disabled component={TextInput} placeholder='Enter your email ' />
                                <Field name="phoneNumber" type="text"  component={TextInput} placeholder='Enter your Phone Number ' />
                                <Field name="profilePicture"  inputProps={{ accept: 'image/*'}}  component={FileInput}  />
                                <Field name="currentPassword" type="password" component={TextInput} placeholder='Enter your current password' />
                                <Field name="newPassword" type="password" component={TextInput} placeholder='Enter your New password' />
                                <Field name="confirmPassword" type="password" component={TextInput} placeholder='Enter your Confirm password' />
                                <Button type="submit" variant="outlined" disabled={invalid}> Update </Button>
                                <Box mt={2}>
                                    <Link style={{textDecoration: 'none'}} to="/admin/forgot-password">Forgot Password?</Link>
                                </Box>
                            </form>
                        )
                    }
                }


            </Form>
        </Box>
    )
}

const mapStateToProps = (state) => {
    return {
      user: state.auth.user,
      loading: state.progressBar.loading,
    };
  }
  
  export default connect(mapStateToProps,{ })(AccountSettings) ;