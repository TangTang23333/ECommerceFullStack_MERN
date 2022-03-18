import React from 'react';



import { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
width: 50%;
border: 2px solid lightgray;
border-radius: 10px;
padding: 20px 15px;
box-shadow: 0px 0px 15px -10px rgba(0,0,0,0.75);
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

const Input = styled.input`
margin-bottom: 25px;
border-width: 0 0 2px;
font-size: 23px;`

const Label = styled.label`
margin-bottom: 20px;
font-size: 25px;
color: gray;
font-weight: 600;`


const Button = styled.button`
font-size: 20px;
border-radius: 10px;
background-color: teal;
color: white;
padding: 5px 10px;
width: 200px;
justify-content: center;
margin-top: 30px;`

const Gender = styled.div`
justify-content: space-around;`


const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('');
    const [phone, setPhone] = useState('');
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');



    return (
        <Container>

            <h1 >Welcome to Register</h1>
            <Form>
            <Item>
                    <Label for="username">Username</Label>
                    <Input type="text" placeholder='JohnDoeeee' name="username" onChange={(e) => setUsername(e.target.value)}/>
                </Item>
                <Item>
                    <Label for="fullname">Full name</Label>
                    <Input type="text" placeholder='John Doe' name="fullname" onChange={(e) => setFullname(e.target.value)} />
                </Item>
                <Item>
                    <Label for="email">Email</Label>
                    <Input type="text" placeholder='JohnDoe@gmail.com' name="email" onChange={(e) => setEmail(e.target.value)}/>
                </Item>
                <Item><Label for="password">Password</Label>
                    <Input type="password" placeholder='123456789' onChange={(e) => setPassword(e.target.value)}/>
                </Item>
                <Item><Label for='phone'>Phone</Label>
                    <Input type="text" placeholder='1234567890' name="phone" onChange={(e) => setPhone(e.target.value)}/>
                </Item>
                <Item>
                    <Label for="address">Address</Label>
                    <Input type="text" placeholder='San Francisco | USA' name="address" onChange={(e) => setAddress(e.target.value)}/>
                </Item>
                <Item>
                    <Label for="gender">Gender</Label>
                    <Gender onChange={(e) => setGender(e.target.value)}> 
                        <Input type="radio" name="gender" id="male" value="male" style={{marginRight: '10px'}}/>
                        <Label for="male" style={{marginRight: '15px'}}>Male</Label>
                        <Input type="radio" name="gender" id="female" value="female" style={{marginRight: '10px'}}/>
                        <Label for="female" style={{marginRight: '15px'}}>Female</Label>
                        <Input type="radio" name="gender" id="other" value="other" style={{marginRight: '10px'}} />
                        <Label for="other" style={{marginRight: '15px'}}>Other</Label>
                    </Gender>
                </Item>

                {/* <span>Invalid password</span>  */}
                
                
                
               
            </Form>

            <Button >Register</Button>
        </Container>)
}

export default Register