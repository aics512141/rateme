import { Box, Button, CircularProgress } from "@mui/material";
import { Field, Form } from "react-final-form";
import TextInput from "../library/form/TextInput";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { showError, showSuccess } from "../../store/actions/alertActions";

function ResetPassword(){
    const { resetCode } = useParams();
    const dispatch = useDispatch();
    const navigator = useNavigate();

    useEffect(() => {
        axios.post('api/users/verify-reset-code', { code: resetCode}).then(result => {

        }).catch(err => {
            dispatch( showError('invalid Request') );
            navigator('/admin/signin');
        });
    },[])

    return(
        <Box borderRadius="5px" boxShadow="0px 0px 3px 5px  #dbdada" p={3} bgcolor="#fff" textAlign="center" minWidth="350px">
            <h3>Rate Me</h3>
            <Form
              onSubmit={(data) => {
                return axios.post('api/users/reset-password', { ...data, code: resetCode}).then(({data}) => {
                    if(data.success)
                    {
                        dispatch( showSuccess('Password changed successfully. Please login with new password') );
                        navigator('/admin/signin');
                    }
                   
                }).catch(err => {
                    let message = err && err.response && err.response.data ? err.response.data.error : err.message;
                    dispatch( showError(message) );
                })
            }}
              validate={(data) => {
                const errors = {};
                if(!data.newPassword)
                   errors.newPassword = "Password is required";
                else if(data.newPassword.length < 6)
                   errors.newPassword = "Password should at least 6 characters";
                if(!data.confirmPassword)
                   errors.confirmPassword = "please confirm password";
                
                else if(data.newPassword !== data.confirmPassword)
                   errors.confirmPassword = "password are not same"

                return errors;
            }}
            >
                {
                    (props) => {
                        const { submitting, invalid } = props;
                        return (
                            <form onSubmit={props.handleSubmit}>
                                <Field name="newPassword" type="password" component={TextInput} placeholder='Enter new password ' />
                                <Field name="confirmPassword" type="password" component={TextInput} placeholder='Confirm password' />
                                <Button type="submit" variant="outlined" disabled={invalid || submitting} >Change Password { submitting && <CircularProgress style={{ marginLeft: '5px'}} size={20} />} </Button>
                                <Box mt={2}>
                                    <Link style={{textDecoration: 'none'}} to="/admin/signin">Sign in</Link>
                                </Box>
                            </form>
                        )
                    }
                }


            </Form>
        </Box>
    )
}

export default ResetPassword;