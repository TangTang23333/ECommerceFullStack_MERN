import React from "react";
import styled from "styled-components";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite } from "../redux/favoriteRedux";
import { increaseProduct } from "../redux/cartRedux";
import axios from "axios";


const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Image = styled.img`
  height: 75%;
  z-index: 2;
  
`;

// const Circle = styled.div`
//   width: 200px;
//   height: 200px;
//   border-radius: 50%;

//   position: absolute;
//   align-items: center;
//   justify-content: center;
//   display: flex;
//   z-index: 1;
// `;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  background-color: white;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
  
  &:hover ${Info} {
    opacity: 1;
  }
  
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
  cursor: pointer;
`;

// info is same size as circle since image is not a container, but a element
const Product = ({ item }) => {

  
  const dispatch = useDispatch();
  let quantity = 1;

  let baseUrl = axios.create({
    baseURL: 'http://localhost:5000/api/'

  });

  // by id we can get the product from DB
  const addToFavorite = async () => {

    try {
      let product = await baseUrl.get(`/products/find/${item._id}`);
      let color = product.data.colors[0];
      let size = product.data.sizes[0];

      await dispatch(addFavorite({ ...product.data, size, color, quantity }));

    } catch (e) {
      console.log(e);
    }
  };

  const addToCart = async () => {

    try {
      let product = await baseUrl.get(`/products/find/${item._id}`);
      let color = product.data.colors[0];
      let size = product.data.sizes[0];


      dispatch(increaseProduct({ ...product.data, size, color, quantity }));

    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container>

      <Image src={item.img} />
      <Info>
        <Icon>
          <FavoriteBorderOutlinedIcon
            onClick={addToFavorite}  >
          </FavoriteBorderOutlinedIcon>
        </Icon>
        <Icon>
          <ShoppingCartOutlinedIcon
            onClick={addToCart}></ShoppingCartOutlinedIcon>
        </Icon>
        <Icon>
          <Link to={`/product/${item._id}`}>
            <SearchOutlinedIcon />
          </Link>
        </Icon>
      </Info>

    </Container >
  );
};

export default Product;
