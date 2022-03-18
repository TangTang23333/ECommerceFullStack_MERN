import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL
} from "firebase/storage";
import { addUser } from '../redux/apiCalls';
import pic from './Profile.png';
import app from "../firebase";
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';


const Container = styled.div`
height: auto;
flex:5;
`

const Form = styled.form`
display: flex;
flex-wrap: wrap;
margin-top: 30px;
align-items: center;
justify-content: space-between ;
margin-right: 60px ;
padding: 50px;
border: 2px solid lightgray;
border-radius: 10px;
box-shadow: 0px 0px 15px -10px rgba(0,0,0,0.75);
-webkit-box-shadow: 0px 0px 15px -10px rgba(0,0,0,0.75);
`

const Item = styled.div`
display: flex;
flex-direction: column;
width: 40%;
margin-right: 40px;

`

const Input = styled.input`

margin-bottom: 25px;
border-width: 0 0 2px;`

const Label = styled.label`
margin-bottom: 20px;
color: gray;
font-weight: 600;`

const Gender = styled.div`
justify-content: space-around;`

const Button = styled.button`
border-radius: 10px;
background-color: teal;
color: white;
padding: 5px 10px;
width: 200px;
justify-content: center;
margin-top: 30px;`


const NewUser = () => {


    const dispatch = useDispatch();
    const [input, setInput] = useState({});
    const [file, setFile] = useState(pic);


    const handleChange = (e) => {

        setInput((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        });

    };

    const handleCreate = (e) => {
        e.preventDefault();

        console.log(input);
        if (file === pic) {

            const newUser = { ...input };
            addUser(dispatch, newUser);
        } else {
            // update img 
            const fileName = new Date().getTime() + file.name;
            const storage = getStorage(app);
            const storageRef = ref(storage, fileName);
            const metadata = {
                contentType: 'image/jpeg',
            };
            const uploadTask = uploadBytesResumable(storageRef, file, metadata);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log("Upload is " + progress + "% done");
                    switch (snapshot.state) {
                        case "paused":
                            console.log("Upload is paused");
                            break;
                        case "running":
                            console.log("Upload is running");
                            break;
                        default:
                    }
                },
                (error) => {
                    // Handle unsuccessful uploads
                    console.log(error);
                },
                () => {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...

                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        const newUser = { ...input, img: downloadURL };
                        addUser(dispatch, newUser);
                    }
                    );
                }


            );

        }
    };

    return (
        <div style={{ display: 'flex' }} >
            <SideBar />

            <Container>
                <NavBar />
                <div style={{marginTop: '30px'}}>
                    <h1>New User</h1>

                    <Form>
                        <Item>
                            <Label for="username">Username</Label>
                            <Input type="text" placeholder='JohnDoeeee' name="username"
                                onChange={handleChange} />
                        </Item>
                        <Item>
                            <Label for="name">Full Name</Label>
                            <Input type="text" placeholder='John Doe' name="name"
                                onChange={handleChange} />
                        </Item>
                        <Item>
                            <Label for="email">Email</Label>
                            <Input type="text" placeholder='JohnDoe@gmail.com' name="email"
                                onChange={handleChange} />
                        </Item>
                        <Item><Label for="password">Password</Label>
                            <Input type="password" placeholder='123456789' name="password" placeholder
                                onChange={handleChange} />
                        </Item>
                        <Item><Label for='phone'>Phone</Label>
                            <Input type="text" placeholder='1234567890' name="phone"
                                onChange={handleChange}
                            />
                        </Item>
                        <Item>
                            <Label for="address">Address</Label>
                            <Input type="text" placeholder='San Francisco | USA' name="address"
                                onChange={handleChange} />
                        </Item>
                        <Item>
                            <Label for="gender">Gender</Label>
                            <Gender>
                                <Input type="radio" name="gender" id="male" value="male" style={{ marginRight: '10px' }}
                                    onChange={handleChange} />
                                <Label for="male" style={{ marginRight: '15px' }}>Male</Label>
                                <Input type="radio" name="gender" id="female" value="female" style={{ marginRight: '10px' }}
                                    onChange={handleChange} />
                                <Label for="female" style={{ marginRight: '15px' }}>Female</Label>
                                <Input type="radio" name="gender" id="other" value="other" style={{ marginRight: '10px' }}
                                    onChange={handleChange}
                                />
                                <Label for="other" style={{ marginRight: '15px' }}>Other</Label>
                            </Gender>
                        </Item>

                        <Item>
                            <Label for="dob">Date Of Birth</Label>
                            <Input type="text" placeholder='01-05-1985' name="dob"
                                onChange={handleChange} />
                        </Item>


                        <Item>
                            <Label for="active">Active</Label>
                            <select className="newUserSelect" name="active" id="active" onChange={handleChange} >
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>

                        </Item>

                        <Item>
                            <Label for='file'>Image</Label>

                            <Input
                                type="file"
                                onChange={(e) => setFile(e.target.files[0])}
                                name='file'
                            />
                        </Item>
                    </Form>
                </div>
                <Button onClick={handleCreate}>Create</Button>
            </Container>
        </div>

    )
}

export default NewUser