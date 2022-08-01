import React from 'react'; 
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "./../contexts/UserContext";

//const bcrypt = require("bcrypt");

var backend_root_url = require("./../info.json").backend_root_url;
var register_api_route = "/users/register";

const Register = () => {
    let navigate = useNavigate();
    const {curr_user, set_curr_user} = useContext(UserContext);

    const initialValues={
        username:"",
        hashed_password:""
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().min(1).max(20).required("username is required"),
        hashed_password: Yup.string().min(1).required("password is required")
    });

    const showError = (error) => {
        console.log(error);
    };

    const handle_submit = (data) => {
        
        axios.post(backend_root_url + register_api_route,data).then((msg) => {
            console.log(msg.data.success == "1");
            if (msg.data.success == 1){
            set_curr_user(data.username);
            localStorage.setItem("username", data.username);
            navigate("/");
            } else {
                console.log(msg);
            }
        }).catch((err) => {
            showError(err);
        });
        

    };

  return (
    <div>
        <h1>Register</h1>
        <Formik initialValues={initialValues} onSubmit={handle_submit} validationSchema={validationSchema}>
            <Form>
                <label>username </label>
                <ErrorMessage name="username" component="span"/>
                <Field id="registration" name="username" placeholder="(Ex. Erin's biggest fan)"></Field>

                <label>password </label>
                <ErrorMessage name="hashed_password" component="span"/>
                <Field id="registration" name="hashed_password" ></Field>

                <button type="submit">Register</button>
            </Form>
        </Formik>
    </div>
  );
};

export default Register;