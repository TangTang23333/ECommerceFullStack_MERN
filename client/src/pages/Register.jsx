
import styled from 'styled-components';
import { mobile } from "../responsive";
import { useState } from 'react';
import { publicRequest} from '../requestMethod'; 
import {useNavigate} from 'react-router-dom'; 



const Container = styled.div`
width: 100vw;
height:100vh;
background: 
linear-gradient(rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)),
url('https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940') center;
background-size: cover;
display: flex;
align-items: center;
justify-content: center;



`

const Wrapper = styled.div`
width: 50%;
padding: 20px;
background-color: white;
${mobile({ width: '75%' })}


`

const Title = styled.h1`
font-size: 24px;
font-weight: 300;
`


const Form = styled.form`
display: flex;
flex-wrap: wrap;
`


const Input = styled.input`
flex:1;
min-width: 40%;
margin: 20px 10px 0 0;
padding: 10px;
`

const Agreement = styled.span`
font-size: 12px;
margin: 20px 0;
`

const Button = styled.button`
width: 40%;
border: none;
padding: 15px 20px;
background-color: teal;
color: white;
cursor: pointer;
`

const Span = styled.span`
color: 'red';
`


const Register = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    
    const createUser = async (e) => {
        e.preventDefault();
        try {
            const res = await publicRequest.post('/auth/register',
                {
                    username: username,
                    email: email,
                    password: password ,
                    isAdmin: false
                });
            
            console.log(res.data);
            navigate('/login'); 


        } catch (err) {
            console.log(err);
        }

    };




    return (
        <Container>
            <Wrapper>
                <Title>CREATE AN ACCOUNT</Title>
                <Form>
                    <Input placeholder='name' />
                    <Input placeholder='last name' />
                    <Input placeholder='username' onChange={(e) => setUsername(e.target.value)} />
                    <Input placeholder='email' onChange={(e) => setEmail(e.target.value)}/>
                    <Input placeholder='password' onChange={(e) => setPassword(e.target.value)}/>
                    <Input type='password' onChange={(e)=>setConfirm(e.target.value)} placeholder='confirm password' />

                    <Agreement>By creating an account, I consent to the processing of my personal
                        data in accordance with the <b>PRIVACY POLICY</b></Agreement>

                    <Button onClick={ (e) => createUser(e) }> Create </Button>

                    {password !== confirm && <Span> Password does not match! Please reconfirm your password</Span>}
                </Form>
            </Wrapper>
        </Container>
    )
};

export default Register;