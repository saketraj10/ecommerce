import { useState } from "react";
import styled from "styled-components"

const Image = styled.img`
    max-width: 100%;
    max-height: 100%;
`;
const BigImage = styled.img`
    max-width: 100%;
    max-height: 200px;
`;
const ImageContainer = styled.div`
    text-align: center;
    `;
const ImageButtons = styled.div`
    height: 3rem;
    display: flex;
    gap: 10px;
    padding: 30px;
`;
const ImageButton = styled.div`
    border: 1px solid #ccc;
${
    props=>props.active ? `
    border: 1px solid #262626;

    ` : `
    opacity:0.4;
    `    
}
    height: 40px;
    padding: 2px;
    cursor: pointer;
    border-radius: 5px;
`;
export default function ProductImages({images}) {
     const [activeImage,setActiveImage] = useState(images?.[0])
  return (
    <>
    <ImageContainer>

        <BigImage src={activeImage} alt=""/>
    </ImageContainer>
        <ImageButtons>
        {
            images.map(image=>(
                <ImageButton active={activeImage===image} key={image} onClick={()=>setActiveImage(image)}>
                    <Image src={image} alt=""/>
                </ImageButton>
            ))
        }
        </ImageButtons>
    </>
  )
}
