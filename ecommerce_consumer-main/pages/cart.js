import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Center from "../components/Center";
import Header from "../components/Header";
import Button from "../components/Button";
import { useCartContext } from "../components/CartContext";
import axios from "axios";
import Table from "../components/Table";
import Product from "../models/Products";
import Input from "../components/Input";
import { redirect } from "next/dist/server/api-utils";

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  margin-top: 40px;
  @media screen and (min-width: 768px){
    grid-template-columns: 1.3fr 0.7fr;
  }
`;

const Box = styled.div`
  background: #fff;
  border-radius: 10px;
  padding: 30px;
  height: max-content;
`;

const H2Wrapper = styled.h2`
  font-size: 1rem;
`;

const ProductInfoCell = styled.tr`
  margin: 10px 0;
`;
const ProductImageBox = styled.div`
  max-width: 150px;
  max-height: 150px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    max-width: 100px;
    max-height: 100px;
  }

 
`;
const QuantityStyle = styled.div`
  display: flex;
  margin:10px;
  @media screen and (min-width: 768px){
    display: flex;
  }
`;
const Quantity = styled.span`
  padding: 5px;
`;
const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;
export default function Cart() {
  const { cartProducts, addProduct, removeProduct } = useCartContext();
  const [products, setProducts] = useState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalcode] = useState('');
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const [success, setSuccess] = useState(false);
  const [cancel,setCancel] = useState(false)

  useEffect(() => {
    if (cartProducts?.length > 0) {
      axios
        .post("/api/cart", { ids: cartProducts })
        .then((res) => setProducts(res.data));
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  useEffect(()=>{
    if(typeof window == 'undefined'){
      return;
    }
    if(window?.location.href.includes('success')){
      setSuccess(true)
    }
    if(window?.location.href.includes('cancel')){
      setCancel(true)
    }
  },[])

  let total = 0;

  for (const pId of cartProducts) {
    const price = products?.find((p) => p._id == pId)?.price || 0;
    total += price;
  }

  const doPayment = async (e) => {
    e.preventDefault()
    const res = await axios.post("/api/checkout", {
      name,
      email,
      city,
      postalCode,
      streetAddress,
      country,
      cartProducts,
    });
    if (res.data) {
      window.location = res.data;
    }
  };

  if(success){
    return (
      <>
        <Header/>
        <Center>
          <ColumnsWrapper>
            <Box>
            <h2>Order Confirmed</h2>
              <p>Thank you for shopping with us!</p>
            </Box>
          </ColumnsWrapper>
        </Center>
      </>
    )
  }
  if(cancel){
    return (
      <>
        <Header/>
        <Center>
          <ColumnsWrapper>
            <Box>
              <h2>Payment cancelled</h2>
            </Box>
          </ColumnsWrapper>
        </Center>
      </>
    )
  }
  return (
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
          <Box>
            <h2>Cart</h2>

            {!cartProducts?.length && <div>Your cart is empty</div>}

            {cartProducts?.length > 0 && (
              <>
                <Table>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products?.map((product, index) => (
                      <ProductInfoCell key={index}>
                        <td>
                          <ProductImageBox>
                            <img src={product.images[0]} />
                          </ProductImageBox>
                          {product.title}
                        </td>
                        <td>
                          <QuantityStyle>
                            <Button onClick={() => removeProduct(product._id)}>
                              -
                            </Button>
                            <Quantity>
                              {
                                cartProducts?.filter((id) => id == product._id)
                                  .length
                              }
                            </Quantity>
                            <Button onClick={() => addProduct(product._id)}>
                              +
                            </Button>
                          </QuantityStyle>
                        </td>
                        <td>
                          $
                          {cartProducts?.filter((id) => id == product._id)
                            .length * product.price}
                        </td>
                      </ProductInfoCell>
                    ))}
                    <tr>
                      <td></td>
                      <td></td>
                      <td>${total}</td>
                    </tr>
                  </tbody>
                </Table>
              </>
            )}
          </Box>
          {cartProducts?.length > 0 && (
            <Box>
            <form onSubmit={(e) => doPayment(e)}>
              <H2Wrapper>Order Information</H2Wrapper>
              <Input
                type={"text"}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                name="Name"
                required
              />
              <Input
                type={"text"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                name="Email"
                required
              />
              <CityHolder>
                <Input
                  type={"text"}
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="City"
                  name="City"
                  required
                />
                <Input
                  type={"text"}
                  value={postalCode}
                  onChange={(e) => setPostalcode(e.target.value)}
                  placeholder="Postal Code"
                  name="Postal Code"
                  required
                />
              </CityHolder>
              <Input
                type={"text"}
                value={streetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
                placeholder="Street Address"
                name="Street Address"
                required
              />
              <Input
                type={"text"}
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="country"
                name="country"
                required
              />

              <Button type='submit' primary block>
                Proceed Checkout
              </Button>
              </form>
            </Box>
          )}
        </ColumnsWrapper>
      </Center>
    </>
  );
}
