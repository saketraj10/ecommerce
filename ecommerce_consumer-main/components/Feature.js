import styled from "styled-components";
import Center from "./Center";
import Button from "./Button";
import ButtonLink from "./ButtonLink";
import CartIcons from "./icons/CartIcons";
import { CartContext, useCartContext } from "./CartContext";


const Bg = styled.div`
    background-color: #222;
    color: #fff;
    padding: 50px 0;
  `;

  const Title = styled.h1`
    margin: 0;
    font-weight: normal;
    font-size: 1.5rem;
    @media screen and (min-width: 768px) {
      font-size:2.5rem;

    }
  `;

  const Desc = styled.p`
    color: #aaa;
    font-size: 0.8rem;
  `;

  const ColumnsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    div:nth-child(1){
      order:2;
    }
    img {
      max-width: 100%;

    }

    @media screen and (min-width: 768px) {
      grid-template-columns: 1.1fr .9fr;
      gap: 4rem;

    }
  `;

  const Colums = styled.div`
    display: flex;
    align-items: center;
  `;
  const ButtonWrapper = styled.div`
    display: flex;
    gap: 5px;
    margin-top:15px;
  `;
export default function Feature({featureProduct}) {
  const {addProduct} =  useCartContext()
  return (
    <Bg>
      <Center>
        <ColumnsWrapper>
          <Colums>
            <div>
              <Title>{featureProduct?.title}</Title>
              <Desc> {`${featureProduct?.description}`}              </Desc>
              <ButtonWrapper>
                <ButtonLink href={'/product/'+featureProduct?._id}  outline={1} white={1} size="l">
                  Read more
                </ButtonLink>
                <Button white size="l" onClick={()=>addProduct(featureProduct._id)}>
                  <CartIcons/>
                  Add to cart
                </Button>
              </ButtonWrapper>
            </div>
          </Colums>
          <Colums>
            <img
              src="https://sachin-next-ecommerce.s3.eu-north-1.amazonaws.com/1685599905345.png"
              alt="macbook"
            />
          </Colums>
        </ColumnsWrapper>
      </Center>
    </Bg>
  );
}
