import React, { useState } from 'react'
import styled from 'styled-components';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { sliderItems } from '../data';
import { mobile } from '../responsive';
import {useNavigate} from 'react-router-dom';

const Container = styled.div`
width: 100%;
height:100vh;
display: flex;
position: relative;
overflow: hidden;
${mobile({ display: 'none' })}

`
const Arrow = styled.div`
width: 50px;
height: 50px;
background-color: #fff7f7;
border-radius: 50%;
display: flex;
justify-content: center;
align-items: center;
position: absolute;
top:0;
bottom: 0;
left: ${props => props.direction === 'left' && '10px'} ;
right: ${props => props.direction === 'right' && '10px'} ;
margin: auto;
cursor: pointer;
opacity: 0.5;
z-index:2;
`

// transition defines speed of transition 
const Wrapper = styled.div`
height:100%;
display: flex;
transform: translateX(${props => props.slideIndex * -100}vw); 
transition: all 1.5s ease;


`

// image title desp button 
const Slide = styled.div`
width: 100vw;
height: 100vh;
display: flex;
align-items: center;
background-color: #${props => props.bg};


`

const ImageContainer = styled.div`
flex:1;
height: 100%;
cursor: pointer;
margin-top: 60px;
margin-left: 60px;
`

const Image = styled.img`
height: 80%;
left: 20px;

`
const InfoContainer = styled.div`
flex:1;
padding: 50px;

`

const Title = styled.h1`
font-size: 70px;

`

const Desc = styled.p`
margin: 50px 0;
font-size: 20px;
font-weight: 500;
letter-spacing: 3px;

`

const Button = styled.button`
padding: 10px;
font-size:20px;
background-color: transparent;
cursor: pointer;

`


const Slider = () => {

    const [slideIndex, setSlideIndex] = useState(0);
    let navigate = useNavigate();
    const handleClick = (direction) => {
    

        console.log('button clicked')
        if (direction === 'left') {
            // if index > 0 : index-1 else: index=2, total 3 
            setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2)

        } else {
            // right arrow 
            setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0)


        }
    };



    return (
        <Container>

            <Arrow direction='left' onClick={() => handleClick('left')}>
                <ArrowLeftIcon />
            </Arrow>


            <Wrapper slideIndex={slideIndex}>

                {sliderItems.map((each) => {
                    return (

                        <Slide bg={each.bg} key={each.id}>
                            <ImageContainer>
                                <Image src={each.img} />

                            </ImageContainer>
                            <InfoContainer>
                                <Title>{each.title}</Title>
                                <Desc>{each.desc}</Desc>
                                <Button onClick={() => navigate('/products')}>SHOP NOW</Button>
                            </InfoContainer>

                        </Slide>)
                })}


            </Wrapper>



            <Arrow direction='right' onClick={() => handleClick('right')}>
                <ArrowRightIcon />
            </Arrow>







        </Container>
    )
}


export default Slider;
