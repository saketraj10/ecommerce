import Link from "next/link";
import styled from "styled-components";
import Button from "./Button";
import { useCartContext } from "./CartContext";
import Center from "./Center";
import CartIcons from "./icons/CartIcons";

const Box = styled(Link)`
  background: #fff;
  height: 120px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img {
    width: 100%;
    max-height: 100px;
  }
`;

const ProductWrapper = styled.div``;

const Title = styled(Link)`
  font-weight: normal;
  font-size: 0.9rem;
  color:inherit;
  text-decoration:none;
  margin: 0;
`;

const PrductInfo = styled.div`
  margin-top: 5px;
`;
const PriceRow = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-between;
    margin-top:2px;
`;
const Price = styled.div`
    font-size:1rem;
    font-weight:bold;
`;

export default function ProductBox({ _id, title, description, price, images }) {
  const uri = "/product/"+_id
  const {addProduct} = useCartContext()
    return (
    <ProductWrapper>
      <Box href={uri}>
        <div>
          <img src={images?.[0]} />
        </div>
      </Box>
      <PrductInfo>
        <Title href={uri}>{title}</Title>
        <PriceRow>
            <Price>
            ${price}
            </Price>
        <Button primary={1} outline={1} onClick={()=>addProduct(_id)} >
          Add to cart
        </Button>
        </PriceRow>
      </PrductInfo>
    </ProductWrapper>
  );
}
