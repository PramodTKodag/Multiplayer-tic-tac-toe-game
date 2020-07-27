import React, { Component, useState, memo } from 'react';
import { connect } from 'dva'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    PageBackground,
    FormWrapper,
    FormDiv,
    Input,
    StyledInlineErrorMessage,
    RegisterForm,
    SubmitButton,
    InputDiv,
    FaFacebookIcon,
    FaInstagramIcon,
    SocialIconWrapper,
    MdEmailmIcon
} from './LoginForm.style'
import * as Yup from 'yup'
import { Formik, Form, Field, ErrorMessage } from 'formik';

const SignupSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),
    password: Yup.string()
        .required("This field is required"),
});

function Register(props) {
    return (
        <PageBackground>

            <FormWrapper>
                <FormDiv>
                    <Formik
                        initialValues={{
                            email: '',
                            password: '',
                        }}
                        validationSchema={SignupSchema}
                        onSubmit={values => {
                            const { dispatch } = props;
                            dispatch({
                                type: 'user/login',
                                payload: values
                            });
                            // console.log(values);
                        }}
                    >
                        {({ errors, touched }) => (
                            <RegisterForm>
                                <InputDiv>
                                    <Field name="email">
                                        {({ field, form, meta }) => (
                                            <div>
                                                <Input type="text" {...field} placeholder="Email" />
                                                <ErrorMessage style={{ color: "red" }} name="email">{msg => <StyledInlineErrorMessage>{msg}</StyledInlineErrorMessage>}</ErrorMessage>
                                            </div>
                                        )}
                                    </Field>
                                </ InputDiv>

                                <InputDiv>
                                    <Field name="password">
                                        {({ field, form, meta }) => (
                                            <div>
                                                <Input type="password" {...field} placeholder="Password" />
                                                <ErrorMessage style={{ color: "red" }} name="password">{msg => <StyledInlineErrorMessage>{msg}</StyledInlineErrorMessage>}</ErrorMessage>
                                            </div>
                                        )}
                                    </Field>
                                </ InputDiv>
                                
                                <div>
                                    <a href="/register">Forgot password ?</a>
                                </div>
                               

                                {/* <Field name="lastName" />
                                {errors.lastName && touched.lastName ? (
                                    <div>{errors.lastName}</div>
                                ) : null}
                                <Field name="email" type="email" />
                                {errors.email && touched.email ? <div>{errors.email}</div> : null} */}
                                {/* <button type="submit">Submit</button> */}

                                <SubmitButton type="submit">Login</SubmitButton>                            </RegisterForm>
                        )}
                    </Formik>
                </FormDiv>
                {/* <Form>
                    <Input type="text" placeholder="Username" />
                    <Input type="text" placeholder="Email" />
                    <Input type="text" placeholder="Phone" />
                    <Input type="text" placeholder="Password" />
                    <Input type="text" placeholder="Confirm Password" />
                    <SubmitButton>Submit</SubmitButton>
                    <SocialIconWrapper>
                        <FaFacebookIcon color="#4267b2" size="25px" />
                        <FaInstagramIcon color="#cf466e" size="25" />
                        <MdEmailmIcon color="#c03b2f" size="25" />
                    </SocialIconWrapper>
                </Form> */}
            </FormWrapper>

        </PageBackground >
    );
}

export default connect(({ user }) => ({
    grids: user.grids,
}))(Register);