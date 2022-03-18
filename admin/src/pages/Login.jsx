import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../redux/apiCalls';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
width: 100vw;
height:100vh;
display: flex;
align-items: center;
justify-content: center;


`

const Wrapper = styled.div`
width: 25%;
padding: 20px;
border: 2px solid lightgray;
border-radius: 10px;
box-shadow: 0px 0px 15px -10px rgba(0,0,0,0.75);
-webkit-box-shadow: 0px 0px 15px -10px rgba(0,0,0,0.75);
`

const Title = styled.h1`
font-size: 24px;
font-weight: 300;
`


const Input = styled.input`
flex:1;
min-width: 40%;
padding: 10px;
margin-bottom:20px ;
`

const Button = styled.button`
width: 40%;
border: none;
padding: 15px 20px;
background-color: teal;
color: white;
cursor: pointer;
margin-top: 20px;
`


const Form = styled.form`
display: flex;
flex-wrap: wrap;
margin-top: 50px;

`

const Item = styled.div`
display: flex;
flex-direction: column;
width: 60%;
margin-right: 40px;

`

const Label = styled.label`
font-size: 25px;
color: gray;
font-weight: 600;`


const Link = styled.a`
margin-top: 20px;
font-size:12px;
text-decoration: underline;
cursor: pointer;

`

const Error = styled.span`
  color: red;
`;

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const { isFetching, error } = useSelector(state => state.user);
    const navigate = useNavigate();

    const handleClick = async (e) => {

        e.preventDefault();
        await login(dispatch, { username, password }).then(() => {navigate('/'); window.location.reload(false)});

    }

    return (

        <Container>
            <Wrapper>
                <Title>SIGN IN</Title>
                <Form>
                    <Item>
                        <Label for="username">Username</Label>
                        <Input type="input" placeholder='JohnDoeeee' name="username" onChange={(e) => setUsername(e.target.value)} />
                    </Item>
                    <Item><Label for="password">Password</Label>
                        <Input type="password" placeholder='123456789' onChange={(e) => setPassword(e.target.value)} />
                    </Item>
                    {/* <span>Invalid password</span>  */}


                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <Button
                            onClick={handleClick}
                            disabled={isFetching}
                        > Sign In
                        </Button>
                        {error && <Error> something went wrong...</Error>} 
                       <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link> 
                        <Link>CREATE A NEW ACCOUNT</Link>
                    </div>

                </Form>


            </Wrapper>
        </Container>)
}

export default Login