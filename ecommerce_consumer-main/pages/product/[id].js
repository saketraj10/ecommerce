import Center from '../../components/Center'
import Header from '../../components/Header'
import styled from 'styled-components'
import {mongooseConnect} from '../../lib/mongoose'
import {Product} from '../../models/Products'
import ProductsGrid from '../../components/ProductsGrid'
import ProductImages from '../../components/ProductImages'
import Button from '../../components/Button'
import CartIcons from '../../components/icons/CartIcons'
import ButtonLink from '../../components/ButtonLink'
import { useCartContext } from '../../components/CartContext'

const Title = styled.h1`
    font-size: 1.5rem;
`;

const ColumnWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 40px;
    margin-top: 50px;
    @media screen and (min-width: 768px) {
        grid-template-columns: .8fr 1.2fr;

    }
`;
const WHiteBox = styled.div`
    background-color: #fff;
    border-radius:10px ;
    padding: 30p;
`;
const PriceRow = styled.div`
    display: flex;
    gap: 20px;
    align-items: center;

`;
export default function Id({product}) {
    const {addProduct} = useCartContext()
  return (
    <>
        <Header/>
        <Center>
        <ColumnWrapper>
        <WHiteBox>
            <ProductImages images={product.images} />            
        </WHiteBox>
        <div>
            <Title>{product?.title}</Title>
            <p>{product?.description}</p>
            <PriceRow>
            <p>${product?.price}</p>
            <Button onClick={()=>addProduct(product?._id)} primary size="l" >
                  <CartIcons/>
                  Add to cart
                </Button>
            </PriceRow>
        </div>
        </ColumnWrapper>
        </Center>
    </>
  )
}

export async function getServerSideProps(context){
    await mongooseConnect()
    const {id} = context.query
    const product = await Product.findById(id)
    return {
        props:{
            product:JSON.parse(JSON.stringify(product))
        }
    }
}