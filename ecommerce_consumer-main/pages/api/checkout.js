import { mongooseConnect } from "../../lib/mongoose";
import { Product } from "../../models/Products";
import Order from "../../models/Order";
const stripe = require("stripe")(process.env.STRIPE_SK);

export default async function checkout(req, res) {
  if (req.method != "POST") {
    res.json("should be a POST request");
    return;
  }
  const {
    name,
    email,
    city,
    postalCode,
    streetAddress,
    country,
    cartProducts,
  } = req.body;
  await mongooseConnect();
  const productIds = cartProducts;
  const uniqueIds = [...new Set(productIds)];
  const productInfos = await Product.find({ _id: uniqueIds });

  let line_items = [];
  let lineItems =[]

  for (const productId of uniqueIds) {
    const productInfo = productInfos.find(
      (product) => product._id.toString() == productId
    );
    const quantity = productIds.filter((id) => id == productId)?.length || 0;
    const parsedDocument = JSON.parse(JSON.stringify(productInfo));
    const sellerEmail = parsedDocument.sellerEmail;

    console.log(sellerEmail,'email')
    
    if (quantity > 0) {
      let it = {
        quantity,
        price_data: {
          currency: "USD",
          product_data: { name: productInfo?.title },
          unit_amount: quantity * productInfo?.price * 100,
        },
      };
      line_items.push(it)
      lineItems.push({...it,sellerEmail})
    }
  }
console.log(lineItems)
console.log(line_items)

  const orderDoc = await Order.create({
    lineItems,
    name,
    email,
    city,
    postalCode,
    streetAddress,
    country,
    paid: false,
  });
  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    customer_email: email,
    success_url: "https://ecommerce-consumer.vercel.app/cart?success=1",
    cancel_url: "https://ecommerce-consumer.vercel.app/cart?cancel=1",
    metadata: {
      orderId: orderDoc._id.toString(),
    },
  });
 
  res.json(session.url);
}
