
import styled from 'styled-components';
import Chart from '../components/Chart';
import BackupOutlinedIcon from '@mui/icons-material/BackupOutlined';
import { updateProduct } from '../redux/apiCalls';
import axios from 'axios';
import React, { useState, useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
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
padding: 20px 20px;
justify-content: center;
margin-right: 50px;
`

const Title = styled.h3`
margin-bottom: 10px;
margin-top: 10px;

`


const Top = styled.div`
display: flex;
`

const SalesInfo = styled.div`
flex:1;
padding: 20px 15px;
border: 2px solid lightgray;
border-radius: 10px;
box-shadow: 0px 0px 15px -10px rgba(0,0,0,0.75);
-webkit-box-shadow: 0px 0px 15px -10px rgba(0,0,0,0.75);
margin-right: 50px;
`

const ProductInfo = styled.div`
flex:1;
border: 2px solid lightgray;
border-radius: 10px;
padding: 50px 50px;
box-shadow: 0px 0px 15px -10px rgba(0,0,0,0.75);
-webkit-box-shadow: 0px 0px 15px -10px rgba(0,0,0,0.75);
`



const Edit = styled.div`
display: flex;
margin-top: 30px;
border: 2px solid lightgray;
border-radius: 10px;
padding: 20px 70px;
box-shadow: 0px 0px 15px -10px rgba(0,0,0,0.75);
-webkit-box-shadow: 0px 0px 15px -10px rgba(0,0,0,0.75);
`


const Form = styled.form`
display: flex;
`


const InfoArea = styled.div`
display: flex;
flex-direction: column;
margin-right: 450px;
margin-left: 250px;
`

const ProductImg = styled.img`
border-radius: 50%;
height: 80px;
width: 80px;
margin-right: 20px;
`

const Info = styled.div`
display: flex;
justify-content: space-between;
width: 68%;
`

const ImgArea = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
margin-right: 250px;
`



const ProductPhoto = styled.img`
height: 150px;
width: 150px;
border-radius: 10px;
margin-bottom: 20px;
margin-right: 20px;
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

const FileInput = styled.input`
display: none;

`
const Product = () => {

    const Months = useMemo(
        () => ['Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'June',
            'July',
            'August',
            'Sep',
            'Oct',
            'Nov',
            'Dec'],

        []);

    const location = useLocation();
    const user = useSelector(state => state.user.currentUser);
    const [productStats, setProductStats] = useState([]);
    const productId = location.pathname.split('/')[2];
    const product = useSelector((state) => state.product.products.find((product) => product._id === productId));

    useEffect(() => {

        const getProductStats = async () => {

            try {

                const request = axios.create({
                    baseURL: 'http://localhost:5000/api/',
                    headers: { 'token': `Bearer ${user.accessToken}` }
                });


                const res = await request.get("orders/income?pid=" + productId);

                const sortedRes = res.data.sort((a, b) => {
                    return a._id - b._id
                });

                sortedRes.map((each) => {
                    setProductStats((prev) => [
                        ...prev,
                        { name: Months[each._id - 1], Sales: each.total }
                    ]);

                })

            } catch (err) {
                console.log(err);
            }

        };

        getProductStats();
    }, [user, productId, Months]);

    const [input, setInput] = useState({});
    const [file, setFile] = useState(product.img);
    const [cat, setCat] = useState(product.categories);
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


    const handleUpdate = (e) => {
        e.preventDefault();
        //upload file to firebase and call api to link to mongoDB

        if (file === product.img) {

            const newProduct = { ...product, ...input, categories: cat };
            console.log('here no update product img', newProduct);
            updateProduct(dispatch, productId, newProduct);
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
                        console.log('File available at', downloadURL);

                        const newProduct = { ...product, ...input, img: downloadURL, categories: cat };
                        console.log('here', newProduct);
                        updateProduct(dispatch, productId, newProduct);
                    }
                    );
                }


            );

        }


    };
    return (

        <div style={{ display: 'flex' }} >
            <SideBar />
            <div>
                <NavBar />
                <Container>
                    <div
                        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>

                        <h1>{product.title}</h1>
                        <Link to="/products/create">
                            <Button style={{ marginTop: '0px' }}>Create</Button>
                        </Link>
                    </div>

                    <Top>
                        <SalesInfo>
                            <Chart title={'Sales Performance(last 3 months)'} data={productStats} dataKey='Sales' grid={true} />
                        </SalesInfo>
                        <ProductInfo>
                            <div style={{ display: "flex", alignItems: "center", marginBottom: '50px' }}>
                                <ProductImg src={product.img} />
                                <Title>{product.title}</Title>
                            </div>
                            <Info>
                                <p>Id:</p>
                                <p>{product._id}</p>
                            </Info>

                            <Info>
                                <p>Price:</p>
                                <p>${product.price}</p>
                            </Info>
                            <Info>
                                <p>Active:</p>
                                <p>{product.status}</p>
                            </Info>
                            <Info>
                                <p>In Stock:</p>
                                <p>{product.inStock ? 'Yes' : 'No'}</p>
                            </Info>



                        </ProductInfo>
                    </Top>

                    <Edit>
                        <Form>
                            <InfoArea>
                                <Item>
                                    <Label>Title</Label>
                                    <Input
                                        type="text"
                                        placeholder={product.title}
                                        name="title"
                                        onChange={handleChange}
                                    />
                                </Item>

                                <Item>
                                    <Label for="desc">Description</Label>
                                    <Input
                                        type="text"
                                        name="desc"
                                        placeholder={product.desc}
                                        onChange={handleChange} />
                                </Item>

                                <Item>
                                    <Label for="price">Price</Label>
                                    <Input
                                        type="number"
                                        placeholder={product.price}
                                        name="price"
                                        onChange={handleChange} />
                                </Item>


                                <Item>
                                    <Label for="categories">Categories</Label>
                                    <Input
                                        type="text"
                                        placeholder={product.categories.join(",")}
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


                            </InfoArea>
                            <ImgArea>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <ProductPhoto src={product.img} />
                                    <Label for="myFile">
                                        <BackupOutlinedIcon />
                                    </Label>
                                    <FileInput type="file" id="myFile" name="file" onChange={(e) => setFile(e.target.files[0])}></FileInput>

                                </div>
                                <Button onClick={handleUpdate} >Update</Button>

                            </ImgArea>
                        </Form>
                    </Edit>

                </Container >

            </div>
        </div>
    )
};

export default Product;