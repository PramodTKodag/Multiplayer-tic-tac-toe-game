import styled from 'styled-components'
import { Button } from 'react-bootstrap';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { MdEmail } from "react-icons/md";


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
    height: 85.4vh;
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
    pointer-events: ${props => props.active? 'unset' : 'none'} 
    display: grid;
    grid-template-columns: auto auto auto;
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

export const GridBox = styled.div`
    pointer-events:${props => props.Selected ? 'none': 'unset'};
    background-color: ${props => props.Selected ? 'red': 'yellow'};
    border: 1px solid rgba(0, 0, 0, 0.8);
    padding: 20px;
    font-size: 30px;
    text-align: center;
    cursor: pointer;
    &:hover{
        // background-color: #e8e3e3;
    }
`