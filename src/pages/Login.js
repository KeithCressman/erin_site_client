import React from 'react'; 
import { useContext } from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { UserContext } from "./../contexts/UserContext";

var backend_root_url = require("./../info.json").backend_root_url;
var login_api_route = "/users/login";

const Login = () => {
    let navigate = useNavigate();
    const {curr_user, set_curr_user} = useContext(UserContext);

    const initialValues={
        username:"",
        hashed_password:""
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().min(1).max(20).required(),
        hashed_password: Yup.string().min(1).required()
    });

    const handle_submit = (data) => {
        axios.post(backend_root_url + login_api_route, data).then((msg) => {
            if (msg.data.success == 1){
                set_curr_user(data.username);
                console.log(msg);
                localStorage.setItem("token", msg.data.token);
                localStorage.setItem("username", data.username);
                
                navigate("/");
            } else {
                console.log(msg);
            }
        }).catch((err) => {
            console.log(err);
        });
    };
  return (
    <div>
        <h1>Login</h1>
        <Formik initialValues={initialValues} onSubmit={handle_submit} validationSchema={validationSchema}>
            <Form>
                <label>username </label>
                <ErrorMessage name="username" component="span"/>
                <Field id="registration" name="username" placeholder="(Ex. Erin's biggest fan)"></Field>

                <label>password </label>
                <ErrorMessage name="hashed_password" component="span"/>
                <Field id="registration" name="hashed_password" ></Field>

                <button type="submit">Log in</button>
            </Form>
        </Formik>
    </div>
  );
};

export default Login;