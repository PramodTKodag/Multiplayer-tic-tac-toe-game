import styled from 'styled-components'
import { Button } from 'react-bootstrap';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { MdEmail } from "react-icons/md";
import { Form } from 'formik';

export const RegisterForm = styled(Form)`
    width: 100%;
`

export const FaFacebookIcon = styled(FaFacebook)`
    cursor: pointer;
    margin: 10px;
`
export const FaInstagramIcon = styled(FaInstagram)`
    cursor: pointer;
    margin: 10px;
`

export const MdEmailmIcon = styled(MdEmail)`
    cursor: pointer;
    margin: 10px;
`

export const SocialIconWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
`
export const PageBackground = styled.div`
    height: 85vh;
    width: 100vw;
    background-image: url('https://wallpapercave.com/wp/Fs4Umml.jpg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    margin: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const FormWrapper = styled.div`
    width: 355px;
    height: auto;
    background-color: #fff;
    border-radius: 15px;
    -webkit-box-shadow: 10px 10px 60px -21px rgba(0,0,0,0.75);
    -moz-box-shadow: 10px 10px 60px -21px rgba(0,0,0,0.75);
    box-shadow: 10px 10px 60px -21px rgba(0,0,0,0.75);
    @media only screen and (max-width: 768px) {
        width: 85%;
    }
`

export const StyledInlineErrorMessage = styled.div`
  color: red;
  font-size: 12px;
`;
export const FormDiv = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const Input = styled.input`
    border-radius: 50px;
    border: 1px solid #ccc5c5;
    // margin: 0px 0px 30px 0px;
    padding: 0px 15px;
    width: 85%;
    height: 2.5rem;
    font-size: 0.8rem;
    &::placeholder{
        color: #929090;
        font-size: 0.8rem;
    }
`

export const InputDiv = styled.div`
    height: 4rem;
`

export const SubmitButton = styled(Button)`
    background-color: #ff7601;
    outline: none;
    border: unset;
    font-weight: 900;
    margin: 5px;
    &:hover{
        background-color: #ff7601;
    }
`