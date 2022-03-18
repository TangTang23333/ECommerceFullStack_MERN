import React, { useState } from 'react';
import styled from 'styled-components';
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL
} from "firebase/storage";
import app from "../firebase";
import { addProduct } from '../redux/apiCalls';
import { useDispatch } from 'react-redux';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';



const Container = styled.div`
flex:4;
width: 100vw;
height:100vh;
align-items: center;
justify-content: center;

`

const Form = styled.form`
width: 40%;
padding: 20px;
border: 2px solid lightgray;
border-radius: 10px;
box-shadow: 0px 0px 15px -10px rgba(0,0,0,0.75);
-webkit-box-shadow: 0px 0px 15px -10px rgba(0,0,0,0.75);
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
border-width: 0 0 2px;`

const Label = styled.label`
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
margin-top: 50px;`


const NewProduct = () => {

    const [input, setInput] = useState({});
    const [file, setFile] = useState(null);
    const [cat, setCat] = useState([]);
    const dispatch = useDispatch();


    const handleChange = (e) => {
        setInput((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        });


    };


    const handleCat = (e) => {
        setCat(e.target.value.split(','));
    };


    const handleClick = (e) => {
        e.preventDefault();
        //upload file to firebase and call api to link to mongoDB
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
                    console.log('File available at', downloadURL);

                    const product = { ...input, img: downloadURL, categories: cat };
                    console.log(product);
                    addProduct(dispatch, product);
                });
            }
        );




    };
    return (

        <div style={{ display: 'flex' }} >
            <SideBar />
            
            <Container>
                <NavBar />
                <h1>New Product</h1>
                <Form>
                    <Item>
                        <Label>Image</Label>

                        <Input
                            type="file"
                            onChange={(e) => setFile(e.target.files[0])}
                            name='file'
                        />
                    </Item>
                    <Item>
                        <Label>Title</Label>
                        <Input
                            type="text"
                            placeholder='title...'
                            name="title"
                            onChange={handleChange} />
                    </Item>

                    <Item>
                        <Label for="desc">Description</Label>
                        <Input
                            type="text"
                            name="desc"
                            placeholder='desc...'
                            onChange={handleChange} />
                    </Item>

                    <Item>
                        <Label for="price">Price</Label>
                        <Input
                            type="number"
                            placeholder='123'
                            name="price"
                            onChange={handleChange} />
                    </Item>


                    <Item>
                        <Label for="cat">Categories</Label>
                        <Input
                            type="text"
                            placeholder="jeans,skirts"
                            name="categories"
                            onChange={handleCat} />
                    </Item>


                    <Item>
                        <Label for="inStock" >In Stock</Label>
                        <select name="inStock" onChange={handleChange} style={{ marginBottom: '20px' }} >
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </Item>


                    <Item>
                        <Label for="active">Active</Label>
                        <select name="active" onChange={handleChange} style={{ marginBottom: '20px' }} >
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>

                    </Item>
                </Form>

                <Button onClick={handleClick}>Create</Button>
            </Container>

            </div >
        
    )
}

export default NewProduct;