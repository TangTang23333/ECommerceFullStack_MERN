import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import BackupOutlinedIcon from '@mui/icons-material/BackupOutlined';
import pic from './Profile.png';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../redux/apiCalls';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import { format } from 'timeago.js';
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL
} from "firebase/storage";
import app from "../firebase";
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';

const Container = styled.div`
padding: 20px; 
`

const Bottom = styled.div`
display: flex;
justify-content: space-between;
margin-right: 30px;`

const Left = styled.div`
flex:1;
margin-right: 100px;
border: 2px solid lightgray;
border-radius: 10px;
padding: 30px 30px;
box-shadow: 0px 0px 15px -10px rgba(0,0,0,0.75);
-webkit-box-shadow:0px 0px 15px -10px rgba(0,0,0,0.75); `

const Right = styled.div`
flex:3;

border: 2px solid lightgray;
border-radius: 10px;
padding: 30px 30px;
box-shadow: 0px 0px 15px -10px rgba(0,0,0,0.75);
-webkit-box-shadow:0px 0px 15px -10px rgba(0,0,0,0.75); `



const Form = styled.form`
display: flex;
justify-content: space-between;
`

const EditInfo = styled.div`
display: flex;
flex-direction: column;
margin-right: 550px;
`
const Photo = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
margin-bottom: 20px;
margin-right: 50px;
align-items: center;
`

const Top = styled.div`
display: flex;
justify-content: space-between;
margin-bottom: 30px;
align-items: center;
`



const Input = styled.input`
margin-left: 20px;
margin-bottom: 30px;
outline: 0;
border-width: 0 0 2px;
color: rgb(187,186,186);;`



const UploadArea = styled.div`
display: flex;
justify-content: center;
align-items: center;
`

const UserImg = styled.img`
width: 150px;
height: 150px;
border-radius:10px;
border: 1px solid lightgray;
margin-right: 20px;`

const Button = styled.button`
margin-right: 30px;
font-size: 20px;
border-radius: 10px;
background-color: teal;
color: white;
padding: 5px 10px;
width: 200px;
justify-content: center;`

const Person = styled.div`
display:flex;
margin-bottom: 30px;`


const Details = styled.div`
padding: 10px 10px;`

const Detail = styled.div`
margin-bottom: 20px;
display: flex;
margin-top: 20px;


`

const Avatar = styled.img`
height:80px;
width: 80px;
border-radius: 50%;
border: 1px solid lightgray;
`

const Tag = styled.div`
flex-direction: column;
display: flex;
margin-left: 30px;
font-size: 23px;

`

const Menu = styled.h3`
color: rgb(187,186,186);
`

const Text = styled.span` 
margin-left: 20px;
margin-bottom: 20px;
`

const Label = styled.label` 
margin-left: 20px;
font-weight: 600;
margin-bottom: 15px ;
`
const User = () => {

    const location = useLocation();
    const userId = location.pathname.split('/')[2];
    const user = useSelector(state => state.user.currentUser);
    const [userInfo, setUserInfo] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();



    useEffect(() => {
        const getUser = async () => {

            try {
                const request = axios.create({
                    baseURL: 'http://localhost:5000/api/',
                    headers: { 'token': `Bearer ${user.accessToken}` }
                });
                const res = await request.get(`/users/find/${userId}`);
                setUserInfo(res.data);

            } catch (err) {
                console.log(err);
            }

        };


        getUser();

    }, [userId, user.accessToken]);

    const [input, setInput] = useState({});
    const [file, setFile] = useState(userInfo.img || pic);


    const handleChange = (e) => {

        setInput((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        });

    };

    const handleUpdate = (e) => {
        e.preventDefault();


        if (file === userInfo.img || file === pic) {

            const newUser = { ...userInfo, ...input };
            console.log('here no update user img', newUser);
            updateUser(dispatch, userId, newUser);
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
                        const newUser = { ...userInfo, ...input, img: downloadURL };
                        updateUser(dispatch, userId, newUser);
                    }
                    );
                }


            );

        }
    };



    return (

        <div style={{ display: 'flex' }}>
            <SideBar />
            <div >
                
                <Container>
                <NavBar />
                    <Top>
                        <h2>Edit User</h2>
                        <Button onClick={() => { navigate('/users/create') }}>Create</Button>
                    </Top>
                    <Bottom>
                        <Left>
                            <Person>
                                <Avatar src={pic || userInfo.img} />
                                <Tag>
                                    <h3>{userInfo.username}</h3>
                                    {/* <span></span> */}
                                </Tag>
                            </Person>
                            <Details>
                                <Menu>Account Details</Menu>
                                <Detail>
                                    <PersonOutlineOutlinedIcon />
                                    <Text>{userInfo.name}</Text>
                                </Detail>
                                <Detail>
                                    <CalendarTodayOutlinedIcon />
                                    <Text>{userInfo.dob?.slice(0, 10)}</Text>

                                </Detail>

                                <Detail>
                                    <HowToRegOutlinedIcon />
                                    <Text>{format(userInfo.createdAt)}</Text>

                                </Detail>


                                <Menu>Contact</Menu>

                                <Detail>
                                    <PhoneAndroidOutlinedIcon />
                                    <Text>{userInfo.phone}</Text>
                                </Detail>

                                <Detail>
                                    <EmailOutlinedIcon />
                                    <Text>{userInfo.email}</Text></Detail>

                                <Detail>
                                    <LocationOnOutlinedIcon />
                                    <Text>{userInfo.address}</Text>
                                </Detail>

                            </Details>
                        </Left>

                        <Right>
                            <h2 style={{ marginLeft: '20px' }}>Edit</h2>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '90px' }}>
                                <Form>
                                    <EditInfo>
                                        <Label for='username'>Username</Label>
                                        <Input type="text" name="username" placeholder={userInfo.username}
                                            onChange={handleChange}
                                        />
                                        <Label for='name'>Name</Label>
                                        <Input type="text" name="name" placeholder={userInfo.name}
                                            onChange={handleChange}
                                        />
                                        <Label for='email'>Email</Label>
                                        <Input type="text" name='email' placeholder={userInfo.email}
                                            onChange={handleChange}
                                        />
                                        <Label for='phone'>Phone</Label>
                                        <Input type="text" name='phone' placeholder={userInfo.phone}
                                            onChange={handleChange}
                                        />
                                        <Label for='address'>Address</Label>
                                        <Input type="text" name='address' placeholder={userInfo.address}
                                            onChange={handleChange} />

                                    </EditInfo>
                                    <Photo>
                                        <UploadArea>
                                            <UserImg src={pic || userInfo.img} />

                                            <Label for='file'>
                                                <BackupOutlinedIcon style={{ fontSize: '40px', color: 'teal' }} />
                                            </Label>

                                            <Input type='file' id='file' style={{ display: 'none' }}
                                                onChange={(e) => setFile(e.target.files[0])}></Input>
                                        </UploadArea>
                                        <Button
                                            style={{ marginRight: '0px' }}
                                            onClick={handleUpdate}>Update</Button>


                                    </Photo>

                                </Form>
                            </div>



                        </Right>

                    </Bottom>
                </Container>
            </div>
        </div>
    )
}

export default User;



